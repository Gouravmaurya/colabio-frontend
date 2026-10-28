import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const run = (script, ...a) => spawnSync(process.execPath, [`skills/.curated/colabio-frontend/scripts/${script}`, ...a], { encoding: 'utf8' });

test('select-build maps a tea ware idea to a store with the shop starter and 3D', () => {
  const p = JSON.parse(run('select-build.mjs', '--brief', 'I sell hand-thrown tea ware, a cinematic website, drag to turn a 3d model').stdout);
  assert.equal(p.type, 'store');
  assert.equal(p.starter, 'cinematic-product-shop');
  assert.ok(p.motion.libraries.includes('three'));
  assert.ok(p.readOrder[0].includes('product-understanding'));
  assert.ok(p.readOrder.some((r) => r.includes('prompt-enhancer')));
});
test('select-build reads a project package.json and keeps its stack', () => {
  const p = JSON.parse(run('select-build.mjs', '--brief', 'landing page for a reporting tool', '--project', '.').stdout);
  assert.equal(p.stack, 'html'); // the repo root has no react/next dependency
  assert.equal(p.existingProject.react, false);
});
test('finish-gate fails an unfinished page in strict mode', () => {
  const r = run('finish-gate.mjs', 'tests/fixtures-slop', '--strict');
  assert.equal(r.status, 1);
  assert.match(r.stdout, /FAIL title/);
});

test('palette-lab grounds candidates in the domain and flags category defaults', () => {
  const p = JSON.parse(run('palette-lab.mjs', '--domain', 'garment erp cinematic landing').stdout);
  assert.equal(p.domain, 'garment');
  assert.ok(p.candidates.length >= 4);
  assert.ok(p.candidates.every((c) => c.contrast.text >= 7 && c.contrast.muted >= 4.5));
  const cream = p.candidates.find((c) => c.id === 'material-light');
  assert.ok(cream.categoryDefaultFlags.some((f) => /cream/.test(f)));
});
test('palette-lab --check flags navy + yellow on a built page', () => {
  const r = run('palette-lab.mjs', '--check', 'tests/fixtures-palette/index.html');
  assert.match(r.stdout, /navy \+ yellow/);
});
test('select-build starts with understanding and carries theme candidates', () => {
  const p = JSON.parse(run('select-build.mjs', '--brief', 'cinematic landing for a garment erp').stdout);
  assert.match(p.order, /Understand/);
  assert.equal(p.themeCandidates.domain, 'garment');
});

import fs from 'node:fs';
import path from 'node:path';
test('library is one skill: no nested SKILL.md, every upstream folder keeps a license, index paths exist', () => {
  const root = 'skills/.curated/colabio-frontend/library';
  const all = []; (function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p) : all.push(p); } })(root);
  assert.equal(all.filter((p) => path.basename(p) === 'SKILL.md').length, 0);
  for (const d of ['impeccable', 'hallmark', 'taste', 'design-data']) assert.ok(fs.existsSync(path.join(root, d, 'LICENSE')), d + ' license');
  for (const d of fs.readdirSync(path.join(root, 'modules'))) assert.ok(fs.existsSync(path.join(root, 'modules', d, 'LICENSE')), d + ' license');
  assert.ok(fs.existsSync(path.join(root, 'impeccable', 'NOTICE.md')) && fs.existsSync(path.join(root, 'NOTICE.md')));
  for (const f of ['critique', 'audit', 'polish', 'harden', 'typeset', 'layout', 'colorize', 'animate', 'shape', 'new-work', 'craft-floor']) assert.ok(fs.existsSync(path.join(root, 'impeccable/reference', f + '.md')), f);
  const size = all.reduce((a, p) => a + fs.statSync(p).size, 0);
  assert.ok(size < 6 * 1024 * 1024, 'library stays under 6 MB, was ' + size);
});

test('SKILL.md stays short and every file it names exists', () => {
  const root = 'skills/.curated/colabio-frontend', s = fs.readFileSync(path.join(root, 'SKILL.md'), 'utf8');
  assert.ok(s.length < 18000, 'SKILL.md should stay under 18 KB, was ' + s.length);
  const missing = [...new Set([...s.matchAll(/`((?:references|scripts|templates|library|evals)\/[^`\s|<*]+)`/g)].map((m) => m[1]))]
    .filter((p) => !fs.existsSync(path.join(root, p.replace(/\/$/, ''))));
  assert.deepEqual(missing, []);
  for (const f of ['commands.md', 'core-guidance.md', 'file-map.md']) assert.ok(fs.existsSync(path.join(root, 'references', f)), f);
});

test('variety-check flags the banned skeleton and demo phrases', () => {
  const r = run('variety-check.mjs', 'tests/fixtures-variety/index.html');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /banned skeleton/);
  assert.match(r.stdout, /demo or stock phrases/);
});

test('finish-gate warns when mobile navigation is hidden with no menu', () => {
  const r = run('finish-gate.mjs', 'tests/fixtures-nav/index.html');
  assert.match(r.stdout, /WARN mobile navigation/);
});

test('component-source lists and prints bundled components and fails cleanly', () => {
  const list = run('component-source.mjs', 'local:list');
  assert.equal(list.status, 0);
  for (const n of ['marquee', 'command-palette', 'progress-thread']) assert.ok(list.stdout.split('\n').includes(n), n);
  const one = run('component-source.mjs', 'local:marquee');
  assert.equal(one.status, 0);
  assert.match(one.stdout, /### HTML[\s\S]*### CSS[\s\S]*### JS/);
  assert.equal(run('component-source.mjs', 'local:../x').status, 2);
  assert.equal(run('component-source.mjs', 'nope:thing').status, 2);
  const k = spawnSync(process.execPath, ['skills/.curated/colabio-frontend/scripts/component-source.mjs', '21st:a/b'], { encoding: 'utf8', env: { ...process.env, API_KEY_21ST: '', TWENTYFIRST_API_KEY: '' } });
  assert.equal(k.status, 3);
  assert.match(k.stderr, /API_KEY_21ST/);
});

test('every bundled component has matching html markers and the gallery exists', () => {
  const s = fs.readFileSync('skills/.curated/colabio-frontend/library/components/components.html', 'utf8');
  const names = [...s.matchAll(/@component:html ([a-z0-9-]+)/g)].map((m) => m[1]);
  assert.ok(names.length >= 16, 'expected 16+ components, found ' + names.length);
  for (const n of names) assert.ok(s.includes(`@end:html ${n}`), n + ' end marker');
});

test('capture.mjs is syntactically valid and refuses to run without arguments', () => {
  const r = run('capture.mjs');
  assert.equal(r.status, 2);
});
