# TEST/TEST_MAPPING.md — Coqid-game CLI

## 0. Purpose

Map Coqid-game acceptance criteria to concrete CLI tests, commands, and evidence.

---

## 1. Core Mapping Table

| AC ID | Related Req | Priority | Test ID | Type | Test File/Step | Command | Expected Result | Evidence | Status |
|---|---|---:|---|---|---|---|---|---|---|
| AC-001 | FR-001 | P0 | TEST-001 | CLI_SMOKE | `tests/cli.test.js` | `node cli/coqid-game.js --help` | help shows analyze/leaderboard | VALIDATION_REPORT.md V-001 | PASS |
| AC-002 | FR-002 | P0 | TEST-002 | CLI_INTEGRATION | `tests/cli.test.js` | `node cli/coqid-game.js analyze --data fixtures/plugins.json` | valid data loaded | VALIDATION_REPORT.md V-001 | PASS |
| AC-003 | FR-003 | P0 | TEST-003 | UNIT | `tests/scoring.test.js` | `npm test` | deterministic score | VALIDATION_REPORT.md V-001 | PASS |
| AC-004 | FR-004 | P0 | TEST-004 | UNIT/CLI | `tests/scoring.test.js`, `tests/cli.test.js` | `npm test` | low-value plugin marked DELETE_RECOMMENDED | VALIDATION_REPORT.md V-001 | PASS |
| AC-005 | FR-005 | P0 | TEST-005 | UNIT/CLI | `tests/scoring.test.js`, `tests/cli.test.js` | `npm test` | forgotten useful plugin marked REMIND | VALIDATION_REPORT.md V-001 | PASS |
| AC-006 | FR-006 | P0 | TEST-006/007 | UNIT/CLI | `tests/scoring.test.js`, `tests/cli.test.js` | `node cli/coqid-game.js leaderboard --period weekly/monthly --data fixtures/plugins.json` | sorted leaderboard | VALIDATION_REPORT.md V-001 | PASS |
| AC-007 | FR-007 | P0 | TEST-008/009 | CLI_ERROR | `tests/cli.test.js`, `tests/validation.test.js` | `npm test` | controlled errors for invalid schema, malformed JSON, missing file, and empty data | VALIDATION_REPORT.md V-001 | PASS |
| AC-008 | FR-008 | P0 | TEST-010 | STATIC/INTEGRATION | `tests/noDeletion.test.js` | `npm test` | no destructive delete behavior | VALIDATION_REPORT.md V-001 | PASS |
| AC-009 | NFR-002 | P0 | TEST-011 | SMOKE_DEMO | `scripts/smoke.mjs` | `/usr/bin/time -p npm run smoke` | demo path under 2 min | VALIDATION_REPORT.md V-002 | PASS |

---

## 2. Command Mapping

```bash
# Install
npm install

# Full test
npm test

# CLI help
node cli/coqid-game.js --help

# Analyze
node cli/coqid-game.js analyze --data ./fixtures/plugins.json

# Leaderboard weekly
node cli/coqid-game.js leaderboard --period weekly --data ./fixtures/plugins.json

# Leaderboard monthly
node cli/coqid-game.js leaderboard --period monthly --data ./fixtures/plugins.json

# Invalid input
node cli/coqid-game.js analyze --data ./fixtures/invalid.json
```

---

## 3. Destructive Behavior Inspection

Static inspection should check for destructive operations tied to plugin paths.

Examples to inspect:

```txt
rm -rf
fs.rm
fs.unlink
deletePlugin
removePlugin
purge
```

Expected result:

```txt
No MVP command performs destructive deletion of plugin/skill files or configs.
```
