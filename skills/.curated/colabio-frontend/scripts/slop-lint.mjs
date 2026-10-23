#!/usr/bin/env node
// Read-only "template tell" scanner. Static heuristics only: it cannot judge visual quality.
// Usage: node slop-lint.mjs <project-or-src-folder> [--strict]   (--strict exits 1 on any high finding)
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '.');
const strict = process.argv.includes('--strict');
const skip = new Set(['node_modules', '.next', 'dist', 'build', '.git', 'out', 'coverage', '.turbo']);
const exts = new Set(['.html', '.css', '.scss', '.js', '.jsx', '.ts', '.tsx', '.vue', '.svelte', '.astro', '.mdx']);
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (skip.has(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (exts.has(path.extname(e.name))) files.push(p);
  }
})(root);
const src = files.map((f) => fs.readFileSync(f, 'utf8')).join('\n');
const count = (re) => (src.match(re) || []).length;

const checks = [
  ['high', 'Default font stack only', () => /font-family:[^;]*\b(Inter|Roboto|Arial|Helvetica)\b/i.test(src) || /from ['"]next\/font\/google['"][\s\S]{0,200}\bInter\b/.test(src) ? (/Space Grotesk|Fraunces|Instrument|Bricolage|Satoshi|General Sans|Cabinet|Syne|Newsreader|Boska|Clash|Unbounded|Schibsted|Hanken|Gambarino|Geist/.test(src) ? 0 : 1) : 0, 'Only Inter/Roboto/Arial found. Pick a pair from references/design-kit.json or justify.'],
  ['high', 'Gradient headline text', () => count(/bg-clip-text|background-clip:\s*text/g), 'Gradient text is the strongest AI-template tell. Use solid type.'],
  ['high', 'Placeholder or filler copy', () => count(/lorem ipsum|Acme\b|John Doe|Jane Doe|your (company|product) name|coming soon/gi), 'Replace with real content.'],
  ['high', 'Filler marketing verbs', () => count(/\b(unlock|elevate|seamless(ly)?|supercharge|revolutioni[sz]e|next-gen|cutting-edge|empower|streamline|game-chang\w+|reimagine|effortless(ly)?)\b/gi), 'See references/copy-gate.md. Say what it does with a number or noun.'],
  ['high', 'No imagery or authored visuals', () => (count(/<img\b|<Image\b|<video\b|<svg\b|<canvas\b|<picture\b|url\(/g) < 3 ? 1 : 0), 'Fewer than 3 image/video/svg/canvas uses. Run the asset phase (references/asset-phase.md).'],
  ['high', 'Placeholder image hosts', () => count(/placehold\.co|via\.placeholder|picsum\.photos|dummyimage/g), 'Replace with real or generated assets.'],
  ['high', 'Motion lib without reduced-motion handling', () => (/gsap|framer-motion|motion\/react|lenis/.test(src) && !/prefers-reduced-motion|useReducedMotion|matchMedia\([^)]*reduce/.test(src) ? 1 : 0), 'Add prefers-reduced-motion path.'],
  ['high', 'outline removed without focus-visible', () => (count(/outline-none|outline:\s*none/g) > count(/focus-visible|:focus-visible|focus:ring|focus-visible:ring/g) ? 1 : 0), 'Restore visible focus states.'],
  ['med', 'Purple/indigo default palette', () => (count(/\b(from|to|via|bg|text|border)-(indigo|violet|purple)-\d{3}/g) >= 4 ? 1 : 0), 'Default Tailwind indigo/purple. Use project tokens.'],
  ['med', 'Rounded-everything', () => (count(/rounded-(2xl|3xl)/g) >= 12 ? 1 : 0), 'Vary radius by role; sharp edges are allowed.'],
  ['med', 'Glow blobs / glass everywhere', () => (count(/blur-(2xl|3xl)/g) >= 3 || count(/backdrop-blur/g) >= 6 ? 1 : 0), 'Give each surface treatment a role.'],
  ['med', 'Repeated 3-up feature grids', () => (count(/grid-cols-3/g) >= 3 ? 1 : 0), 'Vary structure: sequence, table, list, or asymmetric layout.'],
  ['med', 'Icon-in-tinted-tile pattern', () => (count(/bg-\w+-\d{2,3}\/(10|20)[^"']*rounded/g) >= 4 ? 1 : 0), 'The icon-tile feature card is a template tell.'],
  ['med', 'Identical section padding', () => { const m = src.match(/\bpy-(16|20|24|28|32)\b/g) || []; const top = Math.max(0, ...Object.values(m.reduce((a, x) => ((a[x] = (a[x] || 0) + 1), a), {}))); return top >= 6 ? 1 : 0; }, 'Vary vertical rhythm per scene.'],
  ['med', 'Uniform fade-up reveals', () => (count(/whileInView|ScrollTrigger\.batch|data-aos|animate-fade-in-up/g) >= 8 && count(/y:\s*(20|24|30|40)\b/g) >= 6 ? 1 : 0), 'Replace blanket reveals with motion tied to the signature component.'],
  ['med', 'Emoji used as icons', () => (count(/[\u{1F300}-\u{1FAFF}]/gu) >= 3 ? 1 : 0), 'Use a real icon family or custom SVG.'],
  ['med', 'Few design tokens', () => (count(/--[a-z][\w-]*\s*:/g) < 8 && !/@theme/.test(src) ? 1 : 0), 'Define color/type/space tokens.'],
  ['low', 'Unsplash stock as the only photography', () => (count(/images\.unsplash\.com/g) >= 3 ? 1 : 0), 'Stock photography is penalized in design review. Prefer authored assets.'],
  ['low', 'Fixed-px font sizes, no fluid type', () => (!/clamp\(/.test(src) ? 1 : 0), 'Use clamp() for display sizes.']
];

const rank = { high: 3, med: 2, low: 1 };
const found = checks.map(([sev, name, fn, fix]) => ({ sev, name, n: fn(), fix })).filter((c) => c.n).sort((a, b) => rank[b.sev] - rank[a.sev]);
console.log(`slop-lint: ${files.length} files in ${root}`);
for (const f of found) console.log(`[${f.sev}] ${f.name}${f.n > 1 ? ` (x${f.n})` : ''}: ${f.fix}`);
const high = found.filter((f) => f.sev === 'high').length;
console.log(found.length ? `${found.length} signals, ${high} high. Heuristic only: fix, then confirm in the rendered critique.` : 'No template tells found. This does not prove quality: do the rendered critique.');
if (strict && high) process.exit(1);
