import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { install, restore, verifyBundle, bundleRoot } from '../scripts/install.mjs';
import { bootstrap } from '../scripts/bootstrap.mjs';

const sha = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
function temporary(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'colabio-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  return root;
}
function fixture(t) {
  const base = temporary(t), source = path.join(base, 'source'), project = path.join(base, 'project with spaces');
  fs.mkdirSync(project); fs.mkdirSync(path.join(source, 'skills/colabio-frontend/references'), { recursive: true });
  fs.mkdirSync(path.join(source, 'scripts'));
  fs.writeFileSync(path.join(source, 'skills/colabio-frontend/SKILL.md'), '---\nname: colabio-frontend\ndescription: Fixture\n---\n# Fixture\n');
  fs.writeFileSync(path.join(source, 'skills/colabio-frontend/references/test.md'), 'Reference');
  fs.writeFileSync(path.join(source, 'sources.lock.json'), '{}');
  fs.copyFileSync(path.join(bundleRoot, 'scripts/install.mjs'), path.join(source, 'scripts/install.mjs'));
  fs.writeFileSync(path.join(source, 'package.json'), '{"type":"module"}');
  const files = ['skills/colabio-frontend/SKILL.md', 'skills/colabio-frontend/references/test.md', 'sources.lock.json', 'scripts/install.mjs', 'package.json'];
  function seal(version = '1.0.0') {
    const manifest = JSON.stringify({ schemaVersion: 1, name: 'colabio-frontend', version, files: files.map((p) => ({ path: p, sha256: sha(fs.readFileSync(path.join(source, p))) })) });
    fs.writeFileSync(path.join(source, 'manifest.json'), manifest);
    fs.writeFileSync(path.join(source, 'manifest.sha256'), sha(manifest));
  }
  seal();
  return { base, source, project, seal, target: (provider = '.agents') => path.join(project, provider, 'skills/colabio-frontend') };
}

test('real release manifest and all bundled file hashes verify', () => {
  const result = verifyBundle(); assert.equal(result.version, JSON.parse(fs.readFileSync(path.join(bundleRoot, 'package.json'))).version); assert.ok(result.files.length > 200);
});

test('clean install verifies both providers; identical reinstall preserves mtimes', (t) => {
  const f = fixture(t), first = install({ root: f.source, project: f.project });
  assert.equal(first.status, 'installed'); assert.equal(first.targets.length, 2);
  const file = path.join(f.target(), 'SKILL.md'), before = fs.statSync(file).mtimeMs;
  assert.equal(install({ root: f.source, project: f.project }).status, 'unchanged');
  assert.equal(fs.statSync(file).mtimeMs, before);
});

test('upgrade backs up existing user content and restore preserves the newer version', (t) => {
  const f = fixture(t); install({ root: f.source, project: f.project });
  fs.writeFileSync(path.join(f.target(), 'user-note.txt'), 'keep me');
  fs.appendFileSync(path.join(f.source, 'skills/colabio-frontend/SKILL.md'), '\nVersion two'); f.seal('1.1.0');
  const changed = install({ root: f.source, project: f.project });
  assert.equal(changed.backups.length, 2); assert.equal(fs.existsSync(path.join(f.target(), 'user-note.txt')), false);
  const restored = restore({ project: f.project, id: changed.restoreId });
  assert.equal(restored.status, 'restored'); assert.equal(restored.preserved.length, 2);
  assert.equal(fs.readFileSync(path.join(f.target(), 'user-note.txt'), 'utf8'), 'keep me');
  assert.match(fs.readFileSync(path.join(restored.preserved[0], 'SKILL.md'), 'utf8'), /Version two/);
});

