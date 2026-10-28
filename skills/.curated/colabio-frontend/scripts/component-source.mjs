#!/usr/bin/env node
// Read-only component source viewer. Prints a bundled component or a public registry item so you can read it,
// choose, and TRANSFORM it before anything enters the project. It installs nothing and edits nothing.
//   node component-source.mjs local:list
//   node component-source.mjs local:<name>                  bundled original component (html + css + js blocks)
//   node component-source.mjs shadcn:button                 registry item summary (add --files to print sources, --out <dir> to save them for review)
//   node component-source.mjs magicui:marquee | aceternity:spotlight | reactbits:SplitText-TS-CSS | skiper:skiper40 | vengeance:animated-rays | kokonut:particle-button
//   node component-source.mjs --list kokonut [--category backgrounds|cards|navigation|inputs|ai|media|texts|buttons] [--all]   (free items; --all adds paid Pro ones, which are not served)
//   node component-source.mjs 21st:<username>/<slug> [--files]   (needs the user's API_KEY_21ST; see the message printed without it)
//   node component-source.mjs --search21 "hero section" [--scope public|mine|team] [--limit 10]
//   node component-source.mjs --list shadcn                 names in the shadcn registry index
//   node component-source.mjs --url https://example.com/r/item.json
// Licences differ per registry and per item: read the item's licence note and the site's terms before shipping anything.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const has = (k) => argv.includes('--' + k);
const val = (k) => { const i = argv.indexOf('--' + k); return i > -1 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : undefined; };
const target = argv.find((a) => !a.startsWith('--') && a.includes(':'));
const REG = {
  shadcn: (n) => `https://ui.shadcn.com/r/styles/new-york-v4/${n}.json`,
  magicui: (n) => `https://magicui.design/r/${n}.json`,
  aceternity: (n) => `https://ui.aceternity.com/registry/${n}.json`,
  reactbits: (n) => `https://reactbits.dev/r/${n}.json`,
  skiper: (n) => `https://www.skiper-ui.com/registry/${n}.json`,
  vengeance: (n) => `https://www.vengenceui.com/r/${n}.json`,
  kokonut: (n) => `https://kokonutui.com/r/${n}.json`
};
const safe = /^[A-Za-z0-9._-]+$/;
class Quit extends Error { constructor(code) { super('quit'); this.code = code; } }
// Throw instead of process.exit so open network handles close cleanly (Windows asserts otherwise).
process.on('uncaughtException', (e) => { process.exitCode = e instanceof Quit ? e.code : 1; if (!(e instanceof Quit)) console.error(e.message); });
const fail = (m, code = 2) => { console.error(m); throw new Quit(code); };

// 21st.dev needs a personal API key. The user generates it at https://21st.dev/mcp and stores it in the environment variable
// API_KEY_21ST (or TWENTYFIRST_API_KEY). It is only ever read from the environment, sent as a Bearer token, and never printed.
const KEY21 = process.env.API_KEY_21ST || process.env.TWENTYFIRST_API_KEY;
const NEED21 = `21st.dev needs your personal API key (the skill never asks for it in chat and never prints it).
1. Sign in at https://21st.dev/mcp and generate a key.
2. Store it yourself as an environment variable named API_KEY_21ST, for example in PowerShell:
   [Environment]::SetEnvironmentVariable("API_KEY_21ST", "<your key>", "User")
   then restart the terminal and Claude Code. On macOS or Linux: export API_KEY_21ST=... in your shell profile.
Alternative without a key: sign in to 21st.dev yourself in the browser pane and ask the agent to read the component page there.`;
const call21 = async (p) => { const r = await fetch('https://21st.dev/api/v1' + p, { headers: { Authorization: 'Bearer ' + KEY21, Accept: 'application/json' }, signal: AbortSignal.timeout(20000) });
  if (!r.ok) await r.text().catch(() => '');
  if (r.status === 401 || r.status === 403) fail('21st.dev rejected the key (HTTP ' + r.status + '). Generate a new one at https://21st.dev/mcp and update API_KEY_21ST.', 1);
  if (!r.ok) fail('21st.dev returned HTTP ' + r.status + ' for ' + p, 1); return r.json(); };

if (val('search21')) {
  if (!KEY21) fail(NEED21, 3);
  const q = encodeURIComponent(val('search21')), scope = ['public', 'mine', 'team'].includes(val('scope')) ? val('scope') : 'public';
  const j = await call21(`/components/search?q=${q}&scope=${scope}&limit=${Math.min(25, +val('limit') || 10)}`);
  console.log(JSON.stringify(j, null, 1).slice(0, 12000)); throw new Quit(0);
}

if (has('list') || val('list')) {
  const which = val('list') || 'shadcn';
  if (which === 'kokonut') {
    // Kokonut UI has no registry index; its llms.txt lists every component page. Pro items (paid, not served here) are hidden unless --all.
    const r = await fetch('https://kokonutui.com/llms.txt', { signal: AbortSignal.timeout(20000) });
    if (!r.ok) fail('Could not read https://kokonutui.com/llms.txt (HTTP ' + r.status + ').', 1);
    const rows = [...(await r.text()).matchAll(/^- \[([^\]]+)\]\(https:\/\/kokonutui\.com\/docs\/([a-z-]+)\/([a-z0-9-]+)\.md\):\s*(.*)$/gim)]
      .map((m) => ({ name: m[3], title: m[1], category: m[2], pro: /Part of Kokonut UI Pro/i.test(m[4]), about: m[4].replace(/\s*Part of Kokonut UI Pro\.?/i, '').slice(0, 110) }));
    const cat = val('category');
    console.log(JSON.stringify(rows.filter((x) => (has('all') || !x.pro) && (!cat || x.category === cat)), null, 1)); throw new Quit(0);
  }
  if (which !== 'shadcn') fail('--list supports shadcn and kokonut; browse other catalogues on their sites (see references/libraries.md).');
  const j = await (await fetch('https://ui.shadcn.com/r/index.json', { signal: AbortSignal.timeout(20000) })).json();
  console.log(JSON.stringify(j.map((x) => ({ name: x.name, type: x.type })), null, 1)); throw new Quit(0);
}

