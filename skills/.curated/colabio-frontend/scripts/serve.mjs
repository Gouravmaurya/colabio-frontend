#!/usr/bin/env node
// Zero-dependency static dev server for previewing a built page. Read-only: it only serves files.
// Usage: node serve.mjs [dir] [--port 5173] [--open index.html]
// Prints the URL and a .claude/launch.json snippet for the desktop app's preview pane.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i > -1 ? argv[i + 1] : d; };
const dir = path.resolve(argv.find((a, i) => !a.startsWith('--') && argv[i - 1] !== '--port' && argv[i - 1] !== '--open') || '.');
const port = Number(opt('--port', 5173));
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp4': 'video/mp4', '.webm': 'video/webm', '.glb': 'model/gltf-binary', '.txt': 'text/plain' };

http.createServer((req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let f = path.join(dir, p);
    if (!f.startsWith(dir)) { res.writeHead(403).end('forbidden'); return; }
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f)) { res.writeHead(404, { 'content-type': 'text/plain' }).end('404 ' + p); return; }
    res.writeHead(200, { 'content-type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'cache-control': 'no-store' });
    fs.createReadStream(f).pipe(res);
  } catch (e) { res.writeHead(500).end(String(e)); }
}).listen(port, () => {
  const page = opt('--open', 'index.html');
  console.log(`serving ${dir}\n  http://localhost:${port}/${page}\n`);
  console.log('launch.json for the preview pane (save as .claude/launch.json in the project):');
  console.log(JSON.stringify({ version: '0.0.1', configurations: [{ name: 'site', runtimeExecutable: 'node', runtimeArgs: [path.resolve(process.argv[1]), '.', '--port', String(port)], port }] }, null, 2));
}).on('error', (e) => { console.error(e.code === 'EADDRINUSE' ? `port ${port} is in use; try --port ${port + 1}` : e.message); process.exit(1); });
