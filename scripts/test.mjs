import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { build, collect, output } from './build.mjs';
import { createPreview } from './preview.mjs';

const first = await build();
await fs.writeFile(path.join(output, 'obsolete-test.txt'), 'obsolete');
await build();
assert.equal(await fs.access(path.join(output, 'obsolete-test.txt')).then(() => true, () => false), false);
for (const [name, bytes] of first) assert.deepEqual(await fs.readFile(path.join(output, name)), bytes);
const originals = await collect();
for (const [name, bytes] of first) assert.deepEqual(originals.get(name), bytes);
assert.equal(first.has('assets/images/showreel-placeholder.svg'), false);
assert.equal(first.has('assets/audio/background-sweden-hans-zimmer.m4a'), false);
for (const base of ['/', '/portfolio-test/']) {
  const server = createPreview(base);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  try {
    assert.equal((await fetch(origin + base)).status, 200);
    for (const [name, bytes] of first) {
      const response = await fetch(origin + base + name);
      assert.equal(response.status, 200, name);
      assert.deepEqual(Buffer.from(await response.arrayBuffer()), bytes, name);
    }
    assert.equal((await fetch(origin + base + '.nojekyll')).status, 200);
    for (const name of ['INDEX.html', 'README.md', 'script.JS', 'work/private.txt']) assert.equal((await fetch(origin + base + name)).status, 404);
    const range = await fetch(origin + base + 'assets/videos/talking-head-01.mp4', { headers: { Range: 'bytes=0-99' } });
    assert.equal(range.status, 206);
    assert.equal(range.headers.get('content-type'), 'video/mp4');
    assert.equal((await range.arrayBuffer()).byteLength, 100);
    console.log(`HTTP ${base}: todos os arquivos, capitalização, exclusões e vídeo parcial OK`);
  } finally { await new Promise(resolve => server.close(resolve)); }
}
console.log('Build reproduzível, originais preservados e limpeza de obsoletos: OK');
