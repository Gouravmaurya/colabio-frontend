#!/usr/bin/env node
// Variety check: guesses each section's form, flags repeats and the banned template skeleton. Read-only heuristic.
// Usage: node variety-check.mjs <file.html|folder>      (always exits 0 unless the path has no pages)
import fs from 'node:fs';
import path from 'node:path';

const target = path.resolve(process.argv[2] || '.');
const pages = [];
(function walk(p) {
  if (fs.statSync(p).isFile()) { if (p.endsWith('.html')) pages.push(p); return; }
  for (const e of fs.readdirSync(p, { withFileTypes: true })) if (!['node_modules', '.git', '.next', 'dist', 'review'].includes(e.name)) walk(path.join(p, e.name));
})(target);
if (!pages.length) { console.error('no .html pages found'); process.exit(2); }

// top-level <section>/<header>/<footer> blocks inside <body>, by tag depth
function blocks(h) {
  const body = (h.match(/<body[^>]*>([\s\S]*)<\/body>/i) || [, h])[1].replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const out = [], re = /<(\/?)(section|header|footer)\b[^>]*>/gi; let m, depth = 0, start = -1;
  while ((m = re.exec(body))) {
    if (!m[1]) { if (depth === 0) start = m.index; depth++; }
    else if (depth > 0 && --depth === 0 && start > -1) { out.push(body.slice(start, re.lastIndex)); start = -1; }
  }
  return out;
}

const text = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const count = (s, re) => (s.match(re) || []).length;

function form(b, i) {
  const open = (b.match(/^<[^>]+>/) || [''])[0].toLowerCase(), t = text(b), low = b.toLowerCase();
  // sections rendered by script cannot be read here: declare their form with data-form="stage|instrument|track|..." and it is used as is
  const declared = (open.match(/data-form="([a-z-]+)"/) || [])[1];
  if (declared) return declared;
  if (/<h1[\s>]/i.test(b) && i < 2) return 'hero';
  if (/<footer/i.test(open)) return 'footer';
  if (/testimonial|review|<blockquote/.test(low) || /class="[^"]*quote/.test(low)) return 'testimonial';
  if (/<details/.test(low) || /id="[^"]*faq|class="[^"]*faq/.test(low)) return 'faq';
  if (/<form\b/.test(low)) return 'instrument';
  if (/<table/.test(low)) return 'ledger';
  if (/logo|trusted|partners|clients/.test(open + (low.match(/class="[^"]*"/g) || []).join(' ')) && count(low, /<img|<svg/g) >= 4) return 'logos';
  if (/<video|<canvas|position:\s*sticky/.test(low)) return 'stage';
  // cards: a class repeated 3 or 4 times that holds a heading or paragraph
  const cls = {}; for (const m of b.matchAll(/<(?:div|article|li)\b[^>]*class="([^"]+)"/gi)) cls[m[1]] = (cls[m[1]] || 0) + 1;
  const rep = Object.entries(cls).find(([, n]) => n === 3 || n === 4);
  if (rep && /<h[2-4]/i.test(b)) return 'cards';
  if (count(low, /<li\b/g) >= 5 || /<ol\b/.test(low)) return 'index';
  if (/cta|get started|start free|book a|sign up/.test(low) && t.length < 400) return 'cta';
  if (t.length < 160 && /<h[12]/i.test(b)) return 'statement';
  if (t.length < 40) return 'quiet';
  return 'other';
}

const DEMO = /feature (one|1|two|2|three|3)\b|lorem|your (headline|company|brand) here|john doe|jane doe|\bacme\b|unlock the power|supercharge|seamless(ly)?\b|elevate your|all-in-one|next-gen|game-?changer|take (it|your \w+) to the next level/gi;

let flagged = 0;
for (const file of pages) {
  const h = fs.readFileSync(file, 'utf8'), bs = blocks(h);
  console.log(`\n${path.relative(process.cwd(), file) || file}`);
  if (!bs.length) { console.log('  No <section>/<header>/<footer> blocks found. Wrap each scene in <section> so forms can be compared.'); continue; }
  const forms = bs.map(form);
  console.log('  forms: ' + forms.join(' > '));
  const tally = {}; forms.forEach((f) => { tally[f] = (tally[f] || 0) + 1; });
  for (const [f, n] of Object.entries(tally)) if (n > 2 && !['other', 'footer'].includes(f)) { flagged++; console.log(`  WARN "${f}" used ${n} times: no form more than twice`); }
  for (let i = 1; i < forms.length; i++) if (forms[i] === forms[i - 1] && !['other', 'footer'].includes(forms[i])) { flagged++; console.log(`  WARN sections ${i} and ${i + 1} both "${forms[i]}": adjacent repeat`); }
  const skeleton = ['hero', 'logos', 'cards', 'testimonial', 'cta'].filter((f) => forms.includes(f));
  if (skeleton.length >= 4) { flagged++; console.log(`  WARN banned skeleton (${skeleton.join(', ')}): justify it in the brief or restructure (references/distinctive-design.md)`); }
  // "Made by an AI" tells: every section opening with the same eyebrow + big heading, numbered 01 02 03, and letter-spaced micro-caps everywhere
  const eyebrow = bs.filter((b) => /<(p|span|div)[^>]*class="[^"]*\b(kick|kicker|eyebrow|overline|section-label)\b/i.test(b.slice(0, 600)) || /^\s*<[^>]+>\s*(<[^>]+>\s*)?0?\d\b[\s.\-:/]/i.test(text(b.slice(0, 500)))).length;
  if (eyebrow >= 4) { flagged++; console.log(`  WARN ${eyebrow} sections open with the same eyebrow + heading formula: vary the openings (a sentence that is the control, a caption inside the figure, no label at all)`); }
  const numbered = (h.match(/<b>\s*0\d\s*<\/b>/g) || []).length; if (numbered >= 3) { flagged++; console.log(`  WARN ${numbered} numbered section labels (01, 02, 03): a numbered eyebrow is a template signature`); }
  const caps = (h.match(/text-transform:\s*uppercase[^}]*letter-spacing:\s*\.\d+em|letter-spacing:\s*\.\d+em[^}]*text-transform:\s*uppercase/gi) || []).length;
  if (caps > 8) { flagged++; console.log(`  WARN letter-spaced uppercase micro-text in ${caps} rules: keep it for one or two roles (data labels), set the rest in sentence case`); }
  const distinct = new Set(forms.filter((f) => f !== 'footer')).size;
  if (distinct < 4) { flagged++; console.log(`  WARN only ${distinct} distinct section forms: add Instrument, Specimen, Stage, Index or Quiet`); }
  if (!forms.some((f) => ['quiet', 'statement'].includes(f))) console.log('  NOTE no quiet or statement section: pacing may be uniform');
  const demo = [...new Set((text(h).match(DEMO) || []).map((s) => s.toLowerCase()))];
  if (demo.length) { flagged++; console.log(`  WARN demo or stock phrases: ${demo.join(', ')}`); }
}
console.log(`\nvariety-check: ${flagged} flag(s). Heuristic only: use it to prompt a decision, then run the specificity tests in references/distinctive-design.md.`);
