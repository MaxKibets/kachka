# In-workout

> Active screen: zone architecture (§5), set logging + custom numpad (§7), set actions menu (§8). Supersets — separately in `supersets.md`. Part of the Kachka v1 UI/UX spec — full map and §-index: [spec map](README.md).
> Behavior is described here; the visual system lives in `../visual/README.md`.

---

## 5. In-workout screen architecture

### 5.1 Three zones

| Zone | Behavior |
|---|---|
| Top bar | Fixed. Workout name, progress `3 of 5`, session time, close + menu |
| Scroll list | List of exercises and groups. Scrolls vertically. The active position auto-scrolls into the visible zone |
| Bottom bar | Fixed. Two modes: `idle` (empty) or `rest` (countdown with context) |

### 5.2 Exercise card

Each exercise in the list is a section with:

- Exercise name + `note` and `⋯` icons (per-exercise actions)
- Set table with columns `№ | prev | kg | reps | ✓`
- `+ add set` button

Table columns:

| Column | Purpose |
|---|---|
| `№` | Set number. Tappable — opens the set actions sheet |
| `prev` | Result of this set from the previous workout (from the clone source or from the most recent performance of this set at all). Not a target, a benchmark of "what to beat". Format `60×5` |
| `kg` | Current weight. If a target is set in the Builder / clone — shown as ghost text. Otherwise a dash |
| `reps` | Reps. Same as kg |
| `✓` | Set close checkbox. Tap = save + advance cursor + start rest timer |

### 5.3 Set states

| State | Visual representation |
|---|---|
| Completed | Muted text + green ✓ |
| Active | Info bg highlight + bold number + editable kg/reps |
| Next (cued) | Thin info-colored side bar + info-tinted number |
| Pending | Regular muted text |

### 5.4 Completed exercises

A completed exercise collapses to a single-row summary (`Bench press · 3 sets done` + green ✓). It does not disappear, can be expanded back with a tap.

### 5.5 Editing mid-workout

An active workout is a full editor on top of the initial structure.

| Action | Trigger | Behavior |
|---|---|---|
| Add set | `+ add set` button at the end of the exercise's set table | New pending set with the same targets as the last one |
| Remove set | Set actions sheet → Delete | With confirmation |
| Add exercise (at the end) | Top bar `⋯` → Add exercise → picker | Default 3×8 sets |
| Insert exercise after current | Per-exercise `⋯` → Insert after | Added after the current exercise |
| Remove exercise | Per-exercise `⋯` → Remove | With confirmation. If the exercise has logged sets — a warning |
| Skip exercise | Per-exercise `⋯` → Skip | Soft variant: the exercise stays in the structure, marked `Skipped` |
| Reorder | Drag handle on the right edge of the section | The cursor stays on the same set that was active |
| Add to superset | Per-exercise `⋯` → Add to superset | §6 (with constraint: 0 logged sets in candidates) |
| Edit superset | Group `⋯` | §6.7 |
| Ungroup | Group `⋯` → Ungroup | Always allowed. §6.7 |

**Replace exercise** is deliberately deferred to v2 (in v1 it is resolved via Remove + Insert after).

### 5.6 Skip exercise

Per-exercise `⋯` → Skip → exercise marked `Skipped`, without removal from the structure:

- Logged sets (if any) stay in the exercise
- Unlogged sets do not go into volume and PR
- The cursor skips the exercise
- In History it is saved with the sets that were logged (the Skipped marker does not get into History — there it is just the fact of how many sets were done)
- Useful if the user wants to keep the exercise in the structure for a future clone

For full removal — Remove (the difference: Skip keeps the exercise, Remove takes it out of the structure).

### 5.7 Failed reps (zero reps)

If the user could not do a single rep:

- `reps: 0` is allowed in the numpad
- The set is considered completed (`✓` lights up)
- It does not go into volume (0 × weight = 0)
- It does not enter PR detection
- In History it is shown as `0 reps` explicitly

The alternative "skip a set without logging" — set actions → Delete.

### 5.8 Auto-scroll override

When the user deliberately scrolls to another exercise (manual scroll), the auto-scroll logic is paused. Closing a set still does save + cursor advance logically, but the viewport does not jump back to the cursor. The user can return two ways: scroll manually or tap the floating "return to current set" chip.

#### Return-to-cursor chip

A floating chip above the bottom bar, appears only when the active set is fully outside the viewport (disappeared at the top or bottom).

