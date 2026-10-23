import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const run = (script, ...a) => spawnSync(process.execPath, [`skills/colabio-frontend/scripts/${script}`, ...a], { encoding: 'utf8' });

test('kit palettes meet contrast floors', () => assert.equal(run('pick-direction.mjs', '--validate').status, 0));
test('direction picker is deterministic per seed and varies across seeds', () => {
  const pick = (seed) => JSON.parse(run('pick-direction.mjs', '--seed', seed).stdout);
  assert.deepEqual(pick('a'), pick('a'));
  const ids = new Set(['a', 'b', 'c', 'd', 'e', 'f'].map((s) => pick(s).palette.id));
  assert.ok(ids.size > 2);
});
test('slop-lint flags a template page and exits 1 in strict mode', () => {
  const r = run('slop-lint.mjs', 'tests/fixtures-slop', '--strict');
  assert.equal(r.status, 1);
  assert.match(r.stdout, /Gradient headline text/);
});
