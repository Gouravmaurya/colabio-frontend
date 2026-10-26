#!/usr/bin/env node
// Copy a template into a new project folder and rename the sample brand.
// Usage: node scaffold.mjs <template> <out-dir> --brand "New Name" [--from "Sample"] [--replace old=new ...] [--force]
//   <template>: cinematic-product-shop | scroll-stage-game | precision-service | portfolio-index
// Writes <out-dir>/index.html (+ design-spec.md when the template has one), then prints what is left to rewrite.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const argv = process.argv.slice(2);
const flags = new Set(['--brand', '--from', '--replace']);
const pos = argv.filter((a, i) => !a.startsWith('--') && !flags.has(argv[i - 1]));
const flag = (k) => { const i = argv.indexOf(k); return i > -1 ? argv[i + 1] : undefined; };
const all = (k) => argv.flatMap((a, i) => (a === k ? [argv[i + 1]] : []));
const [tpl, out] = pos;
const base = fileURLToPath(new URL('../templates/', import.meta.url));
const known = fs.readdirSync(base, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
if (!tpl || !out || !known.includes(tpl)) { console.error(`usage: node scaffold.mjs <${known.join('|')}> <out-dir> --brand "Name" [--from "Sample"] [--replace old=new]`); process.exit(2); }

const DEFAULT_FROM = { 'cinematic-product-shop': 'Ashfold', 'scroll-stage-game': 'Reclone', 'precision-service': 'Reclone', 'portfolio-index': 'Ines' };
const brand = flag('--brand'), from = flag('--from') || DEFAULT_FROM[tpl];
const dest = path.resolve(out);
if (fs.existsSync(path.join(dest, 'index.html')) && !argv.includes('--force')) { console.error(`${dest}/index.html exists; pass --force to overwrite`); process.exit(1); }
fs.mkdirSync(dest, { recursive: true });

let html = fs.readFileSync(path.join(base, tpl, 'index.html'), 'utf8');
const swap = (s, a, b) => s.split(a).join(b);
if (brand) { html = swap(html, from, brand); html = swap(html, from.toUpperCase(), brand.toUpperCase()); html = swap(html, from.toLowerCase(), brand.toLowerCase()); }
for (const r of all('--replace')) { const i = r.indexOf('='); if (i > 0) html = swap(html, r.slice(0, i), r.slice(i + 1)); }
fs.writeFileSync(path.join(dest, 'index.html'), html);
const spec = path.join(base, tpl, 'design-spec.md');
if (fs.existsSync(spec)) fs.copyFileSync(spec, path.join(dest, 'design-spec.md'));

console.log(`scaffolded ${tpl} -> ${dest}${path.sep}index.html${brand ? ` (brand "${from}" -> "${brand}")` : ''}`);
console.log('\nStill to do (a template shipped unchanged is a failed build):');
console.log(' 1. Rewrite every headline, paragraph, product name and price; label anything not real as sample.');
console.log(' 2. Replace palette, fonts and the object model (search the file for @CONFIG and @COPY).');
console.log(' 3. Update <title>, meta description, footer disclaimer and aria-labels.');
console.log(' 4. Serve (scripts/serve.mjs), drive it, and run slop-lint.mjs + check-contrast.mjs (references/verify.md).');
console.log(' 5. Remove any window.__dbg hook and scratch files before delivering.');
const SAMPLES = { 'cinematic-product-shop': 'Mugs, bowls, vases and planters|stoneware|Clay remembers|bisque|Thrown by hand|Wheel-thrown', 'scroll-stage-game': 'Echo Rooms|Tidewire|Night Shift Foundry|Your last run|clone', 'precision-service': 'Send a broken part|filament|layer height|PLA|PETG' };
console.log(`
Before delivering, find leftover sample text:
  node ${path.join(path.dirname(fileURLToPath(import.meta.url)), 'slop-lint.mjs')} "${dest}" --sample "${SAMPLES[tpl]}"`);
const left = (html.match(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length;
if (left && brand && brand.toLowerCase() !== from.toLowerCase()) console.log(`\nnote: "${from}" still appears ${left} time(s); check them.`);
