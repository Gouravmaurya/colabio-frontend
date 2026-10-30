import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = 'skills/.curated/colabio-frontend';
function plan(brief, ...args) {
  const result = spawnSync(process.execPath, [root + '/scripts/select-build.mjs', '--brief', brief, ...args], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

test('cinematic landing routes visual disciplines and scroll motion to bundled guides', () => {
  const p = plan('Cinematic landing page for a textile studio with scroll animation');
  assert.ok(p.motion.libraries.includes('gsap + ScrollTrigger'));
  assert.ok(p.motion.libraries.includes('lenis'));
  for (const id of ['layout', 'typography', 'color', 'components', 'motion', 'cinematic-media', 'verification']) {
    assert.ok(p.workstreams.some((stream) => stream.id === id), id);
  }
  for (const guide of p.readOrder) assert.ok(fs.existsSync(path.join(root, guide)), guide);
});

test('explicit static motion overrides cinematic wording and a 3D starter', () => {
  const p = plan('Cinematic pottery store, static, no animations and no 3D');
  assert.equal(p.motion.level, 'static');
  assert.deepEqual(p.motion.libraries, []);
  assert.ok(!p.readOrder.some((guide) => guide.includes('gsap-scrolltrigger')));
});

test('quiet operational dashboard keeps the required runtime without cinematic pinning or 3D', (t) => {
  const project = fs.mkdtempSync(path.join(os.tmpdir(), 'colabio-routing-'));
  t.after(() => {
    assert.ok(path.basename(project).startsWith('colabio-routing-'));
    fs.rmSync(project, { recursive: true, force: true });
  });
  fs.writeFileSync(path.join(project, 'package.json'), JSON.stringify({ dependencies: { react: '19', motion: '12' } }));
  const p = plan('Quiet inventory management dashboard with tabs and drawers', '--project', project);
  assert.equal(p.stack, 'react');
  assert.deepEqual(p.motion.libraries, ['gsap + ScrollTrigger', 'lenis', 'existing Motion package']);
  assert.match(p.motion.owners, /no cinematic pins/);
  assert.ok(!p.workstreams.some((stream) => stream.id === 'cinematic-media'));
});

test('Pinterest research is discoverable and requested Anime.js retains required motion owners', () => {
  const p = plan('Landing page with Anime.js SVG choreography');
  assert.ok(p.readOrder.includes('references/pinterest-research.md'));
  assert.ok(p.mine.some((source) => source.includes('Pinterest')));
  assert.ok(p.motion.libraries.includes('animejs'));
  assert.ok(p.motion.libraries.includes('gsap + ScrollTrigger'));
  assert.ok(p.motion.libraries.includes('lenis'));
  assert.ok(p.readOrder.includes('references/animejs.md'));
  assert.ok(p.motion.mustHave.some((requirement) => requirement.includes('no competing GSAP transforms')));
});

test('Anime.js remains optional and static or explicit exclusions override selection', () => {
  for (const brief of ['Editorial landing page', 'SVG landing page without Anime.js', 'Static landing page with Anime.js']) {
    const p = plan(brief);
    assert.ok(!p.motion.libraries.includes('animejs'), brief);
    assert.ok(!p.readOrder.includes('references/animejs.md'), brief);
  }
});

test('an existing Anime.js project reuses it only for a relevant component job', (t) => {
  const project = fs.mkdtempSync(path.join(os.tmpdir(), 'colabio-routing-'));
  t.after(() => fs.rmSync(project, { recursive: true, force: true }));
  fs.writeFileSync(path.join(project, 'package.json'), JSON.stringify({ dependencies: { animejs: '4' } }));
  assert.ok(plan('SVG illustration with a staggered timeline', '--project', project).motion.libraries.includes('animejs'));
  assert.ok(!plan('A quiet contact form', '--project', project).motion.libraries.includes('animejs'));
});

test('a product starter alone never requires a 3D runtime', () => {
  const p = plan('Pottery store with elegant product photographs');
  assert.equal(p.starter, 'cinematic-product-shop');
  assert.ok(!p.motion.libraries.includes('three'));
  assert.ok(p.motion.libraries.includes('lenis'));
  assert.ok(p.readOrder.some((guide) => guide.endsWith('motion-recipes.md')));
});

test('required craft and template core survives static scope without loading scroll specialists', () => {
  const p = plan('Static one-page portfolio, no motion');
  assert.ok(p.coreGuides.some((guide) => guide.startsWith('library/impeccable/')));
  assert.ok(p.coreGuides.some((guide) => guide.startsWith('library/taste/')));
  assert.ok(p.coreGuides.some((guide) => guide.includes('motionsites-web-builder')));
  assert.ok(p.coreGuides.some((guide) => guide.includes('gsap-core')));
  assert.equal(p.reviewCheckpoint.required, true);
  for (const guide of p.coreGuides) {
    assert.ok(p.readOrder.includes(guide));
    assert.ok(fs.existsSync(path.join(root, guide)));
  }
  assert.ok(!p.readOrder.some((guide) => guide.includes('gsap-scrolltrigger')));
  assert.deepEqual(p.motion.libraries, []);
});
