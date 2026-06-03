# Decisions · open · deferred

> Project memory: open questions (§15), deferred to v2 (§16), locked decisions (§17). Part of the Kachka v1 UI/UX spec — full map and §-index: [spec map](README.md).
> Behavior is described here; the visual system lives in `../visual/README.md`.

---

## 15. What is not yet decided

- **Data model** — formal schema `Workout → Group | Exercise → Set` with field types and rules (TBD as a separate document; affects the backup JSON format §13)
- **Visual style** — typography, colors (including letter-colors for groups), density, motion, illustrations for empty states
- **Exercise database seed list** — full catalog of system exercises (besides the 7 chip exercises); where to source: wger or our own


---

## 16. Deliberately deferred to v2 / later

**Program layer**
- Bundled programs / custom programs / program editor
- Linear progression, pointer-based scheduling
- One active program at a time
- Program JSON format (../program-format.md — frozen)

**Import / sharing**
- Import flow (file picker, conflict resolution, preview, land)
- Deep linking (gymtracker://import)
- Universal links / App Links
- Export of a program / single workout (including Markdown for LLM chats)

**Workout mechanics**
- AMRAP and time-based circuits
- Drop sets, rest-pause, cluster sets
- Uneven sets in a group
- 1RM / e1RM estimation and tracking
- Replace exercise mid-workout (in v1 = Remove + Insert after)

**UX conveniences**
- Mid-workout grouping for exercises with logged sets
- Save as draft in Workout Builder
- Mini-bar / minimize active workout
- PR badges on sets in History detail
- History filter (period + exercise) and search
- History export (Markdown single workout / period)
- Quick-add chips ranked by usage (currently static)

**Other zones**
- Social features (sharing, friends, feed)
- Wearable integration (Apple Watch, Wear OS)
- Voice input for logging
- Plate calculator
- Calendar-based scheduling
- Streak counters and motivational gamification
- Progress charts, exercise trends, PR timeline


---

## 17. List of locked decisions

**Base UI patterns**
- [x] All action menus — bottom action sheets (top-bar `⋯`, row `⋮`, set actions, numpad, superset config). The same pattern on iOS and Android. Reason — one-handed thumb-reach
- [x] All confirmations — bottom sheet (the same component): title + opt. description + `Cancel` (top) + destructive (bottom). Cancel at the top — protection against an accidental tap on destructive. Swipe down = Cancel

**v1 scope**
- [x] v1 = ad-hoc workouts (build / execute / log to history)
- [x] Programs / import / deep linking → v2
- [x] 3 bottom tabs: Today · History · Profile

**Today / Pre-workout**
- [x] Three modes: has history / first launch / in-progress
- [x] Repeat last as primary CTA
- [x] Choose from history for split routines
- [x] Build from scratch → Workout Builder
- [x] Onboarding — straight to empty Today, without welcome screens
- [x] Crash restoration — banner on Today (Resume / Discard)

**Workout Builder**
- [x] Modal overlay over the Tab Navigator
- [x] Quick-add chips: Squat, Bench Press, Deadlift, Barbell Row, Overhead Press, Pull-up, Bicep Curl
- [x] Default 1 pending set when an exercise is added (replaces the earlier 3 × 8 default; sets are configured in the In-workout pending state, see Builder & in-workout flow)
- [x] Editable workout name (from the source when cloning, auto-name when blank)
- [x] Reorder via drag only — no menu `Move up / Move down`; a11y reorder via row accessibility actions. Supersets via action menu
- [x] Continue button (`Continue →`) disabled while the list is empty

**Builder & in-workout flow**
- [x] Builder is composition-only: name + muscle groups per card, reorder, add via chips/picker + supersets. No set presets in the Builder
- [x] Sets are configured in the In-workout pending (pre-start) state, not in the Builder
- [x] Soft start: the workout begins at the first logged set or an explicit `Begin` tap, whichever first; setup time is not counted toward duration
- [x] Default 1 pending set when an exercise is added (replaces the earlier 3 × 8 default)
- [x] `Add set` copies the previous set's values (reps / weight)
- [x] Pre-set weights optional; `prev` shown as guidance; weight chosen live remains the norm

**In-workout**
- [x] Exercise list — scroll, not carousel
- [x] Sets with an opt. target — ghost text (from the clone source)
- [x] Custom numpad instead of the system keyboard
- [x] Quick-adjust buttons on the numpad (`±2.5`, `±5`)
- [x] Tap on a set number → set actions sheet
- [x] Set actions: warmup toggle, RPE 1–10, note, delete
- [x] Active workout = full editor: add/remove set, add/insert/remove exercise, reorder
- [x] Skip exercise — soft remove that preserves the structure for clone
- [x] Failed reps (0 reps) — allowed, save + green ✓, does not go into volume and PR
- [x] Auto-scroll pauses on manual scroll; return via a floating "return to current set" chip above the bottom bar (appears when the cursor is outside the viewport, tap → smooth scroll + auto-scroll re-engages). Swipe-down — in v2 as a power-user option
- [x] Rest timer = the bottom bar's accented `rest` mode (large mono `MM:SS` + full-width progress + inline `−15s/+15s/Skip`), not a floating ring. Coexists with the return-to-cursor chip on separate layers — chip above the bar, rest countdown in the bar (design-review F3.1, spec §5.10)

**Supersets**
- [x] Must-have in v1
- [x] Only alternating, 2-5 exercises, 2-10 rounds, one rest per group
- [x] Creation pre-workout and mid-workout (with constraint: 0 logged sets in the candidates)
- [x] Creation UI: per-exercise `⋮` → Add to superset → multi-select picker → config sheet
- [x] Color-coded letter labels (A/B/C with color rotation)
- [x] Edit rounds (constrained), rest, add/remove exercise (under the same constraint)
- [x] Ungroup always possible, logged sets stay bound to their exercises
- [x] AMRAP / uneven / time-based — in v2

**Completion**
- [x] Completion screen with 4 stats cards + note + summary
- [x] PR detection — simple MVP variant (first time such a weight in a rep range)
- [x] Volume = `sum(weight × reps)`, warmups excluded

**History**
- [x] Bottom tab `History`, root screen without topbar actions
- [x] Flat chronological feed, newest on top, infinite scroll
- [x] Sticky section headers (week / month) on scroll
- [x] Tap → detail (read-only full snapshot)
- [x] Detail body: all exercises with all sets, group rendering for supersets with letter labels
- [x] Volume in row — `sum(weight × reps)`, warmups excluded
- [x] Volume / tonnage rendered without a thousands separator (`4540 kg`, not `4 540 kg`) — locale-independent, avoids the `·` meta collision (design-review X2/X3, visual §3.4)
- [x] Discarded workouts are not saved; partial-completed are saved
- [x] Empty state: text + a simple icon
- [x] Filter / search / export / PR badges / charts — in v2

**Exercise picker / Database**
- [x] One screen-component, two modes (Add / Browse)
- [x] Search: case-insensitive substring; AND-composition with muscle group filter
- [x] Filter: 7 muscle groups (Chest · Back · Legs · Biceps · Triceps · Shoulders · Core), single-select, sticky `All` first
- [x] System exercises — multi-tag, read-only, without a detail screen
- [x] Custom exercises — single-tag, edit (entity-level rename) + soft delete
- [x] Custom creation: inline `Create as 'X'` (no-results affordance) + sticky `+ Create custom` button
- [x] Custom fields: name + muscle group + isBodyweight (notes/equipment → v1.x)
- [x] Sort alphabetical, search/filter reset on open
- [x] Single-select in Add mode (multi-select → v1.x)
- [x] Soft delete preserves past workouts (entity by ID)

**Profile + Settings**
- [x] Profile root = hybrid hub: inline preferences + grouped sections (PREFERENCES / WORKOUT / DATA / About)
- [x] Theme: `System` / `Dark` / `Light`, default `System` (action sheet)
- [x] Language: `System` / `English` / `Ukrainian`, default `System` (auto-detect locale, fallback English)
- [x] Theme / Language pickers apply instantly (tap option → apply + dismiss, no `Cancel/Done` footer); the selected row shows a single marker — a trailing checkmark (design-review F5.2)
- [x] Show RPE: toggle, default ON. OFF hides the picker from §8.2 and the `@8` badges, does not delete logged RPE values
- [x] Rest haptic: toggle, default ON
- [x] Rest sound: toggle, default OFF
- [x] Default rest: action sheet (presets `60 / 90 / 120 / 180` s + `Off`, instant-apply), default `90 s`; sets the auto-start rest-timer duration for standalone exercises, supersets keep per-group rest; per-exercise override → v2 (design-review F5.3, spec §12.3, in-workout §5.10)
- [x] No push notifications in v1 (background → v2)
- [x] Exercise database, Backup & restore — separate sub-screens
- [x] About: app version + localized tagline (EN `Get lifting.` / UA `Качайся.`) + GitHub link + privacy note. No acknowledgements / `Open source licenses` / `Report an issue` rows in v1 — acknowledgements need a fixed stack + dep list, v1.x (design-review F5.4, spec §12.5)
- [x] No `Delete all data` in v1 (user reinstalls the app)

**Backup & restore**
- [x] Manual export/import in JSON; auto-backup → v2
- [x] Plain JSON, without encryption in v1 (encryption → v2 together with sync)
- [x] Export: one tap → native share sheet (Files / iCloud / AirDrop / Drive / email / etc.). Without our own destination picker
- [x] File: `kachka-backup-YYYY-MM-DD.json`, full state (workouts + custom exercises including soft-deleted + settings + metadata with `schemaVersion`/`appVersion`/`exportedAt`)
- [x] Import: file picker → preview screen (counts + date + version + mode picker) → bottom sheet confirmation → atomic transaction
- [x] Two import modes: Replace all (default, for recovery/migration) and Merge skip-by-UUID (for multi-device). Per-field merge → v2
- [x] Older `schemaVersion` → auto-migrate JSON before preview. Newer → blocked with a message to update the app
- [x] No stale-backup nudge (`Last export` not shown)
