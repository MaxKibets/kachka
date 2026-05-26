# Backlog — P2 / P3 design-review items

Lower-priority items from the design review 2026-05-23. Each is a one-line
decision or a small mock tweak. Promote any item to its own file when picked up.
IDs match the review report.

---

## P2 — consistency / spec divergence

### X2 — Ambiguous meta token `· 4 ·`
- **Where:** `today-has-history`, every History row, in-workout top bar.
- **Problem:** the bare exercise-count number (e.g. `12 sets · 4 · 540 kg`)
  reads as noise — no unit, no label.
- **Action:** label it (`4 exercises` / `4 ex`) or drop it; if kept, give it a
  unit like every neighbour.

### X3 — Volume thousands-separator is ambiguous
- **Where:** `completion-screen`, `history-list`, `history-detail`.
- **Problem:** `4 540 kg` (thin-space grouping) reads as two numbers next to the
  `·` meta rhythm.
- **Action:** pick a non-colliding grouping (`4,540 kg`, `4540 kg`, or `4.5k kg`).
  Note: UA uses space as the thousands separator — this is an i18n decision too.

### F4.1 — History top-bar `⋯` menus contradict spec
- **Where:** `history-list`, `history-detail`.
- **Spec:** `docs/spec/history.md` §10.1/§10.2/§10.3 — "no topbar actions".
- **Action:** drop the `⋯`, or update spec + define what's in the menu.

### F4.2 — `history-empty` has a "Go to Today" CTA; spec says none
- **Where:** `history-empty`.
- **Spec:** `docs/spec/history.md` §10.4 — no CTA (Today is in the tabs).
- **Action:** decide — keep CTA (it's arguably helpful) + update spec, or cut it.
  Make it an explicit decision, not a silent override.

### F5.3 — `Default rest` row not in spec
- **Where:** `profile` (WORKOUT group).
- **Spec:** `docs/spec/profile.md` §12.3 lists only Rest haptic + Rest sound.
- **Action:** likely add it to spec (genuinely useful default for the rest
  timer) rather than cut — but decide.

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
