# docs/DEMO_SCRIPT.md — Coqid-game CLI Demo

## 0. Purpose

Define the under-2-minute terminal demo for Coqid-game.

---

## 1. Demo Status

```txt
Document status: FINAL
Demo readiness: PASS
Interface: CLI
Web UI: NO
Validator decision: PASS
```

---

## 2. Demo Goal

```txt
In under 2 minutes, show that a Codex user can analyze local plugin/skill usage data and receive deletion recommendations, reminder candidates, and weekly/monthly rankings without deleting anything.
```

---

## 3. One-Line Pitch

```txt
We built Coqid-game, a CLI plugin assistant that ranks Codex plugins and recommends which low-value plugins should be deleted or remembered.
```

---

## 4. Required Commands

```bash
# Help
node cli/coqid-game.js --help

# Analyze
node cli/coqid-game.js analyze --data ./fixtures/plugins.json

# Weekly leaderboard
node cli/coqid-game.js leaderboard --period weekly --data ./fixtures/plugins.json

# Monthly leaderboard
node cli/coqid-game.js leaderboard --period monthly --data ./fixtures/plugins.json

# Invalid input demo
node cli/coqid-game.js analyze --data ./fixtures/invalid.json
```

---

## 5. Demo Flow

### Step 1: Show CLI entry point

Command:

```bash
node cli/coqid-game.js --help
```

Expected:

```txt
Help output shows analyze and leaderboard commands.
```

Related AC: AC-001

---

### Step 2: Run survival analysis

Command:

```bash
node cli/coqid-game.js analyze --data ./fixtures/plugins.json
```

Expected:

```txt
Terminal prints Coqid-game Survival Report with plugin rankings, scores, statuses, and reasons.
```

Related AC: AC-002, AC-003, AC-004, AC-005

---

### Step 3: Point out deletion recommendations

Expected visible output:

```txt
DELETE_RECOMMENDED candidates are shown with reasons.
Safety notice says no plugins were deleted.
```

Related AC: AC-004, AC-008

---

### Step 4: Point out reminder candidates

Expected visible output:

```txt
REMIND candidates are shown for forgotten but useful plugins.
```

Related AC: AC-005

---

### Step 5: Show leaderboard

Command:

```bash
node cli/coqid-game.js leaderboard --period weekly --data ./fixtures/plugins.json
```

Expected:

```txt
Weekly leaderboard is sorted and visible.
```

Related AC: AC-006

---

### Step 6: Show controlled failure

Command:

```bash
node cli/coqid-game.js analyze --data ./fixtures/invalid.json
```

Expected:

```txt
CLI prints controlled error and exits non-zero; no crash.
```

Related AC: AC-007

---

## 6. Closing Sentence

```txt
Coqid-game does not delete anything automatically. It gives Codex users a clear, testable survival ranking so they can decide which plugins to keep, remember, or remove.
```

---

## 7. Fallback Demo

If the installed binary command is not available, use runtime command equivalent:

```bash
node cli/coqid-game.js analyze --data ./fixtures/plugins.json
```

Fallback still must show:

```txt
- analysis output
- deletion recommendations
- reminder candidates
- leaderboard
- invalid data handling
```

## 8. Rehearsal Evidence

```txt
Command: /usr/bin/time -p npm run smoke
Result: PASS
Elapsed: real 2.97 seconds
Evidence location: VALIDATION/VALIDATION_REPORT.md V-004
```
