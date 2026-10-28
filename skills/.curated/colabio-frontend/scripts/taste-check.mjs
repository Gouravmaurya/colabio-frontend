#!/usr/bin/env node
// Taste gate: static checks for the tells in library/taste/references/tells.md and the studio bar in references/agency-bar.md.
// Read-only heuristics on the page source (inline CSS and HTML). It cannot judge composition; it catches what makes a page read as generated.
// Usage: node taste-check.mjs <file.html|folder> [--showpiece] [--strict]
//   --showpiece  also require the motion stack (GSAP, ScrollTrigger, Lenis) and a reduced-motion path
//   --strict     exit 1 on any FAIL
import fs from 'node:fs';
import path from 'node:path';

const target = path.resolve(process.argv.slice(2).find((a) => !a.startsWith('--')) || '.');
const showpiece = process.argv.includes('--showpiece'), strict = process.argv.includes('--strict');
const pages = [];
(function walk(p) {
  if (fs.statSync(p).isFile()) { if (p.endsWith('.html')) pages.push(p); return; }
  for (const e of fs.readdirSync(p, { withFileTypes: true })) if (!['node_modules', '.git', 'dist', 'review', 'vendor'].includes(e.name)) walk(path.join(p, e.name));
})(target);
if (!pages.length) { console.error('no .html pages found'); process.exit(2); }


