#!/usr/bin/env node
// Build selector: reads an idea or a Cinematic Design Prompt and returns a build plan.
// Read-only and heuristic. It proposes; the agent confirms against the brief.
// Usage: node select-build.mjs --brief "<idea>" | --file design-brief.md [--project <dir>] [--stack html|react|next] [--seed <name>]
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const argv = process.argv.slice(2);
const arg = (k) => { const i = argv.indexOf('--' + k); return i > -1 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : undefined; };
const here = path.dirname(fileURLToPath(import.meta.url));
let text = arg('brief') || '';
if (arg('file')) text += ' ' + fs.readFileSync(arg('file'), 'utf8');
text = text.trim();
if (!text) { console.error('usage: node select-build.mjs --brief "<idea>" | --file design-brief.md [--project <dir>] [--stack html|react|next]'); process.exit(2); }
const t = text.toLowerCase();
const has = (re) => re.test(t);

// ---- site type ----
const TYPE_RULES = [
  ['store', /\b(shop|store|sell(s|ing)?|ceramics?|pottery|clay|tea ?ware|hand-?(made|thrown|crafted)|furniture|candles?|jewel(l)?ery|apparel|catalog(ue)?|buy|cart|checkout|e-?commerce|merch|product page)\b/],
  ['game', /\b(game|playable|playtest|wishlist|level|arcade|interactive fiction)\b/],
  ['studio', /\b(portfolio|studio|agency|freelanc|case stud(y|ies)|my work|personal site|designer|photographer)\b/],
  ['software', /\b(saas|dashboard|app|software|platform|api|tools?|workflow|analytics|crm|extension|plugin|automation)\b/],
  ['editorial', /\b(magazine|blog|newsletter|journal|articles?|publication|essay)\b/],
  ['event', /\b(event|conference|festival|launch party|wedding|rsvp|campaign|summit)\b/],
  ['landing', /\b(landing|service|quote|printing|repair|clinic|consult|booking|waitlist|lead)\b/]
];
const type = arg('type') || (TYPE_RULES.find(([, re]) => re.test(t)) || ['landing'])[0];

// ---- starter template (mechanisms and safety only; identity must change) ----
const starter = (() => {
  if (/\b(ceramics?|pottery|clay|tea ?ware|vase|mug|cup|bowl|lamp|candles?|bottle|jar|vessel|glassware)\b/.test(t) && type === 'store') return 'cinematic-product-shop';
  if (type === 'game' || (type === 'studio' && /\b(game|playable|interactive)\b/.test(t))) return 'scroll-stage-game';
  if (type === 'studio') return 'portfolio-index';
  if (/\b(quotes?|estimat(e|es|ing|or)|calculator|print(ing|ed)?|fabricat(e|ion)|logistics|repair(s|ing)?|trade-?off)\b/.test(t)) return 'precision-service';
  return null;
})();

// ---- stack ----
let stack = arg('stack');
const project = arg('project');
let existing = null;
if (project && fs.existsSync(path.join(project, 'package.json'))) {
  const pk = JSON.parse(fs.readFileSync(path.join(project, 'package.json'), 'utf8'));
  const dep = { ...pk.dependencies, ...pk.devDependencies };
  existing = { next: !!dep.next, react: !!dep.react, gsap: !!dep.gsap, lenis: !!dep.lenis, motion: !!(dep.motion || dep['framer-motion']), three: !!dep.three, tailwind: !!dep.tailwindcss };
  stack = stack || (dep.next ? 'next' : dep.react ? 'react' : 'html');
}
stack = stack || (has(/\bnext(\.js)?\b/) ? 'next' : has(/\breact\b/) ? 'react' : 'html');

// ---- motion level and 3D need ----
const level = has(/\b(showpiece|cinematic|immersive|award|awwwards|webgl|scroll[- ]?(story|driven)|flagship)\b/) ? 'showpiece'
  : has(/\b(calm|minimal|quiet|simple|subtle|clean)\b/) ? 'light' : 'moderate';
const needs3d = has(/\b(3d (model|viewer|scene|object|product|jar|piece)s?|webgl|three\.?js|shader|turntable|spin it|rotate the|drag to turn)\b/) || starter === 'cinematic-product-shop';
const motion = {
  level,
  libraries: [...new Set(['gsap + ScrollTrigger', ...(level !== 'light' ? ['lenis'] : []), ...(stack !== 'html' && has(/\b(layout|gesture|drawer|modal|tabs?)\b|presence/) ? ['motion (framer-motion)'] : []), ...(needs3d ? ['three'] : [])])],
  owners: 'Lenis = scroll (driven by the GSAP ticker); GSAP = scroll-linked and choreography; Motion/CSS = component states',
  mustHave: ['prefers-reduced-motion path', 'skippable or timer-released intro', 'no-library fallback', needs3d ? 'no-WebGL fallback with poster/SVG' : null].filter(Boolean)
};

