# X1 — In-workout chrome icons render as blank squares

- **Priority:** P0
- **Effort:** S
- **Type:** Visual defect
- **Source:** design-review 2026-05-23 (cross-cutting X1)

## Affected wireframes

- `docs/wireframes/in-workout.html`
- `docs/wireframes/in-workout-with-supersets.html`

## Problem

On the in-workout screens the top-bar **close** and **`⋯`** controls and the
group **`⋮`** menu render as solid white squares — no glyph. These are the
single most-tapped controls in the app (every set, every exercise menu).
Profile/Builder icons render fine (theme, globe, drag handles), so the failure
is specific to the unresolved icon set in the in-workout chrome, not global.

A blank square gives no affordance — a sweaty, one-handed user can't tell close
from menu. This is the screen where the spec's "readable at arm's length, big
tap targets" promise is made or broken.

## Spec reference

`docs/visual/README.md` §6 lists the icon library (Lucide vs Phosphor) as
**TBD**. That open decision is the root cause.

## Action

1. Lock the icon library (resolve visual §6).
2. Wire the missing glyphs: `close`, `more-horizontal`, `more-vertical`,
   `file`/`note`.
3. Re-render both in-workout wireframes and confirm glyphs draw.

## Done when

- Icon library is recorded as decided in `visual/README.md` §6.
- close / `⋯` / `⋮` / note render as real glyphs on both in-workout wireframes.
