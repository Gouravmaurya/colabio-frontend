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
  existing = { next: !!dep.next, react: !!dep.react, gsap: !!dep.gsap, lenis: !!dep.lenis, motion: !!(dep.motion || dep['framer-motion']), animejs: !!dep.animejs, three: !!dep.three, tailwind: !!dep.tailwindcss };
  stack = stack || (dep.next ? 'next' : dep.react ? 'react' : 'html');
}
stack = stack || (has(/\bnext(\.js)?\b/) ? 'next' : has(/\breact\b/) ? 'react' : 'html');

// ---- motion level and 3D need ----
const staticMotion = has(/\b(static|no animations?|no motion|without animations?|without motion)\b/);
const quietMotion = has(/\b(calm|minimal|quiet|simple|subtle)\b/);
const operational = has(/\b(dashboard|admin|operations|inventory management)\b/) && !has(/\b(landing|hero|marketing|public website)\b/);
const level = staticMotion ? 'static' : quietMotion ? 'light'
  : has(/\b(showpiece|cinematic|immersive|award|awwwards|webgl|scroll[- ]?(story|driven)|flagship)\b/) || type === 'landing' || has(/\blanding page\b/) ? 'showpiece' : 'moderate';
const scrollMotion = !staticMotion && !operational && (level === 'showpiece' || (!quietMotion && has(/\bscroll[- ]?(animation|story|driven|linked)\b/)));
const needs3d = !staticMotion && !has(/\b(no|without) (3d|webgl)\b/) && has(/\b(3d (model|viewer|scene|object|product|jar|piece)s?|webgl|three\.?js|shader|turntable|spin it|rotate the|drag to turn)\b/);
const animeMotion = !staticMotion && !has(/\b(no|without|avoid) anime[ .-]?js\b/) && (has(/\banime[ .-]?js\b/) || (existing?.animejs && has(/\b(svg|morph|stagger|timeline|illustration)\b/)));
const motion = {
  level,
  libraries: [...(staticMotion ? [] : ['gsap + ScrollTrigger', 'lenis']), ...(animeMotion ? ['animejs'] : []), ...(!staticMotion && stack !== 'html' && (existing?.motion || has(/\b(gesture|drawer|modal|tabs?)\b|presence/)) ? [existing?.motion ? 'existing Motion package' : 'motion (framer-motion)'] : []), ...(needs3d ? ['three'] : [])],
  owners: staticMotion ? 'Static composition; immediate usable interaction states'
    : scrollMotion ? 'Lenis = scroll on GSAP ticker; GSAP = scroll choreography; CSS/existing Motion = component feedback'
    : 'Lenis = root scroll on GSAP ticker with native touch; GSAP = restrained entrance/component choreography; CSS/existing Motion = distinct state properties; no cinematic pins',
  mustHave: ['complete readable static/reduced-motion states', 'keyboard and touch access throughout', ...(!staticMotion ? ['motion coverage for every major component, with justified reading holds', 'running GSAP/ScrollTrigger and Lenis with CSS, one ticker and one scroll owner', 'observed playback on roomy desktop, short laptop and native-touch screens'] : []), ...(animeMotion ? ['Anime.js owns separate component/SVG properties; scoped cleanup and installed-version API; no competing GSAP transforms'] : []), scrollMotion ? 'authored scroll start/middle/hold/exit states with phone-native scroll equivalents' : null, needs3d ? 'no-WebGL fallback with poster' : null].filter(Boolean)
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

// ---- theme candidates grounded in the domain (decide AFTER the understanding sheet and scene plan) ----
const pl = spawnSync(process.execPath, [path.join(here, 'palette-lab.mjs'), '--domain', text.slice(0, 400)], { encoding: 'utf8' });
let themeCandidates = null; try { const j = JSON.parse(pl.stdout); themeCandidates = { domain: j.domain, recommend: j.recommend, candidates: j.candidates.map((c) => ({ id: c.id, scene: c.scene, score: c.score, tokens: c.tokens, flags: c.categoryDefaultFlags, evidence: c.domainEvidence })) }; } catch { themeCandidates = { note: 'No domain matched. Run palette-lab.mjs with --swatches taken from the product\'s real materials, photos or brand.' }; }

// ---- libraries worth mining (see references/libraries.md) ----
const mine = [
  stack !== 'html' ? 'ui.shadcn.com (foundations), 21st.dev, magicui.design, ui.aceternity.com, reactbits.dev' : 'uiverse.io (CSS-only parts), tympanus.net/codrops (technique source)',
  needs3d ? 'threejs.org docs, tympanus.net/codrops WebGL tutorials' : null,
  'fonts: fontshare.com or fonts.google.com (use design-kit.json pairs first)',
  'Pinterest for inspiration; inspect original designer/live sites and verify asset rights (references/pinterest-research.md)'
].filter(Boolean);

const R = 'references/';
const M = 'library/modules/';
const coreGuides = ['library/impeccable/reference/craft-floor.md', 'library/taste/references/tells.md', M + 'motionsites-web-builder/GUIDE.md', M + 'gsap-core/GUIDE.md'];
const workstreams = [
  { id: 'layout', guides: [R + 'pinterest-research.md', R + 'distinctive-design.md', 'library/taste/references/layout.md'], deliverable: 'Inspected inspiration with provenance, product-specific hero alternatives and section composition; no default text/image split' },
  { id: 'typography', guides: ['library/taste/references/type.md', R + 'craft-defaults.md'], deliverable: 'Subject-grounded font roles, responsive scale, readable metrics and loaded fallbacks' },
  { id: 'color', guides: ['library/taste/references/colour.md', R + 'product-understanding.md'], deliverable: 'Preserved brand or material-grounded semantic palette with actual contrast pairings' },
  { id: 'components', guides: ['library/components/INDEX.md', 'library/hallmark/references/component-cookbook.md'], deliverable: 'Distinctive component anatomy, truthful content, keyboard/touch states and source transformations' },
  { id: 'motion', guides: staticMotion ? [R + 'cinematic-motion.md'] : [R + 'cinematic-motion.md', R + 'motion-recipes.md', M + 'gsap-scrolltrigger/GUIDE.md', ...(animeMotion ? [R + 'animejs.md'] : []), ...(stack !== 'html' ? [M + 'framer-motion/GUIDE.md'] : [])], deliverable: staticMotion ? 'Static composition and immediate controls; no animation libraries' : 'Component, section and scroll choreography matched to the brief; reduced-motion and phone equivalents' },
  ...(!operational && (level === 'showpiece' || needs3d || has(/\b(video|cinematic|media|prompt)\b/)) ? [{ id: 'cinematic-media', guides: [M + 'motionsites-web-builder/GUIDE.md', R + 'cinematic-recipes.md'], deliverable: 'Focal asset/crop/layers, continuity and precise prompt; open only the matching technique recipe' }] : []),
  { id: 'verification', guides: [R + 'verify.md', R + 'visual-comparison-gates.md'], deliverable: 'Observed responsive, interaction and playback evidence for the representative slice and full journey' }
];
const readOrder = [...new Set([R + 'product-understanding.md', R + 'prompt-enhancer.md', R + 'brief-intake.md', R + 'capability-routing.md',
  ...coreGuides, ...workstreams.flatMap((stream) => stream.guides)])];

const plan = {
  input: text.slice(0, 200) + (text.length > 200 ? '...' : ''),
  type, starter, starterNote: starter ? `templates/${starter}: take mechanisms and safety only; change type, palette, hero, navigation, signature and copy (anti-clone rule). Copy with scripts/scaffold.mjs.` : 'no starter fits; build from the recipes',
  stack, existingProject: existing, motion, pages, direction, themeCandidates, coreGuides, workstreams,
  reviewCheckpoint: { required: true, show: ['selected skill names and reasons', 'written page/section/component design preview', 'fonts, palette, assets, motion and phone behavior', 'assumptions and complete prompt location'], continueWhen: 'User approves the current preview or explicitly waives this checkpoint; otherwise revise and wait before implementation.' },
  order: 'Understand the product and plan scenes/pages first (references/product-understanding.md). Then decide the theme from themeCandidates and the use context. direction.palette and direction.font are only starting points.',
  mine, readOrder,
  checks: ['node scripts/slop-lint.mjs <src>', 'node scripts/palette-lab.mjs --check <page.html>', 'node scripts/check-contrast.mjs <page.html>', 'node scripts/finish-gate.mjs <dir|file>', 'serve + drive real events at 1440/1024/768/390 (references/verify.md)'],
  caveat: 'Heuristic plan from keywords. Confirm each choice against the brief, state a reason for any replacement, and never ship a starter unchanged.'
};
console.log(JSON.stringify(plan, null, 2));
