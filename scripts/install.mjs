import * as fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const bundleRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const providers = ['.agents', '.claude'];
const digest = (value) => crypto.createHash('sha256').update(value).digest('hex');
const fail = (message) => { throw new Error(message); };

function requireRuntime() {
  if (Number(process.versions.node.split('.')[0]) < 22) fail('Node.js 22+ is required.');
}

export function safeRelative(value) {
  return typeof value === 'string' && /^[a-zA-Z0-9_.\-/]+$/.test(value)
    && !value.startsWith('/') && !value.split('/').some((part) => !part || part === '.' || part === '..');
}

function assertNoLinks(file) {
  let cursor = path.resolve(file);
  for (;;) {
    if (fs.existsSync(cursor) && fs.lstatSync(cursor).isSymbolicLink()) fail(`Symbolic links/junctions are not supported: ${cursor}`);
    const parent = path.dirname(cursor);
    if (parent === cursor) break;
    cursor = parent;
  }
}

export function verifyBundle(root = bundleRoot) {
  requireRuntime();
  const file = path.join(root, 'manifest.json');
  assertNoLinks(file);
  const bytes = fs.readFileSync(file);
  const expected = fs.readFileSync(path.join(root, 'manifest.sha256'), 'utf8').trim();
  if (!/^[a-f0-9]{64}$/.test(expected) || digest(bytes) !== expected) fail('Manifest checksum failed. Download the tagged bundle again.');
  const manifest = JSON.parse(bytes);
  if (manifest.schemaVersion !== 1 || manifest.name !== 'colabio-frontend' || !/^\d+\.\d+\.\d+$/.test(manifest.version)
    || !Array.isArray(manifest.files) || !manifest.files.length) fail('Unsupported release manifest.');
  const seen = new Set();
  for (const entry of manifest.files) {
    if (!safeRelative(entry.path) || seen.has(entry.path.toLowerCase()) || !/^[a-f0-9]{64}$/.test(entry.sha256)) fail('Unsafe or duplicate manifest entry.');
    seen.add(entry.path.toLowerCase());
    const target = path.join(root, entry.path);
    assertNoLinks(target);
    if (!fs.existsSync(target) || !fs.statSync(target).isFile() || digest(fs.readFileSync(target)) !== entry.sha256) fail(`Missing or corrupt release file: ${entry.path}`);
  }
  for (const required of ['skills/colabio-frontend/SKILL.md', 'sources.lock.json', 'scripts/install.mjs']) {
    if (!seen.has(required.toLowerCase())) fail(`Manifest is incomplete: ${required}`);
  }
  return { ...manifest, manifestSha256: expected };
}

function projectRoot(input) {
  if (!input) fail('Specify the project explicitly: --project <existing-project-folder>.');
  const root = path.resolve(input);
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) fail('Project folder does not exist.');
  assertNoLinks(root);
  const home = os.homedir();
  if ([path.parse(root).root, home, path.join(home, '.claude'), path.join(home, '.codex'), path.join(home, '.agents')].some((p) => path.resolve(p).toLowerCase() === root.toLowerCase())) fail('Choose a project folder, not a drive root or global assistant folder.');
  return root;
}

function filesBelow(root, prefix = '') {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root, { withFileTypes: true }).flatMap((item) => {
    const rel = prefix + item.name;
    const file = path.join(root, item.name);
    if (item.isSymbolicLink()) fail(`Symbolic link in skill tree: ${file}`);
    return item.isDirectory() ? filesBelow(file, rel + '/') : [rel];
  });
}

function matches(target, entries, manifest) {
  if (!fs.existsSync(target)) return false;
  const expected = entries.map((e) => e.path.slice('skills/colabio-frontend/'.length)).concat('.colabio-install.json').sort();
  if (JSON.stringify(filesBelow(target).sort()) !== JSON.stringify(expected)) return false;
  try {
    const receipt = JSON.parse(fs.readFileSync(path.join(target, '.colabio-install.json')));
    return receipt.manifestSha256 === manifest.manifestSha256 && entries.every((entry) => digest(fs.readFileSync(path.join(target, entry.path.slice('skills/colabio-frontend/'.length)))) === entry.sha256);
  } catch { return false; }
}

