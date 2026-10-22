import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'colabio-npm-test-'));
try {
  if (!process.env.npm_execpath) throw new Error('Run this check through npm run test:npx.');
  const result = spawnSync(process.execPath, [process.env.npm_execpath, 'exec', '--yes', '--package=skills@1.7.4', '--',
    'skills', 'add', root, '--skill', 'colabio-frontend', '-a', 'claude-code', '-a', 'codex', '--copy', '-y'], {
    cwd: temporary, encoding: 'utf8', timeout: 120000,
    env: { ...process.env, DISABLE_TELEMETRY: '1', DO_NOT_TRACK: '1' }
  });
  if (result.status !== 0) throw new Error('npm skills installation failed: ' + (result.stderr || result.error?.message || result.stdout));
  const prefix = 'skills/colabio-frontend/';
  const files = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'))).files.filter((entry) => entry.path.startsWith(prefix));
  for (const provider of ['.agents', '.claude']) for (const entry of files) {
    const target = path.join(temporary, provider, 'skills/colabio-frontend', entry.path.slice(prefix.length));
    if (!fs.existsSync(target) || crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex') !== entry.sha256) throw new Error('Incomplete npm installation: ' + target);
  }
  console.log(`Official skills@1.7.4 installed all ${files.length} skill files correctly for Claude Code and Codex.`);
} finally { fs.rmSync(temporary, { recursive: true, force: true }); }
