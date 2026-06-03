# Exercise picker / database

> Shared component for exercise search / selection / management: Add and Browse modes, custom with soft delete (§11). Part of the Kachka v1 UI/UX spec — full map and §-index: [spec map](README.md).
> Behavior is described here; the visual system lives in `../visual/README.md`.

---

## 11. Exercise picker / Exercise database

> Shared component: search, filters, browsing and management of exercises. Used in three contexts and two modes.

### 11.1 Use cases and modes

| Context | Mode | Trigger |
|---|---|---|
| Workout Builder — `+ Add exercise` | Add | User selects an exercise to add in the Builder (§4) |
| Active workout — Top bar `⋯` → Add exercise | Add | Same thing mid-workout (§5.5) |
| Active workout — Per-exercise `⋯` → Insert after | Add | Insert after the current exercise (§5.5) |
| Profile → Exercise database | Browse | Browsing + edit/delete custom exercises |

One screen-component, two modes:

- **Add mode** — **page sheet** (full-screen modal; foundations §2.5, visual §5.7). Tapping a row selects an exercise and returns to the caller with a payload. Header inside the sheet: grab handle + `Add exercise` title + `[×]` close — **no** back arrow; dismiss via `×` or swipe-down
- **Browse mode** — pushed sub-screen in the Profile stack (from Profile root → DATA → Exercise database). A custom row has `⋮` → action sheet (Edit / Delete). Tapping the row body (both custom and system) — nothing: there is no separate detail screen in v1. Header: `← Exercise database` (with back button)

### 11.2 Screen structure

```
┌─────────────────────────┐
│         ───             │  grab handle — Add (page sheet)
│   Add exercise      [×] │  Add mode header (× close, no back)
│ ← Exercise database     │  Browse mode header (push, back)
├─────────────────────────┤
│  🔍 Search exercises    │
├─────────────────────────┤
│  All  Chest  Back  Legs │  muscle group chips
│  Biceps Triceps Sho…    │  (horizontal scroll)
│  Core                   │
├─────────────────────────┤
│                         │
│  Bench Press            │
│  Chest, Triceps         │
│                         │
│  Bicep Curl             │
│  Biceps                 │
│                         │
│  My weird squat [Cus] ⋮ │  ⋮ only Browse + custom
│  Legs · Bodyweight      │
│                         │
│  ...                    │
│                         │
├─────────────────────────┤
│  + Create custom        │  sticky bottom (always)
└─────────────────────────┘
```

### 11.3 Search

- Case-insensitive substring match (`bench` finds `Bench Press`)
- No fuzzy / Levenshtein in v1 (deferred)
- Search works together with the muscle group filter (AND composition)
- Empty search + selected filter → all exercises with that tag
- Empty search + `All` → the whole catalog
- Search resets every time the picker is opened

### 11.4 Muscle group filter

7 categories in v1: **Chest · Back · Legs · Biceps · Triceps · Shoulders · Core**.

- Sticky `All` chip always first, selected by default
- Single-select (one active chip at a time)
- System exercises have multi-tag (for example `Bench Press = Chest + Triceps`); filtering by any tag includes them
- Custom exercises have single-tag (one of the 7), chosen at creation
- The filter resets every time the picker is opened

### 11.5 List item

One row:

```
[Exercise name]  [Custom?]  [⋮ if Browse+custom]
[muscle groups · attrs]
```

- **Name** — primary text
- **Muscle groups** — comma-separated list (`Chest, Triceps`)
- **Attributes** — `Bodyweight` if `isBodyweight: true`
- **Custom badge** — a small `Custom` chip to the right of the name for custom exercises (identity marker, in both modes)
- **`⋮` menu** — only in Browse mode for custom: opens an action sheet with Edit / Delete (§11.8). System rows have no menu

Sorting — alphabetical (case-insensitive).

### 11.6 Empty state — no results

If search finds nothing:

