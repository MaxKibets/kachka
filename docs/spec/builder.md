# Workout Builder

> Pre-workout assembly of the list of exercises and groups before the start (§4). Part of the Kachka v1 UI/UX spec — full map and §-index: [spec map](README.md).
> Behavior is described here; the visual system lives in `../visual/README.md`.

---

## 4. Workout Builder

> Pre-workout screen where the user assembles the list of exercises before starting the workout. Entry points: Build from scratch (§3.4), Repeat last (§3.2), Choose from history (§3.3).

### 4.1 Screen structure

```
┌─────────────────────────┐
│ ← Build workout         │  screen header
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
│  [     Continue →    ]  │  sticky bottom
└─────────────────────────┘
```

- **Header**: a back button (`←` → Today), screen title `Build workout`. Tapping `←` (or the swipe-from-left-edge back gesture) returns to Today and discards the setup, with confirmation if anything was added (§4.8). There is no separate bottom `Discard` button: back is the single exit, so the sticky bottom carries only **Continue**.
- **Workout name**: editable inline. With Repeat last / Choose from history it is filled from the source. With Build from scratch — auto `Workout · 2026-05-02`, the user can overwrite it.
- **Exercises list**: exercises + groups in performance order. Each exercise is a section showing the exercise name + a muscle-group subtitle (e.g. `Chest · Triceps`) and a `⋮` menu — no set/rep info, since sets are not defined in the Builder (§4.3, §5).
- **Quick add chips**: 7 popular exercises (§4.2). They sit at the end of the list, next to **+ Add exercise**, so both ways to add stay together in thumb reach as the list grows. Tap adds the exercise without sets — set count / reps are configured later in the In-workout pending state (§4.3, §5).
- **+ Add exercise**: opens the exercise picker (full list + search + custom). The exercise is added without sets — sets are configured in the In-workout pending state (§4.3, §5).
- **Continue** sticky button: opens the Active Workout screen — the next step of the flow. Disabled while the list is empty. It leads into the In-workout **pending** state, where sets are configured; the workout itself begins later (soft start, see §5) — at the first logged set or an explicit **Begin workout**, not when this is tapped. The label is `Continue`, not `Start`, precisely because tapping it does not start the workout: `Start`/`Begin` would overlap with the pending state's real soft-start control (`Begin workout`, §5.9).

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
| Remove exercise | Remove the exercise with confirmation |
| Add note | Per-exercise note — author hint shown in Active workout. Opens a form bottom sheet (shared editor, also reached from the Active-workout note icon) |

### 4.5 Group menu `⋮` (in Builder)

| Action | Result |
|---|---|
| Edit rounds / rest | Sheet with rounds (2-10) and restBetweenRounds |
| Add exercise to group | Picker → adds to the group (up to the limit of 5) |
| Remove exercise from group | With confirmation. If 1 remains — auto-ungroup |
| Reorder inside | Drag handles within the group |
| Ungroup | Breaks apart into flat exercises in the same order |

### 4.6 Reorder of the outer list

Drag handle on the **left** edge of each section (exercise or group). Drag changes the order. Groups move as a whole.

The handle on the left (rather than on the trailing edge per the iOS convention) is deliberate: the `⋮` menu is already on the right edge, so spreading the two controls across different edges removes clustering and yields unambiguous tap targets.

Reorder is **drag-only** — there are no `Move up / Move down` rows in the `⋮` menu (exercise or group). Builder lists are short (ad-hoc, a handful of exercises) and the left handle is built for one-handed thumb dragging, so discrete move buttons would only duplicate the gesture and lengthen the menu. For assistive tech, reorder is exposed via row **accessibility actions** ("Move up" / "Move down" custom actions on each row), not as visible menu rows — keeping the `⋮` menu composition-only.

### 4.7 Empty list

If the list is empty:

```
  No exercises yet
  Tap a chip below or "+ Add exercise"
```

Continue button disabled.

### 4.8 Discard / save for later

- Close the builder without starting → confirmation "Discard workout setup?". Confirm — everything is lost.
- "Save as draft" is deliberately not done in v1: it adds state-management without clear value. A user with a ready plan starts immediately.
