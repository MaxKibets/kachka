# Commit rules

Detailed commit conventions. The non-negotiable red lines live in `CLAUDE.md`;
this file is the full reference, read it before committing.

## Format

```
<type>(<optional scope>): <subject>

<optional body — what & why, wrap at ~72 chars>

<optional footer — refs, breaking changes>
```

## Allowed types

| Type       | When to use                                            |
|------------|--------------------------------------------------------|
| `feat`     | New user-facing feature or capability                  |
| `fix`      | Bug fix                                                |
| `docs`     | Docs only — README, ADRs, specs, wireframe annotations |
| `refactor` | Code change that doesn't add a feature or fix a bug    |
| `style`    | Formatting, whitespace, lint — no logic change         |
| `test`     | Adding or fixing tests                                 |
| `chore`    | Build, tooling, deps, repo plumbing                    |
| `perf`     | Performance improvement                                |

## Subject rules

- Imperative mood: `add`, not `added` / `adds`.
- Lowercase first letter, no trailing period.
- ≤ 72 characters.
- Must make sense after the prefix `If applied, this commit will…`.

## Examples

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

## Diff hygiene

- Prefer multiple focused commits on the branch over one giant commit.
  They get squashed at merge, but clean per-commit history eases review.
- No unsolicited refactors bundled into an unrelated commit.

## Never commit

- Secrets, tokens, API keys, `.env` files.
- IDE/editor settings (`.vscode/`, `.idea/`) unless explicitly shared.
- OS junk (`.DS_Store`, `Thumbs.db`).
- Build artifacts, `node_modules/`, generated files.
