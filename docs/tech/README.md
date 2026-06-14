# Gym Tracker · Technical requirements

> Architectural and product decisions. UI/UX — in `../spec/README.md`. Data model — in `../data-model.md` (TBD).

**Version**: v0.2 · v1 scope locked (no programs / import / deep linking — in v2)

---

## 1. Platform

- React Native, cross-platform (iOS + Android)
- Target stores: App Store + Google Play
- Minimum OS versions — TBD (typically iOS 15+, Android 8+)

---

## 2. Data storage

### 2.1 Current strategy: local-only

At the MVP stage all data lives locally on the device. No backend, auth, sync.

- No email / accounts / registration
- The user opened the app and immediately started a workout
- "Backup to file" as a manual storage mechanism (export all data to JSON)

### 2.2 Sync-ready foundation

We build it into the data model from day one, so we don't have to migrate all users' data a year later:

| What | Why |
|----|--------|
| `id: UUID v4` for each entity | Can be generated on the client without coordinating with a server |
| `createdAt`, `updatedAt` ISO timestamps | Mandatory for any merge / last-write-wins |
| `deletedAt: Timestamp \| null` (soft delete) | Otherwise during sync it's impossible to tell "deleted" from "not yet synced" |
| `schemaVersion` at the app level | Future format migrations |
| Export/import to JSON "as is" | Manual backup + entry point for future sync |

### 2.3 Candidates for the local DB

Not finalized — options to evaluate:

- **WatermelonDB** — sync-ready out of the box, reactive queries, optimized for RN
- **RxDB** — also sync-ready, works in RN
- **op-sqlite / expo-sqlite** — low-level SQLite, full control, you have to write the query layer yourself
- **MMKV + JSON files** — the simplest, suitable if the data volume is small

Recommendation: WatermelonDB as the best fit for future sync.

### 2.4 Future sync (deferred)

If we ever add it:

- Auth: email / OAuth (Google, Apple)
- Backend: Supabase / Firebase / own
- Sync engine: PowerSync, Replicache, or an own layer on top of WatermelonDB
- Conflict resolution: last-write-wins for most fields, separate logic for deletions

Sync — a candidate for a paid feature, basic workout stays free.

---

## 3. Units

### 3.1 MVP

- **kg only** — primary and internal storage
- A `weight: number` field without a `unit` next to it in the data model
- Quick-adjust on the numpad fixed: `−5`, `−2.5`, `+2.5`, `+5`

### 3.2 Future addition of lb

- User setting `units: 'kg' | 'lb'`
- On-the-fly conversion in the UI: `displayWeight = storedKg * 2.2046`
- In the DB always kg
- Quick-adjust switches to `−10`, `−5`, `+5`, `+10` for lb

### 3.3 Other units

- Reps — always integer
- Time (rest timers, workout duration) — always seconds internally, formatted in the UI

---

## 4. Localization

### 4.1 MVP languages

- **English** — primary and base
- **Ukrainian** — the first translation

### 4.2 i18n architecture

- Library: `react-i18next` (the standard for React Native)
- All labels via keys: `t('workout.finish')`, not hardcoded strings
- Keys in English as base, translations in separate JSON files
- Built in from day one — adding i18n later is expensive

### 4.3 Language selection

- Auto-detect from the device locale on first launch
- Override in settings
- No language selection during onboarding — an unnecessary step

### 4.4 Decimal separator

**A decision separate from the UI language** — it depends on the system locale, not the UI language:

- `uk-UA` locale → numpad shows `,`
- `en-US` locale → numpad shows `.`
- A user with a Ukrainian locale + English UI sees `,` — this is correct
- Internally always a point: we store `60.5`, display it per locale

### 4.5 Multilingual exercise database

The system (ready-made) exercise list is stored multilingually:

```
{
  id: "bench-press",
  names: { en: "Bench press", uk: "Жим лежачи" },
  muscleGroups: ["chest", "triceps"],
  ...
}
```

- User custom exercises — only one name, no translation
- User notes — in any language without translation

### 4.6 What we do NOT translate

- Units (`kg` stays `kg`)
- Abbreviations: `RPE`, `PR`, `RIR`
- Numbers
- Exercise names in user custom programs

---

## 5. Privacy and monetization

### 5.1 Model: free in v1, monetization deferred to v2

- **v1 ships fully free** — no ads, no feature gating, no crippled mode. A
  deliberate growth-first choice: a brand-new app with no reviews/audience needs
  reach before revenue, and v1 has no natural paid feature (everything is core).
