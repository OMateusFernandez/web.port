import http from 'node:http';
import fs from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { output, exactFile } from './build.mjs';

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif', '.mp4': 'video/mp4', '.m4a': 'audio/mp4', '.wav': 'audio/wav' };
export function createPreview(base = '/') {
  if (!/^\/(?:[\w-]+\/)*$/.test(base)) throw new Error('Base deve ser / ou /nome-do-repositorio/');
  return http.createServer(async (req, res) => {
    try {
      if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
      const pathname = decodeURIComponent(new URL(req.url, 'http://preview.invalid').pathname);
      if (base !== '/' && pathname === base.slice(0, -1)) { res.writeHead(301, { Location: base }).end(); return; }
      if (!pathname.startsWith(base)) throw new Error('404');
      const relative = pathname.slice(base.length) || 'index.html';
      if (relative.includes('\\') || relative.split('/').some(p => p.startsWith('.') && p !== '.nojekyll')) throw new Error('404');
      const filename = await exactFile(output, relative);
      const { size } = await fs.stat(filename);
      const headers = { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream', 'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache' };
      let start = 0, end = size - 1, status = 200;
      if (req.headers.range) {
        const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
        if (!range || (!range[1] && !range[2])) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }).end(); return; }
        start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
        end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
        if (start > end || start >= size) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }).end(); return; }
        status = 206; headers['Content-Range'] = `bytes ${start}-${end}/${size}`;
      }
      headers['Content-Length'] = Math.max(0, end - start + 1);
      res.writeHead(status, headers);
      if (req.method === 'HEAD' || !size) res.end();
      else createReadStream(filename, { start, end }).on('error', () => res.destroy()).pipe(res);
    } catch { res.writeHead(404).end('Not found'); }
  });
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const option = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
  const base = option('--base', '/');
  const port = Number(option('--port', '4174'));
  await fs.access(path.join(output, 'index.html'));
  createPreview(base).listen(port, '127.0.0.1', () => console.log(`Prévia: http://127.0.0.1:${port}${base}`));
}
