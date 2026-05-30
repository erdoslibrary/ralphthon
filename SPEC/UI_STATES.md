# SPEC/UI_STATES.md — Coqid-game

## 0. UI Decision

User-facing UI required:

```txt
YES
```

Coqid-game is a dashboard product.

---

## 1. Required UI States

| State | Required? | Purpose |
|---|---|---|
| Initial state | YES | app opened and ready |
| Empty state | YES | no plugin data |
| Plugin list state | YES | show contestants/plugins |
| Scoring/loading state | YES | survival check running |
| Success state | YES | scores and statuses visible |
| Deletion recommended state | YES | show candidates for review |
| Reminder recommended state | YES | show forgotten useful plugins |
| Leaderboard state | YES | weekly/monthly ranking |
| Malformed data error state | YES | safe fallback |

---

## 2. Initial State

User sees:
- Coqid-game title
- short explanation
- Run Survival Check button
- plugin contestant list or load sample data action

---

## 3. Empty State

Message:

```txt
No plugins have entered the arena yet. Load sample data to run a survival check.
```

Actions:
- Load Sample Plugins

---

## 4. Plugin List State

Each plugin card shows:
- plugin name
- weekly uses
- monthly uses
- estimated cost
- last used date
- current status area

Visual grouping:
- This area is labeled as the personal use case / My Case.
- It must be visually distinct from the global leaderboard area.

---

## 5. Scoring State

When user clicks Run Survival Check:

User sees:

```txt
Running survival check...
```

Exit:
- success state
- error/fallback state

No infinite loading.

---

## 6. Success State

User sees:
- survival score for each plugin
- SAFE / REMINDER_RECOMMENDED / DELETION_RECOMMENDED status
- reasons for recommendation
- weekly/monthly leaderboard

---

## 7. Deletion Recommended State

For low-value plugins:

Label:

```txt
Deletion Recommended
```

Important copy:

```txt
Coqid-game only recommends review. It does not delete plugins automatically.
```

Actions:
- Mark as Reviewed
- Keep for Now
- Add to Cleanup List

No actual deletion action.

---

## 8. Reminder Recommended State

For useful but forgotten plugins:

Label:

```txt
Reminder Recommended
```

Copy:

```txt
This plugin may still be useful. Try using it again before removing it.
```

---

## 9. Leaderboard State

Tabs:
- Weekly
- Monthly

Leaderboard rows:
- rank
- plugin name
- score
- badge

Badges:
- Most Used
- Most Efficient
- Most Endangered

Visual grouping:
- This area is labeled as the worldwide case / Global Arena.
- It uses anonymous sample rankings and must not imply live production telemetry.

---

## 10. Error / Fallback State

If data is malformed:

```txt
Some plugin data could not be scored. Load sample data or check the input format.
```

The app must not crash.

---

## 11. Demo-Ready State

The app must start with deterministic sample data or a visible Load Sample Data button.

Demo must be possible in under 2 minutes.
