# Design Review: Kachka v1 — all screens & flows

> Per-screen + per-flow review of the 28 v1 wireframes against the UX spec
> (`gym-tracker-spec.md`), context, and the visual system. Rendered each
> wireframe in proto mode (clean phone frame) and compared against the spec
> and best-in-class mobile fitness references from Lazyweb.

**Date:** 2026-05-23 · **Scope:** Today · Builder · In-workout · Finish/History · Profile

---

## TL;DR

The system is **strong and coherent** — utility-dense, dark, mono-numerals,
two-color brand discipline, clear set-row state machine. It already reads better
than most of the fitness apps in the reference set. The work left is **not
structural** — it's three buckets:

1. **One real visual defect:** the most-used in-workout controls (top-bar
   close / `⋯`, group `⋮`) render as **blank white squares** — icon lock is
   blocking the highest-traffic screen.
2. **~10 wireframe↔spec divergences** that each need a one-line decision
   (update the spec or fix the mockup) — none are hard, but they'll cause drift
   if left implicit.
3. **A few interaction refinements** — rest-timer vs pull-to-cursor occupy the
   same bottom zone; settings sheets mix instant-apply with a Cancel/Done
   footer; the superset config sheet isn't mode-aware.

Nothing here calls for a redesign. It's a polish + reconciliation pass.

---

## Cross-cutting issues (fix once, applies everywhere)

### X1. Icon placeholders render as blank squares ⭐ (highest impact)
On `in-workout` and `in-workout-with-supersets`, the top-bar **close** and
**`⋯`** controls, and the **group `⋮`** menu, render as solid white squares —
no glyph. These are the single most-tapped controls in the app (every set,
every exercise menu). Profile/Builder icons render fine (theme, globe, drag
handles), so this is specific to the unresolved icon set in the in-workout
chrome, not a global failure.

- **Action:** lock the icon library (visual §6 lists Lucide vs Phosphor as
  TBD) and wire `close`, `more-horizontal`, `more-vertical`, `file/note`.
- **Why it matters:** a white square gives no affordance — a sweaty,
  one-handed user can't tell close from menu. This is the screen where the
  spec's "readable at arm's length, big tap targets" promise is made or broken.

### X2. Ambiguous meta token `· 4 ·`
The exercise-count number appears unlabeled in the Today card
(`12 sets · 4 · 540 kg · 52 min`), every History row, and the in-workout top
bar (`5/9 · 14 sets · 5 · 120 kg`). A bare `4` between `12 sets` and `540 kg`
reads as noise — the user can't tell it's the exercise count.

- **Action:** label it (`4 exercises` / `4 ex`) or drop it. If kept, give it a
  unit like every neighbour has.

### X3. Volume thousands-separator is ambiguous
`4 540 kg` (thin-space grouping for 4540) reads as two numbers — "4" then "540"
— especially next to other space-delimited meta. Appears on Completion, History
list, History detail.

- **Action:** pick a grouping that doesn't collide with the `·` meta rhythm:
  `4,540 kg`, `4540 kg`, or a compact `4.5k kg`. Locale note: UA uses space as
  the thousands separator, so this is also an i18n decision, not just style.

---

## Flow 1 — Today / pre-workout

Files: `today-has-history` · `today-first` · `today-in-progress`

**Working:** The three-state model is clean. `today-has-history` leads with a
single confident amber CTA (Repeat last) and demotes the alternates to text
links — exactly the 90%-case optimization the spec argues for. `today-first`
is calm: mascot slot, one CTA, no marketing chrome.

**Findings:**

- **F1.1 — In-progress CTAs aren't disabled.** Spec §3.1.c: while the
  in-progress banner is present, `Repeat last` / `Choose from history` /
  `Start blank` must be **disabled** (muted, non-tappable) — the only paths are
  Resume/Discard. In `today-in-progress` the amber `Repeat last` is fully
  bright and the links look live. Either dim them or you've silently dropped
  the "one active workout" guard. (Decision is already locked in §3.1.c — this
  is a mockup gap.)
- **F1.2 — Orphan "Or" label.** The lowercase `Or` between the card and the
  text links is a weak connector. Consider a thin divider with centered "or",
  or just drop it and let spacing separate.
- **F1.3 — `today-first` mascot.** Placeholder circle is fine for now;
  flagged only so it's tied to the mascot session (visual §9), not forgotten.

---

## Flow 2 — Builder / picker / superset

Files: `builder` · `builder-with-supersets` · `exercise-picker-add` ·
`exercise-picker-browse` · `superset-config-sheet` · `builder-row-menu-sheet` ·
`exercise-create`

