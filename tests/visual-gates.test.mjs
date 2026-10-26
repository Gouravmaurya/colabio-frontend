import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import { spawnSync } from 'node:child_process';
import { dimensions, verifyVisualGates } from '../skills/.curated/colabio-frontend/scripts/verify-visual-gates.mjs';

// Generated PNG fixtures exercise artifact/viewport validation, not visual quality.
function png(width, height) {
  const crc = (bytes) => { let value = 0xffffffff; for (const b of bytes) { value ^= b; for (let n = 0; n < 8; n++) value = value & 1 ? 0xedb88320 ^ value >>> 1 : value >>> 1; } return (value ^ 0xffffffff) >>> 0; };
  const chunk = (name, data) => { const type = Buffer.from(name), size = Buffer.alloc(4), checksum = Buffer.alloc(4); size.writeUInt32BE(data.length); checksum.writeUInt32BE(crc(Buffer.concat([type, data]))); return Buffer.concat([size, type, data, checksum]); };
  const header = Buffer.alloc(13); header.writeUInt32BE(width); header.writeUInt32BE(height, 4); header[8] = 8; header[9] = 2;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR', header), chunk('IDAT', zlib.deflateSync(Buffer.alloc((width * 3 + 1) * height))), chunk('IEND', Buffer.alloc(0))]);
}
function fixture(t) {
  const project = fs.mkdtempSync(path.join(os.tmpdir(), 'colabio-visual-test-'));
  t.after(() => fs.rmSync(project, { recursive: true, force: true }));
  const r = { schemaVersion: 1, kind: 'redesign', cinematic: true, designStartedAt: '2026-10-26T10:00:00Z', baselineStrengths: ['Authored portrait', 'Distinctive type', 'Real projects'], targets: ['Clearer project action', 'Preserve portrait/title depth', 'Readable mobile cases'], captures: [], comparisons: [], rounds: [], checks: {}, findings: [] };
  for (const phase of ['baseline', 'slice', 'final']) {
    for (const [name, width] of [['desktop', 1200], ['mobile', 390]]) {
      const id = `${phase}-${name}`, file = `${id}.png`;
      fs.writeFileSync(path.join(project, file), png(width, 800));
      r.captures.push({ id, file, phase, route: `http://localhost:3000/${phase}`, viewport: { width, height: 800, dpr: 1 }, capturedAt: phase === 'baseline' ? '2026-10-26T09:00:00Z' : '2026-10-26T11:00:00Z', state: 'settled', extent: 'viewport' });
    }
    for (const state of ['before', 'mid', 'after', 'reduced']) {
      const base = r.captures.find((c) => c.id === `${phase}-desktop`);
      r.captures.push({ ...base, id: `${phase}-${state}`, state });
    }
  }
  r.captures.push({ ...r.captures.find((c) => c.id === 'final-desktop'), id: 'final-full', extent: 'full-page' });
  for (const stage of ['slice', 'final']) for (const dimension of dimensions) r.comparisons.push({ stage, dimension, verdict: dimension === 'clarity' ? 'improved' : 'preserved', note: 'Synthetic verdict for record validation; not a visual evaluation.', baseline: ['baseline-desktop', 'baseline-mobile'], candidate: [`${stage}-desktop`, `${stage}-mobile`] });
  for (const name of ['signatureDepth', 'journey', 'interaction', 'keyboard', 'overflow', 'reducedMotion', 'console', 'fonts']) r.checks[name] = { status: 'pass', note: 'Fixture only; actual builds require observed checks.', evidence: ['final-desktop', 'final-mobile'] };
  r.checks.signatureDepth.evidence.push('slice-desktop');
  for (const number of [1, 2]) r.rounds.push({ stage: 'final', number, note: 'Fixture review round.', captures: ['final-desktop'] });
  return { project, r, verify: (stage = 'final') => verifyVisualGates(r, { project, stage }) };
}

