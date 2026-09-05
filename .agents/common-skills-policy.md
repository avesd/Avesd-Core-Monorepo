# Common Skills Repository Policy

## Repository profile

- Repository purpose: A local-first Electron workspace for managing a job search, with optional cloud capabilities deferred until they are needed.
- Artifact language: English.
- User communication language: Chinese by default, as required by `AGENTS.md`.
- Applicable instructions: Root `AGENTS.md` plus every nearer subtree `AGENTS.md` governing touched paths.

## Documentation and terminology

- Documentation index: `README.md` currently owns product orientation, repository layout, prerequisites, and command discovery.
- Current-contract sources: Root `AGENTS.md` owns cross-cutting boundaries; `README.md` owns current repository orientation; implementation and tests own behavior not yet described by durable domain documentation.
- Canonical terminology: Root `AGENTS.md`, followed by `README.md` and established exported names in the owning package.
- Working documents: `working/` is non-authoritative. Audits, plans, and temporary notes must not override current code, tests, or durable documentation and should be deleted, archived, or promoted when their work ends.
- Audit context: `.agents/audit-policy.md`, `working/audits/log.md`, and `working/audits/reports/`.
- Inline documentation updates: Update the nearest current documentation when a user-approved decision changes an implemented contract. Do not silently establish product behavior only in a plan or audit report.
- Prohibited documentation patterns: Do not create parallel current-truth files such as `CONTEXT.md` or `CONTEXT-MAP.md`; do not treat plans, notes, handoffs, or audit reports as current contracts.

## Decision records

- Decision-record directory: Not configured.
- Decision-record guide: Not configured.
- Numbering and filename convention: Not configured.
- Decision threshold: Require all three: costly to reverse, surprising without context, and a real trade-off among credible alternatives.
- Relationship to current contracts: A future decision record may preserve rationale but must not replace current product, architecture, data, or API documentation.
- Replacement-link style: Follow the touched document.

## Git repositories and commits

- Root repository: `superproject` at `.`.
- Included nested repositories: None.
- Excluded repositories and paths: Dependency, build, cache, coverage, and generated-output directories are excluded from inspection and staging unless the user explicitly places a generated artifact in scope.
- Nested-repository commit order: Not applicable.
- Status and history inspection: Inspect Git state or history only when the user explicitly authorizes Git work for the turn; common commit-planning skills may inspect the minimum included-repository context required by their direct invocation.
- Commit plan modes: `Compact`, `Balanced`, and `Detailed`; recommend `Balanced` by default.
- Commit identity: Read the configured Git identity without changing it and stop before committing if required identity is missing.
- Commit message convention: Infer the convention from recent subjects; the current history is insufficient to impose a repository-specific prefix.
- Staging restrictions: Stage selected paths or hunks in their owning repository. Do not use broad staging commands that can capture unrelated work or nested-repository changes implicitly.
- Verification before commit: Inspect the staged scope, run `git diff --cached --check`, and run the narrow checks owned by the change.
- Post-commit actions: Do not amend, rebase, push, force, discard, reset, bypass hooks, or modify Git configuration unless separately requested.

## Plan discussion and review

- Repository exploration: Prefer answering discoverable questions from applicable instructions, manifests, code, tests, and current documentation before asking the user.
- Required review authority: Applicable `AGENTS.md`, `README.md`, relevant package manifests, implementation, tests, and current audit reports.
- Independent plan review: `review-plan` must use exactly one newly spawned clean-context agent with no inherited conversation history. The reviewer is read-only and cannot delegate.
- Documentation during grilling: Resolve one decision branch at a time and update the matching current document immediately when the user confirms a durable contract.

## Handoff

- Output location: The operating system temporary directory, never the repository workspace.
- Filename convention: Use a collision-resistant temporary Markdown filename containing `handoff`.
- Required sections: Objective, current state, confirmed decisions, unresolved questions, relevant artifacts, verification and failures, exact next steps, and suggested skills.
- Sensitive information: Redact credentials, tokens, secret values, private keys, resume content, personal contact details, and other personally identifiable information.
- Existing-artifact references: Reference existing plans, decisions, commits, diffs, reports, and documentation by path or URL instead of duplicating them.
