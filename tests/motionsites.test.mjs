import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

test('MotionSites bundles the pinned MIT subset with unchanged upstream files', () => {
  const pin = JSON.parse(fs.readFileSync('sources.lock.json', 'utf8')).sources
    .find((source) => source.id === 'motionsites-web-builder');
  assert.ok(pin);
  const root = pin.bundledPath;
  const files = fs.readdirSync(root, { recursive: true, withFileTypes: true }).filter((entry) => entry.isFile());
  assert.equal(files.length, pin.files);
  for (const [relative, expected] of Object.entries(pin.unmodifiedFiles)) {
    const bytes = fs.readFileSync(path.join(root, relative));
    const hash = crypto.createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
    assert.equal(hash, expected, relative + ' differs from the pinned upstream blob');
  }
  assert.ok(fs.existsSync(path.join(root, 'GUIDE.md')));
  for (const omitted of ['SKILL.md', 'examples', 'media']) {
    assert.equal(fs.existsSync(path.join(root, omitted)), false, omitted + ' must not be redistributed');
  }
});
