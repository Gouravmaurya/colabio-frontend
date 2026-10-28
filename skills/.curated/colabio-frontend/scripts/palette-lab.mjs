#!/usr/bin/env node
// Palette lab: grounds colour decisions in the product's own materials and rejects category defaults.
// Read-only. It proposes and scores; the agent still chooses and must write the reasons.
//   node palette-lab.mjs --domain "garment erp" [--surface dark|light|auto] [--swatches "#hex,#hex"]
//   node palette-lab.mjs --check page.html        (flags a built page's palette: defaults, contrast)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const argv = process.argv.slice(2);
const arg = (k) => { const i = argv.indexOf('--' + k); return i > -1 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : undefined; };
const here = path.dirname(fileURLToPath(import.meta.url));

/* ---------- colour math ---------- */
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const toRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const hex = (r, g, b) => '#' + [r, g, b].map((v) => Math.round(clamp(v / 255) * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
function toHsl(h) { const [r, g, b] = toRgb(h).map((v) => v / 255); const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; if (mx === mn) return [0, 0, l];
  const d = mx - mn, s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn); const hh = mx === r ? ((g - b) / d + (g < b ? 6 : 0)) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return [hh * 60, s, l]; }
function fromHsl(h, s, l) { h = ((h % 360) + 360) % 360; const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2; const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x]; return hex((r + m) * 255, (g + m) * 255, (b + m) * 255); }
const lum = (h) => { const [r, g, b] = toRgb(h).map((v) => v / 255).map((c) => (c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4)); return .2126 * r + .7152 * g + .0722 * b; };
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + .05) / (y + .05); };
const hueDist = (a, b) => Math.min(Math.abs(a - b), 360 - Math.abs(a - b));
// move lightness of fg until it reaches the contrast target against bg (keeps hue and saturation)
function reach(fg, bg, min) { const [h, s, l0] = toHsl(fg), up = lum(bg) < .4; let l = l0, c = fg; for (let i = 0; i < 60 && contrast(c, bg) < min; i++) { l = clamp(l + (up ? .015 : -.015)); c = fromHsl(h, s, l); } return c; }
const mix = (a, b, t) => { const x = toRgb(a), y = toRgb(b); return hex(x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t); };

/* ---------- category-default detector ---------- */
export function flags(t) {
  const [bh, bs, bl] = toHsl(t.bg), [ah, as, al] = toHsl(t.accent), out = [];
  if (bh >= 205 && bh <= 255 && bs >= .3 && bl <= .24 && ah >= 38 && ah <= 62 && as > .5) out.push('navy + yellow: the most common B2B/SaaS dark default');
  if (bl <= .12 && as >= .75 && al >= .5 && ((ah >= 70 && ah <= 170) || (ah > 170 && ah <= 200))) out.push('near-black + neon green/cyan: developer-tool default');
  if (bl <= .22 && ah >= 250 && ah <= 295 && as >= .45) out.push('dark + purple/violet accent: AI-startup default');
  if (bl >= .9 && ah >= 205 && ah <= 235 && as >= .6) out.push('white + saturated blue: generic SaaS default');
  if (bl <= .1 && ah >= 38 && ah <= 50 && as >= .45) out.push('black + gold: luxury cliche (needs domain evidence)');
  if (bl >= .85 && bh >= 25 && bh <= 58 && bs >= .12 && bs <= .75) out.push('cream/beige ground: the reflexive "tasteful" off-white (also flagged by the Impeccable detector)');
  if (bl >= .88 && bs <= .2 && toHsl(t.accent)[1] < .1) out.push('all-neutral: no accent, nothing to remember');
  return out;
}

/* ---------- domain evidence ---------- */
const kit = JSON.parse(fs.readFileSync(path.join(here, '../references/domain-swatches.json'), 'utf8')).domains;
const near = (c, sw) => { const [h1, s1, l1] = toHsl(c), [h2, s2, l2] = toHsl(sw); return (s1 < .12 && s2 < .12 ? 0 : hueDist(h1, h2)) < 24 && Math.abs(l1 - l2) < .3; };
const evidence = (t, swatches) => Object.entries({ bg: t.bg, surface: t.surface, text: t.text, accent: t.accent, accent2: t.accent2 }).map(([role, c]) => { const m = swatches.find(([, h]) => near(c, h)); return m ? `${role} ~ ${m[0]}` : null; }).filter(Boolean);

