# docs/DEMO_SCRIPT.md — Coqid-game

## 0. Demo Goal

In under 2 minutes, show that Coqid-game can help Codex users identify which plugins are safe, forgotten, or deletion recommended using survival scores and leaderboards.

---

## 1. One-Line Pitch

Coqid-game is a Codex plugin survival dashboard that scores installed plugins and recommends which low-value plugins should be reviewed for deletion without deleting anything automatically.

---

## 2. Demo Flow

### Step 1: Open Coqid-game

Expected:
Dashboard loads with sample plugin contestants.

### Step 2: Show plugin list

Show:
- plugin name
- weekly uses
- monthly uses
- estimated cost
- last used

### Step 3: Run Survival Check

Click:

```txt
Run Survival Check
```

Expected:
Each plugin receives score and status.

### Step 4: Show recommendations

Show three categories:

```txt
SAFE
REMINDER_RECOMMENDED
DELETION_RECOMMENDED
```

Say:

```txt
Coqid-game only recommends deletion review. It never deletes plugins automatically.
```

### Step 5: Show leaderboard

Show weekly and monthly leaderboard.

### Step 6: Show fallback/edge case

Show empty or malformed data state.

Expected:
The app does not crash.

---

## 3. Demo Data

Demo data must include:
- one safe plugin
- one reminder recommended plugin
- one deletion recommended plugin
- one weekly leaderboard winner
- one monthly leaderboard winner

---

## 4. Closing Sentence

Coqid-game turns plugin cleanup into a survival ranking system, helping Codex users keep useful tools, rediscover forgotten ones, and review low-value plugins without destructive automation.

---

## 5. Fallback Demo

If live integration is unavailable:
Use bundled sample data.

If cloud deployment fails:
Use local demo.

If scoring fails:
Show validation report and known failed case.
