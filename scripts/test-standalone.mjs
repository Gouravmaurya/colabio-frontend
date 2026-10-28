import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { install } from './install.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'skills/.curated/colabio-frontend');
const expected = fs.readFileSync(path.join(source, 'SKILL.md'), 'utf8');
const version = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).version;
assert.equal(expected.match(/^  version: "([^"]+)"\r?$/m)?.[1], version, 'Skill metadata version must match the package version.');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'colabio-standalone-'));
const providers = ['.agents', '.claude'];
const list = (dir, prefix = '') => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? list(path.join(dir, e.name), prefix + e.name + '/') : [prefix + e.name]).sort();
const files = list(source);

function addSkill(project, input) {
  fs.mkdirSync(project, { recursive: true });
  const result = spawnSync(process.execPath, [process.env.npm_execpath, 'exec', '--yes', '--package=skills@1.7.4', '--',
    'skills', 'add', input, '--skill', 'colabio-frontend', '-a', 'claude-code', '-a', 'codex', '--copy', '-y'], {
    cwd: project, encoding: 'utf8', timeout: 120000,
    env: { ...process.env, INSTALL_INTERNAL_SKILLS: '', DISABLE_TELEMETRY: '1', DO_NOT_TRACK: '1' }
  });
  assert.equal(result.status, 0, result.stderr || result.error?.message || result.stdout);
  for (const provider of providers) {
    const target = path.join(project, provider, 'skills/colabio-frontend');
    assert.deepEqual(list(target), files, 'Installed files differ from the standalone folder in ' + target);
    assert.equal(fs.readFileSync(path.join(target, 'SKILL.md'), 'utf8'), expected);
    for (const file of files) assert.deepEqual(fs.readFileSync(path.join(target, file)), fs.readFileSync(path.join(source, file)), 'Installed reference/script differs: ' + file);
  }
}

try {
  assert.ok(process.env.npm_execpath, 'Run through npm run test:standalone.');
  assert.ok(files.includes('SKILL.md') && files.every((f) => f === 'SKILL.md' || /^(agents|references|scripts|templates|evals|library)\//.test(f)), 'Standalone folder may hold only SKILL.md, agents/, references/, scripts/, templates/, evals/ and library/.');
  addSkill(path.join(temporary, 'fresh'), source);
  addSkill(path.join(temporary, 'repository discovery'), root);

  const upgrade = path.join(temporary, 'bundle upgrade');
  fs.mkdirSync(upgrade);
  install({ root, project: upgrade });
  for (const provider of providers) {
    assert.ok(fs.existsSync(path.join(upgrade, provider, 'skills/colabio-frontend/modules.json')));
  }
  addSkill(upgrade, source);
  addSkill(upgrade, source);
  console.log('Standalone core: clean install, repository discovery, full-bundle upgrade, and reinstall verified for Claude Code and Codex; each installed folder matches the self-contained standalone folder exactly.');
} finally {
  const relative = path.relative(os.tmpdir(), temporary);
  assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative)
    && path.basename(temporary).startsWith('colabio-standalone-'), 'Unsafe cleanup target');
  fs.rmSync(temporary, { recursive: true, force: true });
}
