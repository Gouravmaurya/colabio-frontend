import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skip = new Set(['.git', '.cache', 'node_modules', 'dist', 'test-results', 'manifest.json', 'manifest.sha256']);
function walk(dir, prefix = '') {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (skip.has(entry.name)) return [];
    if (entry.isSymbolicLink()) throw new Error('Release must not contain symlinks: ' + prefix + entry.name);
    const rel = prefix + entry.name;
    return entry.isDirectory() ? walk(path.join(dir, entry.name), rel + '/') : [rel];
  });
}
const sha = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const version = JSON.parse(fs.readFileSync(path.join(root, 'package.json'))).version;
const files = walk(root).sort().map((file) => {
  const target = path.join(root, file);
  let bytes = fs.readFileSync(target);
  // Match .gitattributes so Git cannot change shell-script bytes after hashing.
  if (file.endsWith('.sh')) {
    const normalized = Buffer.from(bytes.toString('utf8').replaceAll('\r\n', '\n'));
    if (!bytes.equals(normalized)) { fs.writeFileSync(target, normalized); bytes = normalized; }
  }
  return { path: file, sha256: sha(bytes) };
});
const manifest = JSON.stringify({ schemaVersion: 1, name: 'colabio-frontend', version, files }, null, 2) + '\n';
fs.writeFileSync(path.join(root, 'manifest.json'), manifest);
fs.writeFileSync(path.join(root, 'manifest.sha256'), sha(manifest) + '\n');
console.log(`Manifest built: ${version}, ${files.length} files.`);
