# SPEC/API_CONTRACT.md — Coqid-game CLI Contract

## 0. Purpose

Define the CLI, local data, and output contracts for Coqid-game.

No HTTP API is required for the MVP.

---

## 1. API Decision

```txt
HTTP API required: NO
Backend required: NO
External Codex API required for MVP: NO
CLI interface required: YES
```

Reason:

```txt
The MVP is a local CLI plugin assistant that reads local/mock plugin usage data and prints recommendations.
```

---

## 2. CLI Commands

### CLI-001: Help

```bash
coqid-game --help
```

Expected:

```txt
Prints usage, available commands, options, and exits 0.
```

---

### CLI-002: Analyze plugins

```bash
coqid-game analyze --data ./fixtures/plugins.json
coqid-game analyze --data ./fixtures/plugins.json --interactive
```

Options:

| Option | Required? | Description |
|---|---:|---|
| `--data <path>` | YES | Path to local plugin usage JSON |
| `--format table|json` | NO | Output format; default table |
| `--threshold <number>` | NO | Delete recommendation threshold |
| `--interactive` | NO | Force rank-selection detail loop |
| `--no-interactive` | NO | Disable TTY interactive mode |

Success output must include:

```txt
- plugin name
- weekly uses
- monthly uses
- estimated cost
- last used
- survival score
- status
- reason
```

Exit code:

```txt
0 on success
1 on validation or input error
2 on unexpected internal error
```

Interactive behavior:

```txt
In a terminal TTY, analyze stays open after the ranking table.
Users enter a rank number to view plugin details, usage, role/category, recommendation reason, and recommendation-only delete/keep choices.
The session exits only when the user types quit, q, exit, end, done, stop, 종료, or 끝.
No delete/keep choice performs filesystem deletion.
```

Compatibility alias:

```bash
coquid-game analyze --data ./fixtures/plugins.json
```

---

### CLI-003: Leaderboard

```bash
coqid-game leaderboard --period weekly --data ./fixtures/plugins.json
coqid-game leaderboard --period monthly --data ./fixtures/plugins.json
```

Options:

| Option | Required? | Description |
|---|---:|---|
| `--period weekly|monthly` | YES | Ranking period |
| `--data <path>` | YES | Path to local plugin usage JSON |
| `--sort score|usage|efficiency` | NO | Sort mode; default score |

Success output must include:

```txt
- rank
- plugin name
- period
- usage count
- survival score
- status
```

---

## 3. Forbidden CLI Contract

The MVP must not expose destructive deletion commands.

Forbidden:

```bash
coqid-game delete
coqid-game purge
coqid-game remove
```

Any actual deletion behavior must be rejected by Validator.

---

## 4. Local Data Contract

Input file shape:

```json
{
  "generatedAt": "2026-05-30T00:00:00.000Z",
  "plugins": [
    {
      "id": "plugin-linter",
      "name": "Linter Helper",
      "category": "quality",
      "weeklyUses": 18,
      "monthlyUses": 64,
      "estimatedCost": 12,
      "lastUsedDaysAgo": 1,
      "usefulnessSignal": 0.9
    }
  ]
}
```

Required plugin fields:

```txt
id: non-empty string
name: non-empty string
weeklyUses: number >= 0
monthlyUses: number >= 0
estimatedCost: number >= 0
lastUsedDaysAgo: number >= 0
usefulnessSignal: number between 0 and 1
```

---

## 5. Output Contract

### Table output

Human-readable terminal output should include sections:

```txt
Coqid-game Survival Report
Deletion Recommendations
Reminder Candidates
Leaderboard Summary
```

### JSON output

```json
{
  "ok": true,
  "data": {
    "plugins": [
      {
        "id": "plugin-linter",
        "name": "Linter Helper",
        "survivalScore": 88,
        "status": "SAFE",
        "reason": "High usage and strong efficiency"
      }
    ]
  }
}
```

### Error output

```json
{
  "ok": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Data file is missing or invalid."
  }
}
```

Error codes:

```txt
INVALID_INPUT
FILE_NOT_FOUND
INVALID_JSON
SCHEMA_INVALID
INTERNAL_ERROR
```

---

## 6. Contract Tests Required

```txt
[x] `--help` exits 0 and shows commands
[x] analyze valid fixture exits 0
[x] analyze invalid fixture exits non-zero with controlled error
[x] leaderboard weekly sorts correctly
[x] leaderboard monthly sorts correctly
[x] no destructive delete command exists
[x] JSON output matches schema if `--format json` is used
```
