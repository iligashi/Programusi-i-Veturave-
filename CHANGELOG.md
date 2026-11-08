# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.0.1] - 2026-11-08

### Added

- Repository health files: contributing guide, security policy, issue and pull request
  templates, code owners, Dependabot and release-notes configuration.
- Pre-commit hook that formats and lints staged files.
- Screenshots and badges in the README.

## [1.0.0] - 2026-11-08

Complete rebuild of the website.

### Added

- Bilingual content (Albanian by default, English), typed so translations cannot drift apart.
- New design: dark automotive theme, animated needle-sweep hero, brand explorer with custom SVG
  car illustrations, spotlight cards, animated FAQ, scroll progress and page transitions.
- Services page with category and brand filters stored in the URL.
- Contact page with tap-to-call, WhatsApp and Viber, a WhatsApp request builder and a live
  open/closed status.
- Logo, favicon, app icons and an Open Graph image for link previews.
- Per-page SEO metadata, structured data, sitemap and robots.txt.
- Test suite (Vitest + Testing Library), ESLint, Prettier and a CI workflow.

### Changed

- Migrated from Create React App to Vite and TypeScript 5.
- Business details (phone, links, hours) now live in a single config file.

### Fixed

- Deep links such as `/services` returned 404 on Netlify.
- Car images hotlinked from third-party sites failed to load.
- Most pages ignored the language switch.

### Removed

- Create React App boilerplate and unused dependencies.

## [0.1.0] - 2025

- First version of the website, built with Create React App.

[Unreleased]: https://github.com/iligashi/Programusi-i-Veturave-/compare/v1.0.1...HEAD
[1.0.1]: https://github.com/iligashi/Programusi-i-Veturave-/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/iligashi/Programusi-i-Veturave-/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/iligashi/Programusi-i-Veturave-/releases/tag/v0.1.0
