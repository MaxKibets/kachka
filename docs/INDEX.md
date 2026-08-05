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

- [_pattern.md](spec/_pattern.md) — the pattern every spec file follows.
- [FOUNDATIONS.md](spec/FOUNDATIONS.md) — the baseline UI rules and navigation structure
  the rest of the spec builds on.
- [TODAY.md](spec/TODAY.md) — the app's entry point for starting, resuming, or
  discarding a workout.
- [BUILDER.md](spec/BUILDER.md) — the pre-workout screen for assembling the exercise
  list and groups before starting.
- [IN_WORKOUT.md](spec/IN_WORKOUT.md) — the active workout screen for logging sets and
  editing the exercise list while training.
- [SUPERSETS.md](spec/SUPERSETS.md) — the alternating exercise-group structure shared by the
  Builder and Active workout screens: creation, letter labels, and mid-workout editing.
- [EXERCISES.md](spec/EXERCISES.md) — the shared exercise picker for finding, adding, and
  managing exercises, invoked from the Builder, Active workout, and Profile.
- [FINISH.md](spec/FINISH.md) — how a workout ends: the hold-to-finish gesture, the completion
  screen, and the choice to save or discard.
- [HISTORY.md](spec/HISTORY.md) — viewing past workouts: the chronological list and the
  read-only per-workout detail screen.
- [PROFILE.md](spec/PROFILE.md) — the Profile tab's settings, and backup/restore of all user
  data.
