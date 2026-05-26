# Workout Builder

> Pre-workout assembly of the list of exercises and groups before the start (§4). Part of the Kachka v1 UI/UX spec — full map and §-index: [spec map](README.md).
> Behavior is described here; the visual system lives in `../visual/README.md`.

---

## 4. Workout Builder

> Pre-workout screen where the user assembles the list of exercises before starting the workout. Entry points: Start blank (§3.4), Repeat last (§3.2), Choose from history (§3.3).

### 4.1 Screen structure

```
┌─────────────────────────┐
│ ← Build workout         │  modal header
├─────────────────────────┤
│  Workout name           │  editable text
│  Push Day               │
├─────────────────────────┤
│                         │
│  Quick add:             │
│  [Squat][Bench][Dead]   │  chips (popular exercises)
│  [Row][OHP][Pull-up]    │
│  [Curl]                 │
│                         │
│  ─ Exercises ──────     │
│                         │
│  Bench press        ⋮   │
│   4 × 8 · RPE 7-8       │
│                         │
│  ┌── A · Superset ──┐   │  group block
│  │ 3 rounds · 2:00  │   │
│  │ A1 Pull-ups   ⋮  │   │
│  │  [6-10]          │   │
│  │ A2 Push-ups   ⋮  │   │
│  │  [10-15]         │   │
│  └─────────────── ⋮ ┘   │  group menu
│                         │
│  + Add exercise         │
│                         │
├─────────────────────────┤
│  [   Start workout   ]  │  sticky bottom
└─────────────────────────┘
```

- **Header**: back button, screen title `Build workout`. Swipe down closes (with confirmation if something was changed).
- **Workout name**: editable inline. With Repeat last / Choose from history it is filled from the source. With Start blank — auto `Workout · 2026-05-02`, the user can overwrite it.
- **Quick add chips**: 7 popular exercises (§4.2). Tap adds the exercise with default sets.
- **Exercises list**: exercises + groups in performance order. Each exercise is a section with a one-liner summary and a `⋮` menu.
- **+ Add exercise**: opens the exercise picker (full list + search + custom).
- **Start workout** sticky button: launches the Active Workout modal. Disabled while the list is empty.

### 4.2 Quick-add chips

A hardcoded v1 list of 7 exercises (powerlifting + basic set):

| EN | UK |
|---|---|
| Squat | Присідання |
| Bench Press | Жим лежачи |
| Deadlift | Станова тяга |
| Barbell Row | Тяга штанги в нахилі |
| Overhead Press | Жим стоячи |
| Pull-up | Підтягування |
| Bicep Curl | Згинання на біцепс |

- Chips are always visible (permanent UX, not onboarding)
- Localized from the system exercise database via `exerciseId`
- Tap → adds the exercise with default sets to the end of the list
- No local ranking in v1 (a possible future improvement — for now the chips are static)

### 4.3 Default sets for a new exercise

When an exercise is added via Quick-add or via the picker — 3 sets with `reps: 8`, no RPE, no warmup are created automatically. The user can adjust them in the exercise's `⋮` menu.

Bodyweight exercises (from the system db `isBodyweight: true`) are added without the kg field.

### 4.4 Exercise menu `⋮` (in Builder)

| Action | Result |
|---|---|
| Edit sets | Sheet with a list of sets. Each set — `reps` (single or range) + optional `rpe` + warmup toggle + delete. + Add set |
| Add to superset | Multi-select picker from other standalone exercises → config sheet (rounds, rest) → creates a group. §6 |
| Move up / Move down | Move within the list |
| Remove exercise | Remove the exercise with confirmation |
| Add note | Per-exercise note — author hint shown in Active workout |

### 4.5 Group menu `⋮` (in Builder)

| Action | Result |
|---|---|
| Edit rounds / rest | Sheet with rounds (2-10) and restBetweenRounds |
| Add exercise to group | Picker → adds to the group (up to the limit of 5) |
| Remove exercise from group | With confirmation. If 1 remains — auto-ungroup |
| Reorder inside | Drag handles within the group |
| Move group up / down | As a single whole |
| Ungroup | Breaks apart into flat exercises in the same order |

### 4.6 Reorder of the outer list

Drag handle on the **left** edge of each section (exercise or group). Drag changes the order. Groups move as a whole.

The handle on the left (rather than on the trailing edge per the iOS convention) is deliberate: the `⋮` menu is already on the right edge, so spreading the two controls across different edges removes clustering and yields unambiguous tap targets.

### 4.7 Empty list

If the list is empty:

```
  No exercises yet
  Tap a chip above or "+ Add exercise"
```

Start workout button disabled.

### 4.8 Discard / save for later

- Close the builder without starting → confirmation "Discard workout setup?". Confirm — everything is lost.
- "Save as draft" is deliberately not done in v1: it adds state-management without clear value. A user with a ready plan starts immediately.
