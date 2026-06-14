# History

> Viewing past workouts: list + read-only detail (§10). Part of the Kachka v1 UI/UX spec — full map and §-index: [spec map](README.md).
> Behavior is described here; the visual system lives in `../visual/README.md`.

---

## 10. History

> Viewing past workouts. Past workouts are a read-only fact. The MVP is minimal: list + detail with no filters or export (moved to §16).

### 10.1 Overview

History is a separate bottom tab (`Today · History · Profile`). A stack of two screens:

- *List* — a chronological feed of completed workouts
- *Detail* — a read-only snapshot of a single workout

No topbar actions, no filter, no search, no export — all of this is moved to v2. MVP goal: see what I did, in a simple timeline form.

### 10.2 Workout list

- *Structure*: flat chronological feed, newest on top, infinite scroll with lazy loading
- *Sticky section headers*: on scroll, the label of the current week/month sticks to the top (`This week`, `Last week`, `April`). This is visual punctuation in a flat list, not a structural change
- *Topbar*: title `History`, no actions, no back button (this is the root screen of the tab)

Row (medium density), two rows:

```
[Date · Workout name]                    [Duration]
[N sets · Volume kg]
```

- *Date format*: relative for the last 7 days (`Today`, `Yesterday`, `Mon`), absolute beyond that (`28 Apr 2026`)
- *Volume*: `sum(weight × reps)` over working sets, warmups excluded (aligned with §9.4). Rendered without a thousands separator — `4540 kg`, not `4 540 kg` (visual §3.4, design-review X2 / X3)
- *Bodyweight*: exercises without weight contribute 0 to volume

Tap on a row → push detail screen.

### 10.3 Detail screen

Read-only snapshot of a workout. No editing actions.

*Header* (sticky):
- Back button
- Workout name
- Subtitle: date (full) + duration

*Body* — full snapshot:
- All exercises in execution order
- For each set: number (or `W` for warmup), then weight and reps in aligned `KG` / `REPS` columns — the unit named once in the per-exercise header, not on every row — plus RPE (if any)
- Workout note (if one was logged at completion)

*Supersets* — group rendering as in-workout, but read-only:
- Group header: letter label (`Superset A · 3 rounds`) — small inline chip (visual §2.5)
- Each exercise in the group is its own sub-block (name + its sets), in group order — mirroring the in-workout group card, not a round-by-round recap. Per-row ordinals are plain `1`/`2`/`3` = the round that set belongs to (§6.3); the group letter stays in the header only
- Sets read like a standalone exercise's — number · `KG` / `REPS` columns · optional RPE; the round count lives in the header
- Letter color consistent with how it was in the workout

*No actions*: there is no edit, repeat workout from this entry, export — all in §16.

### 10.4 Empty state

The user has never completed a workout → centered stack:

- Simple icon (illustration style — TBD with the visual style)
- Title: `No workouts yet`
- Subtitle: `Complete your first workout to see it here.`

The bottom tab bar remains. No CTA — Today is already available in the tabs.

### 10.5 What gets into History

| Event | Behavior |
|---|---|
| User tapped `Save to history` on the completion screen | Added to History with the sets that were logged |
| Finished with partial-completed (not all planned sets) | Added with the logged sets, missing ones simply not shown |
| User tapped `Discard workout` | Not saved to History |
| Skipped exercise mid-workout | Saved with the sets that were logged (if any) |
