# docs/DEPLOYMENT.md — Coqid-game

## 0. Deployment Strategy

Local demo first.

Cloud deployment is optional.

MVP must run without live Codex API access.

---

## 1. Actual Stack

Actual:

```txt
Node.js static local dashboard with plain JavaScript modules
```

Commands:

```bash
npm install
npm test
npm run build
npm run dev
npm run smoke
```

---

## 2. Environment Variables

MVP requires no secrets.

No required API keys.

No live Codex telemetry token required.

---

## 3. Local Demo Mode

Local demo uses bundled sample plugin data.

Expected entry point:

```txt
http://localhost:4173
```

---

## 4. Smoke Test

Smoke test steps:

1. Run app.
2. Open local URL.
3. Confirm Coqid-game dashboard appears.
4. Confirm sample plugins appear.
5. Click Run Survival Check.
6. Confirm recommendation statuses appear.
7. Confirm no plugin is actually deleted.

---

## 5. Cloud Deployment

Cloud deployment required:

```txt
NO
```

If attempted, use only after local validation passes.

Fallback:
Use local demo.
