# Profile, Settings & Backup

> Settings hub — PREFERENCES / WORKOUT / DATA / About (§12) and backup / restore (§13). Part of the Kachka v1 UI/UX spec — full map and §-index: [spec map](README.md).
> Behavior is described here; the visual system lives in `../visual/README.md`.

---

## 12. Profile + Settings

> Profile tab — generic hub for everything that is not workout / history. Hybrid architecture: settings inline on the root screen, heavy workflows (Exercise db, Backup/Restore) as separate sub-screens.

### 12.1 Profile root — structure

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

Profile root — the tab's root screen, no back button. Title `Profile`. Scrollable.

Four blocks with grouped section headers:

| Section | Content | Control type |
|---|---|---|
| `PREFERENCES` | Theme, Language, Show RPE | Picker rows + toggle |
| `WORKOUT` | Rest haptic, Rest sound, Default rest | Toggles + picker row |
| `DATA` | Exercise database, Backup & restore | Sub-screen rows |
| `About` | About | Sub-screen row (no section prefix) |

### 12.2 PREFERENCES

#### Theme

Tap → action sheet with three options: `System` (default), `Dark`, `Light`. The selection applies instantly. `System` means auto-follow the OS theme.

`Dark` — the primary theme (from §1: "dark theme is mandatory"). `Light` is built in v1 for completeness and the System mode, but not as a recommended use case.

#### Language

Tap → action sheet with three options: `System` (default), `English`, `Ukrainian`. `System` auto-detects from locale; if the locale is neither English nor Ukrainian — fallback to English. The override overwrites detection without a restart.

#### Show RPE

Toggle, default ON.

- ON: RPE picker available in the set actions sheet (§8.2), the `@8` badge is rendered in the set row
- OFF: the `RPE` item disappears from the set actions sheet, `@8` badges are not shown; previously logged RPE values are kept in the db and returned when ON

### 12.3 WORKOUT

#### Default rest

The starting duration for the rest countdown (in-workout §5.10). Tap → action sheet with presets `60` / `90` / `120` / `180` s + `Off`, applied instantly (same pattern as Theme / Language, §12.2). Default `90 s`.

- Drives the auto-start rest timer for standalone exercises. Supersets carry their own per-group rest set in the superset config (§6.2), independent of this default.
- `Off` — closing a set does not auto-start a countdown; the bottom bar stays `idle`.
- Per-exercise rest override → v2.

#### Rest end signals

Signals when the rest timer reaches 0:00.

| Toggle | Default | Behavior when ON |
|---|---|---|
| Rest haptic | ON | Haptic impact (medium) on reaching 0:00 |
| Rest sound | OFF | A short cue sound via the system audio channel |

No push notifications in v1 (background → v2). When both are OFF — the timer simply visually reaches 0:00.

### 12.4 DATA

#### Exercise database

Tap → opens §11 Exercise picker in Browse mode as a push on the Profile stack.

#### Backup & restore

Tap → a separate sub-screen. Details — §13.

### 12.5 About

Tap → push sub-screen with static content:

- App name + version: `Kachka · 1.0.0 (build 42)` (build number from CI)
- Source code link → GitHub (open source)
- Privacy note: `Your data stays on this device. No accounts, no servers, no analytics.`

No acknowledgements in v1 — we will add them once the stack is chosen and the dependency list is fixed.

### 12.6 Deliberately NOT doing in v1

- **Delete all data** — a rare use case (the user can reinstall the app). If ever needed — a separate destructive action in DATA with a double-confirm
- **Units toggle (kg/lb)** — kg only in v1, lb via a user setting in v2 (from the tech doc: "Units: kg only for MVP")
- **Decimal separator override** — locale-driven, no user-facing toggle (§7.5)
- **Notifications** — push, scheduled reminders, rest-end banner in the background → v2. In v1 only local haptic/sound (§12.3)


---

## 13. Backup & restore

> Manual export/import of all user data into a JSON file. Entry point: Profile → DATA → Backup & restore (§12.4). Local-only foundation (tech §2), without servers or accounts; backup is the only disaster recovery and device migration mechanism in v1.

