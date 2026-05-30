# FINAL_CHECKLIST.md — Coqid-game CLI

## 0. Purpose

Final delivery gate for Coqid-game.

---

## 1. Final Status

```txt
Final status: COMPLETE
Final validator decision: PASS
Submission readiness: READY
Demo readiness: PASS
```

---

## 2. Coqid-game Specific Gates

```txt
[x] CLI help command works
[x] analyze command works with fixtures/plugins.json
[x] survival scores are deterministic
[x] DELETE_RECOMMENDED candidates are shown
[x] REMIND candidates are shown
[x] weekly leaderboard works
[x] monthly leaderboard works
[x] invalid input returns controlled error
[x] no actual deletion command/behavior exists
[x] no web server required for demo
[x] no live external API required for demo
[x] demo completes under 2 minutes
```

---

## 3. Command Evidence

```bash
# Install
npm install

# Test
npm test

# Build
npm run build

# Smoke
npm run smoke

# Help
node cli/coqid-game.js --help

# Analyze
node cli/coqid-game.js analyze --data ./fixtures/plugins.json

# Leaderboard
node cli/coqid-game.js leaderboard --period weekly --data ./fixtures/plugins.json

# Invalid input
node cli/coqid-game.js analyze --data ./fixtures/invalid.json
```

---

## 4. Final Declaration

```txt
Final status:
COMPLETE
Validator decision:
PASS
Evidence:
VALIDATION/VALIDATION_REPORT.md V-001 through V-004
Demo command:
node cli/coqid-game.js analyze --data ./fixtures/plugins.json
Tests:
npm test -> 18 passed, 0 failed
Build:
npm run build -> PASS
Coverage:
P0 behavior coverage PASS; raw line coverage not measured
Known limitations:
Uses local fixture data and estimated cost, not live Codex usage/billing APIs
Accepted risks:
Global `coqid-game` command requires package install/link; local Node command is documented
Submission readiness:
READY
```
