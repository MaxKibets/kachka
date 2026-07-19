# Project

A React Native (iOS + Android) gym workout tracker. A hobby project; v1 ships free, monetization planned for v2. Target audience — international, release on App Store + Google Play.

# Documentation layout

- `docs/` — the single source of truth for the spec and all project documentation. Navigate
  via `docs/INDEX.md`. All new documentation is written here and nowhere else.
- `draft_docs/` — the legacy pre-reset draft (spec, tech, visual, wireframes, handoff
  context). Read-only reference: consult it to clarify intent when `docs/` doesn't cover
  something yet, but treat anything found only there as unconfirmed until it's migrated
  into `docs/`. Never edit it. On any conflict, `docs/` wins.

# Subagents

Delegate instead of doing these in the main session. This table is the single source of truth
for which subagent owns which kind of work.

| Agent | Responsibility | When to invoke | Scope boundary |
|---|---|---|---|
| `docs-manager` | Sole authority for creating/editing/reconciling all project documentation Markdown (`README.md`, `docs/**`, ADRs, pattern files, the doc map) | Any create/edit/update/delete/reconcile on in-scope docs, or when a change makes existing docs stale | Never touches `CLAUDE.md` or `.claude/**` (Claude Code config — main-loop territory); `draft_docs/**` is read-only raw material for migration, never edited |
| `git-manager` | Sole authority for git branch creation, commit composition, pushing, and opening PRs (Conventional Commits, `type/short-description` branches); acts without per-action confirmation | Whenever a unit of work (code, docs, or config) is ready to commit and/or turn into a PR | Never merges PRs, never force-pushes, no repo-level admin (branch protection, CI setup) — those stay manual/one-time |
| `search-manager` | Read-only project search: `docs/INDEX.md` map first, then codebase, then `draft_docs/` as a last-resort draft reference; returns synthesized answers with `file:line` citations | Any exploratory search beyond a single targeted lookup (>2-3 Glob/Grep/Read calls); every `/ask` question | Never edits anything; `draft_docs/` findings are always marked "draft, not confirmed"; doesn't satisfy the caller's own pre-`Edit` `Read` requirement |

New subagents must be added to this table (name, responsibility, invocation trigger, scope
boundary) in the same change that introduces them.

`CLAUDE.md` and `.claude/**` are Claude Code configuration — maintained in the main session
with explicit user approval, out of scope for all subagents.
