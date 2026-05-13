# Career Mode Lab

Career Mode Lab is a mobile-only PWA for making FIFA and EA FC career mode saves more interesting.

It gives you a club, a story hook, a house rule, and a proper self-imposed challenge so the save starts with constraints instead of becoming another generic rebuild.

## What It Does

- Randomizes from 856 clubs across 20 countries and 45 leagues.
- Uses live ESPN-backed club data where available, including actual crests for major clubs.
- Includes generated crest fallbacks for leagues where no open crest source is available.
- Offers 20 versatile career mode challenge formats, such as Academy Only, Moneyball Ledger, Athletic Policy, Wage Cap, and Release Clause Chaos.
- Adds a create-a-club mode with random or custom club names, 20 mascot identities with icons, club colours, and kit colours.
- Includes 30 kit palette presets plus custom home, away, and third kit colour controls.
- Generates extra club identity details like motto, culture, country, league tier, stadium, academy focus, board style, rivalry hook, and fan ritual.
- Lets a created club become a full career mode brief using the same save rules and challenge system.
- Stores every generated career in browser history.
- Stores generated and saved created-club blueprints in browser history.
- Lets you pin promising career ideas as saved briefs.
- Persists filters, difficulty, current career, selected challenge, pinned saves, created clubs, and history in the browser.
- Asks for confirmation before rerolling so you do not lose a good setup by mistake.
- Installs as a PWA on supported mobile browsers.

## Countries Covered

England, Spain, Germany, France, Portugal, Austria, Italy, Ireland, Scotland, Belgium, Poland, Sweden, Denmark, Netherlands, Hungary, Argentina, Turkiye, Saudi Arabia, Romania, and United States.

England includes five major divisions. Spain and Germany include three tiers. Most other countries include the top two leagues.

## Tech Stack

- Next.js App Router
- React
- Tailwind CSS
- GSAP for small scroll effects
- Browser localStorage for persistence
- Custom service worker and web app manifest for PWA support

## Local Development

```bash
npm install
npm run dev
```

Open the printed local URL in a browser.

## Checks

```bash
npm run lint
npm run build
```

## Notes

The app is intentionally mobile-only. Desktop browsers render the same phone-width interface rather than a widened dashboard.
