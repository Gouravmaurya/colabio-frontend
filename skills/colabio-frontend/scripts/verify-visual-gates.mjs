#!/usr/bin/env node
// Read-only record checks. This script cannot judge aesthetics or authenticate screenshots.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const dimensions = ['identity', 'composition', 'typography', 'assets', 'motion', 'clarity', 'usability', 'completeness'];
const text = (s) => typeof s === 'string' && s.trim().length > 0;
const list = (s) => Array.isArray(s) ? s : [];
const date = (s) => text(s) && /^\d{4}-\d{2}-\d{2}T/.test(s) && Number.isFinite(Date.parse(s));
const inside = (root, file) => { const rel = path.relative(root, file); return rel !== '' && !rel.startsWith(`..${path.sep}`) && rel !== '..' && !path.isAbsolute(rel); };

function localFile(root, relative) {
  if (!text(relative) || relative.includes('\\') || path.isAbsolute(relative) || /^[A-Za-z]:/.test(relative)
      || relative.split('/').some((part) => !part || part === '.' || part === '..')) throw new Error(`Unsafe artifact path: ${relative}`);
  const file = path.resolve(root, relative);
  if (!inside(root, file) || !fs.existsSync(file) || !fs.statSync(file).isFile()) throw new Error(`Missing artifact: ${relative}`);
  if (!inside(root, fs.realpathSync(file))) throw new Error(`Artifact escapes project: ${relative}`);
  return file;
}

