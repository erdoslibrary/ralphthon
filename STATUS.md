# STATUS.md — Coqid-game

## 0. Current Status

Project: Coqid-game

Current phase: FINAL_VALIDATION_PASSED_LOCAL_MVP

Implementation gate: OPEN_WITH_MOCK_DATA

Last updated: 2026-05-30

---

## 1. Product Summary

Coqid-game is a Codex plugin/skill survival dashboard that scores plugins using usage, estimated cost, and recent activity. It recommends low-value plugins for deletion review but never deletes plugins automatically.

---

## 2. Key MVP Decisions

| Decision | Value |
|---|---|
| Product name | Coqid-game |
| Actual deletion | NO |
| Deletion recommendation | YES |
| Real Codex API required | NO |
| Data source | Mock/local plugin data |
| Backend required | NO |
| Leaderboard | Sample weekly/monthly leaderboard |
| Demo target | local dashboard under 2 minutes |

---

## 3. Current Risks

| Risk | Status | Mitigation |
|---|---|---|
| real usage API uncertain | accepted | mock/local data |
| exact cost unavailable | accepted | estimated cost label |
| destructive deletion risk | mitigated | recommendation only |
| leaderboard privacy | mitigated | anonymous sample data |

---

## 4. Next Actions

1. Keep MVP scope aligned with no destructive deletion.
2. Continue frontend/dashboard work on `main`.
3. Coordinate backend/integration experiments on `back` without introducing live API dependency into MVP.
4. Keep final validation evidence current after any future change.
5. Do not merge `back` API/backend behavior unless contracts and validation are updated first.

---

## 4.1 Collaboration Notes

| Area | Owner | Branch / Track | Constraint |
|---|---|---|---|
| dashboard/main MVP | human + agent | main | must preserve mock-data local demo |
| back/integration exploration | teammate | back | must not block local demo |
| destructive plugin actions | none | out of MVP | forbidden for MVP |

Coordination rule:
If `back` introduces API/backend behavior, it must update API_CONTRACT.md, DATA_MODEL.md, TEST_MAPPING.md, VALIDATION/RISK_REGISTER.md, and STATUS.md before merge.

---

## 5. Final Readiness

Current readiness: READY_LOCAL_MVP_EXCLUDING_BACK

Reason:
Local MVP validation passed with mock data. Browser rehearsal confirmed the demo flow, survival-game-inspired visual theme from docs/UI_UX_PROPOSAL.md, dalgona reminder copy, elimination copy, expanded leaderboard badges, My Case / Global Arena separation, plugin info panels, Global Arena plugin URLs, review-only deletion recommendation actions, empty fallback, malformed-data fallback, and no console errors. `back` branch integration remains outside the current ready scope.