**Working:** Builder is excellent — drag handle (left) + `⋮` (right) cleanly
separated, Quick-add chips horizontally scroll with a peek of the next chip
(good affordance), superset group card reads instantly via the mallard
left-border + dusty-blue letter chip + A1/A2 prefixes. The picker and
exercise-create are clear, with helpful inline helper text ("Required · must be
unique", "Single-select · pick the primary group").

**Findings:**

- **F2.1 — Row menu is missing `Edit sets` and `Add note`.** `builder-row-menu`
  offers Add to superset / Move up / Move down / Remove. Spec §4.4 also lists
  **Edit sets** (reps/range/RPE/warmup/add-set) and **Add note**. Without them,
  there's no pre-workout way to change the default 3×8 or set targets — the
  user is forced to start the workout to edit structure. This is a functional
  gap, not just polish. (Already flagged as an open question in INDEX.)
- **F2.2 — Superset config sheet isn't mode-aware.** `superset-config-sheet`
  shows `Cancel · Save · Ungroup` together. **Ungroup** only makes sense in
  *edit* mode (a group already exists); in *create* mode there's nothing to
  ungroup. Make the footer mode-dependent: create → `Cancel / Create group`;
  edit → `Cancel / Save` + `Ungroup`. Also the spec calls the create button
  **"Create group"** (§6.2) — the mockup says "Save".
- **F2.3 — Rest control is below the fold in the config sheet.** The combined
  sheet's whole point (§6.2) is partner-select + rounds + rest on one screen so
  the common path is one glance. Rounds is visible; **Rest** requires scrolling
  past Save. Fine if defaults always cover it, but consider compressing the
  exercise list (it's a short scroll list) so Rounds + Rest + Create all sit
  above the fold. *Ref: Ladder's "pick up to N" multi-select keeps the
  constraint label and selection inline and compact — see references.*
- **F2.4 — `Discard` text button under the primary CTA.** In `builder`,
  `Discard` sits directly beneath the amber `Start workout`. It's only text and
  goes through a confirm, so risk is low, but a destructive verb immediately
  under the thumb's primary target invites mis-taps. The spec's own pattern
  (§1) puts Cancel-above-destructive in sheets for exactly this reason.

---

## Flow 3 — In-workout family

Files: `in-workout` · `in-workout-with-supersets` · `numpad` ·
`set-actions-sheet` · `rest-timer` · `pull-to-cursor`

**Working:** This is the heart of the app and it's the strongest part. The set
table (`№ | prev | kg | reps | ✓`) is dense but legible; active row = amber
tile + bold mono; done = muted + mallard check; collapsed completed exercise
("Bench press · 4 sets done") is a great space-saver. The custom numpad is
genuinely better than the reference apps: gym-specific `−5/−2.5/+2.5/+5`
quick-adjust row, both kg+reps fields visible, big keys. Set-actions sheet's
inline RPE picker (6–10, 0.5 step) and warmup/note/delete are well-judged. The
superset in-workout rendering (round dots `●●○`, letter chips, per-child tables)
is impressive density without chaos.

**Findings:**

- **F3.1 — Rest timer vs pull-to-cursor compete for the bottom zone.** The
  `rest-timer` mockup uses a **large circular ring** floating in the content
  area above the bottom bar; `pull-to-cursor` puts its chip in nearly the same
  place. INDEX already flags the 92px collision. Two sub-decisions:
  - *Ring vs compact bottom-bar timer:* spec §5.1/§6.6 describes the **bottom
    bar itself** carrying the rest state (`A · Rest 2:00`). The big ring is more
    glanceable from a distance (good for the gym) but eats ~180px of vertical
    space and pushes the set list. Decide: prominent ring **or** spec's compact
    bottom-bar countdown. If you keep the ring, it can't share the layer with
    the pull-to-cursor chip.
  - *Stacking:* if both can be active (resting while scrolled away), define the
    stack order — chip above ring, or chip suppressed during rest.
- **F3.2 — Numpad button says "Done", spec says "Save set".** Minor copy, but
  "Save set" names the consequence (set logged, cursor advances, rest starts);
  "Done" is vaguer. (§7.2)
- **F3.3 — Failed-reps & warmup visual triggers still TBD.** Visual §5.1 marks
  these "TBD". The set-actions sheet has the warmup toggle + `W` badge, but the
  in-workout row-level treatment for `0 reps` (failed, §5.7) isn't shown. Worth
  a quick mock so logging a failed set has clear feedback.
- **F3.4 — Top-bar meta density.** `5/9 · 14 sets · 5 · 120 kg` packs four
  numbers; combined with X2 (the bare `5` = exercises) it's near the legibility
  ceiling for a glance. Once X2 is resolved this is fine.

---

## Flow 4 — Finish / History

Files: `completion-screen` · `history-list` · `history-detail` ·
`history-empty` · `history-picker`

**Working:** Completion nails the brief — 4 stat cards with the **PR card as the
single info-tinted accent** (the one motivational moment, not over-celebrated),
collapsible exercise summary, optional note, clear Save/Discard. History list's
sticky `THIS WEEK / LAST WEEK` headers + two-line rows are clean and scannable.
History detail's read-only superset rendering (group header → A1/A2 summary →
per-round breakdown) is genuinely good information design. `history-picker`
correctly reuses the list rows with a "Tap a workout to clone it" subtitle.

**Findings:**

- **F4.1 — History has top-bar `⋯` menus; spec says it shouldn't.** Both
  `history-list` (§10.1/§10.2: "no topbar actions") and `history-detail`
  (§10.3: "no actions — no edit, repeat, export") show a `⋯`. Either the
  read-only-MVP decision changed (then update spec + say what's in the menu) or
  drop the `⋯`. As drawn it promises actions the spec deferred to v2.
- **F4.2 — `history-empty` has a "Go to Today" CTA; spec says no CTA.** §10.4:
  "Без CTA — Today вже доступний в табах." The CTA is arguably *helpful*
  (one tap vs hunting the tab), so this may be a "spec was too austere" case —
  but make it a decision, not a silent override.
- **F4.3 — Completion volume `4 540 kg`.** Same as X3 — most visible here in a
  big stat card; "4" reads as its own value next to "540 kg".
- **F4.4 — Completion "Add a note" placement.** The note textarea sits *between*
  the stats grid and the exercise summary. Consider moving it below the summary
  (after the user has reviewed what they did) — notes are usually written last.
  Low priority.

---

## Flow 5 — Profile / settings / DB / backup

Files: `profile` · `settings-theme-language-sheet` · `exercise-database-empty` ·
`exercise-database-list` · `exercise-create` · `backup-restore` ·
`backup-import-preview` · `about`

**Working:** Profile is a tidy iOS-style grouped hub (PREFERENCES / WORKOUT /
DATA), icons render correctly here, toggles read clearly. The DB browse list's
alphabetical sections + `CUSTOM` badge + `⋮`-only-on-custom matches the §11.5
resolution exactly. `exercise-database-empty`'s "build your custom library"
nudge over the always-present system list is a smart read of "empty = no
*custom*". Import preview is thorough (file meta, counts, mode radio with
explanations). About is on-brand.

**Findings:**

- **F5.1 — Backup copy is broken (UA/EN mix).** `backup-restore` footer reads
  **"Auto-backup i encryption — y v2."** — the `i` and `y` are Ukrainian
  "і"/"у" leaking into English UI. Should be **"Auto-backup and encryption —
  in v2."** Per the repo rule, file/UI base copy is English. Clear bug.
- **F5.2 — Settings sheets: instant-apply vs Cancel/Done conflict.** Spec §12.2:
  Theme/Language "**застосовується миттєво**" (applies instantly). But the
  sheets show a `Cancel / Done` footer, which implies a commit step. Pick one:
  *instant* (tap option → apply + dismiss, no footer) or *staged* (keep
  Cancel/Done, drop "instant" from spec). Also the selected row is
  **double-encoded** — leading mallard dot **and** trailing checkmark; one
  selection marker is enough.
- **F5.3 — `Default rest` row not in spec.** Profile/WORKOUT shows `Default
  rest` (value `—`). Spec §12.3 lists only Rest haptic + Rest sound. It's a
  *genuinely useful* setting (default for the rest timer), so the call is
  probably "add it to spec" rather than "cut it" — but decide. (INDEX flags it.)
- **F5.4 — About scope creep.** `Report an issue` and `Open source licenses`
  appear, though §12.5 defers acknowledgements to post-v1. The `Качайся.`
  tagline is UA-only — needs an EN variant for the English locale (or accept
  it as a deliberate brand-ism). Reconcile against v1 scope.
- **F5.5 — Import preview vs spec counts.** Mockup lists `42 workouts · 127
  sets total · 18 custom exercises`; spec §13.3 example lists workouts + custom
  exercises + **Settings**. The "Settings included" line is gone — worth keeping
  so users know settings get replaced/merged too. Minor.

---

## Prioritized punch list

| # | Fix | Type | Effort | Priority |
|---|-----|------|--------|----------|
| X1 | Lock icons; in-workout close/`⋯`/`⋮` render as squares | Visual defect | S | **P0** |
| F5.1 | Fix "Auto-backup i encryption — y v2" copy → English | Copy bug | XS | **P0** |
| F2.1 | Add `Edit sets` + `Add note` to builder row menu | Functional gap | M | **P1** |
| F1.1 | Disable Today CTAs while in-progress banner shows | Spec gap | S | **P1** |
| F3.1 | Resolve rest-timer ring vs pull-to-cursor layout | Interaction | M | **P1** |
| F2.2 | Make superset sheet mode-aware (Create vs Save+Ungroup) | Spec/logic | S | **P1** |
| F5.2 | Settings: instant-apply OR Cancel/Done, not both; single select marker | Spec/logic | S | **P1** |
| X2 | Label/drop the bare exercise-count `· 4 ·` | Consistency | S | **P2** |
| X3 | Disambiguate volume thousands separator | Consistency/i18n | S | **P2** |
| F4.1 | Drop History `⋯` menus (or update spec + define menu) | Spec divergence | S | **P2** |
| F4.2 | Decide History-empty CTA (keep + update spec, or cut) | Spec divergence | XS | **P2** |
| F5.3 | Decide `Default rest` (add to spec or cut) | Spec divergence | XS | **P2** |
| F3.2 | Numpad "Done" → "Save set" | Copy | XS | **P3** |
| F2.3 | Surface Rest above fold in superset sheet | Polish | S | **P3** |
| F5.4 | Reconcile About (Report issue / Licenses / UA tagline) with v1 | Scope | XS | **P3** |
| F3.3 | Mock failed-reps (0) + warmup row treatment | Visual TBD | S | **P3** |
| F2.4 | Move/space Builder `Discard` away from primary CTA | Polish | XS | **P3** |
| F1.2 | "Or" connector polish | Polish | XS | **P3** |
| F4.4 | Move completion note below summary | Polish | XS | **P3** |
| F5.5 | Keep "Settings" line in import preview | Polish | XS | **P3** |

P0/P1 are the ones worth doing before any code. Everything P2/P3 is a
one-line decision or a small mock tweak.

---

## What's working (don't touch)

- **Set-row state machine** (done/active/next/pending) — clear at a glance,
  mono numerals + amber tile is the right call for arm's-length reading.
- **Custom numpad** — better than every reference; the gym-specific quick-adjust
  row is the differentiator. Keep it.
- **Two-color brand discipline** (mallard + amber) + dusty-blue→rust letter
  rotation for supersets — supersets read instantly without competing with the
  brand colors.
- **Superset rendering** in both Builder and History detail — left-border +
  letter chip + A1/A2 prefixes + round dots is a lot of structure carried
  cleanly.
- **Completion PR card** as the single info-tinted accent — restraint that most
  fitness apps fail (they confetti everything).
- **History detail** read-only per-round breakdown — genuinely good.
- **DB empty state** logic (system list always present, nudge for custom).

---

## References

Match quality from Lazyweb was moderate — Kachka's data-dense, no-account,
single-purpose logger is a narrow niche, and the spec deliberately avoids
cloning Hevy/Strong/Fitbod. The three below are the directly-relevant ones;
treat them as inspiration, not templates.

- **Fitbod — workout plan/builder** (`ref-fitbod-builder.png`) [Lazyweb]
  Circuit-style editable exercise list with per-exercise sets/reps/weight,
  target-muscle context, and a prominent Start Workout CTA. Relevant to the
  Builder (F2.x). Note: Fitbod *does* expose per-exercise edit affordances
  inline — supports adding `Edit sets` to Kachka's row menu (F2.1).

- **Numbies — rep logging w/ keypad** (`ref-numbies-numpad.png`) [Lazyweb]
  Large rep readout + numeric keypad + Submit. Kachka's numpad is more capable
  (dual kg/reps fields + gym quick-adjust), which validates the custom-numpad
  decision — included as the "what good looks like, and we're past it" baseline.

- **Ladder — constrained multi-select** (`ref-ladder-multiselect.png`) [Lazyweb]
  "Pick up to N" selection list with the constraint stated inline and a compact
  footer. Relevant to the superset config sheet (F2.3) — shows how to keep the
  constraint label + selection + action above the fold.

### Current-state gallery
All 27 rendered screens are in `references/current-*.png` (proto mode, clean
phone frame), grouped by the five flows above.
