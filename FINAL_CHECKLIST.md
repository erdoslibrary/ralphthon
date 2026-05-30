# FINAL_CHECKLIST.md — Coqid-game

## 0. Final Readiness Checklist

### Product

```txt
[x] Product name is Coqid-game
[x] MVP uses deletion recommendation only
[x] No actual plugin deletion exists
[x] Mock/local data demo works in initial smoke validation
```

### Requirements

```txt
[x] PRD completed
[x] Acceptance Criteria completed
[x] Ambiguity Score <= 0.10
[x] API decision: no API required for MVP
[x] Data decision: mock/local data
[x] UI states defined
```

### Tests

```txt
[x] scoring tests pass
[x] status classification tests pass
[x] leaderboard tests pass
[x] empty/malformed data tests pass
[x] no-deletion static/integration check passes
[x] smoke test passes
```

### Demo

```txt
[x] demo under 2 minutes
[x] Run Survival Check works in browser rehearsal
[x] SAFE shown in browser rehearsal
[x] REMINDER_RECOMMENDED shown in browser rehearsal
[x] DELETION_RECOMMENDED shown in browser rehearsal
[x] review-only deletion actions shown in browser rehearsal
[x] survival-game-inspired theme shown in browser rehearsal
[x] My Case and Global Arena visually separated
[x] plugin info panels shown in browser rehearsal
[x] Global Arena plugin URLs shown in browser rehearsal
[x] dalgona mission copy shown in browser rehearsal
[x] expanded leaderboard badges shown in browser rehearsal
[x] Weekly / Monthly transition checked in browser rehearsal
[x] leaderboard shown in browser rehearsal
[x] fallback/empty state shown in browser rehearsal
[x] malformed-data fallback shown in browser rehearsal
```

### Final Decision

```txt
Final status: READY_LOCAL_MVP_EXCLUDING_BACK
Validator decision: PASS_LOCAL_MVP_WITH_ACCEPTED_BACK_SCOPE_RISK
Submission readiness: READY_FOR_LOCAL_MVP_DEMO
```

Automated validation and browser rehearsal passed on 2026-05-30. `back` branch integration remains outside final local MVP readiness.
