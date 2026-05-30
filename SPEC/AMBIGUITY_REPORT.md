# SPEC/AMBIGUITY_REPORT.md — Coqid-game CLI

## 0. Purpose

Track ambiguity before implementation. Implementation is forbidden while Ambiguity Score is above 0.10.

---

## 1. Current Ambiguity Status

```txt
Current Ambiguity Score: 0.08
Target Score: <= 0.10
Ideal Score: <= 0.05
Implementation Gate: OPEN_WITH_RISKS
Validator Decision: PENDING
```

Reason:

```txt
The product direction is now clear: Coqid-game is a CLI plugin assistant that recommends deletion candidates only. Remaining uncertainty is mostly around actual Codex plugin metadata availability, so MVP uses local/mock data.
```

---

## 2. Resolved Ambiguities

| ID | Ambiguity | Resolution |
|---|---|---|
| A-001 | Product name | Coqid-game |
| A-002 | Web or CLI | CLI-first |
| A-003 | Actual deletion or recommendation | Recommendation only |
| A-004 | Real Codex usage API required | No, local/mock data for MVP |
| A-005 | Real plugin-level coin/token cost required | No, estimatedCost field for MVP |
| A-006 | Leaderboard data source | Local/sample anonymous data for MVP |
| A-007 | UI state format | CLI output states, not graphical UI |

---

## 3. Remaining Ambiguities

| ID | Ambiguity | Severity | Mitigation |
|---|---|---|---|
| A-008 | Exact Codex plugin file/metadata format | Medium | Use fixture schema and adapter later |
| A-009 | Exact package manager / runtime | Medium | Decide during repository inspection |
| A-010 | Whether this is Node, Python, or Go CLI | Medium | Prefer fastest stack; update DEPLOYMENT.md |
| A-011 | Real Codex plugin API availability | High | Out of scope for MVP |

---

## 4. Socratic Answers

```txt
Q: What is the smallest demo that proves value?
A: Run CLI against fixture data and show deletion recommendations, reminder candidates, leaderboard, and invalid input handling.

Q: What must not be built?
A: Web dashboard, real deletion, auth, live Codex usage sync, cloud backend.

Q: What data is required?
A: Local JSON plugin usage fixture with plugin name, usage counts, last-used date, estimated cost, and optional usefulness tags.

Q: What is success?
A: User sees which plugins are SAFE, WATCH, REMIND, or DELETE_RECOMMENDED with reasons.
```

---

## 5. Implementation Gate Decision

```txt
Gate decision: OPEN_WITH_RISKS
Reason: MVP can be implemented safely as local CLI with deterministic fixture data.
Blocked items: real Codex API integration, real deletion, public leaderboard backend.
Required next phase: freeze CLI contract, data model, tests, and commands.
```