if (!target && !val('url')) fail('usage: component-source.mjs local:list | local:<name> | <registry>:<name> [--files] [--out dir] | 21st:<user>/<slug> | --search21 <query> | --list shadcn | --url <json>\nregistries: ' + Object.keys(REG).join(', '));

if (target && target.startsWith('local:')) {
  const name = target.slice(6), file = path.join(here, '../library/components/components.html'), s = fs.readFileSync(file, 'utf8');
  if (name === 'list') { console.log([...s.matchAll(/@component:html ([a-z0-9-]+)/g)].map((m) => m[1]).join('\n')); throw new Quit(0); }
  if (!safe.test(name)) fail('Invalid component name.');
  const pick = (re) => (s.match(re) || [])[1];
  const html = pick(new RegExp(`<!-- @component:html ${name} -->([\\s\\S]*?)<!-- @end:html ${name} -->`));
  const css = pick(new RegExp(`/\\* @component:css ${name} \\*/([\\s\\S]*?)/\\* @end:css ${name} \\*/`));
  const js = pick(new RegExp(`// @component:js ${name}\\n([\\s\\S]*?)// @end:js ${name}`));
  if (!html) fail(`No bundled component "${name}". Run: component-source.mjs local:list`, 1);
  console.log(`## ${name} (bundled, original; read library/components/INDEX.md for the transform checklist)\n\n### HTML\n${html.trim()}\n\n### CSS\n${(css || '(none)').trim()}\n\n### JS\n${(js || '(none)').trim()}\n`);
  throw new Quit(0);
}

if (target && target.startsWith('21st:')) {
  const m = target.slice(5).match(/^@?([A-Za-z0-9._-]+)\/([A-Za-z0-9._-]+)$/);
  if (!m) fail('Use 21st:<username>/<slug>, for example 21st:serafimcloud/sign-in. Find names with --search21 "<query>".');
  if (!KEY21) fail(NEED21, 3);
  const j = await call21(`/components/install/${m[1]}/${m[2]}`);
  const files = Array.isArray(j.files) ? j.files : [];
  console.log(JSON.stringify({ item: target, name: j.name || m[2], dependencies: j.dependencies || [], registryDependencies: j.registryDependencies || [], files: files.map((f) => ({ path: f.path || f.target, bytes: (f.content || '').length })),
    licenseNote: 'Community components carry their own licences (shown on the component page). Check before shipping.', next: 'Read, then transform; install only needed dependencies locally.' }, null, 2));
  if (has('files')) for (const f of files) console.log(`\n===== ${f.path || f.target} =====\n${f.content || ''}`);
  if (!files.length) console.log(JSON.stringify(j, null, 1).slice(0, 8000));
  throw new Quit(0);
}

let url, label;
if (val('url')) { url = val('url'); if (!/^https:\/\//.test(url)) fail('Only https URLs are allowed.'); label = url; }
else { const [reg, name] = target.split(/:(.+)/); if (!REG[reg]) fail('Unknown registry "' + reg + '". Known: ' + Object.keys(REG).join(', ')); if (!safe.test(name)) fail('Invalid item name.'); url = REG[reg](name); label = `${reg}:${name}`; }

let res;
try { res = await fetch(url, { signal: AbortSignal.timeout(20000) }); } catch (e) { fail('Could not reach the registry: ' + e.message, 1); }
if (!res.ok) { await res.text().catch(() => ''); }
if (!res.ok) fail(`Registry returned ${res.status} for ${url}. The item name may be wrong, or the registry may need authentication.` + (/kokonutui\.com/.test(url) ? ' For Kokonut UI, run --list kokonut for valid names; Pro items are paid and are not served here: pick a free one or build it.' : ''), 1);
let item; try { item = await res.json(); } catch { fail('The registry did not return JSON.', 1); }
const files = Array.isArray(item.files) ? item.files : [];
const summary = { item: label, url, name: item.name, type: item.type, title: item.title, description: item.description, dependencies: item.dependencies || [], devDependencies: item.devDependencies || [], registryDependencies: item.registryDependencies || [],
  files: files.map((f) => ({ path: f.path || f.target, type: f.type, bytes: (f.content || '').length })), licenseNote: 'Check the item and the registry terms before shipping; keep any required notices.', next: 'Read the source, decide what to keep, then transform it (tokens, content, easing, states, accessibility). Install only the dependencies you actually need, locally.' };
console.log(JSON.stringify(summary, null, 2));
if (has('files')) for (const f of files) console.log(`\n===== ${f.path || f.target} =====\n${f.content || ''}`);
if (val('out')) { const dir = path.resolve(val('out'), String(item.name || 'item').replace(/[^A-Za-z0-9._-]/g, '_')); fs.mkdirSync(dir, { recursive: true });
  for (const f of files) { const rel = path.basename(String(f.path || f.target || 'file')); fs.writeFileSync(path.join(dir, rel), f.content || ''); } console.error('Saved for review in ' + dir + ' (not added to your project).'); }
