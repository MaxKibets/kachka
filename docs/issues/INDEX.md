# Design-review issues

Actionable items extracted from the design review
(`.lazyweb/design-improve/full-app-review-2026-05-23/report.md`). IDs match
the review report.

**Status (2026-07-04):** all P0/P1 items and nearly all P2/P3 items were
resolved or superseded by 2026-06-03. Per-issue files (and the P2/P3 backlog)
have been retired now that UI design has moved to Claude Design (see
`../CONTEXT.md`) — this table is the historical record. A handful of
low-priority P3 layout items (F2.3, F3.3, F4.4) were still open at retirement
and were dropped as moot: they'll be re-litigated, if still relevant, when the
Claude Design output comes back into the repo.

## P0 — before any code

| ID | Status | Issue |
|----|--------|-------|
| X1 | ✅ done | In-workout chrome icons render as blank squares |
| F5.1 | ✅ done | Backup footer copy broken (UA/EN mix) |

## P1 — before any code

| ID | Status | Issue |
|----|--------|-------|
| F2.1 | ✅ superseded | Builder row menu missing Edit sets + Add note (superseded by the In-workout pending-state redesign, spec §5.9) |
| F1.1 | ✅ done | Today CTAs not disabled while in-progress |
| F3.1 | ✅ done | Rest timer ring vs pull-to-cursor layout |
| F2.2 | ✅ done | Superset config sheet not mode-aware |
| F5.2 | ✅ done | Settings: instant-apply vs Cancel/Done |

## P2 — consistency / spec divergence

All resolved 2026-06-02.

| ID | Status | Resolution |
|----|--------|------------|
| X2 | ✅ closed | Duplicate of X3 (no exercise-count token; the bare `4` was the volume's leading digit) |
| X3 | ✅ done | Volume rendered without a thousands separator (`4540 kg`); rule in visual foundations |
| F4.1 | ✅ done | Dropped the History top-bar `⋯` (spec already said no actions) |
| F4.2 | ✅ done | Cut the `history-empty` "Go to Today" CTA (spec already said none) |
| F5.3 | ✅ done | Added `Default rest` to spec — 90 s default, presets 60/90/120/180 + Off |

## P3 — copy / polish

Copy items resolved 2026-06-02; a few layout items resolved through
2026-06-03, the rest dropped as moot at retirement (see status note above).

| ID | Status | Resolution |
|----|--------|------------|
| F3.2 | ✅ done | Numpad button `Done` → `Save set` (spec §7.2 already said so) |
| F1.2 | ✅ done | Bare `Or` → thin divider + centered `or` |
| F5.4 | ✅ done | Cut `Report an issue` + `Open source licenses`; tagline localized (EN `Get lifting.` / UA `Качайся.`) |
| F5.5 | ✅ done | Restored `Settings included` row in import preview (spec §13.3) |
| F2.3 | 🗑️ dropped | Rest control below the fold in superset config sheet |
| F3.3 | 🗑️ dropped | Failed-reps (0) + warmup row treatment (pairs with visual style) |
| F2.4 | ✅ done | Dropped duplicate Builder `Discard`; header `←` back is the single exit |
| F4.4 | 🗑️ dropped | Completion "Add a note" placement |
