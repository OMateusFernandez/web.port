import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const output = path.join(root, 'dist');
export async function exactFile(base, relative) {
  let current = base;
  for (const part of relative.split('/')) {
    if (!part || part === '..' || part === '.' || !(await fs.readdir(current)).includes(part)) throw new Error(`Caminho inválido ou capitalização incorreta: ${relative}`);
    current = path.join(current, part);
    if ((await fs.lstat(current)).isSymbolicLink()) throw new Error(`Link simbólico não permitido: ${relative}`);
  }
  if (!(await fs.stat(current)).isFile()) throw new Error(`Não é arquivo: ${relative}`);
  return current;
}
export async function collect() {
  const pending = ['index.html', 'style.css', 'script.js'];
  const files = new Map();
  const html = await fs.readFile(path.join(root, 'index.html'), 'utf8');
  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]));
  while (pending.length) {
    const relative = pending.shift();
    if (files.has(relative)) continue;
    if (!['index.html', 'style.css', 'script.js'].includes(relative) && !relative.startsWith('assets/')) throw new Error(`Arquivo fora da lista de publicação: ${relative}`);
    const bytes = await fs.readFile(await exactFile(root, relative));
    files.set(relative, bytes);
    if (!/\.(html|css|js|svg)$/.test(relative)) continue;
    const source = bytes.toString();
    if (/localhost|127\.0\.0\.1|file:\/\/|\b[A-Za-z]:[\\/]/i.test(source)) throw new Error(`Referência local proibida em ${relative}`);
    if (relative === 'script.js') new Script(source, { filename: relative });
    const refs = [];
    if (/\.(html|svg)$/.test(relative)) refs.push(...[...source.matchAll(/\b(?:src|href|poster)=["']([^"']+)["']/g)].map(m => m[1]));
    if (/\.(css|html|svg)$/.test(relative)) refs.push(...[...source.matchAll(/url\(\s*["']?([^\s"')]+)["']?\s*\)/g)].map(m => m[1]));
    if (relative.endsWith('.js')) refs.push(...[...source.matchAll(/["'`](assets\/[^"'`]+)["'`]/g)].map(m => m[1]));
    for (const ref of refs) {
      if (/^(?:https?:|mailto:|tel:|data:)/i.test(ref)) continue;
      if (ref.startsWith('#')) {
        const localIds = relative.endsWith('.svg') ? new Set([...source.matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1])) : ids;
        if (!localIds.has(ref.slice(1))) throw new Error(`Âncora inexistente em ${relative}: ${ref}`);
        continue;
      }
      if (ref.startsWith('/') || ref.includes('\\') || ref.includes('${')) throw new Error(`Use caminho relativo literal: ${ref}`);
      const clean = decodeURIComponent(ref.split(/[?#]/)[0]);
      const target = path.posix.normalize(path.posix.join(path.posix.dirname(relative), clean));
      if (target.startsWith('../')) throw new Error(`Caminho fora do projeto: ${ref}`);
      pending.push(target);
    }
  }
  return files;
}
async function rejectLinks(dir) {
  const stat = await fs.lstat(dir);
  if (stat.isSymbolicLink()) throw new Error(`Saída contém link simbólico: ${dir}`);
  if (stat.isDirectory()) for (const entry of await fs.readdir(dir)) await rejectLinks(path.join(dir, entry));
}
export async function build() {
  const files = await collect(); // Validate every source before touching the output.
  const realRoot = await fs.realpath(root);
  if (output !== path.join(root, 'dist') || path.dirname(output) !== root) throw new Error('Saída insegura');
  try {
    await rejectLinks(output);
    if (await fs.realpath(output) !== path.join(realRoot, 'dist')) throw new Error('Saída fora do projeto');
    await fs.rm(output, { recursive: true });
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await fs.mkdir(output, { recursive: true });
  for (const [relative, bytes] of [...files].sort(([a], [b]) => a.localeCompare(b))) {
    const destination = path.join(output, relative);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, bytes);
  }
  await fs.writeFile(path.join(output, '.nojekyll'), '');
  console.log(`Build: ${files.size + 1} arquivos; ${(Array.from(files.values()).reduce((n, b) => n + b.length, 0) / 1048576).toFixed(2)} MiB em dist/`);
  return files;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
