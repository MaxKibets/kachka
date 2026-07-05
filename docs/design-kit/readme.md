# Kachka Design System

Kachka is a workout-tracking mobile app: an active-session screen for logging sets across straight exercises and supersets, plus a rest-timer overlay between sets. This design system was built by auditing the two screens that exist in this project — there is no other product surface, brand deck, or codebase to draw from.

## Sources

- `WorkoutScreen.dc.html` (project root) — the active workout-session screen: header with live elapsed-time, three exercise cards (a completed straight-set exercise, an in-progress superset, an upcoming exercise), bottom stat/CTA bar.
- `RestBar.dc.html` (project root) — the rest-timer bottom sheet.
- `design-tokens.md` (project root) — a manual token audit of the above, done before this system existed. It is the canonical source of truth for every numeric value below; where this readme and that audit could conflict, the audit wins.
- `uploads/` — two zoomed crops of the workout screen used during the original audit (a Kg-cell close-up, a stack of set markers), plus one **unrelated** mood/inspiration screenshot of a generic task-planner app (dark UI, orange accent, rounded pill CTA). That third image is not a Kachka screen — it's early inspiration for the dark+orange direction — and no screens, copy, or components were copied from it.

No Figma file, codebase, or brand guideline was attached. Everything here is inferred from the two `.dc.html` mockups and their audit.

## Content fundamentals

Copy is sparse and utilitarian — closer to a lifter's log than a wellness app:

- **Terse, imperative, gym-shorthand.** "Push A", "Superset A", "Add set", "Add round", "Skip rest", "90s rest". No sentences, no encouragement copy, no exclamation points.
- **The one loud moment is the primary CTA**: "FINISH" is set in caps; everything else is sentence case.
- **Numbers carry the meaning**: "5 / 14", "5120 kg", "01:24", "22:08" — metrics are shown raw, unlabeled beyond a small caption, never narrated ("You've done 5 of 14 sets!").
- **No emoji, no icons-as-decoration** — every glyph in the product is functional (a back arrow is navigation, a clock is a rest divider), never illustrative flourish.
- **Second person is absent** — there's no "you/your" anywhere in the audited copy; it's data, not address.

## Visual foundations

- **Dark-first.** Dark is the canonical default theme; light is a fully-specified alternate (`data-theme="light"`), not an afterthought — but every color decision in this doc assumes dark unless noted.
- **Warm-neutral blacks and whites**, not true black/white: dark bg is `#0E0E0E`/`#1A1A1A`, light bg is a warm cream `#F2F0EC`, not `#FFF`.
- **One accent, used sparingly.** `#F26522` (safety-orange) marks completion, live/current state, and the one primary CTA. It is never a background fill for large areas — only small chips, markers, dots, and buttons.
- **One semantic exception color.** `#E0A23E` (amber) exists solely to flag a warmup set's number. It never appears anywhere else — don't reach for it as a second accent.
- **Type is a single family (Manrope) at a single weight (700).** Hierarchy is built entirely from size (5 sizes total: 10/14/16/18/38) and color (`--text`/`--text-2`/`--text-3`), never from weight. This is a strict, unusual rule — don't add a 500 or 600 weight anywhere.
- **Borders, not shadows, define cards.** Every card/button/divider gets the same 1px translucent hairline (`--line`). Shadow is reserved for exactly two roles: the bottom-bar/sheet elevation lift, and a colored glow under accent CTAs only. Cards never cast a drop shadow.
- **Radius climbs with prominence**: 2px (progress segments) → 12px (icon chips, pills) → 16px (buttons, stat blocks) → 24px (cards) → 28px (the RestBar sheet, one step past cards) → 50% (every circle). Never an arbitrary radius outside this scale.
- **No imagery, no illustration, no texture, no gradients** — except two purely functional ones: the conic-gradient spinner ring and the two drop-shadow "glows". There is no photography, no full-bleed art, no background pattern anywhere in the source. If exercise thumbnails/photos are wanted later, that's new scope — ask before adding them.
- **No blur, no glassmorphism.** Translucency is used only for hairline borders and the accent "current" tint wash — never a backdrop-filter.
- **Animation is meaningful, never decorative.** Three animations exist, each tied to a live state: a pulsing dot = "this session is live", a spinning ring = "this set is in progress", a text-swap = "hold this button to confirm". Durations are each unique (1.6s / 2.4s / 3.6s) and never reused for anything else. Don't add motion anywhere it doesn't communicate a state change.
- **Active/filled progress is always 40% opacity**, never a solid fill — true across both the segmented (round) and continuous (rest countdown) progress styles.
- **Touch targets are two sizes**: 44px for primary navigation (meets minimum), 30px for secondary/kebab actions and non-interactive chips (intentionally under the minimum — confirmed acceptable for secondary/non-interactive use, not an oversight).
- **Hover/press states are not defined in the source** (a touch-first mobile screen — no cursor states were ever authored). No convention is assumed here; if you need one, ask rather than inventing an opacity/scale value with no basis.
- **Grid discipline**: the set-table's flexible columns must be `minmax(0,1fr)`, never bare `1fr` — see `guidelines/grid-set-table.card.html` for why (bare `1fr` lets one row's long content desync that column from every other row).

