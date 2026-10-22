import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

try {
  const args = process.argv.slice(2), separator = args.indexOf('--');
  if (separator < 0) throw new Error('Use --project <folder> --tool taste|impeccable -- <tool arguments>.');
  const options = {};
  for (let i = 0; i < separator; i += 2) {
    if (!['--project', '--tool'].includes(args[i]) || !args[i + 1] || options[args[i]]) throw new Error('Invalid wrapper arguments.');
    options[args[i]] = args[i + 1];
  }
  const project = path.resolve(options['--project'] || '');
  if (!options['--project'] || !fs.existsSync(project) || !fs.statSync(project).isDirectory()) throw new Error('Choose an existing project folder.');
  if (!['taste', 'impeccable'].includes(options['--tool'])) throw new Error('Supported tools: taste, impeccable.');
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const cache = path.join(project, '.colabio-frontend');
  const env = { ...process.env, TASTE_SKILL_HISTORY: path.join(cache, 'taste-history.json'), IMPECCABLE_HOME: path.join(cache, 'impeccable') };
  const toolArgs = args.slice(separator + 1);
  let command, commandArgs;
  if (options['--tool'] === 'taste') {
    command = process.execPath;
    commandArgs = [path.join(root, 'companions/taste/scripts/draw.mjs'), ...toolArgs];
  } else {
    if (!['context', 'detect'].includes(toolArgs[0])) throw new Error('This wrapper supports Impeccable context/detect only; it never installs hooks.');
    const script = path.join(root, 'companions/impeccable/scripts', process.platform === 'win32' ? 'impeccable.cmd' : 'impeccable');
    if (process.platform === 'win32') {
      // cmd parsing requires a separate quoting boundary. Reject shell syntax rather than interpolate it.
      if ([script, ...toolArgs].some((arg) => /["%!?&|<>^\r\n]/.test(arg))) throw new Error('Unsupported shell characters in Impeccable arguments.');
      command = process.env.ComSpec || 'cmd.exe';
      commandArgs = ['/d', '/s', '/c', '"' + [script, ...toolArgs].map((arg) => '"' + arg + '"').join(' ') + '"'];
    } else { command = 'sh'; commandArgs = [script, ...toolArgs]; }
  }
  const result = spawnSync(command, commandArgs, { cwd: project, env, stdio: 'inherit', windowsHide: true,
    windowsVerbatimArguments: process.platform === 'win32' && options['--tool'] === 'impeccable' });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} catch (error) { console.error('Colabio companion: ' + error.message); process.exitCode = 1; }