// ---- pages ----
const PAGES = {
  landing: ['home (hero, proof, how it works, form/CTA)', 'optional: pricing, FAQ section'],
  studio: ['home (statement + work index)', 'work/case study', 'about/background', 'contact'],
  store: ['home (hero + configurator or featured)', 'collection', 'product detail', 'cart drawer + demo checkout', 'care/shipping facts'],
  software: ['home (product in action)', 'how it works', 'pricing', 'docs/changelog entry', 'sign-up (honest demo)'],
  game: ['home (playable hero)', 'the mechanic', 'projects/status', 'playtest sign-up'],
  editorial: ['home (index)', 'article template', 'archive', 'about/subscribe'],
  event: ['home (date, place, action)', 'programme', 'speakers/people', 'tickets or RSVP', 'practical info']
};
const explicit = (text.match(/pages?:\s*([^\n.]+)/i) || [])[1];
const pages = explicit ? explicit.split(/[,;]/).map((x) => x.trim()).filter(Boolean) : (PAGES[type] || PAGES.landing);

// ---- style hint: strong cues only; otherwise the seeded picker decides ----
const styleHint = has(/(cinematic|immersive|webgl|3d|film)/) ? 'cinematic-immersive'
  : has(/(brutal|raw|loud|anti-?corporate)/) ? 'industrial-brutal'
  : has(/(editorial|magazine|literary|serif)/) ? 'editorial-print'
  : has(/(playful|kids|fun|game)/) ? 'playful-kinetic'
  : has(/(calm|wellness|soft|atmospheric|spa)/) ? 'atmospheric-soft' : null;

// ---- direction from the picker (style, fonts, palette, mechanism) ----
const pd = spawnSync(process.execPath, [path.join(here, 'pick-direction.mjs'), '--seed', arg('seed') || text.slice(0, 40), '--brief', text.slice(0, 600), '--type', type, ...(styleHint ? ['--style', styleHint] : [])], { encoding: 'utf8' });
let direction = null; try { direction = JSON.parse(pd.stdout); } catch { /* picker unavailable */ }

// ---- libraries worth mining (see references/libraries.md) ----
const mine = [
  stack !== 'html' ? 'ui.shadcn.com (foundations), 21st.dev, magicui.design, ui.aceternity.com, reactbits.dev' : 'uiverse.io (CSS-only parts), tympanus.net/codrops (technique source)',
  needs3d ? 'threejs.org docs, tympanus.net/codrops WebGL tutorials' : null,
  'fonts: fontshare.com or fonts.google.com (use design-kit.json pairs first)'
].filter(Boolean);

const R = 'references/';
const readOrder = [R + 'prompt-enhancer.md', R + 'brief-intake.md', R + 'site-types.md (section: ' + type + ')', R + 'craft-bar.md',
  R + 'styles.md (' + (direction?.style?.id || 'recipe') + ')', R + 'cinematic-recipes.md', R + 'asset-and-copy.md', R + 'craft-defaults.md',
  R + 'motion-recipes.md', R + 'libraries.md', R + 'verify.md', R + 'visual-comparison-gates.md', R + 'award-bar.md'];

const plan = {
  input: text.slice(0, 200) + (text.length > 200 ? '...' : ''),
  type, starter, starterNote: starter ? `templates/${starter}: take mechanisms and safety only; change type, palette, hero, navigation, signature and copy (anti-clone rule). Copy with scripts/scaffold.mjs.` : 'no starter fits; build from the recipes',
  stack, existingProject: existing, motion, pages, direction, mine, readOrder,
  checks: ['node scripts/slop-lint.mjs <src>', 'node scripts/check-contrast.mjs <page.html>', 'node scripts/finish-gate.mjs <dir|file>', 'serve + drive real events at 1440/1024/768/390 (references/verify.md)'],
  caveat: 'Heuristic plan from keywords. Confirm each choice against the brief, state a reason for any replacement, and never ship a starter unchanged.'
};
console.log(JSON.stringify(plan, null, 2));
