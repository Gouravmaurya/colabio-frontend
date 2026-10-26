#!/usr/bin/env node
// Seeded, brief-aware design-direction picker. Read-only. Forces variety so open briefs do not
// collapse to one look, but scores every option against the brief instead of guessing blindly.
// Usage: node pick-direction.mjs --seed "<product>" [--brief "<text>"] [--mood a,b] [--type landing|studio|game|store|software|editorial|event]
//                                 [--theme light|dark] [--list] [--validate]
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

// ---- brief -> mood tokens -------------------------------------------------------------------
// Words a user is likely to type, mapped to the mood / fits / trait words used in design-kit.json.
const SYN = {
  industrial: ['industrial', 'brutal', 'logistics', 'technical'], technical: ['technical', 'developer', 'swiss', 'data', 'honest'],
  precise: ['swiss', 'data', 'neutral', 'technical'], engineering: ['technical', 'industrial', 'swiss'], manufacturing: ['industrial', 'logistics', 'technical'],
  premium: ['premium', 'luxury', 'literary', 'refined'], luxury: ['luxury', 'premium'], elegant: ['refined', 'editorial', 'premium'],
  editorial: ['editorial', 'literary'], magazine: ['editorial', 'literary'], serif: ['editorial', 'refined'],
  cinematic: ['cinematic', 'immersive'], immersive: ['immersive', 'cinematic'], dark: ['cinematic', 'technical'], '3d': ['spatial'],
  game: ['gaming', 'playful', 'cinematic', 'entertainment'], games: ['gaming', 'playful', 'cinematic', 'entertainment'], gaming: ['gaming', 'futuristic'],
  playful: ['playful', 'friendly', 'consumer'], fun: ['playful', 'friendly'], kids: ['playful', 'friendly', 'education'],
  bold: ['bold', 'brutal', 'expressive'], loud: ['brutal', 'bold'], raw: ['brutal', 'industrial'],
  calm: ['calm', 'wellness', 'slow'], soft: ['calm', 'warm', 'wellness'], warm: ['warm', 'craft', 'hospitality'], wellness: ['wellness', 'calm'],
  fintech: ['fintech', 'b2b', 'swiss', 'trust'], saas: ['b2b', 'swiss', 'developer'], dashboard: ['data', 'swiss', 'technical'], developer: ['developer', 'technical'],
  fashion: ['fashion', 'expressive', 'brutal'], music: ['nightlife', 'creative', 'brutal'], art: ['art', 'culture', 'creative'], culture: ['culture', 'editorial'],
  agency: ['agency', 'expressive'], portfolio: ['studio', 'agency', 'creative'],
  handmade: ['craft', 'warm'], ceramics: ['craft', 'warm'], pottery: ['craft', 'warm'], artisan: ['craft', 'warm'], coffee: ['craft', 'warm', 'food'],
  timesheets: ['data', 'swiss', 'b2b'], tracking: ['data', 'swiss'], analytics: ['data', 'swiss', 'technical'], admin: ['data', 'swiss'], team: ['b2b'],
  food: ['food', 'craft', 'warm'], restaurant: ['hospitality', 'warm', 'food'], hotel: ['hospitality', 'premium'], travel: ['hospitality', 'calm'],
  health: ['health', 'science', 'trust'], science: ['science', 'trust'], climate: ['climate', 'calm'], education: ['education', 'friendly'],
  hardware: ['product', 'premium'], product: ['product', 'confident'], startup: ['startup', 'product'], printing: ['industrial', 'technical', 'craft'],
  automotive: ['automotive', 'luxury'], finance: ['finance', 'trust', 'luxury'], community: ['community', 'friendly']
};
const TYPES = {
  landing: ['swiss-precision', 'apple-fluid', 'editorial-print'], studio: ['editorial-print', 'gsap-experimental', 'industrial-brutal'],
  game: ['cinematic-immersive', 'playful-kinetic', 'gsap-experimental'], store: ['apple-fluid', 'atmospheric-soft', 'editorial-print'],
  software: ['swiss-precision', 'apple-fluid'], editorial: ['editorial-print', 'atmospheric-soft'], event: ['industrial-brutal', 'gsap-experimental', 'playful-kinetic']
};
const TYPE_WORDS = { game: /games?|gaming|playtest/, store: /store|shop|e-?commerce|catalog/, software: /saas|dashboard|app|software|platform/, event: /event|conference|festival|campaign/, editorial: /magazine|blog|journal|editorial/, landing: /landing/, studio: /portfolio|studio|agency/ };

