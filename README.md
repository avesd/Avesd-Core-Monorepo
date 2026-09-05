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
- `packages/acp-client` — provider-neutral ACP v1 client boundary.
- `packages/configuration` — shared TypeScript, ESLint, and Vitest defaults.
- `packages/kernel` — Cordis-backed plugin lifecycle adapter and contribution
  registries.
- `packages/plugin-api` — stable contracts implemented by plugins.
- `.agents/common-skills-policy.md` and `.agents/audit-policy.md` — local
  repository policy for globally installed shared skills.
- `working` — non-authoritative audits, plans, notes, and archived project
  memory.

## Runtime architecture

Avesd keeps a small trusted Electron host and moves product capabilities into
replaceable plugins. The internal runtime uses upstream Cordis, hidden behind
`@avesd/plugin-api`, so public plugins do not depend on the runtime framework.
Plugin registrations are reversible effects: activating a new version adds its
contributions first, then disposes the previous version in reverse registration
order. Failed activation removes only the candidate's effects, leaving the
previous version active.

The renderer welcome screen is the first built-in UI plugin and participates in
Vite hot module replacement. External plugin discovery, compilation, sandboxing,
and persisted installation are intentionally not implemented yet.

AI harnesses connect through ACP. The client package owns protocol lifecycle and
capability negotiation while concrete process transports and account
authentication remain outside the protocol-neutral core.
