import { readFile } from "node:fs/promises";

const index = await readFile("index.html", "utf8");
const app = await readFile("src/app.js", "utf8");

const requiredText = [
  "Coqid-game",
  "Run Survival Check",
  "Deletion Recommended",
  "It does not delete"
];

for (const text of requiredText) {
  if (!index.includes(text) && !app.includes(text)) {
    throw new Error(`Smoke text missing: ${text}`);
  }
}

console.log("Smoke inspection passed: dashboard entry text and safety copy found.");
