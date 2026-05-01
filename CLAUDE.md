# Instructions for AI assistants

This file is the contract between the human author and any AI session working in this repo. Read it before making changes.

## Project context

Kachka is in early prototype/spec stage. Current contents are product context, the gym-tracker spec, a tech overview, and HTML wireframes. Code will follow. Owner: Max Kibets, working solo with AI assistance (Claude, Cursor).

Key reference docs:

- `docs/CONTEXT.md` — product context.
- `docs/gym-tracker-spec.md` — full product spec.
- `docs/gym-tracker-tech.md` — technical overview.
- `docs/gym-tracker-program-format.md` — program/program-format definition.
- `docs/wireframes/*.html` — UI wireframes.
- `CONTRIBUTING.md` — practical commit/branch/PR rules.

## Git rules (non-negotiable)

1. **Conventional Commits.** Format: `type(scope): subject`. Allowed types: `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`, `perf`. Imperative mood, lowercase first letter, no trailing period, ≤ 72 chars on the subject line.
2. **One AI session = one branch = one PR.** Branch name is `<type>/<short-kebab-slug>` matching the dominant commit type.
3. **Never commit directly to `main`** in an AI session. Even single-line changes go through a branch + PR. (The human owner may commit trivial edits to `main` directly; AI may not.)
4. **Squash-merge** is the only merge mode for AI PRs. The PR title becomes the squash commit message and must itself be in conventional commit format.
5. **PR description is required** even for self-review. Cover: what changed, why, how to verify.

If the user asks you to do something that conflicts with these rules, surface the conflict and ask before proceeding.

## Working style

- **Read before writing.** When asked to modify a doc or wireframe, read the current state first; don't assume.
- **Localization.** The user communicates in Ukrainian; mirror their language in conversation. File contents stay in English unless otherwise specified.
- **Small, reviewable diffs.** Prefer multiple focused commits on the branch over one giant commit. They'll be squashed at merge time, but a clean per-commit history makes review easier.
- **No unsolicited refactors.** Do not "tidy" files the user didn't ask you to touch. If you spot something that should change, mention it and ask.
- **No new top-level files** (READMEs, summaries, license stubs) without explicit ask.

## Tech stack

Not yet decided. When the stack is chosen, add a section here listing language, framework, package manager, and any project-specific commands (build, test, format, lint).

## Things that don't belong in commits

- Secrets, tokens, API keys, `.env` files.
- IDE settings (`.vscode/`, `.idea/`) unless explicitly shared.
- OS junk (`.DS_Store`, `Thumbs.db`).
- Generated/build artifacts.