/* ---------- --check mode ---------- */
if (arg('check')) {
  const html = fs.readFileSync(path.resolve(arg('check')), 'utf8'), vars = {};
  for (const m of html.matchAll(/--([a-z0-9-]+)\s*:\s*(#[0-9a-f]{6})\b/gi)) vars[m[1]] = m[2].toUpperCase();
  const pairs = []; for (const k of Object.keys(vars)) { const m = k.match(/^(.*?)bg$/); if (!m) continue; const p = m[1], acc = vars[p + 'acc'] || vars[p + 'accent']; if (acc) pairs.push({ prefix: p || '(root)', bg: vars[k], accent: acc }); }
  if (!pairs.length) { // fallback for other token names: ground = --bg/--paper/--ground/--page, accent = the most saturated colour token
    const gk = Object.keys(vars).find((k) => /(^|-)(bg|paper|ground|page)$/.test(k));
    if (gk) { const acc = Object.entries(vars).filter(([k]) => k !== gk).map(([k, v]) => [k, v, toHsl(v)[1]]).sort((a, b) => b[2] - a[2])[0]; if (acc) pairs.push({ prefix: `(inferred --${gk} / --${acc[0]})`, bg: vars[gk], accent: acc[1] }); }
  }
  let any = false;
  for (const p of pairs) { const f = flags({ ...p, surface: p.bg, text: p.bg, accent2: p.accent }); f.forEach((x) => { any = true; console.log(`WARN palette ${p.prefix}: ${x}`); }); }
  if (!pairs.length) console.log('no bg/accent token pairs found (name them --bg and --acc/--accent, with a shared prefix)');
  else if (!any) console.log('palette check: no category-default combination detected');
  process.exit(0);
}

/* ---------- candidate generation ---------- */
const text = (arg('domain') || '').toLowerCase();
let swatches = arg('swatches') ? arg('swatches').split(',').map((h, i) => { const m = h.match(/#([0-9a-f]{6})/i); return m ? [h.replace(m[0], '').trim() || 'custom ' + (i + 1), m[0].toUpperCase()] : null; }).filter(Boolean) : null, domain = null;
if (!swatches) { let best = 0; for (const d of kit) { const n = (text.match(new RegExp(d.keys, 'g')) || []).length; if (n > best) { best = n; domain = d; } } swatches = domain?.swatches; }
if (!swatches) { console.error('No domain matched. Pass --domain with product words, or --swatches "#hex,#hex,..." taken from the product\'s own materials, photos or brand.'); process.exit(2); }
if (swatches.length < 3) { console.error('Need at least 3 swatches as #RRGGBB, optionally named: --swatches "brick #9A4A36,slate roof #14171A,brass #B8923A".'); process.exit(2); }
const withHsl = swatches.map(([n, h]) => ({ n, h, hsl: toHsl(h) }));
const lightest = [...withHsl].sort((a, b) => b.hsl[2] - a.hsl[2])[0], darkest = [...withHsl].sort((a, b) => a.hsl[2] - b.hsl[2])[0];
const chromatic = withHsl.filter((x) => x.hsl[1] > .35 && x.hsl[2] > .18 && x.hsl[2] < .75).sort((a, b) => b.hsl[1] - a.hsl[1]);
const farFrom = (hue) => [...chromatic].sort((a, b) => hueDist(b.hsl[0], hue) - hueDist(a.hsl[0], hue));
const second = (a) => chromatic.find((x) => hueDist(x.hsl[0], toHsl(a)[0]) > 50) || chromatic[1] || chromatic[0];

// choose the real swatch that survives the contrast adjustment with the most colour left (avoids muddy "fixed" yellows)
function accentFor(bg, skip = []) {
  const ranked = chromatic.filter((x) => !skip.includes(x.n)).map((x) => { const adj = reach(x.h, bg, 4.5), [, s, l] = toHsl(adj); return { x, adj, keep: s * Math.max(0, 1 - 2.2 * Math.abs(l - x.hsl[2])) }; })
    .map((r) => ({ ...r, bad: flags({ bg, accent: r.adj, surface: bg, text: bg, accent2: r.adj }).length > 0 })).sort((a, b) => (a.bad - b.bad) || (b.keep - a.keep));
  return ranked[0] ? ranked[0].x : chromatic[0];
}
function build(id, strategy, scene, o) {
  const bg = o.bg, surface = scene === 'dark' ? mix(bg, '#FFFFFF', .06) : mix(bg, '#FFFFFF', .55);
  const textC = scene === 'dark' ? reach(mix(o.paper, '#FFFFFF', .5), bg, 12) : reach(mix(o.ink, '#000000', .55), bg, 12);
  const muted = reach(mix(textC, bg, .45), bg, 4.8), accent = reach(o.accent, bg, 4.5), accent2 = reach(o.accent2, bg, 4.5);
  const line = scene === 'dark' ? mix(bg, '#FFFFFF', .14) : mix(bg, '#000000', .14), alert = reach(o.alert || '#C23A2B', bg, 4.5);
  const t = { bg, surface, text: textC, muted, accent, accent2, line, alert };
  const c = { text: contrast(t.text, bg), muted: contrast(t.muted, bg), accent: contrast(t.accent, bg) };
  const fl = flags(t), ev = evidence(t, swatches);
  const pass = c.text >= 7 && c.muted >= 4.5 && c.accent >= 3;
  const dist = toHsl(t.bg)[1] < .15 ? 1 : hueDist(toHsl(t.accent)[0], toHsl(t.bg)[0]) >= 60 ? 1 : 0;
  const score = Math.round(50 + (pass ? 20 : 0) + Math.min(20, ev.length * 5) + dist * 10 - fl.length * 20 + (o.bonus || 0));
  return { id, strategy, scene, tokens: t, contrast: Object.fromEntries(Object.entries(c).map(([k, v]) => [k, +v.toFixed(2)])), categoryDefaultFlags: fl, domainEvidence: ev, score, why: o.why };
}
const bgLight = mix(lightest.h, '#FFFFFF', .3), bgDark = fromHsl(darkest.hsl[0], clamp(darkest.hsl[1], .08, .35), .09);
if (!chromatic.length) { console.error('None of the swatches is a saturated accent colour; add at least one real brand or material colour with some saturation.'); process.exit(2); }
const aL = accentFor(bgLight), aD = accentFor(bgDark, [aL.n]);
const tintHue = (farFrom(225).find((x) => x.n !== aD.n && x.n !== aL.n) || farFrom(225)[0] || aL).hsl[0];
const bgAway = fromHsl(tintHue, .2, .085), aA = accentFor(bgAway, [aL.n, aD.n]), aI = accentFor(lightest.h, [aL.n]);
const cands = [
  build('material-light', 'Surfaces from the lightest material, ink from the darkest, accent from a real dye or object that survives contrast', 'light',
    { bg: bgLight, paper: lightest.h, ink: darkest.h, accent: aL.h, accent2: second(aL.h).h, why: `Reads like the product's own materials (${lightest.n}, ${darkest.n}, ${aL.n}); light surface suits dense data and long reading.`, bonus: 4 }),
  build('material-dark', 'Dark scene from the darkest material, lit by the lightest', 'dark',
    { bg: bgDark, paper: lightest.h, ink: darkest.h, accent: aD.h, accent2: second(aD.h).h, why: `Cinematic low-key scene built from ${darkest.n}; accent is the real ${aD.n}, not an invented highlight.` }),
  build('away-from-default', 'Tint the dark surface toward a domain hue instead of navy, so it cannot be mistaken for generic B2B', 'dark',
    { bg: bgAway, paper: lightest.h, ink: darkest.h, accent: aA.h, accent2: second(aA.h).h, why: `Deliberately avoids navy: surface tinted toward hue ${Math.round(tintHue)}, accent from ${aA.n}.`, bonus: 6 }),
  build('inverted-scene', 'Light default with one dark scene reserved for the hero or proof moment', 'light',
    { bg: lightest.h, paper: lightest.h, ink: darkest.h, accent: aI.h, accent2: second(aI.h).h, why: `Keeps ${lightest.n} as the ground; use ${darkest.n} as a single dark hand-off scene. Cinematic by framing, not by default darkness.`, bonus: 2 })
];
// a light ground that is not cream: the lightest swatch outside the beige hue band, tinted toward white
const cool = withHsl.filter((x) => x.hsl[2] > .5 && !(x.hsl[0] >= 25 && x.hsl[0] <= 58 && x.hsl[1] >= .12)).sort((a, b) => b.hsl[2] - a.hsl[2])[0];
if (cool) { const bgC = mix(cool.h, '#FFFFFF', .55), aC = accentFor(bgC, [aL.n]);
  cands.push(build('non-cream-light', 'Light ground taken from a real non-beige material, so the page is not the reflexive cream default', 'light',
    { bg: bgC, paper: cool.h, ink: darkest.h, accent: aC.h, accent2: second(aC.h).h, why: `Ground tinted from ${cool.n} instead of cream; accent from ${aC.n}. Keeps the light, dense-data reading surface without the beige default.`, bonus: 8 })); }
// --ground "kraft": build a candidate on a specific real material (by name), e.g. a ground that is neither cream nor white
const gName = (arg('ground') || '').toLowerCase(), g = gName && withHsl.find((x) => x.n.toLowerCase().includes(gName));
if (g) { const bgG = mix(g.h, '#FFFFFF', g.hsl[2] > .7 ? .3 : .22), aG = accentFor(bgG, [aL.n]);
  cands.push(build('chosen-ground', `Ground taken from the named material "${g.n}", ink from the darkest, accent from a real dye`, g.hsl[2] > .5 ? 'light' : 'dark',
    { bg: bgG, paper: g.h, ink: darkest.h, accent: aG.h, accent2: second(aG.h).h, why: `Ground is ${g.n} (explicit choice); accent ${aG.n}.`, bonus: 8 })); }
cands.sort((a, b) => b.score - a.score);

console.log(JSON.stringify({
  domain: domain?.id || 'custom', swatchSource: swatches.map(([n, h]) => `${n} ${h}`),
  surfaceHint: (arg('surface') || 'auto'),
  candidates: cands,
  recommend: cands[0].id,
  decide: [
    'Pick one candidate and write why in the spec: which real material each colour comes from.',
    'Reject a candidate with categoryDefaultFlags unless the brand or user requires it, and say so.',
    'Cinematic does not mean dark: choose the surface from content density and use context; use dark for a scene, not by habit.',
    'Squint test: blur the page; is there still one clear focal colour? Greyscale test: does hierarchy survive without hue?',
    'Accent budget: one accent carries action; a second only carries data or state. Alerts keep their own red.',
    'Run `node scripts/palette-lab.mjs --check <page.html>` on the built page and fix any default flag.'
  ]
}, null, 2));
