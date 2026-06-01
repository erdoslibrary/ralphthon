# SPEC/UI_STATES.md — Coqid-game CLI Output States

## 0. Purpose

Coqid-game has no graphical web UI for MVP. This file defines equivalent CLI output states.

---

## 1. UI Decision

```txt
Graphical UI required: NO
CLI output states required: YES
Reason: User requested plugin/CLI-based workflow.
```

---

## 2. CLI Output States

| State ID | State | Required? | Related AC | Test Required |
|---|---|---:|---|---|
| CLI-STATE-001 | Help output | YES | AC-001 | YES |
| CLI-STATE-002 | Initial analysis output | YES | AC-002 | YES |
| CLI-STATE-003 | Survival report output | YES | AC-003/AC-004/AC-005 | YES |
| CLI-STATE-004 | Deletion recommendation output | YES | AC-004/AC-008 | YES |
| CLI-STATE-005 | Reminder candidate output | YES | AC-005 | YES |
| CLI-STATE-006 | Leaderboard output | YES | AC-006 | YES |
| CLI-STATE-007 | Invalid input error output | YES | AC-007 | YES |
| CLI-STATE-008 | Demo-ready fixture output | YES | AC-009 | YES |
| CLI-STATE-009 | Interactive plugin detail output | YES | AC-002/AC-004/AC-005/AC-008 | YES |

---

## 3. Required Output Sections

Analyze command should print:

```txt
Coqid-game Survival Report
Summary
Plugin Rankings
Deletion Recommendations
Reminder Candidates
Safety Notice: No plugins were deleted.
Interactive prompt for rank selection and quit command.
```

Leaderboard command should print:

```txt
Coqid-game Leaderboard
Period: weekly/monthly
Rank | Plugin | Usage | Survival Score | Status
```

Error output should print:

```txt
Error: [controlled message]
Hint: [how to fix]
Exit code: non-zero
```

---

## 4. Output Copy Rules

Required safety copy:

```txt
Recommendation only. Coqid-game does not delete plugins automatically.
```

Forbidden misleading copy:

```txt
Executed deletion
Plugin removed
Purge complete
```

---

## 5. CLI State Flow

```txt
Help
  -> Analyze command
  -> Data validation
  -> Survival report
  -> Deletion recommendations / Reminder candidates
  -> Leaderboard command
  -> Controlled error demo
```

Failure flow:

```txt
Command
  -> Invalid data / missing file / bad period
  -> Controlled error output
  -> Non-zero exit code
```

---

## 6. CLI State Tests

```txt
[x] help output includes analyze and leaderboard
[x] analyze output includes survival report
[x] analyze output includes DELETE_RECOMMENDED candidate
[x] analyze output includes REMIND candidate
[x] analyze output includes no-delete safety notice
[x] leaderboard output includes sorted ranks
[x] analyze table columns are aligned
[x] entering a rank shows plugin detail and delete/keep choices
[x] quit command exits the interactive session
[x] invalid data output includes controlled error and non-zero exit
```
