# ARCHITECTURE.md — Coqid-game

## 0. Architecture Principle

Coqid-game must use the smallest architecture that can demonstrate plugin scoring, deletion recommendations, reminders, and leaderboard without real API dependency.

Default architecture:

```txt
Single local web dashboard
+ deterministic scoring engine
+ mock/local plugin usage data
+ optional localStorage
+ no backend for MVP
```

---

## 1. System Overview

Coqid-game is a dashboard that allows Codex users to review plugins/skills, run a survival score calculation, and see which plugins are Safe, Reminder Recommended, or Deletion Recommended.

---

## 2. Product Type

Selected:

```txt
Single-page frontend app / local dashboard prototype
```

Actual stack:

```txt
Node.js scripts + static HTML/CSS/JavaScript modules
```

Reason:
The static dashboard keeps the MVP smaller than a framework app while preserving deterministic tests, build, smoke validation, and local demo.

Alternative acceptable future stack:

```txt
Vite + React + TypeScript
```

MVP should not require backend or cloud deployment.

---

## 3. High-Level Architecture

```txt
User
  -> Coqid-game Dashboard UI
  -> Mock/Local Plugin Usage Data
  -> Input/Data Validation
  -> Survival Scoring Engine
  -> Status Classifier
  -> Leaderboard Builder
  -> UI Renderer
  -> Demo Result
```

---

## 4. Modules

| Module | Responsibility | Tests |
|---|---|---|
| Plugin Data Loader | load mock/local plugin data | malformed/empty data tests |
| Scoring Engine | calculate survival score | unit tests |
| Status Classifier | SAFE / REMINDER_RECOMMENDED / DELETION_RECOMMENDED | unit tests |
| Leaderboard Builder | weekly/monthly sorting | unit tests |
| Dashboard UI | render plugin cards and rankings | integration/smoke |
| Fallback UI | empty/malformed data handling | integration/smoke |

---

## 5. ADRs

### ADR-001: No backend for MVP

Status: ACCEPTED

Reason:
Mock/local data is sufficient to prove the core value in 2 minutes.

Tradeoff:
No real cross-user leaderboard in MVP.

---

### ADR-002: No actual plugin deletion

Status: ACCEPTED

Reason:
Deletion is destructive and likely unsafe/unavailable. MVP recommends deletion only.

Validation:
Static inspection must confirm no uninstall/delete action exists.

---

### ADR-003: Estimated cost instead of exact token/coin cost

Status: ACCEPTED

Reason:
Plugin-level exact cost may not be available. MVP labels cost as estimated.

---

### ADR-004: Mock/local data first

Status: ACCEPTED

Reason:
The final demo must work without live Codex API access.

---

## 6. File Structure Suggestion

```txt
src/
  data/
    samplePlugins.js
  domain/
    scoring.js
    leaderboard.js
    validation.js
  app.js
  styles.css

tests/
  scoring.test.js
  leaderboard.test.js
  validation.test.js
  noDeletion.test.js
```

---

## 7. Risk Constraints

Do not add:
- authentication
- production backend
- database
- real deletion API
- cloud-only deployment
- live API dependency for final demo

---

## 8. Architecture Gate

Architecture status: READY_FOR_IMPLEMENTATION

Implementation allowed if:
- mock data exists
- scoring rules are testable
- deletion action is recommendation-only
- demo can run locally
