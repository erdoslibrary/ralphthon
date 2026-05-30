import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const blockedPatterns = [
  /\bfs\.rm\b/,
  /\bfs\.unlink\b/,
  /\brm\s+-rf\b/,
  /\bdeletePlugin\b/,
  /\bremovePlugin\b/,
  /\bpurgePlugin\b/
];

test("source code does not contain destructive plugin deletion behavior", async () => {
  const files = [
    ...await listSourceFiles("cli"),
    ...await listSourceFiles("src")
  ];

  for (const file of files) {
    const contents = await readFile(file, "utf8");
    for (const pattern of blockedPatterns) {
      assert.doesNotMatch(contents, pattern, `${file} matched ${pattern}`);
    }
  }
});

async function listSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listSourceFiles(path));
    } else if (entry.isFile() && path.endsWith(".js")) {
      files.push(path);
    }
  }

  return files;
}
