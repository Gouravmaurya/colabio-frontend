#!/usr/bin/env node
// Seeded design-direction picker. Read-only. Forces variety so open briefs do not collapse to one look.
// Usage: node pick-direction.mjs --seed "<product name>" [--mood a,b] [--theme light|dark] [--list] [--validate]
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const kit = JSON.parse(fs.readFileSync(fileURLToPath(new URL('../references/design-kit.json', import.meta.url)), 'utf8'));
const argv = process.argv.slice(2);
const args = {};
argv.forEach((x, i) => { if (x.startsWith('--')) args[x.slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : true; });

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

if (args.validate) {
  let bad = 0;
  for (const p of kit.palettes) {
    for (const [name, fg, min] of [['text', p.text, 7], ['muted', p.muted, 4.5]]) {
      const c = contrast(fg, p.bg);
      if (c < min) { bad++; console.log(`FAIL ${p.id} ${name}/bg ${c.toFixed(2)} < ${min}`); }
    }
    const a = contrast(p.accent, p.bg);
    if (a < 3) console.log(`note ${p.id} accent/bg ${a.toFixed(2)} < 3: use accent as a fill with contrasting text, not as small text`);
  }
  console.log(bad ? `${bad} failures` : 'palettes ok');
  process.exit(bad ? 1 : 0);
}
if (args.list) { console.log(JSON.stringify(kit, null, 2)); process.exit(0); }

const seed = String(args.seed === true || !args.seed ? 'colabio' : args.seed);
let h = 2166136261;
for (const ch of seed) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
const rng = () => { h = (Math.imul(h ^ (h >>> 15), 2246822507) + 0x6d2b79f5) >>> 0; return h / 4294967296; };
const moods = String(args.mood === true || !args.mood ? '' : args.mood).split(',').filter(Boolean);
const match = (x) => !moods.length || (x.mood || []).some((m) => moods.includes(m)) || (x.fits && moods.some((m) => x.fits.includes(m)));
const pool = (list, test) => { const f = list.filter(test); return f.length ? f : list; };
const pick = (list) => list[Math.floor(rng() * list.length)];
const dark = (p) => lum(p.bg) < 0.2;

console.log(JSON.stringify({
  seed,
  style: pick(pool(kit.styles, match)),
  font: pick(pool(kit.fontPairs, match)),
  palette: pick(pool(kit.palettes, (p) => match(p) && (!args.theme || dark(p) === (args.theme === 'dark')))),
  signatureMechanism: pick(kit.signatureMechanisms),
  heroComposition: pick(kit.heroCompositions),
  rules: [
    'Starting proposal, not a mandate: the brief and existing brand override it.',
    'Reroll with a different --seed only with a stated reason; never until a familiar look appears.',
    'The mechanism is a prompt: rewrite it with this product\'s real content.'
  ]
}, null, 2));
