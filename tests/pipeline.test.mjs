import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const run = (script, ...a) => spawnSync(process.execPath, [`skills/.curated/colabio-frontend/scripts/${script}`, ...a], { encoding: 'utf8' });

test('select-build maps a tea ware idea to a store with the shop starter and 3D', () => {
  const p = JSON.parse(run('select-build.mjs', '--brief', 'I sell hand-thrown tea ware, a cinematic website, drag to turn a 3d model').stdout);
  assert.equal(p.type, 'store');
  assert.equal(p.starter, 'cinematic-product-shop');
  assert.ok(p.motion.libraries.includes('three'));
  assert.ok(p.readOrder[0].includes('prompt-enhancer'));
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
