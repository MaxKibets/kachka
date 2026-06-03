# Design-review issues

Actionable items extracted from the design review
(`.lazyweb/design-improve/full-app-review-2026-05-23/report.md`). P0/P1 items
each have their own file so they can be worked in isolation; P2/P3 live in a
single backlog. IDs match the review report.

## P0 — before any code

| ID | Status | Issue | File |
|----|--------|-------|------|
| X1 | ✅ done | In-workout chrome icons render as blank squares | [X1-in-workout-icons.md](X1-in-workout-icons.md) |
| F5.1 | ✅ done | Backup footer copy broken (UA/EN mix) | [F5.1-backup-copy-en.md](F5.1-backup-copy-en.md) |

## P1 — before any code

| ID | Status | Issue | File |
|----|--------|-------|------|
| F2.1 | ✅ superseded | Builder row menu missing Edit sets + Add note (superseded by [redesign](REDESIGN-builder-inworkout.md)) | [F2.1-builder-row-menu-edit-sets.md](F2.1-builder-row-menu-edit-sets.md) |
| F1.1 | ✅ done | Today CTAs not disabled while in-progress | [F1.1-today-cta-disabled-in-progress.md](F1.1-today-cta-disabled-in-progress.md) |
| F3.1 | ✅ done | Rest timer ring vs pull-to-cursor layout | [F3.1-rest-timer-vs-pull-to-cursor.md](F3.1-rest-timer-vs-pull-to-cursor.md) |
| F2.2 | ✅ done | Superset config sheet not mode-aware | [F2.2-superset-sheet-mode-aware.md](F2.2-superset-sheet-mode-aware.md) |
| F5.2 | ✅ done | Settings: instant-apply vs Cancel/Done | [F5.2-settings-apply-model.md](F5.2-settings-apply-model.md) |

## P2 — consistency / spec divergence

All resolved 2026-06-02. Decisions live inline in
[BACKLOG-p2-p3.md](BACKLOG-p2-p3.md).

| ID | Status | Resolution |
|----|--------|------------|
| X2 | ✅ closed | Duplicate of X3 (no exercise-count token; the bare `4` was the volume's leading digit) |
| X3 | ✅ done | Volume rendered without a thousands separator (`4540 kg`); rule in visual §3.4 |
| F4.1 | ✅ done | Dropped the History top-bar `⋯` (spec already said no actions) |
| F4.2 | ✅ done | Cut the `history-empty` "Go to Today" CTA (spec already said none) |
| F5.3 | ✅ done | Added `Default rest` to spec — 90 s default, presets 60/90/120/180 + Off |

## P3 — copy / polish

Copy items resolved 2026-06-02; decisions inline in
[BACKLOG-p2-p3.md](BACKLOG-p2-p3.md).

| ID | Status | Resolution |
|----|--------|------------|
| F3.2 | ✅ done | Numpad button `Done` → `Save set` (spec §7.2 already said so) |
| F1.2 | ✅ done | Bare `Or` → thin divider + centered `or` |
| F5.4 | ✅ done | Cut `Report an issue` + `Open source licenses`; tagline localized (EN `Get lifting.` / UA `Качайся.`) |
| F5.5 | ✅ done | Restored `Settings included` row in import preview (spec §13.3) |
| F2.3 | ⏳ open | Rest control below the fold in superset config sheet |
| F3.3 | ⏳ open | Failed-reps (0) + warmup row treatment (pairs with visual style) |
| F2.4 | ✅ done | Dropped duplicate Builder `Discard`; header `←` back is the single exit |
| F4.4 | ⏳ open | Completion "Add a note" placement |
