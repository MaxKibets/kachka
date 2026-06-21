# Gym Tracker · Handoff Context

> Context for an AI assistant picking up UI/UX work on this project. Read before your first response.

---

## What this project is

A React Native (iOS + Android) gym workout tracker. A hobby project; v1 ships free, monetization planned for v2 (see tech §5). Target audience — international, release on App Store + Google Play.

Discussion language: **Ukrainian**. Technical terms (RPE, PR, superset, set) stay in English.

## Current state

**v1 scope locked: ad-hoc workouts.** The user creates a workout on the fly or clones one from history, performs it, logs it to history. The program layer is fully deferred to v2.

UI/UX is **conceptually locked** for v1:
- Navigation / IA (3 tabs: Today · History · Profile)
- Today flow (Repeat last / Choose from history / Build from scratch)
- Workout Builder (pre-workout list + Quick-add chips + supersets)
- In-workout zone (everything, including editing mid-workout)
- Ad-hoc supersets with color-coded letter labels
- History (list + detail without filters/export)
- Exercise picker / Database (one component, two modes, 7 muscle groups, custom with soft delete)
- Profile + Settings (hybrid hub: PREFERENCES / WORKOUT / DATA / About)

**Locked**: technical and product decisions. The program JSON format is also locked at the field level — frozen, returns in v2. Visual system — the foundation is locked (mood, brand, palette, typography, letter rotation, iconography (Lucide), basic component patterns).

Still to work out: the formal data model; visually — mockups of the other screens (Today / History / Builder / Profile), action sheets, custom numpad, motion, mascot character + empty state illustrations. Technically: exercise database seed list.

## Project documentation

Four md files in the project, they should be read as a single whole:

| File | Content | Status |
|------|---------|--------|
| `spec/README.md` | UI/UX v1 — map + §-index. Zones in `spec/`: foundations, today, builder, in-workout, supersets, finish, history, exercises, profile, glossary, decisions | Active |
| `tech/README.md` | Technical and product decisions — platform, storage, units, localization, monetization, distribution | Active |
| `visual/README.md` | Visual system — map + §-index. Zones in `visual/`: foundations (mood/positioning/brand/tone), color, typography, layout, components, brand (empty states + mascot), open-items | Active · v0 |
| `program-format.md` | Program JSON format for import/export | **Frozen — v2** |

**Before any response — read spec, tech, and visual.** Read the program format only if the request explicitly concerns v2 / sharing / import.

## Most important locked decisions

A shortened list — details in the md files:

**Context and base constraints**
- User in the gym, sweating, one hand, 5–15s per set, 15–30 cycles per workout. The UI optimizes specifically for this scenario
- Dark theme mandatory, large touch targets, minimum taps

**v1 scope**
- v1 = ad-hoc workouts (build / execute / log to history)
- Programs / import / deep linking → v2
- 3 bottom tabs: Today · History · Profile
- Active workout — modal full takeover (no mini-bar)
- Workout Builder — modal pre-workout
- Exercise database — inside Profile

**Today flow**
- 3 modes: has history (Repeat last + Choose from history + Build from scratch) / first launch (single CTA) / in-progress (banner)
- Repeat last — primary CTA, clones structure + name + targets, prev = from the clone source
- Choose from history — list of all completed for split routines
- Crash restoration — banner on Today (Resume / Discard), not auto-resume

**Workout Builder**
- Quick-add chips: 7 popular exercises (Squat, Bench Press, Deadlift, Barbell Row, Overhead Press, Pull-up, Bicep Curl), en + uk
- New exercise is added without sets in the Builder (composition-only); default 1 pending set in In-workout pending (was 3 × 8)
- Editable workout name, reorder via drag, supersets via action menu

**In-workout**
- Exercise list — scroll, not carousel
- Sets with an optional target — ghost text in the fields (from the clone source)
- Custom numpad instead of the system keyboard with quick-adjust ±2.5/±5
- Set actions via tap on the set number — warmup, RPE, delete
- Active workout = full editor: add/remove set, add/insert/remove exercise, skip, reorder
- Skip exercise — soft remove that preserves the structure for clone
- Failed reps (0 reps) — allowed
- Rest timer — accented countdown in the bottom bar (not a floating ring); coexists with the pull-to-cursor chip on separate layers

**Supersets (must-have in v1)**
- Only alternating, 2-5 exercises, 2-10 rounds, one rest per group
- Creation pre-workout (Builder) and mid-workout (Active) with constraint: 0 logged sets in the candidates
- UI: per-exercise `⋮` → Add to superset → one combined sheet (multi-select partners + rounds + rest), not two-step
- Color-coded letter labels (A/B/C with rotation)
- Edit mid-workout: rounds (constrained), rest, add/remove exercise (under the same constraint), ungroup always

**History**
- Flat chronological feed, newest on top, infinite scroll
- Sticky section headers (week / month)
- Detail — read-only full snapshot with group rendering for supersets
- Discarded are not saved; partial-completed are saved
- Filter / search / export / PR badges / charts — in v2