test('checksum failure makes no target changes', (t) => {
  const f = fixture(t); install({ root: f.source, project: f.project });
  const before = fs.readFileSync(path.join(f.target(), 'SKILL.md'), 'utf8');
  fs.appendFileSync(path.join(f.source, 'skills/colabio-frontend/SKILL.md'), 'corrupt');
  assert.throws(() => install({ root: f.source, project: f.project }), /corrupt/);
  assert.equal(fs.readFileSync(path.join(f.target(), 'SKILL.md'), 'utf8'), before);
});

test('missing download files and damaged manifests fail before installation', (t) => {
  const f = fixture(t); fs.unlinkSync(path.join(f.source, 'skills/colabio-frontend/references/test.md'));
  assert.throws(() => install({ root: f.source, project: f.project }), /Missing or corrupt/);
  assert.equal(fs.existsSync(f.target()), false);
  fs.appendFileSync(path.join(f.source, 'manifest.json'), 'x');
  assert.throws(() => verifyBundle(f.source), /Manifest checksum/);
});

test('unsafe manifest paths and duplicate entries are refused', (t) => {
  const f = fixture(t), m = JSON.parse(fs.readFileSync(path.join(f.source, 'manifest.json')));
  for (const entries of [[{ path: '../outside', sha256: 'a'.repeat(64) }], [m.files[0], m.files[0]]]) {
    const text = JSON.stringify({ ...m, files: entries });
    fs.writeFileSync(path.join(f.source, 'manifest.json'), text); fs.writeFileSync(path.join(f.source, 'manifest.sha256'), sha(text));
    assert.throws(() => verifyBundle(f.source), /Unsafe or duplicate/);
  }
});

test('failure during second provider commit rolls back first provider', (t) => {
  const f = fixture(t); install({ root: f.source, project: f.project });
  const original = fs.readFileSync(path.join(f.target(), 'SKILL.md'), 'utf8');
  fs.appendFileSync(path.join(f.source, 'skills/colabio-frontend/SKILL.md'), '\nUpgrade'); f.seal('1.1.0');
  assert.throws(() => install({ root: f.source, project: f.project, beforeCommit: (index) => { if (index === 1) throw Error('simulated interruption'); } }), /interruption/);
  for (const provider of ['.agents', '.claude']) {
    assert.equal(fs.readFileSync(path.join(f.target(provider), 'SKILL.md'), 'utf8'), original);
    assert.equal(fs.readdirSync(path.dirname(f.target(provider))).some((n) => n.startsWith('.colabio-stage')), false);
  }
});

test('fresh install failure removes the first installed provider', (t) => {
  const f = fixture(t);
  assert.throws(() => install({ root: f.source, project: f.project, beforeCommit: (index) => { if (index === 1) throw Error('interruption'); } }));
  assert.equal(fs.existsSync(f.target()), false);
});

test('global paths, missing projects, and forged restore IDs are refused', (t) => {
  const f = fixture(t);
  assert.throws(() => install({ root: f.source, project: os.homedir() }), /global/);
  assert.throws(() => install({ root: f.source }), /Specify the project/);
  assert.throws(() => restore({ project: f.project, id: '../outside' }), /Invalid backup/);
});

