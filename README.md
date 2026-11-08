# Programuesi i Veturave

Website for **Programuesi i Veturave**, a car coding and factory-feature activation service in
Prishtinë, Tiranë and Durrës.

**Live:** https://programuesiiveturave.netlify.app

![Social preview](public/og-image.png)

## Features

- Fully bilingual — **Albanian (default)** and English, typed so no string can be left untranslated.
  The choice is remembered and `<html lang>` follows it.
- Animated hero with a live "needle sweep" speedometer and coding log, scroll-linked parallax,
  reveal-on-scroll sections, a brand explorer with custom SVG car illustrations, and a spotlight
  hover effect on cards. Every animation respects the OS "reduce motion" setting.
- Services page with category and brand filters stored in the URL (shareable links such as
  `/services?brand=bmw`).
- One-tap contact everywhere: `tel:`, WhatsApp and Viber links, a floating WhatsApp button, and a
  request form that opens WhatsApp with a ready-made message (no backend needed).
- Live "open now / closed" status based on the business timezone.
- SEO: per-page titles and descriptions, canonical URLs, Open Graph image for Facebook/WhatsApp
  previews, `AutoRepair` structured data, sitemap and robots.txt.
- Accessible: skip link, labelled icon buttons, keyboard-friendly menu (Escape closes it), visible
  focus rings, semantic headings.

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · React Router 6 ·
react-helmet-async · Vitest + Testing Library · ESLint + Prettier

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev
```

The site runs at http://localhost:5173.

## Scripts

| Command             | What it does                                            |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | Start the dev server                                    |
| `npm run build`     | Type-check and build for production into `build/`       |
| `npm run preview`   | Serve the production build locally                      |
| `npm test`          | Run the test suite once                                 |
| `npm run lint`      | Lint with ESLint (including accessibility rules)        |
| `npm run typecheck` | Type-check without building                             |
| `npm run format`    | Format all files with Prettier                          |
| `npm run assets`    | Re-render the PNG icons and social image from their SVG |

## Project structure

```
src/
  config/       business details (phone, links, hours) and navigation — edit these first
  data/         structural catalog: brands, service ids, categories
  i18n/         en.ts and sq.ts dictionaries, provider and useI18n() hook
  components/
    layout/     Navbar, Footer, Layout (scroll progress, floating WhatsApp)
    home/       homepage sections
    graphics/   SVG car illustration and animated cockpit
    ui/         shared building blocks (reveal animations, cards, SEO, icons)
  pages/        one file per route
  lib/          small helpers (opening hours)
  test/         tests and test setup
scripts/        asset generation (icons, Open Graph image)
```

### Common edits

- **Phone number, social links or opening hours:** `src/config/site.ts`
- **Any text on the site:** `src/i18n/sq.ts` and `src/i18n/en.ts`
- **Add a service:** add its id to `serviceIds` and an entry to `services` in
  `src/data/catalog.ts`, then add its title and description to both language files (TypeScript
  will point out anything missing).

## Deployment

Deployed on Netlify. `netlify.toml` sets the build command, the output folder, the SPA fallback
(so deep links like `/services` work on refresh) and caching/security headers.

## Contact

- Phone / WhatsApp / Viber: +383 49 599 931
- Instagram: [@programues_i_veturave](https://www.instagram.com/programues_i_veturave/)
- Facebook: [Programues i veturave](https://www.facebook.com/Programuesiveturave)

## License

Proprietary software. All rights reserved.

Made by Ilaz Gashi · Nexora Agency.
