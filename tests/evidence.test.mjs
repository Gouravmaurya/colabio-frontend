import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { verifyEvidence } from '../skills/colabio-frontend/scripts/verify-evidence.mjs';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'colabio-evidence-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(root, 'report.md'), 'Fixture observations; not real visual verification.');
  fs.writeFileSync(path.join(root, 'phone.png'), 'Fixture image presence only.');
  fs.writeFileSync(path.join(root, 'desktop.png'), 'Fixture image presence only.');
  const data = { schemaVersion: 1, scope: 'substantial', motion: false, webgl: false,
    checks: Object.fromEntries(['scope', 'product-fit', 'component-depth', 'responsive', 'interaction', 'accessibility', 'motion', 'performance', 'webgl'].map(id => [id, { status: ['motion', 'webgl'].includes(id) ? 'not-applicable' : 'pass', note: 'Fixture check description.', evidence: ['report.md'] }])),
    viewports: [{ width: 375, screenshot: 'phone.png' }, { width: 1280, screenshot: 'desktop.png' }],
    measurements: [{ name: 'initial-js-gzip', value: 100, budget: 150, unit: 'bytes', method: 'Fixture measurement, not a real build.' }] };
  const write = () => fs.writeFileSync(path.join(root, 'evidence.json'), JSON.stringify(data));
  write(); return { root, data, write };
}

test('complete evidence validation is read-only and disclaims independent verification', t => {
  const { root } = fixture(t), before = fs.readdirSync(root);
  const result = verifyEvidence({ project: root });
  assert.equal(result.ready, true);
  assert.match(result.limitation, /does not establish factual accuracy/);
  assert.deepEqual(fs.readdirSync(root), before);
});
test('unverified checks and exceeded budgets prevent ready status', t => {
  const { root, data, write } = fixture(t);
  data.checks.accessibility.status = 'unverified'; data.measurements[0].value = 151; write();
  const result = verifyEvidence({ project: root });
  assert.equal(result.ready, false); assert.equal(result.blockers.length, 2);
});
test('missing screenshots and duplicate responsive widths cannot pass', t => {
  const { root, data, write } = fixture(t);
  data.viewports[1].width = 375; write();
  assert.throws(() => verifyEvidence({ project: root }), /distinct widths/);
  data.viewports[1].width = 1280; data.viewports[1].screenshot = 'missing.png'; write();
  assert.throws(() => verifyEvidence({ project: root }), /ENOENT/);
});
test('missing evidence, traversal, and unsupported exemptions are rejected', t => {
  const { root, data, write } = fixture(t);
  data.checks.interaction.evidence = []; write();
  assert.throws(() => verifyEvidence({ project: root }), /needs evidence/);
  data.checks.interaction.evidence = ['../report.md']; write();
  assert.throws(() => verifyEvidence({ project: root }), /without traversal/);
  data.checks.interaction.evidence = ['report.md']; data.checks.interaction.status = 'not-applicable'; write();
  assert.throws(() => verifyEvidence({ project: root }), /requires a check/);
});
test('actual animated or WebGL work cannot hide missing checks as inapplicable', t => {
  const { root, data, write } = fixture(t);
  data.motion = true; write();
  assert.throws(() => verifyEvidence({ project: root }), /motion/);
  data.checks.motion.status = 'unverified'; data.webgl = true; write();
  assert.throws(() => verifyEvidence({ project: root }), /webgl/);
});
test('CLI distinguishes incomplete records from invalid arguments', t => {
  const { root, data, write } = fixture(t);
  data.checks.interaction.status = 'unverified'; write();
  const script = path.resolve('skills/colabio-frontend/scripts/verify-evidence.mjs');
  assert.equal(spawnSync(process.execPath, [script, '--project', root], { encoding: 'utf8' }).status, 2);
  assert.equal(spawnSync(process.execPath, [script, '--unknown', root], { encoding: 'utf8' }).status, 1);
});

test('symbolic evidence paths cannot escape the target project', t => {
  const { root, data } = fixture(t);
  const nested = path.join(root, 'target'); fs.mkdirSync(nested);
  fs.symlinkSync(root, path.join(nested, 'outside'), 'junction');
  data.checks.scope.evidence = ['outside/report.md'];
  fs.writeFileSync(path.join(nested, 'evidence.json'), JSON.stringify(data));
  assert.throws(() => verifyEvidence({ project: nested }), /escapes the output folder/);
});
