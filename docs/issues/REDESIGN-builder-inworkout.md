# Redesign — Builder = composition, In-workout = soft-start pending

- **Status:** locked 2026-05-31, implementation pending.
- **Supersedes:** F2.1 (Edit sets moves out of the Builder row menu).
- **Branch:** `refactor/builder-inworkout-soft-start` (own focused PR).

This file is the source of truth for the redesign. It survives context
compaction and grounds any subagent doing the edits. A subagent MUST read this
file plus its target file(s) before editing, and follow this brief exactly.

## Why (north star)

Two personas must both be served on one flow, with a **soft** (not hard-gated)
pre-workout/workout boundary:

- **Planner** — lay out the full workout (exercises + sets/reps + optional
  weights) before starting, to have the full picture.
- **Improviser** — log ad-hoc, workout kept in their head, no prepared scheme.

## Locked model

- **Builder = light composition.** Workout name + exercise list + reorder + add
  (quick-add chips / picker) + supersets. Each card shows **name + muscle
  groups** only. **No set presets on the card.**
- **In-workout = one screen, two states** (pending/pre-start + live). Not a new
  screen — a state, like `today-in-progress.html` documents a state of Today.
- **Soft start.** The workout "begins" (cursor on, rest timer armable, duration
  clock starts) at the **first logged set OR an explicit `Begin` tap — whichever
  first**. Planning/setup time is not counted toward duration.
- **Default 1 pending set** when an exercise is added (Builder add, quick-add
  chip, or mid-workout `⋯ → Add exercise`).
- **`Add set` copies the previous set's values** (reps/weight) → adding a set is
  one tap.
- **Pre-set weights are optional.** A pending set shows the reps target + `prev`
  (last workout) as guidance; the weight field is blank but fillable.
  "Weight chosen live, guided by prev" remains the norm.

## Already-supported machinery (do NOT reinvent)

- `in-workout.md §5.5` already allows mid-workout add (`⋯ → Add exercise`,
  `Insert after`).
- `in-workout.html` already renders `.set-row.pending` — the pending state
  largely exists visually already.

## Change set (by stage)

### Stage 1 — Spec (do first; source of truth)

- `spec/builder.md §4.1` — screen diagram + bullets: cards show muscle groups,
  not `4×8 · RPE`. Note the CTA leads into In-workout pending.
- `spec/builder.md §4.3` — rewrite: exercises are added **without sets** in the
  Builder; sets are configured in the In-workout pending state (default 1).
- `spec/builder.md §4.4` — row menu = composition only: `Add note`,
  `Add to superset`, `Remove`. **Remove `Edit sets`.** Reorder is drag-only
  (§4.6) — no menu `Move up / Move down`.
- `spec/in-workout.md §5` — add the **pending/pre-start state** + the
  **soft-start** definition; default 1 set; `Add set` copies prev; optional
  pre-set weight with `prev` guidance.
- `spec/in-workout.md §5.5` — `Add exercise` mid-workout default `3×8` → `1 set`.
- `spec/decisions.md §17` — record these as locked decisions.

### Stage 2 — Wireframes (match the spec)

- `wireframes/builder.html` — cards = name + muscle groups; remove
  `3 sets · 8 reps`; update annotations; CTA.
- `wireframes/builder-row-menu-sheet.html` — **revert** the `Edit sets` row
  added for F2.1; keep `Add note` + composition actions; update annotations.
- `wireframes/in-workout.html` — reflect soft start / default 1 / prev guidance
  (this is the **live** state).
- `wireframes/in-workout-pending.html` — **NEW**: documents the pending state
  (all sets pending, `Begin` control, cursor off, optional weight, `Add set`).
- `wireframes/builder-with-supersets.html` + `wireframes/in-workout-with-supersets.html`
  — same treatment; resolve open detail #1 first.

### Stage 3 — Bookkeeping

- `issues/F2.1-builder-row-menu-edit-sets.md` — re-resolve as **superseded**.
- `issues/INDEX.md` + `wireframes/INDEX.md` — statuses + open questions.

## Open details (resolved 2026-05-31)

1. **Supersets — RESOLVED: In-workout pending.** Group-child reps are edited in
   the In-workout pending state (consistent with standalone sets, with `prev`
   guidance). `superset-config-sheet` keeps ONLY rounds + rest (no per-child
   reps). `builder-with-supersets` cards show muscle groups, not reps. Groups
   have no per-child `Add set` — rounds govern the count.
2. **Builder CTA name — RESOLVED: `Continue →` (revised 2026-06-03).** The
   Builder CTA is `Continue →`, not `Start workout`: tapping it does not start
   the workout (the clock is soft), it only enters the In-workout pending state.
   The explicit soft-start control inside pending stays `Begin workout`. The
   earlier "keep `Start workout`" call was reversed — `Start` overlapped with
   `Begin` and falsely implied the timer started on tap.
3. **In-progress banner (§3.1.c) — RESOLVED: pending-only is NOT in-progress.**
   The banner appears only after the workout has begun (first logged set or
   `Begin`). Closing a pending-only workout discards the setup, like leaving the
   Builder.

## Process notes

- Other P1 design-review issues (F1.1, F3.1, F2.2, F5.2) remain valid and
  independent of this redesign.
- The current `fix/design-review-issues` working tree holds valid X1 + F5.1
  fixes; the F2.1 wireframe change is superseded here.
