# BloodNet — Smart Blood Donor Network

An AI-themed demo network connecting donors, hospitals, and blood banks. This is a
single-page frontend backed by a small Express server that only handles OTP delivery,
emergency alert delivery, and a translation proxy — **there is no database**; donor
accounts, hospital requests, and blood-bank inventory are all stored in the browser's
`localStorage`. Treat this as a functional prototype, not a production data store.

## Project structure

```
public/            Everything served to the browser
├── index.html
├── css/styles.css
├── js/app.js
└── assets/bloodnet-logo.png

server/
└── server.js       Express app: static hosting + OTP/alert/translate endpoints

docs/
├── design.md                              Design-reference notes (see below)
├── project-details.pdf                    Original academic project brief
└── smart-blood-donor-network-overview.pdf Project overview/report

.env.example        Copy to .env and fill in before running
```

`docs/design.md` records what used to be an AI-generated (Lovable) multi-page design
prototype bundled as a zip in this repo — it's now a written reference instead of a
267 KB binary blob nobody could diff.

## Running locally

```bash
npm install
cp .env.example .env   # fill in SMTP / Twilio / Google Translate keys as needed
npm start               # http://localhost:3000
```

Without SMTP/Twilio credentials configured, the app still runs — OTP email/SMS sending
will fail gracefully with a clear error instead of crashing the server.

## Environment variables

See `.env.example`. In short:
- `SMTP_*` — Gmail (or other SMTP) credentials for sending OTP/alert emails.
- `TWILIO_*` — Twilio credentials for sending OTP/alert SMS. Optional; SMS features are
  skipped if unset.
- `GOOGLE_TRANSLATE_API_KEY` — enables the language selector's live translation. Optional;
  the UI still works in English without it.

## Known limitations (tracked for a future pass)

- `public/js/app.js` and `public/css/styles.css` are large, monolithic files (i18n
  strings, DOM wiring, and all component styles live in one file each). Modularizing
  these is planned as a follow-up once outstanding functional issues are fixed.
- No automated tests or CI yet.
