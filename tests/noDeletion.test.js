import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const bannedDeletionPatterns = [
  /\buninstall\b/i,
  /\bdeletePlugin\b/,
  /\bremovePlugin\b/,
  /\bdisablePlugin\b/,
  /\bexec\s*\(/,
  /\bunlink\s*\(/,
  /\brm\s+-/
];

test("MVP source contains no actual plugin deletion path", async () => {
  const files = await listFiles("src");
  const checked = [];

  for (const file of files) {
    const content = await readFile(file, "utf8");
    checked.push(file);
    for (const pattern of bannedDeletionPatterns) {
      assert.equal(pattern.test(content), false, `${pattern} found in ${file}`);
    }
  }

  assert.ok(checked.length > 0);
});

test("deletion recommendation UI exposes review-only actions", async () => {
  const app = await readFile("src/app.js", "utf8");

  assert.match(app, /Mark as Reviewed/);
  assert.match(app, /Keep for Now/);
  assert.match(app, /Add to Cleanup List/);
  assert.match(app, /No deletion action exists/);
});

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(path)));
    } else if (/\.(js|css|html)$/.test(entry.name)) {
      files.push(path);
    }
  }

  return files;
}