**Exercise picker / Database**
- One screen-component, two modes: Add (modal from Builder/Active) and Browse (sub-screen from Profile/DATA)
- Search: case-insensitive substring + 7 muscle groups (Chest · Back · Legs · Biceps · Triceps · Shoulders · Core), single-select chip
- System exercises — multi-tag, read-only, without detail. Custom — single-tag, edit + soft delete
- Custom creation: inline `Create as 'X'` (no-results) + sticky `+ Create custom` button
- Custom fields: name + muscle group + isBodyweight
- Soft delete preserves past workouts (entity by ID, `deletedAt` flag)
- Sort alphabetical; search/filter reset on open

**Profile + Settings**
- Profile root = hybrid hub: inline preferences + grouped sections (PREFERENCES / WORKOUT / DATA / About)
- Theme: System / Dark / Light (default System); Language: System / English / Ukrainian (default System, fallback English)
- Show RPE toggle (default ON); Rest haptic (default ON), Rest sound (default OFF); Default rest (default 90s, presets 60/90/120/180 + Off)
- Exercise database, Backup & restore — separate sub-screens
- About: app version + localized tagline (EN "Get lifting." / UA "Качайся.") + GitHub + privacy note (no licenses / report-an-issue rows in v1)
- No push notifications, no Delete all data, no units toggle in v1

**Backup & restore**
- Manual export/import in JSON (auto-backup, encryption → v2)
- Export: tap → native share sheet (Files / iCloud / AirDrop / etc.)
- Import: file picker → preview screen (counts + date + version + mode picker) → bottom sheet confirmation → atomic transaction
- Two import modes: Replace all (default) and Merge skip-by-UUID
- Older `schemaVersion` → auto-migrate. Newer → blocked
- No stale-backup nudge

**Base UI patterns**
- All action menus — bottom action sheets (top-bar `⋯`, row `⋮`, set actions, numpad, superset config)
- All confirmations — bottom sheet with Cancel on top and destructive at the bottom. Swipe down = Cancel
- In-workout pull-to-cursor: floating chip above the bottom bar (appears when the cursor is out of viewport), tap → smooth scroll + auto-scroll re-engages

**Technical**
- Storage: local-only, sync-ready foundation (UUID, soft delete, timestamps)
- Units: kg only for MVP, lb later via user setting
- Localization: English (base) + Ukrainian, i18n from day one
- v1 free, no ads, no accounts; monetization deferred to v2

## Deliberately deferred to v2 — do not discuss in v1

**Program layer**
- Bundled programs / custom programs / program editor
- Linear progression, pointer-based scheduling
- One active program at a time
- Program JSON format (frozen in `program-format.md`)

**Import / sharing**
- Import flow (file picker, conflict resolution, preview, land)
- Deep linking (gymtracker://import)
- Universal links / App Links
- Export of program / single workout (Markdown for LLM chats)

**Workout mechanics**
- AMRAP / time-based circuits
- Drop sets, rest-pause, cluster sets
- Uneven sets in a group
- 1RM / e1RM estimation
- Replace exercise mid-workout (in v1 = Remove + Insert after)

**UX conveniences**
- Mid-workout grouping for exercises with logged sets
- Save as draft in Workout Builder
- Mini-bar / minimize active workout
- PR badges on sets in History detail
- History filter / search / export
- Quick-add chips ranked by usage

**Other zones**
- Social features
- Wearable integration
- Voice input
- Plate calculator
- Calendar-based scheduling
- Streak counters and motivational gamification
- Progress charts, trends, PR timeline

## What's next — the work plan

Zones remaining to work out in v1:

1. **Data model** — formal schema `Workout → Group | Exercise → Set` with field types and rules (TBD as a separate document; affects the backup JSON format)
2. **Visual style** — typography, colors (including letter-colors for groups), density, motion, illustrations for empty states

Four technical decisions for v1: local DB (recommended WatermelonDB), Expo vs bare RN, minimum OS versions, exercise database seed list (full catalog except the 7 chip exercises).

## How to work

**Style**: you ask a question → show a skeleton with trade-offs → the user gives direction → we lock it in md. Don't decide for the user — give a choice.

**Skeletons**: ASCII / mermaid — for processes and simple structures. For full mockups — a separate conversation about visual style (deferred for now).

**Questions to the user**: AskUserQuestion with 2-4 options. No more than 3 questions at a time.

**Mermaid diagrams**: for processes, state machines, hierarchies. Not for everything — only when a diagram genuinely helps.

**Locking**: When a zone is closed — we update the corresponding md (or create a new one). Files — in `D:\DEV\kachka\docs\`.

**Don't create documents without need**. UI/UX decisions → into the corresponding zone file `spec/<zone>.md` (map and §-index — `spec/README.md`); locked decisions / open / deferred → `spec/decisions.md`. Technical → into `tech/README.md`. Create a new document only if the topic is genuinely separate (for example, the data model).

## Tone and pragmatism

The user is an experienced developer, don't explain basic things. Values trade-offs and honest recommendations, don't dodge when asked "which is better". Works alone, without a team — time is expensive, don't proliferate features.

When in doubt — simpler is better than more complex, MVP philosophy.