export function install({ root = bundleRoot, project, beforeCommit } = {}) {
  const manifest = verifyBundle(root);
  const projectPath = projectRoot(project);
  const entries = manifest.files.filter((entry) => entry.path.startsWith('skills/colabio-frontend/'));
  const id = new Date().toISOString().replace(/[-:.]/g, '') + '-' + crypto.randomBytes(4).toString('hex');
  const targets = providers.map((provider) => {
    const target = path.join(projectPath, provider, 'skills', 'colabio-frontend');
    assertNoLinks(target);
    const parent = path.dirname(target);
    return { provider, target, stage: path.join(parent, '.colabio-stage-' + id), backup: target + '.backup-' + id, existed: fs.existsSync(target), changed: !matches(target, entries, manifest) };
  });
  if (targets.every((t) => !t.changed)) return { status: 'unchanged', version: manifest.version, targets: targets.map((t) => t.target) };
  const committed = [];
  try {
    // Verify the complete source before staging either provider. Stage both before replacing either.
    for (const t of targets.filter((t) => t.changed)) {
      fs.mkdirSync(t.stage, { recursive: true });
      for (const entry of entries) {
        const to = path.join(t.stage, entry.path.slice('skills/colabio-frontend/'.length));
        fs.mkdirSync(path.dirname(to), { recursive: true });
        fs.copyFileSync(path.join(root, entry.path), to);
        if (digest(fs.readFileSync(to)) !== entry.sha256) fail(`Staged checksum failed: ${entry.path}`);
      }
      fs.writeFileSync(path.join(t.stage, '.colabio-install.json'), JSON.stringify({ version: manifest.version, manifestSha256: manifest.manifestSha256 }, null, 2) + '\n');
    }
    for (const t of targets.filter((t) => t.changed)) {
      beforeCommit?.(committed.length);
      if (t.existed) fs.renameSync(t.target, t.backup);
      try { fs.renameSync(t.stage, t.target); } catch (error) {
        if (t.existed) fs.renameSync(t.backup, t.target);
        throw error;
      }
      committed.push(t);
    }
    for (const t of targets) if (!matches(t.target, entries, manifest)) fail(`Installed verification failed: ${t.target}`);
    return { status: 'installed', version: manifest.version, targets: targets.map((t) => t.target), backups: committed.filter((t) => t.existed).map((t) => t.backup), restoreId: committed.some((t) => t.existed) ? id : undefined };
  } catch (error) {
    for (const t of committed.reverse()) {
      fs.rmSync(t.target, { recursive: true, force: true });
      if (t.existed) fs.renameSync(t.backup, t.target);
    }
    throw error;
  } finally {
    for (const t of targets) if (fs.existsSync(t.stage)) fs.rmSync(t.stage, { recursive: true, force: true });
  }
}

export function restore({ project, id }) {
  requireRuntime();
  const root = projectRoot(project);
  if (!/^\d{8}T\d{9}Z-[a-f0-9]{8}$/.test(id || '')) fail('Invalid backup ID. Use the restoreId from installation output.');
  const targets = providers.map((provider) => {
    const target = path.join(root, provider, 'skills', 'colabio-frontend');
    const backup = target + '.backup-' + id;
    assertNoLinks(target); assertNoLinks(backup);
    return { target, backup, current: target + '.before-restore-' + crypto.randomBytes(6).toString('hex') };
  }).filter((t) => fs.existsSync(t.backup));
  if (!targets.length) fail('No backups found for that ID in this project.');
  for (const t of targets) { filesBelow(t.backup); if (!fs.existsSync(path.join(t.backup, 'SKILL.md'))) fail('Backup is not a skill folder.'); }
  const completed = [];
  try {
    for (const t of targets) {
      t.hadCurrent = fs.existsSync(t.target);
      if (t.hadCurrent) fs.renameSync(t.target, t.current);
      try { fs.renameSync(t.backup, t.target); } catch (error) {
        if (t.hadCurrent) fs.renameSync(t.current, t.target);
        throw error;
      }
      completed.push(t);
    }
  } catch (error) {
    for (const t of completed.reverse()) { fs.renameSync(t.target, t.backup); if (t.hadCurrent) fs.renameSync(t.current, t.target); }
    throw error;
  }
  return { status: 'restored', targets: targets.map((t) => t.target), preserved: targets.filter((t) => t.hadCurrent).map((t) => t.current) };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    const allowed = new Set(['--project', '--restore', '--verify-only']);
    const options = {};
    for (let i = 0; i < args.length; i++) {
      const flag = args[i];
      if (!allowed.has(flag) || options[flag] !== undefined) fail('Usage: node scripts/install.mjs --project <folder> [--restore <backup-id>] | --verify-only');
      if (flag === '--verify-only') options[flag] = true;
      else {
        const value = args[++i];
        if (!value || value.startsWith('--')) fail(`Missing option value: ${flag}`);
        options[flag] = value;
      }
    }
    let result;
    if (options['--verify-only']) { const m = verifyBundle(); result = { status: 'verified', version: m.version, files: m.files.length }; }
    else if (options['--restore']) result = restore({ project: options['--project'], id: options['--restore'] });
    else result = install({ project: options['--project'] });
    console.log(JSON.stringify(result, null, 2));
  } catch (error) { console.error(`Colabio: ${error.message}`); process.exitCode = 1; }
}
