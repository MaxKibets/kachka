# Instructions for AI assistants

This file is the contract between the human author and any AI session in this
repo. Read it before making changes.

## Project context

Kachka is in early prototype/spec stage: product context, the gym-tracker spec,
a tech overview, and HTML wireframes. Code will follow. Owner: Max Kibets,
working solo with AI assistance (Claude, Cursor).

Key reference docs:

- `docs/CONTEXT.md` — product context.
- `docs/gym-tracker-spec.md` — full product spec.
- `docs/gym-tracker-tech.md` — technical overview.
- `docs/gym-tracker-program-format.md` — program/program-format definition.
- `docs/wireframes/*.html` — UI wireframes.

## Git rules (non-negotiable)

1. **Never commit directly to `main`** in an AI session. Even single-line
   changes go through a branch + PR.
2. **One AI session = one branch = one PR.** Branch: `<type>/<short-kebab-slug>`.
3. **Conventional Commits** for every commit and PR title: `type(scope): subject`.
4. **Squash-merge** only.

**Before committing or opening a PR, read and follow `.claude/rules/commits.md`
and `.claude/rules/pull-requests.md`** — they hold the full format, allowed
types, branch workflow, and PR-description requirements.

If a request conflicts with these rules, surface the conflict and ask first.

## Working style

- **Read before writing.** Read a doc/wireframe's current state before editing.
- **Localization.** User communicates in Ukrainian; mirror it in conversation.
  File contents stay in English unless specified otherwise.
- **No unsolicited refactors.** Don't tidy files you weren't asked to touch;
  mention it and ask instead.
- **No new top-level files** (READMEs, summaries, license stubs) without an ask.

## Tech stack

Not yet decided. When chosen, add language, framework, package manager, and
project-specific commands (build, test, format, lint) here.
