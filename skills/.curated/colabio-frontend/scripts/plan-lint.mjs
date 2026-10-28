#!/usr/bin/env node
// Pre-build slop gate: reads the plan (council/*.md and design-brief.md, or one markdown file) and flags what will make the page read as generated,
// before any code exists. Read-only. Lines that mention a device only to ban or avoid it (banned, avoid, reject, no, never...) are not flagged.
// Usage: node plan-lint.mjs <council-folder|plan.md> [--report]      exits 1 when a FAIL is found unless --report is given
import fs from 'node:fs';
import path from 'node:path';

const arg = process.argv.slice(2).find((a) => !a.startsWith('--')) || 'council';
const report = process.argv.includes('--report');
const target = path.resolve(arg);
if (!fs.existsSync(target)) { console.error('not found: ' + target); process.exit(2); }
const files = [];
if (fs.statSync(target).isDirectory()) {
  for (const f of fs.readdirSync(target)) if (f.endsWith('.md') && !/slop-audit/i.test(f)) files.push(path.join(target, f));
  const brief = path.join(target, '..', 'design-brief.md'); if (fs.existsSync(brief)) files.push(brief);
} else files.push(target);
if (!files.length) { console.error('no markdown files in ' + target); process.exit(2); }

const lines = [];
for (const f of files) fs.readFileSync(f, 'utf8').split('\n').forEach((text, i) => lines.push({ f: path.basename(f), n: i + 1, text }));
const all = lines.map((l) => l.text).join('\n');
const NEG = /\b(banned|ban|bans|avoid|avoids|avoiding|reject|rejected|refuse|never|not|no|none|without|instead of|drop|dropped|removed?|forbidden|don't|do not|tell|tells)\b/i;
const live = lines.filter((l) => !NEG.test(l.text));

let fails = 0, warns = 0;
const say = (lvl, name, msg, at) => { if (lvl === 'FAIL') fails++; if (lvl === 'WARN') warns++; console.log(`${lvl.padEnd(4)} ${name}${msg ? ': ' + msg : ''}${at ? `  [${at.f}:${at.n}]` : ''}`); };
const hit = (re) => live.find((l) => re.test(l.text));

// 1. the idea, the competitor test, the live thing
/On this page,|idea sentence/i.test(all) ? say('PASS', 'idea sentence', 'present') : say('FAIL', 'idea sentence', 'missing. Write "On this page, [a thing of the subject] becomes [the device]" from the subject inventory');
/competitor test/i.test(all) ? say('PASS', 'competitor test', 'present') : say('FAIL', 'competitor test', 'missing. Put the nearest competitor in the idea sentence and say whether it still works');
/live thing/i.test(all) ? say('PASS', 'live thing', 'present') : say('FAIL', 'live thing', 'missing. One thing the visitor can do, built from the subject\'s real content');
/inventory/i.test(all) ? say('PASS', 'subject inventory', 'present') : say('WARN', 'subject inventory', 'missing: list 8-12 things that belong to this subject and to no competitor');

// 2. category ideas and generated phrases
const cat = hit(/clean and modern|clean, modern|sleek|modern and minimal|dark and premium|premium feel|luxur(y|ious) feel|cutting-edge|seamless|world-class|elevated experience|unlock|supercharge/i);
cat ? say('FAIL', 'category idea', `"${cat.text.trim().slice(0, 80)}" is a category default or generated phrase, not an idea from the subject`, cat) : say('PASS', 'category idea');

// 3. tells planned into the page
const TELLS = [
  [/eyebrow|kicker|overline|section label/i, 'eyebrow labels above headings'],
  [/\bmono(space)?\b/i, 'monospace as a voice'],
  [/index numbering|01\s*[\/.]\s*02|numbered (sections?|labels?)|step 0\d/i, 'index numbering'],
  [/hairline|1px (rule|border|line)|thin rules?|ruled grid/i, 'hairline rules'],
  [/tracked (caps|uppercase)|letter-spaced (caps|uppercase)|uppercase labels?/i, 'tracked capitals'],
  [/glass(morphism| panel)?|backdrop-filter|frosted/i, 'glass panels'],
  [/\bglow(s|ing)?\b|neon/i, 'glows'],
  [/gradient (text|headline)/i, 'gradient text'],
  [/pill badge|badge above/i, 'pill badge'],
  [/bento/i, 'bento grid'],
  [/marquee|infinite (scroll|ticker)/i, 'marquee'],
  [/three (equal )?(feature )?cards|3 (equal )?cards|icon cards/i, 'three equal cards'],
  [/logo (strip|wall|row)|trusted by/i, 'invented logo proof'],
  [/testimonials?/i, 'testimonials (real ones only)'],
  [/fade-?up on every|fade and rise on every|reveal every (block|section)/i, 'the same reveal on every block']
];
let tellHits = 0;
for (const [re, name] of TELLS) { const l = hit(re); if (l) { tellHits++; say('FAIL', 'planned tell', `${name}: "${l.text.trim().slice(0, 90)}"`, l); } }
if (!tellHits) say('PASS', 'planned tells', 'none planned');

// 4. stock structure
const stock = ['hero', 'logos?', 'features?', 'testimonials?', 'pricing', '(cta|call to action)'].filter((w) => live.some((l) => new RegExp('\\b' + w + '\\b', 'i').test(l.text))).length;
stock >= 5 ? say('FAIL', 'stock structure', 'the plan follows hero, logos, features, testimonials, pricing, call to action. Order sections by the argument') : say('PASS', 'stock structure');

// 5. pictures: the plan must say where real pictures or a rendered scene come from
const pics = /(at least (four|4)|[4-9]|1\d) (real )?(pictures|photographs|photos|images)|rendered scene|photograph|archival|footage|commissioned|generated image/i.test(all);
pics ? say('PASS', 'picture plan', 'present') : say('FAIL', 'picture plan', 'no real pictures or rendered scene planned. SVG and CSS drawings do not count: plan at least four real pictures, or a rendered scene with depth and light');
const flat = hit(/flat (vector|illustration)|vector (scenery|illustration|art)|svg illustration|css shapes|icons? set/i);
flat ? say('FAIL', 'flat vector decoration', `"${flat.text.trim().slice(0, 80)}": stock vector decoration is the strongest generated tell`, flat) : say('PASS', 'flat vector decoration');

// 6. motion stack for showpiece briefs
const showpiece = /awwwards|cinematic|showpiece|agency|studio|premium|high-end|10,?000|ten-thousand/i.test(all);
if (showpiece) {
  /lenis/i.test(all) && /gsap/i.test(all) ? say('PASS', 'motion stack', 'Lenis and GSAP planned') : say('FAIL', 'motion stack', 'showpiece brief without Lenis + GSAP (ScrollTrigger, SplitText). See references/agency-bar.md section 3');
  /fallback|reduced.motion/i.test(all) ? say('PASS', 'motion fallbacks', 'present') : say('WARN', 'motion fallbacks', 'plan the CDN-failure and reduced-motion fallbacks');
}

// 7. copy
const h1 = lines.find((l) => /^\s*[-*]?\s*(H1|Headline)\s*[:\-]/i.test(l.text));
if (h1) { const q = (h1.text.match(/["“]([^"”]+)["”]/) || [])[1]; q && q.length > 40 ? say('WARN', 'headline length', `${q.length} characters: aim for about 32, two lines or fewer`, h1) : say('PASS', 'headline', q ? `${q.length} characters` : 'present'); }
else say('WARN', 'headline', 'no "H1:" line: write the copy deck before markup');

// 8. type and palette
const OVER = /\b(Inter|Roboto|Poppins|DM Sans|Space Grotesk|Instrument (Serif|Sans)|Playfair|Fraunces|Geist|Plus Jakarta|Montserrat|Open Sans)\b/;
const font = live.find((l) => OVER.test(l.text) && /type|font|typeface|display|body/i.test(l.text));
font ? say('WARN', 'overused typeface', `${font.text.match(OVER)[0]}: justify it from the subject's printed world or choose another`, font) : say('PASS', 'typeface');
const navy = hit(/navy/i) && hit(/yellow|gold|amber/i), neon = hit(/neon|lime|violet|purple gradient|indigo gradient/i);
navy || neon ? say('FAIL', 'category palette', 'navy with yellow or gold, or neon/violet: derive the palette from the subject\'s materials (palette-lab --swatches)') : say('PASS', 'palette');
const cream = hit(/cream|beige|off-white ground/i); cream ? say('WARN', 'cream ground', 'the reflexive "tasteful" off-white; justify it with a real material', cream) : null;

// 9. process
/look-and-fix|rounds?|build-critic/i.test(all) ? say('PASS', 'look-and-fix', 'planned') : say('WARN', 'look-and-fix', 'plan at least three screenshot rounds');

console.log(`\nplan-lint: ${fails} fail, ${warns} warn. ${fails ? 'BLOCK: fix the plan before building, then run the slop-auditor.' : 'No script-detectable slop. The slop-auditor still has to read the plan and judge what a script cannot.'}`);
if (fails && !report) process.exit(1);
