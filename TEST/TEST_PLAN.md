# TEST/TEST_PLAN.md — Coqid-game CLI

## 0. Purpose

Define the CLI-focused test strategy for Coqid-game.

---

## 1. Test Philosophy

```txt
Test deterministic behavior first.
Test scoring engine and CLI output before polish.
Do not rely on live Codex APIs.
Never skip the no-deletion safety test.
```

---

## 2. Required Test Types

| Type | Purpose | Required? |
|---|---|---:|
| Unit tests | scoring, recommendation, validation, leaderboard sorting | YES |
| CLI integration tests | command execution and output | YES |
| Fixture tests | valid/invalid JSON handling | YES |
| Static inspection | ensure no destructive deletion command | YES |
| Manual demo | under-2-minute terminal demo | YES |

---

## 3. P0 Test Cases

| Test ID | Name | Type | Related AC |
|---|---|---|---|
| TEST-001 | help command prints usage | CLI smoke | AC-001 |
| TEST-002 | analyze reads valid fixture | CLI integration | AC-002 |
| TEST-003 | scoring is deterministic | Unit | AC-003 |
| TEST-004 | low-value plugin is delete recommended | Unit/CLI | AC-004 |
| TEST-005 | forgotten useful plugin is reminder candidate | Unit/CLI | AC-005 |
| TEST-006 | weekly leaderboard sorts correctly | Unit/CLI | AC-006 |
| TEST-007 | monthly leaderboard sorts correctly | Unit/CLI | AC-006 |
| TEST-008 | missing data file returns controlled error | CLI error | AC-007 |
| TEST-009 | malformed JSON returns controlled error | CLI error | AC-007 |
| TEST-010 | no actual deletion behavior exists | Static/integration | AC-008 |
| TEST-011 | demo script completes under 2 minutes | Manual | AC-009 |

---

## 4. Suggested Commands

```bash
# Install
npm install

# Unit tests
npm test

# CLI integration tests
npm test

# Full test suite
npm test

# Build check
npm run build

# Smoke demo
npm run smoke

# Run help
node cli/coqid-game.js --help

# Demo analyze
node cli/coqid-game.js analyze --data ./fixtures/plugins.json

# Demo leaderboard
node cli/coqid-game.js leaderboard --period weekly --data ./fixtures/plugins.json
```

---

## 5. Test Data Requirements

```txt
fixtures/plugins.json must contain SAFE, WATCH, REMIND, and DELETE_RECOMMENDED examples.
fixtures/invalid.json must be schema-invalid.
fixtures/malformed.json must be syntactically invalid JSON.
fixtures/empty.json must test empty data behavior.
```

---

## 6. Final Minimum Test Requirement

```txt
[x] CLI help works
[x] analyze command works
[x] scoring tests pass
[x] recommendation tests pass
[x] leaderboard tests pass
[x] invalid data tests pass
[x] no-deletion safety test passes
[x] demo rehearsal passes
```
