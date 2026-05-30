# docs/DEPLOYMENT.md — Coqid-game CLI

## 0. Purpose

Define how to install, test, build, and run Coqid-game as a CLI tool.

---

## 1. Environment Summary

```txt
Project name: Coqid-game
Project type: CLI tool / Codex plugin assistant
Primary interface: terminal CLI
Web server required: NO
Cloud deployment required: NO
Database required: NO
External API required for MVP: NO
Deployment target: Local CLI demo
```

```txt
Primary language: JavaScript
Runtime: Node.js >= 18
Package manager: npm
Test framework: node:test
```

---

## 2. Fresh Setup

```bash
# Open project directory
cd /Users/jyoo/Documents/ralpthon

# Install dependencies
npm install
```

---

## 3. Commands

```bash
# Test
npm test

# Build, if applicable
npm run build

# Smoke/demo rehearsal
npm run smoke

# Run help
node cli/coqid-game.js --help

# Run analyze demo
node cli/coqid-game.js analyze --data ./fixtures/plugins.json

# Run leaderboard demo
node cli/coqid-game.js leaderboard --period weekly --data ./fixtures/plugins.json
```

If the CLI is not globally linked yet, use local runtime command:

```bash
node cli/coqid-game.js analyze --data ./fixtures/plugins.json
```

---

## 4. Required Fixture Files

```txt
fixtures/plugins.json
fixtures/invalid.json
fixtures/malformed.json
fixtures/empty.json
```

Bundled fixtures are the demo baseline. The CLI also accepts the same documented schema from any local JSON file path.

`fixtures/plugins.json` must include at least one plugin for each status:

```txt
SAFE
WATCH
REMIND
DELETE_RECOMMENDED
```

---

## 5. Environment Variables

```txt
Required environment variables: NONE for MVP
```

Reason:

```txt
Coqid-game MVP uses local fixture data and does not call live Codex APIs.
```

---

## 6. Local Demo Mode

```txt
Local demo command: node cli/coqid-game.js analyze --data ./fixtures/plugins.json
Local leaderboard command: node cli/coqid-game.js leaderboard --period weekly --data ./fixtures/plugins.json
Reset method: NOT_REQUIRED; fixture data is read-only
```

---

## 7. Cloud Deployment

```txt
Cloud deployment required: NO
Reason: CLI tool is demonstrated locally in terminal.
```

---

## 8. Smoke Test

Smoke test steps:

```txt
1. Run help command.
2. Run analyze against valid fixture.
3. Confirm survival report appears.
4. Confirm safety notice says no plugins were deleted.
5. Run invalid fixture and confirm controlled error.
```

Automated smoke command:

```bash
npm run smoke
```

---

## 9. Final Fresh Run Procedure

```txt
1. Run `npm install`.
2. Run `npm test`.
3. Run `npm run build`.
4. Run `npm run smoke`.
5. Run `node cli/coqid-game.js --help`.
6. Run `node cli/coqid-game.js analyze --data ./fixtures/plugins.json`.
7. Run `node cli/coqid-game.js leaderboard --period weekly --data ./fixtures/plugins.json`.
8. Run `node cli/coqid-game.js analyze --data ./fixtures/invalid.json`.
9. Record evidence in VALIDATION/VALIDATION_REPORT.md.
```