### 13.1 Backup & restore screen

Push sub-screen on the Profile stack. Two symmetric zones — Export and Import.

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

No `Last export` indicator — a clean manual mode.

### 13.2 Export flow

1. Tap `Export backup`
2. The app serializes all user data into JSON:
   - All workouts (with sets and superset structure, with references to exercises by UUID)
   - All custom exercises (including soft-deleted ones, since History references them — see §11.9)
   - User settings (theme, language, Show RPE, Rest haptic, Rest sound)
   - Metadata: `schemaVersion`, `appVersion`, `exportedAt` (ISO timestamp)
3. A temporary file `kachka-backup-YYYY-MM-DD.json` is created
4. Native share sheet (iOS Share / Android Intent) — the user picks the destination: Files, iCloud Drive, AirDrop, Drive, email, Telegram, etc.
5. On success — toast `Backup exported`

Deliberately without a custom destination picker — the share sheet natively covers all scenarios.

### 13.3 Import flow

1. Tap `Import backup`
2. Native file picker, filter `.json`
3. The app reads the file, validates (§13.6). On error — error sheet with the reason
4. If OK — push preview screen:

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

5. The user reviews the preview and chooses an import mode (default — Replace all). Tap `Import`.
6. Bottom sheet confirmation (§1):
   - *Replace*: title `Replace all data?`, description `Current data will be lost. This cannot be undone.`, `Cancel` (top) + destructive `Replace` (bottom)
   - *Merge*: title `Import 47 workouts and 12 exercises?`, description `Existing data is preserved. Duplicates by ID are skipped.`, `Cancel` (top) + primary `Import` (bottom)
7. On confirm — atomic transaction (§13.4). On failure — rollback to the pre-import state, error sheet
8. On success — toast `Backup imported`, return to Profile root

### 13.4 Import modes

Two options, the user chooses on the preview screen:

| Mode | What it does with entities | What it does with settings | Use case |
|---|---|---|---|
| **Replace all** (default) | Wipe local db → insert backup as-is | Settings from the backup replace the current ones | Disaster recovery / device migration / "I want everything back the way it was" |
| **Merge (skip dupes)** | Insert only new entities (new UUID); existing — skip | Current settings are kept | Multi-device: add workouts from another device without losing the current ones |

Default Replace — the typical scenario. Merge — for the rare multi-device flow.

Skip-by-UUID means: if an entity already exists with the same ID — the current version stays. We do not do per-field merge in v1: it is complex and needs conflict resolution UX, deferred to full sync (v2).

### 13.5 File and format

- *Default name*: `kachka-backup-YYYY-MM-DD.json`
- *Extension*: `.json`
- *Encoding*: UTF-8
- *Structure*: specified separately in the data model doc (still an open question, see §15)
- *Plain JSON in v1* — without encryption / password. The data sensitivity is low (workout history); the user chooses where to store the file. Encryption — a separate question in v2 together with sync

### 13.6 Validation and errors

When reading the file — error sheet (bottom sheet from §1) with a specific reason:

| Error | Message |
|---|---|
| Invalid JSON / corrupted file | `Could not read backup. The file may be corrupted.` |
| Unrecognized format (no `schemaVersion`) | `This file is not a Kachka backup.` |
| Newer `schemaVersion` | `This backup was created with a newer version of Kachka. Update the app to import.` |
| Older `schemaVersion` | Auto-migrate JSON → current schema before preview (without user involvement). If migration fails — `Could not upgrade backup to current version.` |

### 13.7 What we do NOT do in v1

- Auto-backup (background tasks, permissions, reliability) → v2
- Encryption / password protection → v2 together with sync
- Stale-backup nudge (`Last export: X days ago`) — manual mode without reminders
- Selective export (only workouts / only exercises) — the backup is always complete
- Import dry-run (run without commit) — the preview screen already serves this role before confirm
- Backup history (storing several snapshots locally) — the user's filesystem already does this
