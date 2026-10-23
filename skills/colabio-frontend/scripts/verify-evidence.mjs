import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const gates = ['scope', 'product-fit', 'component-depth', 'responsive', 'interaction', 'accessibility', 'motion', 'performance', 'webgl'];
const statuses = ['pass', 'fail', 'unverified', 'not-applicable'];
const nonempty = value => typeof value === 'string' && Boolean(value.trim());

// Completeness validation only: no browser execution, measurement, or aesthetic judgment.
export function verifyEvidence({ project, record = 'evidence.json' } = {}) {
  if (!project) throw new Error('Provide the target output folder with --project.');
  const root = fs.realpathSync(project);
  if (!fs.statSync(root).isDirectory()) throw new Error('Project must be a directory.');
  function evidenceFile(relative) {
    if (!nonempty(relative) || relative.includes('\\') || relative.split('/').includes('..') || path.posix.isAbsolute(relative) || /^[a-z]:/i.test(relative)) throw new Error('Evidence paths must be project-relative without traversal: ' + relative);
    const resolved = fs.realpathSync(path.resolve(root, relative));
    const rel = path.relative(root, resolved);
    if (rel === '..' || rel.startsWith('..' + path.sep) || path.isAbsolute(rel)) throw new Error('Evidence escapes the output folder: ' + relative);
    const stat = fs.statSync(resolved);
    if (!stat.isFile() || !stat.size) throw new Error('Evidence must be a nonempty file: ' + relative);
    return resolved;
  }
  const data = JSON.parse(fs.readFileSync(evidenceFile(record), 'utf8'));
  if (data.schemaVersion !== 1 || !['substantial', 'small'].includes(data.scope) || typeof data.motion !== 'boolean' || typeof data.webgl !== 'boolean' || !data.checks || typeof data.checks !== 'object') throw new Error('Expected schemaVersion 1, scope, motion/webgl booleans, and checks.');
  const blockers = [];
  for (const id of gates) {
    const check = data.checks[id];
    if (!check || !statuses.includes(check.status) || !nonempty(check.note) || !Array.isArray(check.evidence)) throw new Error('Invalid or missing gate: ' + id);
    if (check.status === 'pass' && !check.evidence.length) throw new Error('A reported pass needs evidence: ' + id);
    for (const file of check.evidence) evidenceFile(file);
    const absent = (id === 'motion' && !data.motion) || (id === 'webgl' && !data.webgl) || (id === 'component-depth' && data.scope === 'small');
    if (check.status === 'not-applicable' && !absent) throw new Error('Gate requires a check or an explicit unverified status: ' + id);
    if (['fail', 'unverified'].includes(check.status)) blockers.push(id + ': ' + check.status);
  }
  if (data.scope === 'substantial' && data.checks.responsive.status === 'pass') {
    if (!Array.isArray(data.viewports) || data.viewports.length < 2) throw new Error('Responsive evidence requires at least two viewport screenshots.');
    const widths = new Set();
    for (const viewport of data.viewports) {
      if (!Number.isInteger(viewport.width) || viewport.width <= 0 || !/\.(png|jpe?g|webp)$/i.test(viewport.screenshot || '')) throw new Error('Invalid viewport width or screenshot path.');
      evidenceFile(viewport.screenshot);
      widths.add(viewport.width);
    }
    if (widths.size < 2) throw new Error('Responsive screenshots must represent distinct widths.');
  }
  if (data.checks.performance.status === 'pass') {
    if (!Array.isArray(data.measurements) || !data.measurements.length) throw new Error('Performance pass requires reported measurements and budgets.');
    for (const metric of data.measurements) {
      if (![metric.name, metric.unit, metric.method].every(nonempty) || !Number.isFinite(metric.value) || metric.value < 0 || !Number.isFinite(metric.budget) || metric.budget < 0) throw new Error('Invalid performance measurement.');
      if (metric.value > metric.budget) blockers.push('performance: ' + metric.name + ' exceeds its reported maximum budget');
    }
  }
  return { status: blockers.length ? 'incomplete' : 'complete', ready: !blockers.length, blockers, verifiedGateRecords: gates.length, limitation: 'Checks submitted records and evidence-file presence only. It does not establish factual accuracy, rendered quality, accessibility compliance, or measured performance.' };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const options = {};
    for (let i = 2; i < process.argv.length; i += 2) {
      const flag = process.argv[i], value = process.argv[i + 1];
      if (!['--project', '--record'].includes(flag) || !value || value.startsWith('--') || options[flag.slice(2)]) throw new Error('Use --project <output-folder> [--record evidence.json].');
      options[flag.slice(2)] = value;
    }
    const result = verifyEvidence(options);
    console.log(JSON.stringify(result, null, 2));
    if (!result.ready) process.exitCode = 2;
  } catch (error) { console.error('Colabio evidence: ' + error.message); process.exitCode = 1; }
}
