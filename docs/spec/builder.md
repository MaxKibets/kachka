# Workout Builder

> Pre-workout assembly of the list of exercises and groups before the start (§4). Part of the Kachka v1 UI/UX spec — full map and §-index: [spec map](README.md).
> Behavior is described here; the visual system lives in `../visual/README.md`.

---

## 4. Workout Builder

> Pre-workout screen where the user assembles the list of exercises before starting the workout. Entry points: Build from scratch (§3.4), Repeat last (§3.2), Choose from history (§3.3).

### 4.1 Screen structure

```
┌─────────────────────────┐
│ ← Build workout         │  modal header
├─────────────────────────┤
│  Workout name           │  editable text
│  Push Day               │
├─────────────────────────┤
│                         │
│  ─ Exercises ──────     │
│                         │
│  Bench press        ⋮   │
│   Chest · Triceps       │
│                         │
│  ┌── A · Superset ──┐   │  group block
│  │ 3 rounds · 2:00  │   │
│  │ A1 Pull-ups   ⋮  │   │
│  │  [6-10]          │   │
│  │ A2 Push-ups   ⋮  │   │
│  │  [10-15]         │   │
│  └─────────────── ⋮ ┘   │  group menu
│                         │
│  ─ Quick add ──────     │
│  [Squat][Bench][Dead]   │  chips (popular), by + Add
│  [Row][OHP][Pull-up]    │
│  [Curl]                 │
│                         │
│  + Add exercise         │
│                         │
├─────────────────────────┤
│  [   Start workout   ]  │  sticky bottom
└─────────────────────────┘
```

- **Header**: a back button (`←` → Today, consistent with the in-workout modal §5), screen title `Build workout`. Tapping `←` or swiping down closes the builder (with confirmation if anything was added — §4.8). There is no separate bottom `Discard` button: closing is the single exit, so the sticky bottom carries only **Start workout**.
- **Workout name**: editable inline. With Repeat last / Choose from history it is filled from the source. With Build from scratch — auto `Workout · 2026-05-02`, the user can overwrite it.
- **Exercises list**: exercises + groups in performance order. Each exercise is a section showing the exercise name + a muscle-group subtitle (e.g. `Chest · Triceps`) and a `⋮` menu — no set/rep info, since sets are not defined in the Builder (§4.3, §5).
- **Quick add chips**: 7 popular exercises (§4.2). They sit at the end of the list, next to **+ Add exercise**, so both ways to add stay together in thumb reach as the list grows. Tap adds the exercise without sets — set count / reps are configured later in the In-workout pending state (§4.3, §5).
- **+ Add exercise**: opens the exercise picker (full list + search + custom). The exercise is added without sets — sets are configured in the In-workout pending state (§4.3, §5).
- **Start workout** sticky button: launches the Active Workout modal. Disabled while the list is empty. It leads into the In-workout pending state — the duration clock starts later (soft start, see §5), not when this is tapped.

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

- A permanent affordance (not onboarding) — the chip rail lives at the end of the exercise list, next to **+ Add exercise**, and stays available for every build
- Localized from the system exercise database via `exerciseId`
- Tap → adds the exercise to the end of the list (without sets — configured later in the In-workout pending state, §4.3)
- No local ranking in v1 (a possible future improvement — for now the chips are static)

### 4.3 Sets for a new exercise

When an exercise is added — via Quick-add or via the picker — it is added to the Builder **without any sets**. The Builder is composition-only: it captures which exercises are in the workout and their order, not their set/rep scheme.

Set count and reps are configured in the In-workout **pending state**, where each exercise starts with a default of **1** pending set (§5, §5.5). `Add set` copies the previous set's values, so building up a scheme is one tap per set.

Bodyweight exercises (from the system db `isBodyweight: true`) still hide the kg field — now in the in-workout numpad rather than on a Builder card.

### 4.4 Exercise menu `⋮` (in Builder)

| Action | Result |
|---|---|
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
  Tap a chip below or "+ Add exercise"
```

Start workout button disabled.

### 4.8 Discard / save for later

- Close the builder without starting → confirmation "Discard workout setup?". Confirm — everything is lost.
- "Save as draft" is deliberately not done in v1: it adds state-management without clear value. A user with a ready plan starts immediately.