```
┌─────────────────────────┐
│ ← Add exercise      [×] │
├─────────────────────────┤
│  🔍 cable woodchopper   │
├─────────────────────────┤
│                         │
│  Nothing found          │
│                         │
│  ┌───────────────────┐  │
│  │ + Create as custom│  │
│  │ "cable woodchopper"│ │
│  └───────────────────┘  │
└─────────────────────────┘
```

Inline affordance to create a custom with the same name. Tap → opens the Custom creation sheet with a prefilled name (§11.7).

The `+ Create custom` sticky button at the bottom also stays available — a fallback for cases where the user did not enter a search.

### 11.7 Custom creation sheet

Invoked from:
- Inline `Create as custom 'X'` affordance (with prefilled name)
- Sticky `+ Create custom` button (with empty name)
- Profile → Exercise database → `+ Create custom` (with empty name)

```
┌─────────────────────────┐
│ ← New custom exercise   │
├─────────────────────────┤
│  Name                   │
│  [_______________]      │
│                         │
│  Muscle group           │
│  Chest Back [Legs] ...  │  single-select chips
│  Biceps Triceps Sho...  │
│  Core                   │
│                         │
│  Bodyweight     [⚪]    │  toggle
│                         │
│  [    Create    ]       │
└─────────────────────────┘
```

Fields:
- **Name** — required, non-empty
- **Muscle group** — required, single-select from 7 categories
- **Bodyweight** — toggle, default off

Validation: name unique (case-insensitive). If such an exercise already exists (system or non-deleted custom) — warning + Create disabled.

Create → new custom exercise in the db. The modal closes. If invoked from Add mode — the exercise is automatically selected and returned to the caller.

### 11.8 Custom exercise actions (Browse mode)

`⋮` on a custom row in Profile → Exercise database → bottom action sheet:

```
┌─────────────────────────┐
│  My weird squat         │  sheet header (context)
│  Legs · Bodyweight      │
├─────────────────────────┤
│  Edit                   │  → Custom creation sheet with prefill
│  Delete           (red) │
└─────────────────────────┘
```

- **Edit** → Custom creation sheet (§11.7) with the current data prefilled. Confirm → updates entity in place — the same ID, the new name is shown in all past workouts
- **Delete** → confirmation: `"Delete 'X'? It won't appear in the picker anymore. Past workouts using it stay unchanged."` → soft delete (§11.9)

There is no separate detail screen in v1: edit/delete are the only actions, so a bottom action sheet (consistent with the §1 pattern "all menus are bottom sheets") is cheaper than a full screen. The detail screen is reserved for v2, when per-exercise statistics appear (§11.10).

System exercises have no `⋮` — in Browse mode tapping a system row does nothing.

### 11.9 Soft delete

Custom exercise delete = soft delete:

- The entity gets a `deletedAt: timestamp`
- Not shown in the picker (Add mode) or in the Exercise database list (Browse mode)
- In History all past workouts keep showing the name and attributes as they were (referenced by ID)
- The user can create a new custom with the same name — it will be a separate entity with a new ID (validation §11.7 considers only non-deleted ones)

Hard delete (remove from History forever) is not provided in v1. If ever needed — a separate action in Settings (`Delete all data` we are not doing in v1, see §12).

### 11.10 What is deferred to v2 / later

- Recency-based sort (recently used at the top)
- Multi-select in Add mode (add several exercises in one flow)
- Equipment filter (Barbell / Dumbbell / Machine / Cable / Bodyweight / Kettlebell)
- Multi-tag for custom exercises (one custom = several groups)
- Fuzzy search (Levenshtein, typo tolerance)
- Notes on a custom exercise
- Custom exercise detail screen + per-exercise statistics (used in N workouts, last used). In v1 edit/delete go through the `⋮` action sheet (§11.8); the detail screen will appear together with statistics
- Bulk import / export of the exercise db
- Hard delete of a custom with cascade removal from History