Every value above is defined as a token in `tokens/` and demonstrated in the Design System tab's specimen cards — treat any hardcoded hex/px in new work as a bug.

## Iconography

A small bespoke set of 11 inline SVGs, copied verbatim (unmodified path data) from the two source mockups into `assets/icons/` — this is the product's **complete** icon vocabulary, not a subset. All are 24×24, `currentColor`, stroke-width 2.4 with round caps/joins, except `more-horizontal` (filled dots, not a stroke). No icon font, no PNGs, no emoji, no unicode-as-icon. See `assets/icons/` and the Icons specimen card for the full list and usage.

## Known deviations (flagged, not silently fixed)

- `Button`'s `secondary` variant colors its label `--text-2` in two of three source instances ("Add set"/"Add round") but the RestBar ±15s buttons use full `--text`. Reproduced via an explicit `tone` override rather than normalized — confirm which is correct.
- The pending-set spinner's ring-overhang briefly appears as `-7px` in one place in `WorkoutScreen.dc.html` but is overridden by an explicit `-2px` on the same element (so it renders correctly); `design-tokens.md` confirms `-2px` is canonical. `SetMarker` implements `-2px` cleanly with no vestigial value.

## Index

- `styles.css` — the single global stylesheet consumers link; imports everything in `tokens/`.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `shadows.css`, `motion.css` (+keyframes), `sizing.css`, `fonts.css`.
- `assets/` — `icons/` (11 SVGs), `README.md`. No logo was provided — see Brand specimen card.
- `components/buttons/` — `IconButton`, `Button`, `CTAButton`.
- `components/progress/` — `ProgressBar` (segmented + continuous).
- `components/workout/` — `SetMarker`, `SetTable`, `RestDivider`, `ExerciseCard`, `RestBar`.
- `components/stats/` — `StatBlock`, `LiveIndicator`.
- `guidelines/` — 17 foundation specimen cards (colors, type, spacing, radius, borders, shadows, motion, grid, icons, sizing, brand) — these populate the Design System tab alongside the component cards.
- `ui_kits/mobile-app/` — `index.html` (interactive), `WorkoutSession.jsx`, device chrome via the generic `ios-frame.jsx` starter.
- `SKILL.md` — Claude Code-compatible skill entry for this design system.

## Caveats — please help me iterate

- **Namespace guess.** Component cards and the UI kit mount components via `window.Kachka.*`. I could not verify the exact global namespace the compiler assigns (no `check_design_system` tool was available this session) — if cards render blank, it's likely just this name, easy fix.
- **Only one screen exists** because only one screen was in the source. If there's a home/history/exercise-library/onboarding screen, attach it (code, or even a screenshot) and I'll extend the kit properly instead of guessing.
- **Fonts are CDN-loaded, not self-hosted** — this environment can't fetch external font binaries. If you want Manrope self-hosted, drop the `.woff2` files in and I'll swap the `@import` for local `@font-face`.
- **No logo/brand mark exists yet** — flagged throughout rather than invented.
- Two small deviations in the source (see above) were reproduced faithfully rather than silently "fixed" — tell me which way to resolve them and I'll make the primitives consistent.