const text = [args.brief, args.mood, args.seed].filter((x) => typeof x === 'string').join(' ').toLowerCase();
const STOP = new Set('a an the for and or of to in on at is it me my we our us you your i now create build make want need please website site page landing web very with that this from into about like just'.split(' '));
const words = [...new Set(text.match(/[a-z0-9]+/g) || [])].filter((w) => !STOP.has(w));
const moods = new Set();
words.forEach((w) => { moods.add(w); (SYN[w] || []).forEach((m) => moods.add(m)); });
let type = typeof args.type === 'string' ? args.type : Object.keys(TYPE_WORDS).find((k) => TYPE_WORDS[k].test(text));
const typeStyles = TYPES[type] || [];

const tok = (t) => String(t || '').toLowerCase().match(/[a-z0-9]+/g) || [];
const hay = (x) => `${x.id} ${(x.mood || []).join(' ')} ${x.fits || ''} ${x.traits || ''}`.toLowerCase();
const score = (x, extra = 0) => { const own = new Set((x.mood || []).map((m) => m.toLowerCase())), rest = new Set([...tok(x.id), ...tok(x.fits), ...tok(x.traits)]); let s = extra; moods.forEach((m) => { if (own.has(m)) s += 2; else if (rest.has(m)) s += 1; }); return s; };

// ---- seeded choice among the best-scoring options --------------------------------------------
const seed = String(args.seed === true || !args.seed ? 'colabio' : args.seed);
let h = 2166136261;
for (const ch of seed) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
const rng = () => { h = (Math.imul(h ^ (h >>> 15), 2246822507) + 0x6d2b79f5) >>> 0; return h / 4294967296; };
const dark = (p) => lum(p.bg) < 0.2;
function choose(list, fn) {
  const ranked = list.map((x) => ({ x, s: fn(x) }));
  const best = Math.max(...ranked.map((r) => r.s));
  const top = ranked.filter((r) => r.s === best).map((r) => r.x);
  return { pick: top[Math.floor(rng() * top.length)], matched: best > 0, score: best, candidates: top.length };
}
const style = choose(kit.styles, (s) => score(s, typeStyles.includes(s.id) ? 3 : 0));
const font = choose(kit.fontPairs, (f) => score(f) + (style.pick.id && /editorial|literary|refined/.test(hay(f)) && /editorial|cinematic/.test(style.pick.id) ? 1 : 0));
const themed = args.theme ? kit.palettes.filter((p) => dark(p) === (args.theme === 'dark')) : kit.palettes;
const palette = choose(themed.length ? themed : kit.palettes, (p) => score(p) + (style.pick.id === 'cinematic-immersive' && dark(p) ? 1 : 0));
const fallback = !(style.matched && font.matched && palette.matched);

console.log(JSON.stringify({
  seed,
  brief: { moods: [...moods].filter((m) => m.length > 2).slice(0, 14), type: type || null },
  style: style.pick,
  font: font.pick,
  palette: palette.pick,
  matched: { style: style.matched, font: font.matched, palette: palette.matched },
  fallback,
  signatureMechanism: kit.signatureMechanisms[Math.floor(rng() * kit.signatureMechanisms.length)],
  heroComposition: kit.heroCompositions[Math.floor(rng() * kit.heroCompositions.length)],
  rules: [
    'Starting proposal, not a mandate: the brief and existing brand override it.',
    fallback ? 'FALLBACK: part of this pick matched nothing in the brief. Pass --brief "<their words>" or --mood, or choose by hand from references/design-kit.json.' : 'Every part matched at least one brief word. Still state a one-line reason per choice.',
    'Reroll with a different --seed only with a stated reason; never until a familiar look appears.',
    'The mechanism is a prompt: rewrite it with this product\'s real content.'
  ]
}, null, 2));
