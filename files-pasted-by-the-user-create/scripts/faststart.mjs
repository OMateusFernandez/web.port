import fs from "node:fs";

const [inputPath, outputPath] = process.argv.slice(2);
if (!inputPath || !outputPath) throw new Error("Usage: node faststart.mjs <input> <output>");

const source = fs.readFileSync(inputPath);

function readAtom(buffer, offset) {
  const size32 = buffer.readUInt32BE(offset);
  const type = buffer.toString("ascii", offset + 4, offset + 8);
  if (size32 === 1) return { offset, type, size: Number(buffer.readBigUInt64BE(offset + 8)) };
  return { offset, type, size: size32 === 0 ? buffer.length - offset : size32 };
}

const atoms = [];
for (let offset = 0; offset < source.length;) {
  const atom = readAtom(source, offset);
  if (atom.size < 8 || offset + atom.size > source.length) throw new Error(`Invalid ${atom.type} atom`);
  atoms.push(atom);
  offset += atom.size;
}

const moov = atoms.find(atom => atom.type === "moov");
const mdat = atoms.find(atom => atom.type === "mdat");
if (!moov || !mdat) throw new Error("Expected moov and mdat atoms");
if (moov.offset < mdat.offset) {
  fs.copyFileSync(inputPath, outputPath);
  process.exit(0);
}

const patchedMoov = Buffer.from(source.subarray(moov.offset, moov.offset + moov.size));
const offsetDelta = moov.size;

for (let index = 4; index < patchedMoov.length - 16; index += 1) {
  const type = patchedMoov.toString("ascii", index, index + 4);
  if (type !== "stco" && type !== "co64") continue;

  const boxStart = index - 4;
  const boxSize = patchedMoov.readUInt32BE(boxStart);
  if (boxSize < 16 || boxStart + boxSize > patchedMoov.length) continue;

  const entryCount = patchedMoov.readUInt32BE(index + 8);
  const entrySize = type === "stco" ? 4 : 8;
  if (index + 12 + entryCount * entrySize > boxStart + boxSize) continue;

  for (let entry = 0; entry < entryCount; entry += 1) {
    const position = index + 12 + entry * entrySize;
    if (type === "stco") patchedMoov.writeUInt32BE(patchedMoov.readUInt32BE(position) + offsetDelta, position);
    else patchedMoov.writeBigUInt64BE(patchedMoov.readBigUInt64BE(position) + BigInt(offsetDelta), position);
  }
}

const outputParts = [];
for (const atom of atoms) {
  if (atom.type === "moov") continue;
  if (atom.type === "mdat") outputParts.push(patchedMoov);
  outputParts.push(source.subarray(atom.offset, atom.offset + atom.size));
}
fs.writeFileSync(outputPath, Buffer.concat(outputParts));
