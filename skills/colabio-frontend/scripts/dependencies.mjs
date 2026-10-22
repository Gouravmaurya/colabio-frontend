import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const lockManagers = { 'package-lock.json': 'npm', 'npm-shrinkwrap.json': 'npm', 'pnpm-lock.yaml': 'pnpm', 'yarn.lock': 'yarn', 'bun.lock': 'bun', 'bun.lockb': 'bun' };
function managerFor(project, manifest) {
  if (manifest.packageManager) {
    const manager = manifest.packageManager.split('@')[0];
    if (!['npm', 'pnpm', 'yarn', 'bun'].includes(manager)) throw new Error('Unsupported package manager: ' + manager);
    return manager;
  }
  let cursor = project;
  for (;;) {
    const found = [...new Set(Object.entries(lockManagers).filter(([file]) => fs.existsSync(path.join(cursor, file))).map(([, manager]) => manager))];
    if (found.length > 1) throw new Error('Multiple package-manager lock files found. Resolve the intended manager before installing.');
    if (found.length) return found[0];
    const parent = path.dirname(cursor);
    if (parent === cursor) return 'npm';
    const parentPackage = path.join(parent, 'package.json');
    if (fs.existsSync(parentPackage)) {
      const data = JSON.parse(fs.readFileSync(parentPackage, 'utf8'));
      if (data.packageManager) return managerFor(parent, data);
    }
    cursor = parent;
  }
}

export function planDependencies({ project, gsap = false, lenis = false, reactMotion = false } = {}) {
  if (!project) throw new Error('Specify the implementation package with --project <folder>.');
  const cwd = path.resolve(project), manifestPath = path.join(cwd, 'package.json');
  if ([os.homedir(), path.parse(cwd).root].some((root) => path.resolve(root).toLowerCase() === cwd.toLowerCase())) throw new Error('Choose an application package, not a home directory or drive root.');
  if (!fs.existsSync(manifestPath)) throw new Error('Target needs its own package.json. Identify or scaffold the implementation package first.');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (manifest.name === 'colabio-frontend' && fs.existsSync(path.join(cwd, 'sources.lock.json'))) throw new Error('Choose the website project, not the Colabio distribution.');
  const deps = { ...manifest.devDependencies, ...manifest.dependencies };
  const requested = [], omitted = [];
  if (gsap) requested.push('gsap');
  if (lenis) requested.push('lenis');
  if (reactMotion) {
    if (!deps.react) omitted.push('React Motion skipped: the target does not declare React. Do not migrate frameworks merely to add it.');
    else requested.push(deps['framer-motion'] ? 'framer-motion' : deps.motion ? 'motion' : 'framer-motion');
  }
  const missing = requested.filter((name) => !deps[name]);
  const reused = requested.filter((name) => deps[name]);
  const require = createRequire(manifestPath);
  const unresolved = reused.filter((name) => { try { require.resolve(name); return false; } catch { return true; } });
  const manager = managerFor(cwd, manifest);
  let args = missing.length ? [manager === 'npm' ? 'install' : 'add', ...missing] : unresolved.length ? ['install'] : [];
  if (args.length && manager === 'pnpm' && fs.existsSync(path.join(cwd, 'pnpm-workspace.yaml'))) args.push('--workspace-root');
  return { project: cwd, manager, args, missing, reused, unresolved, omitted, status: args.length ? 'install-needed' : 'ready' };
}

export function applyDependencies(plan, run = spawnSync) {
  if (!plan.args.length) return { ...plan, status: 'unchanged' };
  // Command names and arguments originate only from the fixed allow-list above.
  const args = plan.args;
  const allowed = new Set(['install', 'add', 'gsap', 'lenis', 'framer-motion', 'motion', '--workspace-root']);
  if (!['npm', 'pnpm', 'yarn', 'bun'].includes(plan.manager) || args.some((arg) => !allowed.has(arg))) throw new Error('Unsafe package-manager command.');
  const windows = process.platform === 'win32';
  const command = windows ? (process.env.ComSpec || 'cmd.exe') : plan.manager;
  const commandArgs = windows ? ['/d', '/s', '/c', [plan.manager, ...args].join(' ')] : args;
  const result = run(command, commandArgs, { cwd: plan.project, stdio: 'inherit', windowsHide: true });
  if (result.error || result.status !== 0) throw new Error('Dependency installation failed. Check package-manager availability, registry access, and peer compatibility. Do not use --force or --legacy-peer-deps automatically.');
  const require = createRequire(path.join(plan.project, 'package.json'));
  for (const name of [...plan.missing, ...plan.reused]) {
    try { require.resolve(name); } catch { throw new Error('Package still unavailable after installation: ' + name); }
  }
  return { ...plan, status: 'installed' };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2), options = {};
    let install = false;
    for (let i = 0; i < args.length; i++) {
      const flag = args[i];
      if (flag === '--project') { options.project = args[++i]; if (!options.project || options.project.startsWith('--')) throw new Error('Missing --project value.'); }
      else if (flag === '--gsap') options.gsap = true;
      else if (flag === '--lenis') options.lenis = true;
      else if (flag === '--react-motion') options.reactMotion = true;
      else if (flag === '--install') install = true;
      else throw new Error('Unknown option: ' + flag);
    }
    const plan = planDependencies(options);
    console.log(JSON.stringify(install ? applyDependencies(plan) : plan, null, 2));
  } catch (error) { console.error('Colabio dependencies: ' + error.message); process.exitCode = 1; }
}
