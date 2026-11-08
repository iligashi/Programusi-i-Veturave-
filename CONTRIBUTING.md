# Contributing

Thanks for helping improve the Programuesi i Veturave website. This guide covers how work is done
in this repository.

## Setup

```bash
nvm use        # Node 20, see .nvmrc
npm install    # also installs the Git hooks
npm run dev
```

## Workflow

1. Create a branch from `main`, named by type: `feat/…`, `fix/…`, `chore/…`, `docs/…`.
2. Make your change. Keep pull requests small and focused on one thing.
3. Run the checks locally (CI runs the same ones):

   ```bash
   npm run lint && npm run typecheck && npm test && npm run build
   ```

4. Open a pull request and fill in the template. CI must pass before merging.

A pre-commit hook formats and lints the files you stage, so most style issues are fixed for you.

## Commit messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add a gallery of recent cars
fix: close the mobile menu after choosing a language
docs: explain how to add a service
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `perf`.

## Code guidelines

- **Text:** never hard-code user-facing text in components. Add it to both `src/i18n/sq.ts` and
  `src/i18n/en.ts`; TypeScript reports anything missing.
- **Business details:** phone numbers, links and hours belong in `src/config/site.ts`.
- **Styling:** use Tailwind utilities and the design tokens in `tailwind.config.js`. Shared
  patterns live in `src/index.css` (`.btn-primary`, `.card`, …).
- **Animation:** use Framer Motion. Reuse `Reveal` / `RevealGroup` for scroll reveals, and check
  the page still works with "reduce motion" turned on.
- **Accessibility:** every icon-only button or link needs an `aria-label`, and interactive
  elements must work with the keyboard. ESLint's `jsx-a11y` rules catch common mistakes.
- **Tests:** add or update tests in `src/test` for behaviour changes.

## Releases

1. Move the `Unreleased` entries in `CHANGELOG.md` under a new version heading.
2. Bump `version` in `package.json`.
3. Tag the release (`git tag vX.Y.Z && git push --tags`) and publish it on GitHub. Release notes
   are grouped automatically from pull request labels.