- **Monetization is planned, not abandoned.** It switches on in v2, together with
  the first features worth paying for (programs, charts, trends — see decisions §16).
- **No ads, ever** — doesn't fit the gym context (sweaty hands, 5 seconds per set, a banner is inappropriate).
- **Core stays free forever.** Paid = added v2 value, never crippling the core.

**v2 model candidates** (not locked — exact model / price / which features are Pro
are open, see decisions §15):

- **One-time "Pro" unlock** — programs / charts / trends. Client-side, no backend
  (non-consumable IAP, `Restore purchases` via the store account, ~15% Small
  Business fee). Best fit for "reward for time spent" without recurring infra.
- **Optional sync subscription** — cross-device sync / cloud backup, only if a
  backend ever lands and demand is proven (per §2.4). Basic workout stays free.

### 5.2 Privacy-by-default

- No telemetry by default
- If we ever add analytics — opt-in, transparent in settings, with the ability to turn it off
- Crashlytics / Sentry — for technical crashes, not for collecting user data. Standard practice, users expect it
- Local-only automatically means there simply is no data on a server

### 5.3 Account deletion

- Local-only → "Delete all my data" in settings destroys the local DB
- App Store requirement since 2022: if there are accounts — there must be account deletion
- We have no accounts, so a local wipe is enough

---

## 6. Distribution

### 6.1 App Store + Google Play

Both stores require:

- Privacy policy (can be on a site or a Notion page) — Apple checks the link
- Privacy disclosure in App Store Connect: for local-only — "no data collected"
- Account deletion — in our case a local wipe in settings
- A support email for the review team
- Screenshots, description, keywords

### 6.2 Realistic expectations

- A single developer, hobby project → 6–9 months to release on both stores
- The first build is usually rejected by the review team — budget +2 weeks for review cycles

### 6.3 Deep linking — in v2

Initially planned from day one for sharing programs. Since programs are deferred to v2, deep linking is also moved to v2:

- URL scheme `gymtracker://import?routine=...` (custom scheme)
- Universal links / App Links (https-based) for reliable opening
- `react-native-url-scheme` or Expo Linking

v1 does not use deep links. If there's ever single-workout / log sharing — we'll add a separate payload type on top of the same infrastructure.

---

## 7. Tools and libraries

### 7.1 Locked

- React Native (cross-platform)
- `react-i18next` (localization)

### 7.2 Candidates (TBD)

- **State management**: Zustand / Redux Toolkit / Jotai
- **Local DB**: WatermelonDB (recommended) / RxDB / op-sqlite
- **Forms**: React Hook Form
- **Animations**: Reanimated 3 (for gestures and timers)
- **Testing**: Jest + React Native Testing Library
- **Build**: Expo (managed workflow) vs bare RN — TBD
- **CI/CD**: EAS Build (if Expo) / Fastlane (if bare)
- **Crash reporting**: Sentry

### 7.3 Not yet decided

- Expo vs bare RN
- Whether to use React Native New Architecture (Fabric + TurboModules)
- The specific state management

---

## 8. What is locked — checklist

- [x] Platform: RN, iOS + Android
- [x] Storage: local-only, sync-ready foundation
- [x] UUID v4, soft delete, timestamps on each entity
- [x] Units: kg only for MVP, lb via user setting later
- [x] Localization: English (base) + Ukrainian, i18n from day one
- [x] Decimal separator depends on the system locale, not the UI language
- [x] Multilingual system exercises: `names: { en, uk }`
- [x] Privacy-by-default: no telemetry, no accounts
- [x] v1 free, no ads — monetization deferred to v2 (see §5)
- [x] Distribution: App Store + Google Play, international
- [x] v1 scope = ad-hoc workouts (programs / import / deep linking → v2)
- [x] Exercise database with a seed list of 7 popular exercises (Squat, Bench Press, Deadlift, Barbell Row, Overhead Press, Pull-up, Bicep Curl) for Quick-add chips in the Builder

---

## 9. Open technical questions

- Local DB: WatermelonDB or an alternative
- Expo (managed) or bare RN
- State management library
- Minimum iOS / Android versions
- DB schema migration strategy between app versions
- Exercise database: where to source the seed list for the full catalog (open-source bases like wger, or own). 7 exercises for Quick-add chips are baked into the app, but the full catalog is a separate question
- Whether sync with Apple Health / Google Fit is needed
- Drag-and-drop library for reorder in the Builder and Active workout (`react-native-draggable-flatlist` as a candidate)
