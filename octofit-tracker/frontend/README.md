# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` before running the app in GitHub Codespaces. For local development, create `octofit-tracker/frontend/.env.local` with:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

API requests use `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/` when `VITE_CODESPACE_NAME` is set. If it is unset, the frontend falls back to `http://localhost:8000/api/[component]/` so it never calls an `https://undefined-8000...` URL.
