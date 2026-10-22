import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { planDependencies, applyDependencies } from '../skills/colabio-frontend/scripts/dependencies.mjs';

function project(t, manifest = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'colabio-deps-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({ name: 'test-site', ...manifest }));
  return root;
}
test('React landing adds only missing local animation packages', (t) => {
  const root = project(t, { dependencies: { react: '^19.0.0' } });
  assert.deepEqual(planDependencies({ project: root, gsap: true, lenis: true, reactMotion: true }).args, ['install', 'gsap', 'lenis', 'framer-motion']);
});
test('non-React page omits Framer Motion', (t) => {
  const root = project(t);
  const plan = planDependencies({ project: root, gsap: true, lenis: true, reactMotion: true });
  assert.deepEqual(plan.missing, ['gsap', 'lenis']); assert.equal(plan.omitted.length, 1);
});
test('existing Motion package is reused without a competing package', (t) => {
  const root = project(t, { dependencies: { react: '^19.0.0', motion: '^12.0.0' } });
  const plan = planDependencies({ project: root, reactMotion: true });
  assert.deepEqual(plan.missing, []); assert.deepEqual(plan.reused, ['motion']);
});
test('package-manager declarations and lockfiles are respected', (t) => {
  for (const manager of ['npm', 'pnpm', 'yarn', 'bun']) {
    const root = project(t, { packageManager: manager + '@1.0.0' });
    const plan = planDependencies({ project: root, gsap: true });
    assert.equal(plan.manager, manager); assert.equal(plan.args[0], manager === 'npm' ? 'install' : 'add');
  }
  const root = project(t); fs.writeFileSync(path.join(root, 'pnpm-lock.yaml'), '');
  assert.equal(planDependencies({ project: root, gsap: true }).manager, 'pnpm');
  fs.writeFileSync(path.join(root, 'yarn.lock'), '');
  assert.throws(() => planDependencies({ project: root, gsap: true }), /Multiple/);
});
test('no needed toolkit means no installation', (t) => {
  const root = project(t), plan = planDependencies({ project: root });
  assert.equal(applyDependencies(plan, () => { throw Error('Must not execute'); }).status, 'unchanged');
});
test('installation failures are reported and unsafe commands rejected', (t) => {
  const root = project(t), plan = planDependencies({ project: root, gsap: true });
  assert.throws(() => applyDependencies(plan, () => ({ status: 1 })), /installation failed/);
  assert.throws(() => applyDependencies({ ...plan, args: ['install', '-g'] }), /Unsafe/);
});
test('skill distribution is never mistaken for the implementation package', (t) => {
  const root = project(t, { name: 'colabio-frontend' }); fs.writeFileSync(path.join(root, 'sources.lock.json'), '{}');
  assert.throws(() => planDependencies({ project: root, gsap: true }), /website project/);
});
