import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { selectModules } from '../skills/colabio-frontend/scripts/select.mjs';

function project(t, dependencies = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'colabio-selection-'));
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({ dependencies }));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}
const selected = plan => plan.modules.filter(item => item.status === 'selected').map(item => item.id);

test('React landing covers specialist phases, every inventory entry, and actual stack without writes', t => {
  const root = project(t, { react: '^19', 'framer-motion': '^14' });
  const before = fs.readFileSync(path.join(root, 'package.json'), 'utf8');
  const plan = selectModules({ project: root, surface: 'landing', task: 'redesign' });
  for (const id of ['high-end-visual-design', 'ui-ux-pro-max', 'emil-design-eng', 'mobile-native', 'animate', 'design-motion-principles', 'gsap-react', 'gsap-scrolltrigger', 'framer-motion', 'review-animations', 'redesign-existing-projects']) assert.ok(selected(plan).includes(id), id);
  const inventory = JSON.parse(fs.readFileSync(new URL('../skills/colabio-frontend/modules.json', import.meta.url)));
  assert.deepEqual(plan.modules.map(item => item.id), inventory.modules.map(item => item.id));
  assert.ok(plan.modules.every(item => item.reason && item.evidence === 'not-yet-used'));
  assert.equal(plan.modules.find(item => item.id === 'skiper-ui').status, 'candidate');
  assert.equal(selected(plan).includes('motion-dev-animations'), false);
  assert.equal(fs.readFileSync(path.join(root, 'package.json'), 'utf8'), before);
  assert.deepEqual(fs.readdirSync(root), ['package.json']);
});

test('static vanilla landing avoids React, animation runtimes, image tools, and forced style lenses', t => {
  const plan = selectModules({ project: project(t), surface: 'landing', features: ['static'] });
  assert.equal(plan.motion, false);
  for (const id of ['framer-motion', 'motion', 'gsap-core', 'animate', 'imagegen-frontend-web', 'minimalist-ui', 'industrial-brutalist-ui', 'apple-design']) assert.equal(selected(plan).includes(id), false, id);
  assert.equal(plan.libraries.lenis, false);
});

test('app with Motion reuses its guide and does not force scroll choreography or GSAP', t => {
  const plan = selectModules({ project: project(t, { react: '^19', motion: '^12' }), surface: 'app' });
  assert.ok(selected(plan).includes('motion-dev-animations'));
  assert.equal(selected(plan).includes('framer-motion'), false);
  assert.equal(plan.libraries.gsap, false);
  assert.equal(plan.libraries.lenis, false);
});

test('native and small review scopes do not inherit a website rebuild or runtime installation', t => {
  const root = project(t, { react: '^19', 'react-native': '^0.80' });
  const native = selectModules({ project: root, surface: 'native' });
  assert.ok(selected(native).includes('animate-expo'));
  for (const id of ['gsap-core', 'framer-motion', 'mobile-native']) assert.equal(selected(native).includes(id), false, id);
  const review = selectModules({ project: root, surface: 'component', task: 'review' });
  for (const id of ['design-taste-frontend', 'hallmark', 'gsap-core', 'prototype']) assert.equal(selected(review).includes(id), false, id);
  assert.equal(review.libraries.gsap, false);
});

test('specialist needs compose deliberately without silently enabling unrelated pipelines', t => {
  const plan = selectModules({ project: project(t, { react: '^19' }), surface: 'landing', features: ['scroll-story', 'webgl', 'image-concept', 'alternatives'], style: 'industrial', include: ['animation-vocabulary'] });
  for (const id of ['scroll-craft', 'threejs-webgl', 'imagegen-frontend-web', 'prototype', 'industrial-brutalist-ui', 'animation-vocabulary']) assert.ok(selected(plan).includes(id), id);
  for (const id of ['brandkit', 'stitch-design-taste', 'design-taste-frontend-v1', 'imagegen-frontend-mobile', 'minimalist-ui']) assert.equal(selected(plan).includes(id), false, id);
  assert.throws(() => selectModules({ project: plan.project, surface: 'landing', features: ['static', 'scroll-story'] }), /conflict/);
  assert.throws(() => selectModules({ project: plan.project, surface: 'landing', features: ['unknown'] }), /Unknown feature/);
  assert.throws(() => selectModules({ project: plan.project, surface: 'landing', include: ['fake-skill'] }), /Unknown module/);
});