// A site is often several files: follow local (relative) stylesheet and script links so their CSS and JS are part of what is checked.
const readLocal = (file, html) => {
  let extra = '';
  for (const m of html.matchAll(/<link[^>]+href=["']([^"':?#]+\.css)["']/gi)) { try { extra += '\n' + fs.readFileSync(path.join(path.dirname(file), m[1]), 'utf8'); } catch { /* missing file: ignore */ } }
  for (const m of html.matchAll(/<script[^>]+src=["']([^"':?#]+\.js)["']/gi)) { try { extra += '\n' + fs.readFileSync(path.join(path.dirname(file), m[1]), 'utf8'); } catch { /* missing file: ignore */ } }
  return extra;
};
let fails = 0, warns = 0;
const out = (lvl, name, msg) => { if (lvl === 'FAIL') fails++; if (lvl === 'WARN') warns++; console.log(`${lvl.padEnd(4)} ${name}${msg ? ': ' + msg : ''}`); };
const count = (s, re) => (s.match(re) || []).length;

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8'), local = readLocal(file, html), h = html + local, rel = path.relative(process.cwd(), file) || file;
  const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n') + '\n' + local;
  const body = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  console.log(`\n${rel}`);

  // monospace used as a voice: rules that set a mono face on anything other than code, pre, kbd or samp
  const rules = [...css.matchAll(/([^{}@]+)\{([^{}]*)\}/g)].map((m) => ({ sel: m[1].trim(), body: m[2] }));
  const mono = rules.filter((r) => /font(-family)?\s*:[^;]*(mono|monospace)/i.test(r.body) && !/^(code|pre|kbd|samp)\b/i.test(r.sel)).length;
  mono > 5 ? out('FAIL', 'monospace voice', `${mono} rules set a monospace face. Mono as a "technical" voice is banned: use the text face with tabular figures`) : mono > 2 ? out('WARN', 'monospace voice', `${mono} rules use monospace; keep it to code`) : out('PASS', 'monospace voice');

  // index numbering and step labels
  const numbered = count(body, />\s*0?\d{1,2}\s*<\/(b|span|i|em|small)>/gi) + count(body, /\b(Step|Chapter|No\.|Nº|№)\s*0?\d/gi);
  numbered >= 2 ? out('FAIL', 'index numbering', `${numbered} numbered labels (01, Step 02...). Order by position, scale or words; use <ol> for a true list`) : out('PASS', 'index numbering');

  // eyebrows
  const eyebrows = count(body, /<(p|span|div)[^>]*class="[^"]*\b(kick|kicker|eyebrow|overline|section-label|tagline-small)\b/gi);
  eyebrows >= 2 ? out('FAIL', 'eyebrows', `${eyebrows} eyebrow/kicker labels above headings. Fold the words into the heading or delete`) : out('PASS', 'eyebrows');

  // tiny tracked capitals
  const caps = count(css, /text-transform:\s*uppercase[^}]*letter-spacing:\s*\.?\d*\.\d+em|letter-spacing:\s*\.?\d*\.\d+em[^}]*text-transform:\s*uppercase/gi);
  caps >= 4 ? out('FAIL', 'tracked capitals', `${caps} rules set letter-spaced uppercase. Sentence case at readable size, placed with the content`) : caps >= 2 ? out('WARN', 'tracked capitals', `${caps} rules`) : out('PASS', 'tracked capitals');

  // hairlines
  const hair = count(css, /(border(-top|-bottom|-left|-right)?|outline)\s*:\s*1(\.5)?px\s+(solid|dashed|dotted)/gi) + count(css, /(height|width)\s*:\s*1px/gi);
  hair >= 12 ? out('FAIL', 'hairline rules', `${hair} 1px borders or rules. Structure from space, tone steps and filled shapes`) : hair >= 6 ? out('WARN', 'hairline rules', `${hair} 1px borders or rules`) : out('PASS', 'hairline rules');

  // glass, gradient text, glows, marquee
  const glass = count(css, /backdrop-filter\s*:/gi);
  glass >= 3 ? out('FAIL', 'glass panels', `${glass} backdrop-filter uses`) : glass >= 1 ? out('WARN', 'glass panels', `${glass} backdrop-filter use(s): opaque surfaces one tone step from the ground`) : out('PASS', 'glass panels');
  /background-clip\s*:\s*text/i.test(css) ? out('FAIL', 'gradient text', 'gradient-filled headline text is banned: solid ink') : out('PASS', 'gradient text');
  const glow = count(css, /box-shadow\s*:[^;}]*\b0\s+0\s+\d+px/gi); glow >= 2 ? out('WARN', 'glows', `${glow} zero-offset glows`) : out('PASS', 'glows');
  /@keyframes[^{]+\{[^}]*translateX\(-50%\)/i.test(css) && /infinite/i.test(css) ? out('FAIL', 'marquee', 'an infinite scrolling band is a template tell') : out('PASS', 'marquee');

  // pictures: SVG and CSS drawings do not count; a rendered canvas scene counts once, to a maximum of two, and is reported
  const imgs = count(body, /<img\b[^>]*\bsrc=["'](?!data:)[^"']+/gi) + count(body, /<video\b/gi) + count(body, /<picture\b/gi);
  const scenes = Math.min(2, count(body, /<canvas\b[^>]*data-scene/gi));
  const pics = imgs + scenes;
  pics >= 4 ? out('PASS', 'real pictures', `${imgs} image/video${scenes ? ' + ' + scenes + ' rendered scene(s)' : ''}`) : out('FAIL', 'real pictures', `${pics} found, at least 4 required. SVG and CSS drawings do not count: find, generate or render real pictures (references/agency-bar.md section 2)`);
  imgs === 0 && scenes ? out('WARN', 'real pictures', 'no photographs or footage: say so in the delivery notes') : null;

  // alt text on pictures is in finish-gate; here: three equal cards and fade-on-everything signals are in variety-check
  if (showpiece) {
    const lib = (n, re) => re.test(h);
    const g = lib('gsap', /gsap/i), st = lib('st', /ScrollTrigger/i), ln = lib('lenis', /lenis/i), rm = /prefers-reduced-motion/i.test(h);
    g && st && ln ? out('PASS', 'motion stack', 'GSAP, ScrollTrigger and Lenis present') : out('FAIL', 'motion stack', `showpiece brief needs GSAP + ScrollTrigger + Lenis (found: ${[g && 'gsap', st && 'ScrollTrigger', ln && 'lenis'].filter(Boolean).join(', ') || 'none'}). See references/agency-bar.md section 3`);
    rm ? out('PASS', 'reduced motion') : out('FAIL', 'reduced motion', 'no prefers-reduced-motion path');
    /gsap\.ticker\.add[\s\S]{0,120}lenis\.raf|lenis\.raf[\s\S]{0,120}gsap\.ticker/i.test(h) || !ln ? out('PASS', 'one clock') : out('WARN', 'one clock', 'drive lenis.raf from gsap.ticker so scroll and ScrollTrigger share one clock');
  }
}
console.log(`\ntaste-check: ${fails} fail, ${warns} warn. Static: still look at the screenshots and run the loop in references/agency-bar.md.`);
if (strict && fails) process.exit(1);