export function verifyVisualGates(record, { project, stage = 'final' } = {}) {
  if (!project || !['baseline', 'slice', 'final'].includes(stage)) throw new Error('Specify a project and stage baseline|slice|final.');
  const root = fs.realpathSync(project);
  if (record?.schemaVersion !== 1 || !['redesign', 'new'].includes(record.kind) || typeof record.cinematic !== 'boolean') throw new Error('Expected schemaVersion 1, kind redesign|new, and cinematic boolean.');
  if (!date(record.designStartedAt)) throw new Error('designStartedAt must be an ISO timestamp.');
  const issues = [];
  const need = (test, msg) => { if (!test) issues.push(msg); };
  const captures = new Map();
  const stages = stage === 'final' ? ['slice', 'final'] : stage === 'slice' ? ['slice'] : [];
  need(list(record.targets).filter(text).length >= 3, 'List at least three concrete target advances.');
  if (record.kind === 'redesign') need(list(record.baselineStrengths).filter(text).length >= 3, 'List at least three baseline strengths to preserve.');
  else need(text(record.brief) && text(record.referenceStudy), 'A new build needs its brief and reference-mechanism study.');

  for (const c of list(record.captures)) {
    if (!text(c.id) || captures.has(c.id)) throw new Error('Capture ids must be nonempty and unique.');
    if (!['baseline', 'slice', 'final'].includes(c.phase) || !['settled', 'before', 'mid', 'after', 'reduced'].includes(c.state)) throw new Error(`Invalid capture phase/state: ${c.id}`);
    if (!date(c.capturedAt) || !text(c.route)) throw new Error(`Capture needs capturedAt and route: ${c.id}`);
    const v = c.viewport;
    if (!v || ![v.width, v.height, v.dpr].every((x) => Number.isFinite(x) && x > 0)) throw new Error(`Capture needs actual CSS width, height and dpr: ${c.id}`);
    if (!['viewport', 'full-page'].includes(c.extent)) throw new Error(`Capture extent must be viewport|full-page: ${c.id}`);
    const file = localFile(root, c.file);
    const png = fs.readFileSync(file);
    if (!c.file.endsWith('.png') || png.length < 33 || !png.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) || png.toString('ascii', 12, 16) !== 'IHDR') throw new Error(`Expected a PNG with an IHDR header: ${c.file}`);
    const width = png.readUInt32BE(16), height = png.readUInt32BE(20);
    // Some browser captures exclude a scrollbar. Large crops are never comparable viewports.
    need(Math.abs(width - v.width * v.dpr) <= 32 * v.dpr, `PNG width does not match recorded viewport: ${c.id}`);
    need(c.extent === 'full-page' ? height >= v.height * v.dpr - 32 * v.dpr : Math.abs(height - v.height * v.dpr) <= 32 * v.dpr, `PNG height does not match recorded extent: ${c.id}`);
    if (c.phase === 'baseline') need(Date.parse(c.capturedAt) <= Date.parse(record.designStartedAt), `Baseline must predate design selection: ${c.id}`);
    else need(Date.parse(c.capturedAt) >= Date.parse(record.designStartedAt), `Candidate predates design selection: ${c.id}`);
    captures.set(c.id, c);
  }
  const refs = (ids, phase) => list(ids).length > 0 && ids.every((id) => captures.has(id) && (!phase || captures.get(id).phase === phase));
  const phaseCaptures = (phase) => [...captures.values()].filter((c) => c.phase === phase);
  const settled = (phase) => phaseCaptures(phase).filter((c) => c.state === 'settled');
  const responsive = (phase) => {
    need(settled(phase).some((c) => c.viewport.width >= 1000), `${phase}: missing settled desktop capture (>=1000 CSS px).`);
    need(settled(phase).some((c) => c.viewport.width <= 480), `${phase}: missing settled narrow capture (<=480 CSS px).`);
  };
  if (record.kind === 'redesign') responsive('baseline');
  for (const phase of stages) {
    responsive(phase);
    if (record.cinematic) for (const state of ['before', 'mid', 'after', 'reduced']) need(phaseCaptures(phase).some((c) => c.state === state), `${phase}: missing cinematic ${state} capture.`);
    for (const dimension of dimensions) {
      const rows = list(record.comparisons).filter((r) => r.stage === phase && r.dimension === dimension);
      need(rows.length === 1, `${phase}/${dimension}: require exactly one comparison.`);
      const row = rows[0];
      if (!row) continue;
      need(text(row.note), `${phase}/${dimension}: describe the observed gain/loss.`);
      const allowed = record.kind === 'redesign' ? ['improved', 'preserved'] : ['pass'];
      need(allowed.includes(row.verdict), `${phase}/${dimension}: ${row.verdict || 'unverified'} blocks acceptance.`);
      need(refs(row.candidate, phase), `${phase}/${dimension}: candidate evidence missing/wrong phase.`);
      if (record.kind === 'redesign') {
        need(refs(row.baseline, 'baseline'), `${phase}/${dimension}: baseline evidence missing/wrong phase.`);
        const comparable = list(row.candidate).every((id) => {
          const c = captures.get(id);
          return c && list(row.baseline).some((bId) => {
            const b = captures.get(bId);
            return b && b.viewport.width === c.viewport.width && b.viewport.height === c.viewport.height && b.viewport.dpr === c.viewport.dpr && b.state === c.state && b.extent === c.extent;
          });
        });
        need(comparable, `${phase}/${dimension}: match actual baseline/candidate viewport, DPR, state and extent.`);
      }
    }
    if (record.kind === 'redesign') need(list(record.comparisons).some((r) => r.stage === phase && r.verdict === 'improved'), `${phase}: no demonstrated improvement.`);
  }
  const check = (name, phase) => {
    const c = record.checks?.[name];
    need(c?.status === 'pass' && text(c?.note) && refs(c?.evidence), `${name}: require an observed pass, note and capture evidence.`);
    if (phase) need(list(c?.evidence).some((id) => captures.get(id)?.phase === phase), `${name}: missing ${phase} evidence.`);
    if (c?.artifact) localFile(root, c.artifact);
  };
  if (stages.length) check('signatureDepth', stage);
  if (stage === 'final') {
    const rounds = list(record.rounds).filter((r) => r.stage === 'final' && Number.isInteger(r.number) && r.number > 0 && text(r.note) && refs(r.captures, 'final'));
    need(new Set(rounds.map((r) => r.number)).size >= 2, 'Final needs at least two evidenced critique/recheck rounds.');
    need(phaseCaptures('final').some((c) => c.extent === 'full-page'), 'Final needs a full-page composition capture.');
    for (const name of ['journey', 'interaction', 'keyboard', 'overflow', 'reducedMotion', 'console', 'fonts']) check(name, 'final');
    need(Array.isArray(record.findings), 'Record findings, including an empty array when none remain.');
    for (const f of list(record.findings)) if (f.blocking !== false) need(f.status === 'fixed' && text(f.note) && refs(f.recheck, 'final'), `Unresolved or unrechecked blocking finding: ${f.id || 'unnamed'}`);
  }
  return { stage, ready: issues.length === 0, issues, limitation: 'Record/artifact validation only. Actual visual judgment and provenance require browser inspection.' };
}

const invoked = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invoked) {
  try {
    const args = process.argv.slice(2), get = (name) => args[args.indexOf(`--${name}`) + 1];
    if (!args.includes('--project') || !args.includes('--record')) throw new Error('Usage: verify-visual-gates.mjs --project <output> --record <relative.json> --stage baseline|slice|final');
    const root = fs.realpathSync(get('project'));
    const record = JSON.parse(fs.readFileSync(localFile(root, get('record')), 'utf8'));
    const result = verifyVisualGates(record, { project: root, stage: args.includes('--stage') ? get('stage') : 'final' });
    console.log(JSON.stringify(result, null, 2));
    process.exitCode = result.ready ? 0 : 2;
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