test('complete record passes baseline, slice and final without claiming visual judgment', (t) => {
  const f = fixture(t); for (const stage of ['baseline', 'slice', 'final']) assert.equal(f.verify(stage).ready, true);
  assert.match(f.verify().limitation, /Actual visual judgment/);
});
test('cleaner usability cannot hide a composition regression (portfolio v2 failure mode)', (t) => {
  const f = fixture(t); f.r.comparisons.find((r) => r.stage === 'final' && r.dimension === 'composition').verdict = 'regressed';
  assert.equal(f.verify().ready, false); assert.ok(f.verify().issues.some((i) => i.includes('composition: regressed')));
});
test('late baseline does not establish before-design inspection', (t) => {
  const f = fixture(t); f.r.captures[0].capturedAt = '2026-10-26T12:00:00Z';
  assert.ok(f.verify('baseline').issues.some((i) => i.includes('predate design')));
});
test('passing code checks cannot replace missing candidate or baseline captures', (t) => {
  const f = fixture(t); f.r.captures = [];
  assert.equal(f.verify().ready, false); assert.ok(f.verify().issues.some((i) => i.includes('missing settled')));
});
test('mismatched CSS viewports/DPR and cropped PNG dimensions are rejected', (t) => {
  const f = fixture(t); f.r.captures.find((c) => c.id === 'final-mobile').viewport.width = 460;
  assert.ok(f.verify().issues.some((i) => i.includes('match actual baseline/candidate')));
  assert.ok(f.verify().issues.some((i) => i.includes('PNG width')));
});
test('cinematic claims require transition and reduced-motion evidence', (t) => {
  const f = fixture(t); f.r.captures = f.r.captures.filter((c) => !['mid', 'reduced'].includes(c.state));
  assert.ok(f.verify().issues.some((i) => i.includes('missing cinematic mid')));
  assert.ok(f.verify().issues.some((i) => i.includes('missing cinematic reduced')));
});
test('third round does not excuse an unresolved finding or unverified check', (t) => {
  const f = fixture(t); f.r.rounds.push({ ...f.r.rounds[0], number: 3 });
  f.r.findings.push({ id: 'blank-anchor', blocking: true, status: 'open', note: 'Fix pin entry.' });
  f.r.checks.keyboard.status = 'unverified';
  assert.equal(f.verify().ready, false); assert.ok(f.verify().issues.some((i) => i.includes('blank-anchor')));
  assert.ok(f.verify().issues.some((i) => i.startsWith('keyboard:')));
});
test('slice cannot borrow a signature-depth check from a later final phase', (t) => {
  const f = fixture(t); f.r.checks.signatureDepth.evidence = ['final-desktop'];
  assert.ok(f.verify('slice').issues.some((i) => i.includes('signatureDepth: missing slice')));
});
test('unchanged design does not count as an improvement', (t) => {
  const f = fixture(t); f.r.comparisons.forEach((r) => r.verdict = 'preserved');
  assert.ok(f.verify().issues.some((i) => i.includes('no demonstrated improvement')));
});
test('artifact traversal and duplicate ids fail as invalid records', (t) => {
  const f = fixture(t); f.r.captures[0].file = '../outside.png';
  assert.throws(() => f.verify(), /Unsafe artifact path/);
  f.r.captures[0].file = 'baseline-desktop.png'; f.r.captures.push(f.r.captures[0]);
  assert.throws(() => f.verify(), /unique/);
});
test('greenfield uses brief and reference principles rather than invented incumbent', (t) => {
  const f = fixture(t); f.r.kind = 'new'; f.r.brief = 'Software walkthrough'; f.r.referenceStudy = 'Observed framing and continuity';
  f.r.captures = f.r.captures.filter((c) => c.phase !== 'baseline');
  f.r.comparisons.forEach((r) => { r.verdict = 'pass'; delete r.baseline; });
  assert.equal(f.verify().ready, true);
});
test('CLI returns 2 for incomplete gates and 1 for malformed input', (t) => {
  const f = fixture(t); const script = 'skills/.curated/colabio-frontend/scripts/verify-visual-gates.mjs';
  fs.writeFileSync(path.join(f.project, 'review.json'), JSON.stringify({ ...f.r, captures: [] }));
  assert.equal(spawnSync(process.execPath, [script, '--project', f.project, '--record', 'review.json']).status, 2);
  assert.equal(spawnSync(process.execPath, [script]).status, 1);
});
