# History

> Scope: Viewing past workouts — the chronological list and the read-only workout detail. Map: docs/INDEX.md.
> Behavior only; the visual system is maintained in the Claude Design project.

## 1. Overview

History is a bottom tab (`Today · History · Profile`, FOUNDATIONS.md §3.1) — a stack of two
screens: a chronological *list* of completed workouts, and a read-only *detail* snapshot of one.
A past workout is a read-only fact, so the MVP stays minimal: no topbar actions, filter, search,
or export. §2 covers the list screen, §3 the detail screen, §4 the empty state, and §5 which
workout-ending outcomes actually get saved here.

## 2. Workout list

- **Structure**: flat chronological feed, newest on top, infinite scroll with lazy loading.
- **Sticky section headers**: on scroll, the label of the current week/month sticks to the top
  (`This week`, `Last week`, `April`) — visual punctuation in a flat list, not a structural
  grouping.
- **Topbar**: title `History`, no actions, no back button — this is the root screen of the tab.

Row (medium density), two lines:

```
[Date · Workout name]                    [Duration]
[N sets · Volume kg]
```

- **Date format**: relative for the last 7 days (`Today`, `Yesterday`, `Mon`), absolute beyond
  that (`28 Apr 2026`).
- **Volume**: `sum(weight × reps)` over working sets, warm-ups excluded (FINISH.md §5). Rendered
  without a thousands separator — `4540 kg`, not `4 540 kg` — locale-independent, and avoids
  colliding with the `·` used elsewhere as a meta separator.
- **Bodyweight**: exercises without a logged weight contribute 0 to volume.

Tap a row → push the detail screen (§3).

## 3. Detail screen

Reached by tapping a row in the list (§2) — a push sub-screen within the History stack
(FOUNDATIONS.md §3.5). A read-only snapshot of one workout: no editing actions live here.

**Header** (sticky):
- Back button
- Workout name
- Subtitle: full date + duration

**Body** — the full snapshot:
- Every exercise, in execution order
- Per set: number (or `W` for warm-up, IN_WORKOUT.md §4.3), then weight and reps in aligned
  `KG` / `REPS` columns — the unit named once in the per-exercise header, not on every row —
  plus RPE if one was logged. A set logged with 0 reps (IN_WORKOUT.md §2.7) still shows `0 reps`
  explicitly, not hidden
- The workout note, if one was logged at completion (FINISH.md §3)

**Supersets** render read-only, with the same group card and letter-label conventions as
Builder and Active workout (SUPERSETS.md §4–§5):
- Each exercise in the group is its own sub-block (name + its sets), in group order —
  mirroring the in-workout group card, not a round-by-round recap
- Per-row ordinals are plain `1`/`2`/`3` — the round that set belongs to, not the combined
  `A1`/`A2` form reserved for frameless inline references (SUPERSETS.md §4); the group letter
  and round count live in the header, not per row

There is no edit or export action on this screen. To start a new workout from a specific past
one, the path is Choose from history from Today (TODAY.md §4), not this screen.

## 4. Empty state

The user has never completed a workout — a centered stack:

- Simple icon
- Title: `No workouts yet`
- Subtitle: `Complete your first workout to see it here.`

The bottom tab bar stays visible. No CTA on this screen — Today already offers a way to start
(TODAY.md §2.2).

## 5. What gets into History

| Event | Behavior |
|---|---|
| `Save to history` on the completion screen (FINISH.md §3) | Added, with the sets that were logged |
| Finished with sets left unlogged (partial) | Added with the logged sets; the unlogged ones simply not shown |
| `Discard workout` (FINISH.md §3), or the empty-workout confirm (FINISH.md §2) | Not saved |
| Exercise skipped mid-workout (IN_WORKOUT.md §2.6) | Saved with the sets that were logged, if any — the `Skipped` marker itself does not carry over |

## Deferred to v2

- **Filter and search** in the workout list, by period and by exercise.
- **Export** of a single workout or a period, including Markdown for LLM chats.
- **PR badges** on individual sets in the detail screen — the completion screen's PR detection
  (FINISH.md §4) still applies at save time; only the detail screen's per-set badge is deferred.
- **Progress charts and trends** — per-exercise progress charts, strength trends, and a PR
  timeline across workouts. v1's PR detection (FINISH.md §4) surfaces a single PR at save time
  only; there is no historical trend view.
- **Streaks and gamification** — streak counters and other motivational rewards derived from
  workout history.
