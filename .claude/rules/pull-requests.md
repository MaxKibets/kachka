# Pull request rules

Detailed PR workflow. The non-negotiable red lines live in `CLAUDE.md`;
this file is the full reference, read it before opening a PR.

## Branches

- `main` — trunk, always working state. AI never commits to it directly.
- Feature branches: `<type>/<short-kebab-slug>`, e.g. `feat/superset-cursor`,
  `docs/git-conventions`, `fix/numpad-overflow`.
- Branch type matches the dominant commit type.
- Short-lived: open, work, merge, delete. If a branch lives more than a few
  days, rebase it onto `main`.

## Workflow

1. Start from latest `main`:
   ```bash
   git switch main && git pull
   git switch -c <type>/<slug>
   ```
2. Work and commit in conventional format (see `commits.md`). Multiple commits
   are fine — they get squashed.
3. Push and open a PR. The PR title **must** be in conventional commit format —
   it becomes the squash commit message.
4. PR description is required, even for self-review. Cover:
   - **What** changed.
   - **Why** — the motivation.
   - **How to verify.**
   Write it as what `git show <commit>` should surface in three months.
5. Self-review the diff before merging. This is the load-bearing checkpoint
   when AI wrote the change.
6. **Squash and merge** — the only merge mode for AI PRs. Then delete the branch.

## If the branch is a mess

Abandon it. `git switch main && git branch -D <type>/<slug>` is free.

## Not in scope yet

Added when the project leaves prototype stage: semantic versioning / tags /
releases, `CHANGELOG.md`, branch protection on `main`, commit-message linting
in CI, PR templates, required reviewers.
