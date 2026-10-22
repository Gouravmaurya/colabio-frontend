import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname } from 'node:path';

const root = fileURLToPath(new URL('.', import.meta.url));
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.webp': 'image/webp', '.woff2': 'font/woff2' };
// Serve only the demo's public files, never skills, source configuration, or parent files.
const publicFiles = new Set(['index.html', 'field.css', 'field.mjs', 'field-motion.mjs', 'case-study.mjs', 'estimate.mjs', 'assets/garden-house.webp', 'assets/neighborhood.webp']);
const vendorFiles = {
  'vendor/gsap.min.js': 'node_modules/gsap/dist/gsap.min.js',
  'vendor/ScrollTrigger.min.js': 'node_modules/gsap/dist/ScrollTrigger.min.js',
  'vendor/lenis.mjs': 'node_modules/lenis/dist/lenis.mjs',
  'vendor/lenis.css': 'node_modules/lenis/dist/lenis.css',
  'fonts/manrope-latin.woff2': 'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
  'fonts/ibm-plex-mono-latin.woff2': 'node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2'
};
// Independent validation examples; each owns its stylesheet and component model.
['northline.html', 'northline.css', 'northline.mjs', 'relay.html', 'relay.css', 'relay.bundle.js'].forEach((file) => publicFiles.add(file));
const port = Number(process.env.PORT || 4178);

createServer(async (request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname.slice(1) || 'index.html';
  if (!publicFiles.has(path) && !Object.hasOwn(vendorFiles, path)) {
    response.writeHead(404).end('Not found');
    return;
  }
  try {
    const content = await readFile(resolve(root, vendorFiles[path] || path));
    response.writeHead(200, { 'Content-Type': `${types[extname(path)]}; charset=utf-8`, 'Cache-Control': 'no-store' });
    response.end(content);
  } catch {
    response.writeHead(500).end('Unable to load demo file');
  }
}).listen(port, '127.0.0.1', () => console.log(`Haven standalone preview: http://127.0.0.1:${port}`));
