# BloodNet — Smart Blood Donor Network

An AI-themed demo network connecting donors, hospitals, and blood banks — a React
frontend backed by a small Express API that only handles OTP delivery, emergency alert
delivery, and static file serving.

**There is no database.** Donor accounts, hospital requests, and blood-bank inventory
are all stored in the browser's `localStorage` (via [Zustand](https://zustand.docs.pmnd.rs/)
with its `persist` middleware) and kept in sync across tabs. Treat this as a functional
prototype/demo, not a production data store.

## Project structure

```
client/                          React 19 + TypeScript + Vite + shadcn/ui
├── src/
│   ├── components/
│   │   ├── ui/                   shadcn/ui primitives (button, dialog, form, ...)
│   │   ├── layout/                header, footer, theme toggle, language select
│   │   ├── home/                  hero, features, roles, FAQ, compatibility table
│   │   ├── auth/                  register/login/forgot-password/OTP flow
│   │   ├── hospital/               raise-request form, request cards
│   │   ├── blood-bank/            inventory form + grid
│   │   └── profile/                travel mode, donor alerts
│   ├── pages/                     one component per route
│   ├── store/                     zustand stores (users, session, requests, inventory)
│   ├── hooks/                     shared hooks (donor notify, countdown, live count)
│   ├── lib/                       crypto, blood-compatibility, API client, utils
│   ├── i18n/                      i18next setup + 12 language JSON dictionaries
│   └── types/                     shared domain types
├── index.html
└── vite.config.ts                 dev-mode proxies /api → the Express server

server/                          Express API (no view layer — serves client/dist)
├── index.js                      entry point
├── app.js                        Express app factory: middleware, routes, SPA fallback
├── config/env.js                  centralized env var access
├── routes/                       otp.routes.js, alerts.routes.js
├── controllers/                   request/response handling per route
├── services/                      mailer.service.js (Nodemailer), sms.service.js (Twilio)
├── middleware/error-handler.js    last-resort error → JSON response
└── utils/delivery-error.js        maps provider errors (Gmail/Twilio) to clear messages

docs/
├── design.md                              Design-reference notes (see below)
├── project-details.pdf                    Original academic project brief
└── smart-blood-donor-network-overview.pdf Project overview/report

.env.example                     Copy to .env and fill in before running
```

`docs/design.md` records what used to be an AI-generated (Lovable) multi-page design
prototype bundled as a zip in this repo — it's now a written reference instead of a
267 KB binary blob nobody could diff.

## Running locally

```bash
npm install              # installs server deps + client deps (postinstall hook)
cp .env.example .env      # fill in SMTP / Twilio keys as needed
npm run dev                # Vite dev server (5173) + Express API (3000), both live-reloading
```

Open **http://localhost:5173** — Vite proxies `/api/*` requests to the Express server
automatically (see `client/vite.config.ts`), so the frontend and backend behave as one
app in development while each gets independent hot-reload.

Without SMTP/Twilio credentials configured, the app still runs — OTP email/SMS sending
fails gracefully with a clear, non-technical message in the UI instead of crashing.

## Production build

```bash
npm run build   # builds client/dist
npm start        # node server/index.js — serves client/dist + the API on one port (3000)
```

`npm start` runs in the foreground, same as any other Node server — closing the
terminal (or Ctrl+C) stops it. If the frontend throws `Failed to fetch` on OTP/alert
requests, it means this process isn't running (or isn't reachable) — start it again.

## Environment variables

See `.env.example`. In short:
- `SMTP_*` — Gmail (or other SMTP) credentials for sending OTP/alert emails.
- `TWILIO_*` — Twilio credentials for sending OTP/alert SMS. Optional; SMS features
  fail gracefully with a clear message if unset.

## Other scripts

- `npm run typecheck` — TypeScript project check for the client (no emit).
- `npm run lint` — [oxlint](https://oxc.rs/docs/guide/usage/linter.html) for the client.

## Known limitations

- No automated tests or CI yet.
- No real backend persistence — see the note at the top of this file.
