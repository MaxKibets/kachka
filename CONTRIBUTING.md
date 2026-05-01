# Contributing to Kachka

Practical rules for committing to this repo.

## TL;DR

- One branch per AI session, named `<type>/<short-kebab-slug>`.
- Commits use [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): subject`.
- AI-generated or non-trivial changes go through a PR and are **squash-merged** into `main`.
- Trivial human edits (typo, single-file doc tweak) may go directly to `main`.

## Commit format

```
<type>(<optional scope>): <subject>

<optional body — what & why, wrap at ~72 chars>

<optional footer — refs, breaking changes>
```

### Allowed types

| Type       | When to use                                               |
|------------|-----------------------------------------------------------|
| `feat`     | New user-facing feature or capability                     |
| `fix`      | Bug fix                                                   |
| `docs`     | Docs only — README, ADRs, specs, wireframe annotations    |
| `refactor` | Code change that doesn't add a feature or fix a bug       |
| `style`    | Formatting, whitespace, lint — no logic change            |
| `test`     | Adding or fixing tests                                    |
| `chore`    | Build, tooling, deps, repo plumbing                       |
| `perf`     | Performance improvement                                   |

### Subject rules

- Imperative mood: `add`, not `added` / `adds`.
- Lowercase first letter, no trailing period.
- ≤ 72 characters.
- The subject should make sense after the prefix `If applied, this commit will…`.

### Examples

```
docs: add gym tracker tech overview
feat(workout): add superset cursor state
fix(numpad): prevent overflow on 4-digit weights
chore: setup git conventions
refactor(spec): split program format into separate doc

feat(workout): add rest-timer auto-start

Triggers a 90s timer when a set is logged. Configurable per-exercise
via the program format. Closes the loop on the "lazy logging" UX goal
from gym-tracker-spec.md.
```

## Branches

- `main` — trunk, always working state.
- Feature branches: `<type>/<short-kebab-slug>`, e.g. `feat/superset-cursor`, `docs/git-conventions`, `fix/numpad-overflow`.
- Branch types match commit types — keeps the mental model small.
- Branches are short-lived: open, work, merge, delete. If a branch lives more than a few days, rebase it onto `main`.

## Workflow

### For AI-generated or non-trivial changes (the default)

1. Start a new branch from latest `main`:
   ```bash
   git switch main && git pull
   git switch -c feat/<slug>
   ```
2. Work and commit in conventional format. Multiple commits on the branch are fine — they'll be squashed.
3. Push and open a PR on GitHub. PR title **must** be in conventional commit format — it becomes the squash commit message.
4. PR description: what changed, why, how to verify. Even when reviewing your own PR, write this — it's what `git show <commit>` will surface in three months.
5. Self-review the diff on GitHub before merging. This is the load-bearing checkpoint when AI wrote the change.
6. **Squash and merge.** Delete the branch.

### For trivial human edits

- Typo fix, single-line spec correction, README tweak — commit directly to `main` is fine.
- Still use conventional format: `docs: fix typo in gym-tracker-spec`.

## What NOT to commit

- Secrets, API keys, tokens, `.env` files.
- IDE/editor settings (`.vscode/`, `.idea/`) — unless we explicitly decide to share them.
- OS junk (`.DS_Store`, `Thumbs.db`).
- Build artifacts, `node_modules/`, etc.

A `.gitignore` will be added once the tech stack is chosen.

## Working with AI assistants (Claude, Cursor, etc.)

- One AI session = one branch = one PR.
- Tell the AI to write commits in conventional format. `CLAUDE.md` at the repo root enforces this for Claude sessions; the same rules apply if you're driving Cursor or another tool.
- Always self-review the PR diff before squash-merging. AI sometimes "fixes" things you didn't ask it to fix.
- If the AI made a mess, abandon the branch. `git switch main && git branch -D feat/whatever` is free.

## What's not in scope yet

These will be added when the project leaves prototype stage:

- Semantic versioning, git tags, releases.
- `CHANGELOG.md`.
- Branch protection on `main`.
- Commit-message linting in CI.
- PR templates and required reviewers.
