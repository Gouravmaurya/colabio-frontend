#!/usr/bin/env node
// Polish gate: static checks a finished page must pass before delivery. Read-only.
// It cannot judge visual quality; it catches what unfinished sites forget.
// Usage: node finish-gate.mjs <file.html|folder> [--strict]   (--strict exits 1 on any FAIL)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const target = path.resolve(process.argv[2] || '.');
const strict = process.argv.includes('--strict');
const here = path.dirname(fileURLToPath(import.meta.url));
const pages = [];
(function walk(p) {
  const st = fs.statSync(p);
  if (st.isFile()) { if (p.endsWith('.html')) pages.push(p); return; }
  for (const e of fs.readdirSync(p, { withFileTypes: true })) if (!['node_modules', '.git', '.next', 'dist'].includes(e.name)) walk(path.join(p, e.name));
})(target);
if (!pages.length) { console.error('no .html pages found'); process.exit(2); }

let fails = 0, warns = 0;
const out = (lvl, name, msg) => { if (lvl === 'FAIL') fails++; if (lvl === 'WARN') warns++; console.log(`${lvl.padEnd(4)} ${name}${msg ? ': ' + msg : ''}`); };

for (const file of pages) {
  const h = fs.readFileSync(file, 'utf8'), low = h.toLowerCase(), rel = path.relative(process.cwd(), file) || file;
  console.log(`\n${rel}`);
  const title = (h.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1]?.trim();
  title && title.length >= 8 && title.length <= 70 ? out('PASS', 'title') : out('FAIL', 'title', 'missing or not 8-70 characters');
  /<meta[^>]+name=["']description["'][^>]+content=["'][^"']{50,}/i.test(h) ? out('PASS', 'meta description') : out('FAIL', 'meta description', 'missing or under 50 characters');
  /<html[^>]+lang=/i.test(h) ? out('PASS', 'html lang') : out('FAIL', 'html lang');
  /<meta[^>]+name=["']viewport["']/i.test(h) ? out('PASS', 'viewport') : out('FAIL', 'viewport');
  (h.match(/<h1[\s>]/gi) || []).length === 1 ? out('PASS', 'single h1') : out('FAIL', 'single h1', `found ${(h.match(/<h1[\s>]/gi) || []).length}`);
  /<main[\s>]/i.test(h) ? out('PASS', 'main landmark') : out('WARN', 'main landmark', 'add <main>');
  /href=["']#(main|content)["']/i.test(h) ? out('PASS', 'skip link') : out('WARN', 'skip link', 'add a skip link');
  const imgs = h.match(/<img\b[^>]*>/gi) || [], noAlt = imgs.filter((i) => !/\balt=/i.test(i)).length;
  noAlt ? out('FAIL', 'image alt', `${noAlt} <img> without alt`) : out('PASS', 'image alt', `${imgs.length} img`);
  const dead = (h.match(/href=["']#["']/g) || []).length;
  dead ? out('WARN', 'placeholder links', `${dead} href="#" (replace, or label as sample)`) : out('PASS', 'placeholder links');
  /lorem ipsum|coming soon|your (text|company) here|todo|tbd/i.test(h) ? out('FAIL', 'placeholder text', 'lorem/todo/coming soon found') : out('PASS', 'placeholder text');
  const motionLib = /gsap|lenis|framer-motion|motion\/react|three/i.test(h);
  !motionLib || /prefers-reduced-motion/i.test(h) ? out('PASS', 'reduced motion') : out('FAIL', 'reduced motion', 'animation libraries without a prefers-reduced-motion path');
  /fonts\.googleapis\.com[^"']*display=swap|font-display\s*:\s*(swap|optional)|fontshare[^"']*display=swap/i.test(h) || !/<link[^>]+(fonts\.googleapis|fontshare)/i.test(h) ? out('PASS', 'font loading') : out('WARN', 'font loading', 'add display=swap');
  /<meta[^>]+property=["']og:title["']/i.test(h) && /<meta[^>]+property=["']og:image["']/i.test(h) ? out('PASS', 'social card (og:title, og:image)') : out('WARN', 'social card', 'add og:title, og:description, og:image');
  /rel=["'](icon|shortcut icon)["']/i.test(h) ? out('PASS', 'favicon') : out('WARN', 'favicon', 'add a favicon (inline SVG data URI is enough)');
  /<meta[^>]+name=["']theme-color["']/i.test(h) ? out('PASS', 'theme-color') : out('WARN', 'theme-color');
  /:focus-visible/i.test(h) ? out('PASS', 'focus styles') : out('FAIL', 'focus styles', 'no :focus-visible rule');
  /100vh/.test(h) && !/100svh|100dvh|100lvh/.test(h) ? out('WARN', 'viewport units', '100vh without svh/dvh') : out('PASS', 'viewport units');
  /max-width[\s\S]{0,700}?nav[^{}]*\{\s*display\s*:\s*none/i.test(h) && !/aria-expanded|aria-controls="?(menu|nav)|menu-?toggle|hamburger|bottom-?nav/i.test(h) ? out('WARN', 'mobile navigation', 'links are hidden on small screens with no menu or bottom bar') : out('PASS', 'mobile navigation');
  const btnEmpty = (h.match(/<button\b[^>]*>\s*<\/button>/gi) || []).length;
  btnEmpty ? out('FAIL', 'button names', `${btnEmpty} empty <button>`) : out('PASS', 'button names');
  /<form\b/i.test(h) && !/(aria-live|role=["'](status|alert)["'])/i.test(h) ? out('WARN', 'form feedback', 'forms need an aria-live status or role=alert') : out('PASS', 'form feedback');
}

for (const [label, script] of [['template tells', 'slop-lint.mjs'], ['contrast tokens', 'check-contrast.mjs']]) {
  const r = spawnSync(process.execPath, [path.join(here, script), target], { encoding: 'utf8' });
  const lines = (r.stdout || '').trim().split('\n');
  const bad = lines.filter((l) => /^\[high\]|^FAIL|^fail/i.test(l));
  console.log(`\n${label} (${script}): ${bad.length ? bad.length + ' high/fail' : 'ok'}`);
  bad.forEach((l) => console.log('  ' + l)); if (bad.length) fails += bad.length;
}

// Optional second opinion: Impeccable's deterministic detector (Apache-2.0, github.com/pbakaus/impeccable), if installed.
const home = process.env.USERPROFILE || process.env.HOME || '';
const imp = [path.join(process.cwd(), '.claude/skills/impeccable/scripts'), path.join(process.cwd(), '.agents/skills/impeccable/scripts'), path.join(home, '.claude/skills/impeccable/scripts'), path.join(home, '.agents/skills/impeccable/scripts'), path.join(home, '.claude/skills-disabled/impeccable/scripts'), path.join(home, '.agents/skills-disabled/impeccable/scripts')]
  .map((d) => path.join(d, process.platform === 'win32' ? 'impeccable.cmd' : 'impeccable')).find((f) => fs.existsSync(f));
if (imp) {
  // JSON to a temp file: the Windows launcher writes text straight to the console, which cannot be captured
  const tmp = path.join(os.tmpdir(), `imp-${process.pid}.json`);
  spawnSync(`"${imp}" detect "${target}" --json --no-advisory > "${tmp}"`, { encoding: 'utf8', shell: true, timeout: 120000 });
  const rules = {};
  try { JSON.parse(fs.readFileSync(tmp, 'utf8')).forEach((f) => { rules[f.antipattern] = (rules[f.antipattern] || 0) + 1; }); } catch { /* detector produced no JSON */ }
  try { fs.unlinkSync(tmp); } catch { /* ignore */ }
  const keys = Object.keys(rules);
  console.log(`\nImpeccable detector: ${keys.length ? keys.length + ' rule(s) fired' : 'clean'}`);
  keys.sort((a, b) => rules[b] - rules[a]).forEach((k) => { warns++; console.log(`  WARN ${k} x${rules[k]}`); });
  if (keys.length) console.log('  Fix or justify each; run the detector directly for locations: impeccable detect <path>');
} else console.log('\nImpeccable detector: not installed (optional). See references/impeccable-bridge.md');

for (const file of pages) {
  const r = spawnSync(process.execPath, [path.join(here, 'palette-lab.mjs'), '--check', file], { encoding: 'utf8' });
  const w = (r.stdout || '').split('\n').filter((l) => /^WARN/.test(l));
  if (w.length) { console.log(`\npalette (${path.relative(process.cwd(), file) || file}): ${w.length} category-default warning(s). Justify in the brief or change the palette (palette-lab.mjs)`); w.forEach((l) => { warns++; console.log('  ' + l); }); }
}

console.log(`\nfinish-gate: ${fails} fail, ${warns} warn. Static checks only: still render, drive real events, and critique at 1440/1024/768/390.`);
if (strict && fails) process.exit(1);
