# Profile & Backup

> Scope: Profile tab settings (preferences, workout defaults, data, about) and manual
> backup/restore of all user data. Map: docs/INDEX.md.
> Behavior only; the visual system is maintained in the Claude Design project.

## 1. Overview

Profile is the third bottom tab (`Today · History · Profile`, FOUNDATIONS.md §3.1) — a generic
hub for everything that is not workout logging or history. It follows a hybrid architecture:
lightweight settings sit inline on the root screen, and heavier workflows are separate pushed
sub-screens. §2 covers the root screen's structure. §3–§6 cover its four inline blocks —
Preferences, Workout settings, Data, and About. §7–§12 cover Backup & restore, the sub-screen
reached from Data: manual export and import of all user data as a single JSON file. With no
accounts or servers in v1, it is the only disaster-recovery and device-migration mechanism the
app has.

## 2. Profile root

```
┌─────────────────────────┐
│ Profile                 │
├─────────────────────────┤
│  PREFERENCES            │
│  Theme        System ▾  │
│  Language     System ▾  │
│  Show RPE          [✓]  │
├─────────────────────────┤
│  WORKOUT                │
│  Rest haptic       [✓]  │
│  Rest sound        [⚪] │
│  Default rest    90s ▾  │
├─────────────────────────┤
│  DATA                   │
│  Exercise database  >   │
│  Backup & restore   >   │
├─────────────────────────┤
│  About              >   │
└─────────────────────────┘
```

The tab's root screen — no back button, title `Profile`, scrollable. Four blocks with grouped
section headers:

| Section | Content | Control type |
|---|---|---|
| `PREFERENCES` | Theme, Language, Show RPE | Picker rows + toggle |
| `WORKOUT` | Rest haptic, Rest sound, Default rest | Toggles + picker row |
| `DATA` | Exercise database, Backup & restore | Sub-screen rows |
| `About` | About | Sub-screen row (no section prefix) |

## 3. Preferences

### 3.1 Theme

Tap → action sheet with three options: `System` (default), `Dark`, `Light`. Tapping an option
applies it immediately and dismisses the sheet — no `Cancel`/`Done` footer; the currently
selected row carries a trailing checkmark.

`Dark` is the primary theme — FOUNDATIONS.md §2 mandates a dark theme for the in-workout UI.
`Light` is built in v1 for completeness and to support `System` mode, not as a recommended use
case.

### 3.2 Language

Tap → action sheet with three options: `System` (default), `English`, `Ukrainian`. Same
instant-apply, trailing-checkmark interaction as Theme (§3.1). `System` auto-detects from the
device locale; if the locale is neither English nor Ukrainian, it falls back to English. An
override replaces the detected language immediately, without an app restart.

### 3.3 Show RPE

Toggle, default ON.

- ON — the RPE picker is available in the set actions sheet (IN_WORKOUT.md §4.2), and the `@8`
  badge renders on the set row (IN_WORKOUT.md §4.3)
- OFF — the `RPE` item disappears from the set actions sheet, and `@8` badges are hidden.
  Previously logged RPE values stay in the database and reappear when the toggle switches back ON

There is no decimal-separator setting anywhere in Preferences: comma vs. point on the in-workout
numpad follows the device locale only, never a user override (IN_WORKOUT.md §3.5).

## 4. Workout settings

### 4.1 Default rest

The starting duration for the rest countdown that runs between sets (IN_WORKOUT.md §2.10). Tap
→ action sheet with presets `60` / `90` / `120` / `180` s plus `Off`, applied instantly (same
interaction as Theme and Language, §3.1). Default `90 s`.

- Drives the auto-start rest timer for standalone exercises. Supersets carry their own
  per-group rest, set in the superset config sheet (SUPERSETS.md §3) — independent of this
  default
- `Off` — closing a set does not auto-start a countdown; the bottom bar stays idle
- Per-exercise rest override is out of scope for v1 (see Deferred to v2 below)

### 4.2 Rest end signals

Signals fired when the rest countdown reaches `0:00`:

| Toggle | Default | Behavior when ON |
|---|---|---|
| Rest haptic | ON | Haptic impact (medium) on reaching `0:00` |
| Rest sound | OFF | A short cue sound via the system audio channel |

No push notifications in v1 — the signal only fires while the app is in the foreground (see
Deferred to v2 below). When both toggles are OFF, the timer simply reaches `0:00` visually, with
no signal.

## 5. Data

- **Exercise database** — opens the exercise picker (EXERCISES.md) in Browse mode, pushed onto
  the Profile stack (EXERCISES.md §2)
- **Backup & restore** — pushes the Backup & restore sub-screen (§7)

## 6. About

Tap → pushes a sub-screen with static content:

- App name + version: `Kachka · 1.0.0 (build 42)` (the build number comes from CI)
- A localized tagline, a brand pun: EN `Get lifting.` / UA `Качайся.`
- A source code link → GitHub (the app is open source)
- A privacy note: `Your data stays on this device. No accounts, no servers, no analytics.`

No `Acknowledgements`, `Open source licenses`, or `Report an issue` rows in v1 —
acknowledgements need a fixed dependency stack to list against, to be added in v1.x once that
stack is settled.

## 7. Backup & restore screen

Pushed from Data (§5) — manual export and import of all user data, in two symmetric zones:

