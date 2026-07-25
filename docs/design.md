# Design reference

This document preserves the useful parts of `Projectzip.zip`, which was removed from the
repository after this was written. The zip was a static export (dated 2026-06-24, before
this repo's first commit) of an AI-generated design prototype built with
[Lovable](https://lovable.dev) — a multi-page React app used as the visual reference for
the BloodNet UI that was later hand-built into the single-page `public/index.html` +
`public/js/app.js` app that ships today.

The zip's HTML pages were static exports referencing hashed `/assets/*.js` bundles that
don't exist outside the original Lovable project, so they were never runnable here —
only useful as a view-source design reference. That's why they were dropped rather than
kept as dead weight.

## Pages in the reference design

The reference was a 9-page app (this repo instead implements everything as sections/modals
in one page). Titles as authored:

| Reference page | Title | Carried into current app? |
|---|---|---|
| `login.html` | Sign in – BloodNet | Yes — auth modal, login tab |
| `register.html` | Register – BloodNet | Yes — auth modal, registration tab |
| `donor.html` | Donor – BloodNet | Yes — profile page + donor alert card |
| `hospital.html` | Hospital – BloodNet | Yes — hospital workspace section |
| `blood-bank.html` | Blood Bank – BloodNet | Yes — blood bank workspace section |
| `admin.html` | Admin – BloodNet | Yes — admin workspace section |
| `compatibility.html` | Blood Compatibility – BloodNet | Partially — folded into the FAQ compatibility table |
| `about.html` | About – BloodNet | **No** — not implemented in the current app |
| `search.html` | Find Donors – BloodNet | **No** — no standalone donor search/map page exists yet |

Site-wide metadata from the reference (for consistency if new pages are ever added):
- Description: "An AI-powered network connecting blood donors, hospitals and blood banks
  for faster emergency response."
- Author: Angel Blessy & Enrita Fernandes

## Visual language (design tokens)

The reference's compiled stylesheet used Tailwind v4 with OKLCH color tokens and a
light/dark pair for every semantic color. These are not used verbatim in
`public/css/styles.css` (which is hand-written, plain CSS custom properties), but they
document the original design intent:

- Accent / destructive tones built around a red-orange hue (`oklch(.. .18-.22 25)`) —
  matches the blood/urgency theme carried into the current `--p` / `--p2` / `--p3` reds.
- Neutral surface tones in a cool gray-blue hue (`oklch(.. .01-.02 250)`).
- A hero gradient: `linear-gradient(135deg, oklch(55% .18 25) 0%, oklch(60% .18 25) 100%)`.
- Standard container breakpoints: `sm 24rem`, `md 28rem`, `lg 32rem`, `xl 36rem`,
  `2xl 42rem`, `4xl 56rem`, `6xl 72rem`, `7xl 80rem`.
- Font weights 400/500/600/700/800, monospace fallback stack for code.

## Gaps this reveals for the current app

- No "About" page/section exists — the current app goes straight from hero to features
  with no dedicated project/mission page.
- No dedicated donor search page — "Map Search" is listed as a feature card on the
  homepage but there's no page behind it; donor discovery today only happens implicitly
  through the hospital request matching flow.
- The compatibility table lives inside an FAQ `<details>` accordion rather than as its
  own page — fine for a single-page app, but worth knowing this was originally scoped as
  a first-class page.

These gaps are documented here so a future "add the missing pages" pass has the original
design intent to work from, without needing to keep the zip around.
