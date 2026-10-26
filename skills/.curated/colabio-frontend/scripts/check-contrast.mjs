#!/usr/bin/env node
// Read-only WCAG contrast checker for a built page. Reads CSS custom properties (--name: #hex) from
// an .html/.css file and reports the ratio of colour pairs. No browser needed.
// Usage: node check-contrast.mjs <file> [--pair text:bg ...] [--bg bg] [--min 7] [--muted-min 4.5]
// Default pairs: text/bg, muted/bg, text/surface, muted/surface, accent/bg (info only), plus any
// --pair given. Token names are matched loosely (text, ink, fg ... bg, paper, surface ...).
import fs from 'node:fs';
import path from 'node:path';

const argv = process.argv.slice(2);
const file = argv.find((a) => !a.startsWith('--'));
if (!file) { console.error('usage: node check-contrast.mjs <file> [--pair fg:bg ...]'); process.exit(2); }
const opt = (k) => { const i = argv.indexOf(k); return i > -1 ? argv[i + 1] : undefined; };
const pairsArg = argv.flatMap((a, i) => (a === '--pair' ? [argv[i + 1]] : []));
const MIN = Number(opt('--min') || 7), MUTED = Number(opt('--muted-min') || 4.5);

const src = fs.readFileSync(path.resolve(file), 'utf8');
const tokens = {};
for (const m of src.matchAll(/--([a-z0-9-]+)\s*:\s*(#[0-9a-f]{3,8})\b/gi)) {
  let hex = m[2].toLowerCase();
  if (hex.length === 4) hex = '#' + [...hex.slice(1)].map((c) => c + c).join('');
  tokens[m[1].toLowerCase()] = hex.slice(0, 7);
}
if (!Object.keys(tokens).length) { console.error('no "--token: #hex" custom properties found'); process.exit(2); }

const lum = (hex) => { const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const find = (...names) => names.find((n) => tokens[n]);
const FG = { text: ['text', 'ink', 'fg', 'foreground', 'paper-text'], muted: ['muted', 'text-muted', 'fg-muted', 'paper-muted'], accent: ['accent', 'lime', 'brand', 'primary'] };
const BG = { bg: ['bg', 'background', 'paper', 'canvas'], surface: ['surface', 'bg2', 'card', 'panel'] };

const pairs = [];
if (pairsArg.length) pairsArg.forEach((p) => { const [f, b] = p.split(':'); pairs.push([f, b, /muted|dim|sub/.test(f) ? MUTED : MIN]); });
else {
  const bg = find(...BG.bg), surface = find(...BG.surface);
  [['text', MIN], ['muted', MUTED], ['accent', 3]].forEach(([k, min]) => { const f = find(...FG[k]); if (!f) return; if (bg) pairs.push([f, bg, min, k === 'accent']); if (surface && k !== 'accent') pairs.push([f, surface, min]); });
  // the other way round: dark text colours on a light section colour such as paper
  const light = Object.keys(tokens).filter((n) => /paper|bone/.test(n) && !/muted|dark/.test(n) && lum(tokens[n]) > 0.6);
  light.forEach((L) => Object.keys(tokens).forEach((t) => { if (t !== L && lum(tokens[t]) < 0.25 && /^(bg|ink|text)$|muted|dark/.test(t) && !/^(muted|text-muted)$|border|line/.test(t)) pairs.push([t, L, /muted|dark/.test(t) ? MUTED : MIN]); }));
}
// de-dup
const seen = new Set(); let fail = 0;
console.log(`check-contrast: ${Object.keys(tokens).length} tokens in ${path.basename(file)}`);
for (const [f, b, min, soft] of pairs) {
  if (!tokens[f] || !tokens[b]) { console.log(`skip  ${f}/${b}: token not found`); continue; }
  const k = f + '/' + b; if (seen.has(k)) continue; seen.add(k);
  const r = ratio(tokens[f], tokens[b]), ok = r >= min;
  if (!ok && !soft) fail++;
  console.log(`${ok ? 'ok  ' : soft ? 'note' : 'FAIL'}  ${f} ${tokens[f]} on ${b} ${tokens[b]}  ${r.toFixed(2)}:1  (min ${min})`);
}
console.log(fail ? `${fail} failing pair(s).` : 'all checked pairs pass (a note on accent means: use it as a fill or large graphic, not as small text)');
process.exit(fail ? 1 : 0);
