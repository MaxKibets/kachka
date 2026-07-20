# Documentation Map

Single source of truth for navigating this repo's documentation. Organized by directory, one
sentence per entry stating each file's purpose — enough to decide "is what I need in here?"
without opening the file.

## Root

- [README.md](../README.md) — placeholder stub, just the title and no real content yet;
  skip opening it. Intended to eventually hold the project overview, prerequisites, and
  quickstart for installing and running the app locally.
- [draft_docs/](../draft_docs/) — legacy pre-reset draft documentation, kept read-only;
  consult only to clarify intent that `docs/` doesn't cover yet, never authoritative, and
  out of scope for docs-manager to edit.

## `docs/`

- [INDEX.md](INDEX.md) — this file; the documentation map itself.
- [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md) — live tracker of unresolved decisions, each
  linked to the doc where the topic is documented.
- [DESIGN.md](DESIGN.md) — pointer to the visual system's external source of truth and
  the contract for how it crosses into spec and code.

## `docs/spec/`

- [_pattern.md](spec/_pattern.md) — directory pattern: purpose, file naming, and the
  section skeleton every spec file follows.
