# Backlog — P2 / P3 design-review items

Lower-priority items from the design review 2026-05-23. Each is a one-line
decision or a small mock tweak. Promote any item to its own file when picked up.
IDs match the review report.

**Status:** all P2 resolved 2026-06-02 (decisions inline below). P3 still open.

---

## P2 — consistency / spec divergence ✅ all resolved 2026-06-02

### X2 — Ambiguous meta token `· 4 ·` ✅ resolved 2026-06-02
- **Where:** `today-has-history`, every History row, in-workout top bar.
- **Problem:** the bare exercise-count number (e.g. `12 sets · 4 · 540 kg`)
  reads as noise — no unit, no label.
- **Action:** label it (`4 exercises` / `4 ex`) or drop it; if kept, give it a
  unit like every neighbour.
- **✅ Resolution:** **closed as a duplicate of X3.** There is no exercise-count
  token — the bare `4` the review flagged is the leading digit of the thin-space
  volume `4 540` (confirmed against the wireframes; the report's own F4.3 calls
  it "Same as X3"). Dropping the thousands separator (X3 → `4540 kg`) removes the
  stray `4`, so X2 needs no separate change. No `4 ex` label added.

### X3 — Volume thousands-separator is ambiguous ✅ resolved 2026-06-02
- **Where:** `completion-screen`, `history-list`, `history-detail`.
- **Problem:** `4 540 kg` (thin-space grouping) reads as two numbers next to the
  `·` meta rhythm.
- **Action:** pick a non-colliding grouping (`4,540 kg`, `4540 kg`, or `4.5k kg`).
  Note: UA uses space as the thousands separator — this is an i18n decision too.
- **✅ Resolution:** **no thousands separator** — render `4540 kg`. Rule recorded
  in `visual/README.md` §3.4 (locale-independent) and `history.md` §10.2. Applied
  to all volume tokens across the wireframes — completion, history list/detail,
  history-picker, Today cards, and the in-workout / rest-timer / pull-to-cursor
  top bars (broader than the 3 the review named, for consistency). Resolves F4.3
  (same artifact on completion) too.

### F4.1 — History top-bar `⋯` menus contradict spec ✅ resolved 2026-06-02
- **Where:** `history-list`, `history-detail`.
- **Spec:** `docs/spec/history.md` §10.1/§10.2/§10.3 — "no topbar actions".
- **Action:** drop the `⋯`, or update spec + define what's in the menu.
- **✅ Resolution:** **dropped the `⋯`** — the spec was already right (no topbar
  actions in v1; filter / search / export all v2). Removed the button from
  `history-list` (root tab bar now matches `history-empty`) and `history-detail`
  (replaced with a hidden icon-btn-width spacer so the centered title doesn't
  shift). Annotations de-staled. No spec change needed.

### F4.2 — `history-empty` has a "Go to Today" CTA; spec says none ✅ resolved 2026-06-02
- **Where:** `history-empty`.
- **Spec:** `docs/spec/history.md` §10.4 — no CTA (Today is in the tabs).
- **Action:** decide — keep CTA (it's arguably helpful) + update spec, or cut it.
  Make it an explicit decision, not a silent override.
- **✅ Resolution:** **cut the CTA** — spec §10.4 was already right; Today is one
  tap away in the tab bar. Removed the `Go to Today` button + its unused
  `.secondary-cta` style from `history-empty`; the subtitle keeps the textual
  nudge to Today. Annotations de-staled. No spec change needed.

### F5.3 — `Default rest` row not in spec ✅ resolved 2026-06-02
- **Where:** `profile` (WORKOUT group).
- **Spec:** `docs/spec/profile.md` §12.3 lists only Rest haptic + Rest sound.
- **Action:** likely add it to spec (genuinely useful default for the rest
  timer) rather than cut — but decide.
- **✅ Resolution:** **added to spec.** Default `90 s`; action sheet with presets
  `60 / 90 / 120 / 180 s + Off`, instant-apply (same pattern as Theme / Language).
  Drives the auto-start rest countdown for standalone exercises; supersets keep
  their own per-group rest (§6.2); per-exercise override → v2. Recorded in
  `profile.md` §12.1 (diagram + table) and §12.3, cross-linked from in-workout
  §5.10. Wireframe row now shows `90 s` instead of the `—` placeholder.

---

## P3 — copy / polish

### F3.2 — Numpad "Done" → "Save set"
- **Where:** `numpad`. Spec `docs/spec/in-workout.md` §7.2.
- **Action:** rename to "Save set" — names the consequence (set logged, cursor
  advances, rest starts).

### F2.3 — Rest control below the fold in superset config sheet
- **Where:** `superset-config-sheet`. Spec `docs/spec/supersets.md` §6.2.
- **Action:** compress the exercise list so Rounds + Rest + Create sit above the
  fold. Ref: Ladder constrained multi-select (`ref-ladder-multiselect.png`).

### F5.4 — About scope creep
- **Where:** `about`. Spec `docs/spec/profile.md` §12.5.
- **Problem:** `Report an issue` + `Open source licenses` appear though §12.5
  defers acknowledgements post-v1; `Качайся.` tagline is UA-only.
- **Action:** reconcile against v1 scope; add an EN tagline variant or accept it
  as a deliberate brand-ism.

### F3.3 — Failed-reps (0) + warmup row treatment still TBD
- **Where:** in-workout rows. Spec `docs/spec/in-workout.md` §5.7; visual §5.1.
- **Action:** mock the row-level treatment for a failed set (`0 reps`) so logging
  it has clear feedback.

### F2.4 — Builder `Discard` sits under the primary CTA
- **Where:** `builder`.
- **Problem:** destructive verb directly under the thumb's primary target
  (`Start workout`) invites mis-taps.
- **Action:** move/space `Discard` away from the primary CTA.

### F1.2 — "Or" connector polish
- **Where:** `today-has-history`.
- **Action:** use a thin divider with centered "or", or drop it and let spacing
  separate.

### F4.4 — Completion "Add a note" placement
- **Where:** `completion-screen`.
- **Action:** move the note textarea below the exercise summary (notes are
  usually written last). Low priority.

### F5.5 — Keep "Settings" line in import preview
- **Where:** `backup-import-preview`. Spec `docs/spec/profile.md` §13.3.
- **Action:** restore the "Settings included" line so users know settings get
  replaced/merged too.
