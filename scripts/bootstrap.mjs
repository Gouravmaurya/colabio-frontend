import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL, fileURLToPath } from 'node:url';

export async function bootstrap({ project, repository = 'https://github.com/Gouravmaurya/colabio-frontend.git', version = 'v1.3.0', git = spawnSync } = {}) {
  if (Number(process.versions.node.split('.')[0]) < 22) throw new Error('Node.js 22+ is required.');
  if (!project || !fs.existsSync(project) || !fs.statSync(project).isDirectory()) throw new Error('Specify an existing project with --project <folder>.');
  if (!/^v\d+\.\d+\.\d+$/.test(version)) throw new Error('Use a tagged version such as v1.3.0.');
  if (/^https?:/.test(repository)) {
    const url = new URL(repository);
    if (url.protocol !== 'https:' || url.hostname !== 'github.com' || url.username || url.password || url.search || url.hash) throw new Error('Use a credential-free HTTPS GitHub repository URL.');
  } else if (!path.isAbsolute(repository)) throw new Error('Repository must be a GitHub HTTPS URL or an absolute local checkout path.');
  const available = git('git', ['--version'], { encoding: 'utf8', timeout: 10000 });
  if (available.error || available.status !== 0) throw new Error('Git is required. Install Git and authenticate to your private organization repository.');
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'colabio-download-'));
  try {
    const checkout = path.join(temporary, 'bundle');
    const result = git('git', ['-c', 'core.autocrlf=false', 'clone', '--depth', '1', '--single-branch', '--branch', version, '--', repository, checkout], {
      encoding: 'utf8', timeout: 120000,
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' }
    });
    if (result.error || result.status !== 0) throw new Error('Download failed or was interrupted. Verify GitHub organization/SSO access and the release tag, then retry. Existing project skills were not changed.');
    const { verifyBundle, install } = await import(pathToFileURL(path.join(checkout, 'scripts/install.mjs')));
    const manifest = verifyBundle(checkout);
    if ('v' + manifest.version !== version) throw new Error('Release tag and manifest version do not match.');
    return install({ root: checkout, project });
  } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2), options = {};
    for (let i = 0; i < args.length; i += 2) {
      const flag = args[i], value = args[i + 1];
      if (!['--project', '--repository', '--version'].includes(flag) || !value || value.startsWith('--') || options[flag.slice(2)]) throw new Error('Usage: node scripts/bootstrap.mjs --project <folder> [--version v1.3.0]');
      options[flag.slice(2)] = value;
    }
    console.log(JSON.stringify(await bootstrap(options), null, 2));
  } catch (error) { console.error(`Colabio: ${error.message}`); process.exitCode = 1; }
}