```
┌─────────────────────────┐
│  ... scroll list ...    │
│                         │
│      ┌──────────────┐   │
│      │ ↑ Set 3 of 4 │   │  floating chip, info color
│      └──────────────┘   │
├─────────────────────────┤
│  A · Rest 1:23          │  bottom bar
└─────────────────────────┘
```

- *Anchor*: above the bottom bar, horizontally centered. Does not block the bottom bar
- *Arrow icon*: `↑` if the cursor is above the viewport, `↓` if below
- *Label*: a short reference to the target — `Set 3 of 4` for a standalone exercise; `A · Set 3 of 4` for a superset (group letter prefix)
- *Color*: info-tint, consistent with the cursor highlight (§5.3) — deliberately not loud
- *Tap behavior*: smooth scroll to the active set, the chip hides, auto-scroll active again
- *Visibility logic*: shown when the active set renders fully outside the viewport (with a small threshold — 1-2 rows beyond the edge are not considered "outside")
- *Not shown* when the cursor is in the viewport, or when the workout is completed

#### Re-engage auto-scroll

A tap on the chip = re-engage auto-scroll: the viewport follows the cursor again after advance. If the user deliberately scrolls again — auto-scroll is paused again; when the cursor leaves the viewport — the chip appears again. The cycle is repeatable.

A swipe-down gesture as an alternative we do not do in v1: poor discoverability, the top of the screen is unreachable for the thumb on a 6+" phone, and the risk of collision with a future pull-to-refresh in History. We can add it as a power-user shortcut later — as a separate option.


---

## 7. Logging a single set

### 7.1 Three speed tiers

A real user in ~90% of cases does the same thing as last time or with minimal correction. The design optimizes specifically for this scenario.

```mermaid
flowchart TD
    Start[Active set with prefilled values]
    Start --> Decide{Need to change?}
    Decide -->|No| Tap1[Tap done — 1 tap total]
    Decide -->|Small adjustment| Open1[Tap field, numpad opens]
    Open1 --> Adj[Tap quick-adjust button]
    Adj --> Save1[Tap Save — 2 to 3 taps]
    Decide -->|New value| Open2[Tap field, numpad opens]
    Open2 --> Type[Type digits]
    Type --> Save2[Tap Save — 5 or more taps]
```

### 7.2 Custom numpad (bottom sheet)

Why a custom one, not the system one: the system keyboard takes up ~50% of the screen and hides the exercise context; there are no gym-specific shortcuts `+2.5` / `+5`; the decimal separator depends on the locale and confuses; it is not optimized for one-handed work.

Contents of the numpad:

1. Drag handle at the top — close by swiping down
2. Field tabs — `kg` and `reps` as two readout blocks. The active field has an info border. A tap switches focus
3. Quick-adjust row: `−5`, `−2.5`, `+2.5`, `+5` for kg. For reps it automatically switches to `−1`, `+1`, `−5`, `+5`
4. 3×4 numpad: digits `0–9`, decimal `.`, backspace
5. Primary button `Save set` at the bottom — fixed, reachable by the thumb

### 7.3 Tap-to-edit behavior

When the user taps a field with a prefilled value:

- The field is NOT cleared. It becomes regular text, all digits select-all-ed
- Backspace immediately clears
- You can start typing right away — the new number replaces the old one
- The user does not lose the reference of what was there

### 7.4 Bodyweight exercises

Pull-ups, push-ups, etc. — the kg field is redundant or optional:

- At the exercise level in the db a `isBodyweight: true` mark
- During the workout only the reps field is shown
- An optional additional `+extra weight` field for those who hang a plate on a belt

### 7.5 Decimal separator

- The user's locale determines whether we show `.` or `,` on the numpad
- Internally always point
- This must be remembered in the export format


---

## 8. Set actions menu

### 8.1 Trigger

- **Primary**: tap on the set number (left column of the table)
- **Secondary**: long-press on the row
- We do NOT add a separate `⋯` icon — it would take space in the dense table and give nothing new

### 8.2 MVP contents

| Action | Type | Notes |
|---|---|---|
| Mark as warmup | Toggle | Excludes the set from volume and PR |
| RPE | Picker 1–10 | Optional, hides in settings if the user does not use it |
| Add note | Text input | System keyboard (a rare action, economy of attention matters more than speed) |
| Delete set | Destructive | With confirmation |

### 8.3 Visual markers on the row

After configuration the set shows minimal badges:

- `W` next to the set number — warmup
- `@8` — RPE
- a small dot — a note exists

Without cluttering the main flow — readable at a glance.
