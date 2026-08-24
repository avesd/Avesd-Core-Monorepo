# Avesd Core Monorepo

Avesd is a local-first desktop workspace for managing a job search. The first
product is an Electron application; optional account and cloud capabilities can
be added later without becoming a dependency of the local workflow.

## Prerequisites

- Node.js 24 (see `.nvmrc`)
- Corepack
- pnpm 11.23.0 (pinned in `package.json`)

## Common commands

```sh
git submodule update --init --recursive
pnpm install
pnpm dev
pnpm lint
pnpm compile
pnpm test
pnpm build
pnpm validate
```

## Repository layout

- `apps/desktop` — Electron main, preload, and React renderer processes.
- `packages/configuration` — shared TypeScript, ESLint, and Vitest defaults.
- `.agents/skills/sudoland-common` — shared repository-development skills,
  included as a pinned Git submodule.
- `working` — non-authoritative audits, plans, notes, and archived project
  memory.
