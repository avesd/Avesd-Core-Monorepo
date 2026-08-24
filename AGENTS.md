# Avesd Core Monorepo

These instructions apply throughout the repository. A nearer `AGENTS.md` may
add subtree-specific constraints.

## Communication and repository language

- Communicate with the user in Chinese.
- Keep checked-in artifacts in English, including code, comments,
  documentation, commit messages, and pull-request text.

## Product boundary

- Avesd is local-first. Its core job-search workflow must remain usable without
  an account, network connection, or cloud service.
- Cloud accounts and synchronization are optional future capabilities, not
  current dependencies of the desktop application.

## Electron boundaries

- Renderer code must not access Node.js, Electron privileged APIs, the file
  system, credentials, or persistence directly.
- Expose privileged behavior through narrow, typed preload APIs and explicit
  IPC contracts.
- Keep domain rules independent of Electron, React, persistence drivers, and
  future cloud implementations.
- Treat resume content, contact details, application history, credentials, and
  imported documents as sensitive user data. Do not place them in logs,
  fixtures, snapshots, or committed environment files.

## Repository mechanics

- Dependency versions belong in the `pnpm-workspace.yaml` catalog; workspace
  manifests reference them with `catalog:`.
- Use root scripts for normal verification: `pnpm lint`, `pnpm compile`,
  `pnpm test`, `pnpm build`, and `pnpm validate`.
- `README.md` currently owns product orientation and repository onboarding.
- `working/` contains non-authoritative audits, plans, and temporary notes.
- Shared skills live in the nested repository at
  `.agents/skills/sudoland-common`; repository-specific behavior belongs in
  `.agents/common-skills-policy.md` and `.agents/audit-policy.md`.

## Git handling

Do not inspect or mutate Git state unless the user explicitly asks for Git work
in that turn. Preserve unrelated user changes. Treat
`.agents/skills/sudoland-common` as an independent repository and commit its
content before any superproject commit that updates its gitlink.
