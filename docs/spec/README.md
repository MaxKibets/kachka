# Gym Tracker · UI/UX Specification — map

> Gym workout tracker for React Native (iOS + Android). v1 — ad-hoc workouts: building → execution → logging to history. Programs, import/export, deep linking — in v2.

**Status**: v1 scope locked — ad-hoc workouts. Programs / import / deep linking — deferred to v2.

**Version**: v0.13 · spec split into zone files in this directory (`spec/`); this file (`README.md`) — map + §-index

---

## How to read

The specification is split into thematic zones in this directory (`spec/`). This file
(`README.md`) — entry point: overview tree and §-index for resolving any
`§N.M` link. Each
zone file **keeps the original §-numbering**, so cross-references between files
(`§6.2`, `§9.1`, `§11.8`…) stay unambiguous — find the number in the §-index below
to learn which file the section is in.

Read together with:

- [`../tech/README.md`](../tech/README.md) — platform, storage, units, localization (active)
- [`../visual/README.md`](../visual/README.md) — visual system: palette, typography, density (active)
- [`decisions.md`](decisions.md) — log of locked decisions + open questions + deferred to v2
- [`../program-format.md`](../program-format.md) — JSON program format (**frozen — v2**)

Wireframes (per-screen HTML mockups) — in `../wireframes/`, see [`../wireframes/INDEX.md`](../wireframes/INDEX.md) and
[`../wireframes/flow.md`](../wireframes/flow.md).

## Zones

| File | Contents | §§ |
|---|---|---|
| [foundations.md](foundations.md) | Core principles + navigation / IA | §1–2 |
| [today.md](today.md) | Today / pre-workout flow | §3 |
| [builder.md](builder.md) | Workout Builder | §4 |
| [in-workout.md](in-workout.md) | In-workout: architecture, custom numpad, set actions | §5, §7, §8 |
| [supersets.md](supersets.md) | Supersets / exercise groups | §6 |
| [finish.md](finish.md) | Workout completion | §9 |
| [history.md](history.md) | History | §10 |
| [exercises.md](exercises.md) | Exercise picker / database | §11 |
| [profile.md](profile.md) | Profile, Settings & Backup | §12–13 |
| [glossary.md](glossary.md) | Glossary | §14 |
| [decisions.md](decisions.md) | Decisions · open · deferred | §15–17 |

> Supersets (§6) are moved into a separate file, because the zone is shared by Builder (§4) and
> In-workout (§5). Exercise picker (§11) — also a shared component (Builder, Active,
> Profile). The In-workout file deliberately keeps §5 + §7 + §8 together (architecture →
> logging → set actions — this is one workflow).

## §-index

| § | Section | File |
|---|---|---|
| §1 | Core principles | [foundations.md](foundations.md) |
| §2 | Navigation / IA | [foundations.md](foundations.md) |
| §3 | Pre-workout flow (Today) | [today.md](today.md) |
| §4 | Workout Builder | [builder.md](builder.md) |
| §5 | In-workout screen architecture | [in-workout.md](in-workout.md) |
| §6 | Supersets / exercise groups | [supersets.md](supersets.md) |
| §7 | Logging a single set | [in-workout.md](in-workout.md) |
| §8 | Set actions menu | [in-workout.md](in-workout.md) |
| §9 | Workout completion | [finish.md](finish.md) |
| §10 | History | [history.md](history.md) |
| §11 | Exercise picker / Exercise database | [exercises.md](exercises.md) |
| §12 | Profile + Settings | [profile.md](profile.md) |
| §13 | Backup & restore | [profile.md](profile.md) |
| §14 | Glossary | [glossary.md](glossary.md) |
| §15 | What is not yet decided | [decisions.md](decisions.md) |
| §16 | Deliberately deferred to v2 / later | [decisions.md](decisions.md) |
| §17 | List of locked decisions | [decisions.md](decisions.md) |