test('junctions/symlinks cannot redirect the installation outside the project', (t) => {
  const f = fixture(t), outside = path.join(f.base, 'outside'); fs.mkdirSync(outside);
  fs.symlinkSync(outside, path.join(f.project, '.agents'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => install({ root: f.source, project: f.project }), /links/);
  assert.deepEqual(fs.readdirSync(outside), []);
});

test('missing Git and private authentication/download failure have actionable errors and no writes', async (t) => {
  const f = fixture(t);
  await assert.rejects(bootstrap({ project: f.project, git: () => ({ status: 1 }) }), /Git is required/);
  await assert.rejects(bootstrap({ project: f.project, git: (_cmd, args) => ({ status: args[0] === '--version' ? 0 : 128 }) }), /organization\/SSO access/);
  assert.equal(fs.existsSync(f.target()), false);
});

test('bootstrap rejects credential-bearing URLs', async (t) => {
  const f = fixture(t);
  await assert.rejects(bootstrap({ project: f.project, repository: 'https://user:secret@github.com/Gouravmaurya/colabio-frontend.git' }), /credential-free/);
});

test('tagged repository bootstrap uses the same verified installation engine', async (t) => {
  const f = fixture(t);
  const run = (...args) => {
    const result = spawnSync('git', ['-C', f.source, ...args], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr); return result;
  };
  run('init'); run('add', '.');
  run('-c', 'user.name=Colabio Test', '-c', 'user.email=colabio-test@example.invalid', 'commit', '-m', 'fixture'); run('tag', 'v1.0.0');
  const result = await bootstrap({ project: f.project, repository: f.source, version: 'v1.0.0' });
  assert.equal(result.status, 'installed'); assert.equal(result.targets.length, 2);
  const repeat = await bootstrap({ project: f.project, repository: f.source, version: 'v1.0.0' }); assert.equal(repeat.status, 'unchanged');
  await assert.rejects(bootstrap({ project: f.project, repository: f.source, version: 'v9.0.0' }), /Download failed/);
});

test('CLI refuses missing and unknown option values', (t) => {
  const f = fixture(t);
  for (const args of [['--project'], ['--unknown', 'x'], ['--project', f.project, '--restore']]) {
    const result = spawnSync(process.execPath, [path.join(bundleRoot, 'scripts/install.mjs'), ...args], { encoding: 'utf8' });
    assert.equal(result.status, 1); assert.equal(fs.existsSync(f.target()), false);
  }
});

test('PowerShell and shell entrypoints install the full bundle through the same engine', (t) => {
  const base = temporary(t);
  const shell = process.platform === 'win32' ? 'C:/Program Files/Git/bin/bash.exe' : '/bin/sh';
  assert.ok(fs.existsSync(shell), 'A shell is needed for this integration test.');
  const shellProject = path.join(base, 'shell project'); fs.mkdirSync(shellProject);
  const shResult = spawnSync(shell, [path.join(bundleRoot, 'install.sh'), '--project', shellProject], { encoding: 'utf8' });
  assert.equal(shResult.status, 0, shResult.stderr);
  assert.equal(JSON.parse(shResult.stdout).status, 'installed');
  if (process.platform === 'win32') {
    const psProject = path.join(base, 'powershell project'); fs.mkdirSync(psProject);
    const result = spawnSync('powershell.exe', ['-NoProfile', '-File', path.join(bundleRoot, 'install.ps1'), '-Project', psProject], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr); assert.equal(JSON.parse(result.stdout).status, 'installed');
  }
});

test('all relative Markdown links in the installed skill bundle resolve', () => {
  const root = path.join(bundleRoot, 'skills/colabio-frontend');
  function scan(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) scan(file);
      else if (entry.name.endsWith('.md')) for (const match of fs.readFileSync(file, 'utf8').replace(/```[\s\S]*?```/g, '').matchAll(/\]\(([^\s)]+)\)/g)) {
        const ref = match[1].split('#')[0];
        if (!ref || /^(https?:|mailto:|data:)/.test(ref) || ref.includes('<')) continue;
        assert.ok(fs.existsSync(path.resolve(path.dirname(file), ref)), `${path.relative(root, file)}: ${ref}`);
      }
    }
  }
  scan(root);
});

test('only the standalone core exposes a public SKILL.md entrypoint', () => {
  const root = path.join(bundleRoot, 'skills');
  const found = [];
  function scan(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, e.name);
      if (e.isDirectory()) scan(file);
      else if (e.name === 'SKILL.md' && !/^  internal: true$/m.test(fs.readFileSync(file, 'utf8'))) found.push(path.relative(root, file).replaceAll('\\', '/'));
    }
  }
  scan(root);
  assert.deepEqual(found, ['.curated/colabio-frontend/SKILL.md']);
});