```
┌─────────────────────────┐
│ ← Backup & restore      │
├─────────────────────────┤
│                         │
│  EXPORT                 │
│  Save all your data to  │
│  a file you can store   │
│  or share.              │
│                         │
│  [ Export backup ]      │
│                         │
├─────────────────────────┤
│                         │
│  IMPORT                 │
│  Restore data from a    │
│  backup file.           │
│                         │
│  [ Import backup ]      │
│                         │
└─────────────────────────┘
```

No `Last export` indicator — a clean, reminder-free manual mode.

## 8. Export flow

1. Tap `Export backup`
2. The app serializes all user data into JSON:
   - All workouts (with sets and superset structure, referencing exercises by UUID)
   - All custom exercises, including soft-deleted ones — History still references them by ID
     (EXERCISES.md §10)
   - User settings (theme, language, Show RPE, Rest haptic, Rest sound)
   - Metadata: `schemaVersion`, `appVersion`, `exportedAt` (ISO timestamp)
3. A temporary file `kachka-backup-YYYY-MM-DD.json` is created
4. The native share sheet opens (iOS Share / Android Intent) — the user picks the destination:
   Files, iCloud Drive, AirDrop, Drive, email, Telegram, etc.
5. On success — toast `Backup exported`

Deliberately no custom destination picker of our own — the native share sheet already covers
every scenario. Export is always complete: v1 does not offer a selective export of just
workouts or just exercises.

## 9. Import flow

1. Tap `Import backup`
2. Native file picker, filtered to `.json`
3. The app reads the file and validates it (§12). On error — an error sheet with the specific
   reason
4. If valid — pushes the Import preview screen:

```
┌─────────────────────────┐
│ ← Import preview        │
├─────────────────────────┤
│  kachka-backup-         │
│  2026-04-15.json        │
│                         │
│  Created: 18 days ago   │
│  App version: 1.0.0     │
│                         │
│  Backup contains:       │
│   • 47 workouts         │
│   • 12 custom exercises │
│   • Settings            │
│                         │
│  IMPORT MODE            │
│  ● Replace all          │
│  ○ Merge (skip dupes)   │
│                         │
│  [ Import ]             │
└─────────────────────────┘
```

5. The user reviews the preview and chooses an import mode (default `Replace all`, §10). Tap
   `Import`
6. Bottom sheet confirmation (FOUNDATIONS.md §2):
   - *Replace*: title `Replace all data?`, description `Current data will be lost. This cannot
     be undone.`, `Cancel` (top) + destructive `Replace` (bottom)
   - *Merge*: title `Import 47 workouts and 12 exercises?`, description `Existing data is
     preserved. Duplicates by ID are skipped.`, `Cancel` (top) + primary `Import` (bottom)
7. On confirm — an atomic transaction. On failure — rollback to the pre-import state, error
   sheet
8. On success — toast `Backup imported`, return to Profile root

The preview screen already doubles as the dry run before commit — nothing is written to the
database until the confirmation in step 6, so a separate dry-run mode would add nothing.

## 10. Import modes

Two options, chosen on the preview screen (§9):

| Mode | What it does with entities | What it does with settings | Use case |
|---|---|---|---|
| **Replace all** (default) | Wipe local db → insert backup as-is | Settings from the backup replace the current ones | Disaster recovery / device migration / "I want everything back the way it was" |
| **Merge (skip dupes)** | Insert only new entities (new UUID); existing ones are skipped | Current settings are kept | Multi-device: add workouts from another device without losing the current ones |

Default `Replace all` — the typical scenario. `Merge` is for the rarer multi-device flow.

Skip-by-UUID means: if an entity already exists with the same ID, the current version is kept.
v1 does not do per-field merge — it needs conflict-resolution UX and is deferred together with
full sync (see Deferred to v2 below).

## 11. File and format

- *Default name*: `kachka-backup-YYYY-MM-DD.json`
- *Extension*: `.json`
- *Encoding*: UTF-8
- *Plain JSON in v1* — no encryption or password. Data sensitivity is low (workout history),
  and the user chooses where to store the file. Encryption is a separate question for v2,
  alongside sync (see Deferred to v2 below)

Kachka does not keep its own history of backup snapshots — each export is a new file, and the
destination the user picked (Files, Drive, etc.) already keeps that history.

## 12. Validation and errors

When the app reads the file — an error sheet (bottom sheet, FOUNDATIONS.md §3.5) with a
specific reason:

| Error | Message |
|---|---|
| Invalid JSON / corrupted file | `Could not read backup. The file may be corrupted.` |
| Unrecognized format (no `schemaVersion`) | `This file is not a Kachka backup.` |
| Newer `schemaVersion` | `This backup was created with a newer version of Kachka. Update the app to import.` |
| Older `schemaVersion` | Auto-migrate JSON → current schema before preview (without user involvement). If migration fails — `Could not upgrade backup to current version.` |

## Deferred to v2

- **Delete all data** — a rare use case, since the user can reinstall the app; if ever added, a
  separate destructive action in Data with a double-confirm.
- **Units toggle (kg/lb)** — kg only in v1; lb via a user setting in v2.
- **Per-exercise rest override** — v1 has one `Default rest` shared by every standalone
  exercise (§4.1).
- **Notifications** — push, scheduled reminders, and a rest-end banner while the app is
  backgrounded; v1 has local haptic/sound only (§4.2).
- **Auto-backup** — scheduled background export; needs reliable background tasks and
  permissions.
- **Encryption / password protection** for backups — bundled with sync in v2; v1 ships plain
  JSON (§11).
- **Per-field merge** on import — conflict-resolution UX for merging individual fields; v1 only
  skips duplicates by UUID (§10).
