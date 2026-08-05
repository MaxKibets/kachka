# Today

> Scope: Today's three states, the ways to start a workout, and first-launch onboarding. Map: docs/INDEX.md.
> Behavior only; the visual system is maintained in the Claude Design project.

## 1. Overview

Today is the app's entry point — the first bottom tab, and the only screen a workout is
started from. §2 covers its three states, driven by workout history and whether a
workout is already in progress. §3–§5 cover the three ways to start one — Repeat last,
Choose from history, Build from scratch. §6 covers first-launch onboarding, which reuses
Today's empty state.

## 2. Today — three modes

Today has three possible states:

**Has history, no in-progress workout** — main flow. "Repeat last" card + links
`Choose from history` and `Build from scratch`.

**No history (first launch)** — empty state. A single CTA "Start your first workout".

**In-progress workout exists** — banner at the top "In-progress · Resume / Discard" +
main flow below it.

### 2.1 Has history

```
┌─────────────────────────┐
│ Today                   │
├─────────────────────────┤
│                         │
│  ┌───────────────────┐  │
│  │ Last workout      │  │
│  │ Push Day · 5d ago │  │
│  │                   │  │
│  │ Bench, Pull-ups,  │  │
│  │ Push-ups, Squat   │  │
│  │                   │  │
│  │ [ Repeat last ]   │  │
│  └───────────────────┘  │
│                         │
│  Or                     │
│  > Choose from history  │
│  > Build from scratch   │
│                         │
└─────────────────────────┘
```

- **Repeat last** card shows a summary of the last completed workout: name, relative
  date (`5d ago`, `2 weeks ago`), one-liner exercise list.
- **Choose from history** — tap → list of all completed workouts (chronological). Tap
  on a workout → it is cloned. Useful for split routines (PPL, upper/lower) — the user
  picks "last upper day".
- **Build from scratch** — tap → Workout Builder with an empty list + Quick-add chips.

### 2.2 No history (first launch)

```
┌─────────────────────────┐
│ Today                   │
├─────────────────────────┤
│                         │
│         💪              │
│                         │
│  Start your first       │
│  workout                │
│                         │
│  Build it from scratch  │
│  or pick from suggested │
│  exercises              │
│                         │
│  [ Build workout ]      │
│                         │
└─────────────────────────┘
```

CTA → Workout Builder with an empty list. Quick-add chips (BUILDER.md §3) are visible —
the user sees 7 familiar exercises and starts with one tap.

### 2.3 In-progress workout

Banner above the main content (overlaid on top of §2.1 or §2.2):

```
┌─────────────────────────┐
│ Today                   │
├─────────────────────────┤
│  ┌───────────────────┐  │
│  │ In-progress       │  │
│  │ Push Day          │  │
│  │ Resume · Discard  │  │
│  └───────────────────┘  │
│                         │
│  ... main flow ...      │
└─────────────────────────┘
```

- Resume → Active workout modal opens at the saved state
- Discard → workout is removed with confirmation

While the banner is present, the main CTAs of the other two modes (§2.1, §2.2) —
`Repeat last`, `Choose from history`, `Build from scratch` — are **disabled** (dimmed,
do not respond to tap). The only way forward is Resume or Discard via the banner.
Constraint: one active workout at a time; a new one does not start until the old one is
completed or discarded.

Deliberately NOT auto-resume: risk of landing in a forgotten old workout right when
opening. We deliberately block the CTAs instead of a confirm dialog: the banner already
carries Resume/Discard, duplicating the choice in a sheet would be a redundant state.

## 3. Repeat last — cloning

Tapping "Repeat last" performs:

1. Creates a new workout with an ID (UUID v4) and the current date-time
2. Copies `name` from the source
3. Copies the structure: exercises in the same order, groups with the same rounds +
   rest, set count and targets (reps + RPE)
4. **Does NOT copy logged values** (kg, actual reps). Fields are empty
5. Binds `prev` for each set — the value from the cloning source
6. Opens Workout Builder with a filled list — the user can adjust before starting

The user sees a ready workout, can add/remove/edit something, and starts.

## 4. Choose from history

A separate screen with a list of completed workouts (chronological). Same rendering as
the History list (HISTORY.md §2). Tap on a workout → it is cloned (as §3) → Workout
Builder opens.

The `prev` values in the cloned workout are taken from the chosen source, not from the
most recent identical workout. Deliberate — the user chose this specific day as the
reference point.

## 5. Build from scratch — Workout Builder

Tap → Workout Builder with an empty list. Quick-add chips are visible for a quick
start. You can also call the full exercise picker via "+ Add exercise".

Builder details — BUILDER.md.

## 6. Onboarding

First launch:

1. App launches
2. Today screen → empty state (§2.2)
3. Tap "Build workout" → Workout Builder with chips

No welcome screens, no feature tour, no language selection (auto-detect from locale),
no units selection (kg in MVP). Onboarding is functional, not marketing.
