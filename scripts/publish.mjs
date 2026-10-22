// Maintainer-only release command. Never called by installation or ordinary skill use.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { verifyBundle } from './install.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repository = 'Gouravmaurya/colabio-frontend';
const apiBase = 'https://api.github.com';
const git = (args) => execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' } }).trim();

try {
  const manifest = verifyBundle(root), tag = 'v' + manifest.version;
  if (!process.argv.includes('--publish')) throw new Error('Explicit --publish is required. This creates a public repository if absent, pushes main and the version tag, and publishes a release.');
  const credential = spawnSync('git', ['credential', 'fill'], { input: 'protocol=https\nhost=github.com\n\n', encoding: 'utf8', timeout: 15000, env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' } });
  const fields = Object.fromEntries((credential.stdout || '').trim().split('\n').map((line) => { const at = line.indexOf('='); return [line.slice(0, at), line.slice(at + 1)]; }));
  if (!fields.password) throw new Error('No existing GitHub credential. Authenticate Git through your organization-approved credential manager first.');
  const headers = { Authorization: 'Bearer ' + fields.password, Accept: 'application/vnd.github+json', 'User-Agent': 'colabio-release', 'X-GitHub-Api-Version': '2022-11-28' };
  async function api(endpoint, method = 'GET', body) {
    const response = await fetch(apiBase + endpoint, { method, headers: { ...headers, ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined });
    const data = await response.json();
    return { status: response.status, data };
  }
  const profile = await api('/user');
  if (profile.status !== 200 || profile.data.login.toLowerCase() !== 'gouravmaurya') throw new Error('Authenticate as Gouravmaurya before publishing.');
  let repo = await api('/repos/' + repository);
  if (repo.status === 404) {
    repo = await api('/user/repos', 'POST', { name: 'colabio-frontend', private: false, auto_init: false, description: 'One project-local frontend skill coordinating Impeccable, Taste Skill, Hallmark, and design reference research.' });
    if (repo.status !== 201) throw new Error(`Public repository creation rejected (${repo.status}): ${repo.data.message}. Create ${repository} with this account.`);
    console.log('Created public repository: ' + repository);
  }
  if (![200, 201].includes(repo.status) || repo.data.private !== false || repo.data.permissions?.push === false) throw new Error('Target repository must be public and writable. No visibility changes are performed.');
  if (!fs.existsSync(path.join(root, '.git'))) git(['init', '-b', 'main']);
  git(['config', 'core.autocrlf', 'false']);
  const remote = spawnSync('git', ['-C', root, 'remote', 'get-url', 'origin'], { encoding: 'utf8' });
  const expectedRemote = 'https://github.com/' + repository + '.git';
  if (remote.status !== 0) git(['remote', 'add', 'origin', expectedRemote]);
  else if (remote.stdout.trim() !== expectedRemote) throw new Error('Unexpected origin; refusing to change it.');
  const stagedFiles = manifest.files.map((entry) => entry.path).concat('manifest.json', 'manifest.sha256');
  for (let index = 0; index < stagedFiles.length; index += 30) git(['add', '--', ...stagedFiles.slice(index, index + 30)]);
  if (git(['diff', '--cached', '--name-only'])) git(['commit', '-m', 'feat: release coordinated Colabio Frontend ' + tag]);
  const existingTag = spawnSync('git', ['-C', root, 'rev-parse', '--verify', 'refs/tags/' + tag], { encoding: 'utf8' });
  if (existingTag.status !== 0) git(['tag', '-a', tag, '-m', 'Colabio Frontend ' + tag]);
  else if (git(['rev-list', '-n', '1', tag]) !== git(['rev-parse', 'HEAD'])) throw new Error('Existing version tag points to another commit; bump the version rather than moving it.');
  git(['-c', 'http.version=HTTP/1.1', '-c', 'http.postBuffer=52428800', 'push', 'origin', 'main', 'refs/tags/' + tag]);
  let release = await api('/repos/' + repository + '/releases/tags/' + tag);
  if (release.status === 404) release = await api('/repos/' + repository + '/releases', 'POST', {
    tag_name: tag, name: 'Colabio Frontend ' + tag, draft: false, prerelease: false,
    body: fs.readFileSync(path.join(root, 'RELEASE-NOTES.md'), 'utf8')
  });
  if (![200, 201].includes(release.status)) throw new Error(`Release publishing failed (${release.status}): ${release.data.message}. Tag push may already have succeeded; inspect before retrying.`);
  console.log(JSON.stringify({ repository: repo.data.html_url, private: repo.data.private, release: release.data.html_url, tag, commit: git(['rev-parse', 'HEAD']) }, null, 2));
} catch (error) { console.error('Colabio publish: ' + error.message); process.exitCode = 1; }
