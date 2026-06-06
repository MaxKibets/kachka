# Kachka · Usability Test v0 — Plan & Capture Sheet

> Ukrainian version (for reading aloud during sessions):
> [usability-test-v0.uk.md](usability-test-v0.uk.md).
>
> Guerrilla usability test of the v0 clickable prototype, run on gym-going
> friends **before** investing in visual design. Lightweight, solo, MVP.
> Read with `../CONTEXT.md` and `../wireframes/INDEX.md`.

Status: **ready to run** · drafted for the v0 wireframe prototype.

---

## 1. Purpose

**One goal:** confirm the ad-hoc workout model and the core flows are
understood without explanation — catch structural/comprehension gaps while
fixes still cost a paragraph of spec, not a redo of visual mockups.

This is **not** a visual/aesthetic review (nothing to judge yet — `visual/` is
v0) and **not** a statistical study. It is a small qualitative pass to surface
the big holes.

### What this prototype can and cannot validate

The prototype's data-entry layer is static (see `wireframes/INDEX.md` §"Два
режими"). That hard-bounds the scope:

| ✅ Testable now | ❌ Out of reach with this prototype |
|---|---|
| Mental model: do users grasp ad-hoc build → execute → log? | Set-logging **speed / ergonomics** (numpad is static) |
| **Findability** — do they reach the right screen for a goal? | One-handed, sweaty-thumb feel under gym conditions |
| Discoverability of non-obvious gestures (tap set number, row `⋮`) | Real `±2.5/±5` adjust, target ghost-text behavior |
| Comprehension of the **superset** concept | Text entry (workout name, exercise search, custom create) |
| Navigation between zones (Today / History / Profile) | Toggle / filter-chip / search-field behavior |

> **The #1 product risk — in-gym micro-ergonomics of logging — is NOT covered
> by this test.** Validate it later via Wizard-of-Oz (moderator manually
> advances screens as the participant "taps") or on the real build. Here we
> hunt structural and comprehension defects only.

---

## 2. Method

- **Type:** task-based usability test, think-aloud, silent observation.
- **Participants:** 2–3 friends who train regularly. Three is enough for a
  guerrilla pass — it catches the dominant issues, not the long tail.
- **Length:** ~20–25 min each.
- **Bias control:** friends are kind. Measure what they **do** (first tap,
  hesitation, wrong turns), not what they **say** they like.

---

## 3. Setup

1. Serve the wireframes folder so relative `shared/` assets resolve:
   ```bash
   # from D:\DEV\kachka\docs\wireframes
   npx serve .          # or: python -m http.server 8000
   ```
2. On the participant's phone (same Wi-Fi), open
   `http://<laptop-ip>:8000/prototype.html` — a real phone in hand is more
   realistic than a desktop browser.
3. From the prototype menu pick the start scenario each task names. The proto
   mode (`?proto=1`) hides annotations and shows only the phone frame.
4. Record screen + audio if the participant agrees. Otherwise the moderator
   fills the capture sheet (§6) live.

---

## 4. Moderator script (read aloud — Ukrainian)

**Intro (anti-bias framing):**

> «Дякую, що допомагаєш. Це чернетка дизайну додатка для тренувань — я
> перевіряю дизайн, а не тебе, помилитись тут неможливо. Найкорисніше для
> мене — якщо ти **думатимеш уголос**: що бачиш, що очікуєш, куди б тицьнув і
> чому. Я мовчатиму й просто дивитимусь — це нормально. Якщо щось бісить —
> кажи прямо, мені потрібна чесність, а не ввічливість.»

**Per task:** read the goal, then stay silent. If they freeze >~15s:
> «Що ти зараз думаєш? Куди б тицьнув, якби мусив вгадати?»

Never point, never name the right button, never rescue early.

**Wrap-up:**
> «Що було найнезрозуміліше? Якби можна було змінити одне — що?»

---

## 5. Tasks

Ordered by risk — the riskiest concepts first, while attention is fresh. Run
the 5 core tasks; add optional ones if the participant is engaged.

Legend — **Success** = goal reached without help · **Partial** = reached after
hesitation/backtrack · **Fail** = wrong path or gave up.

### T1 — Pick the right way to start (CORE)
- **Start:** `today-has-history.html`
- **Say:** «Минулого разу ти робив тренування "Push A". Сьогодні хочеш зробити
  точно таке саме. Покажи, як.»
- **Right path:** tap **Repeat last**.
- **Success:** chooses *Repeat last* over *Choose from history* / *Build from scratch*
  without dithering.
- **Watch:** Do they understand the three options differ? Does "Repeat last"
  read as "same workout again"? Confusion between *Choose from history* and
  *Repeat last*.
- **Probes:** Today IA, the primary returning-user flow (spec §3).

### T2 — Build a workout, add an exercise (CORE)
- **Start:** from T1 continue, or `today-has-history.html` → **Build from scratch** → `builder.html`.
- **Say:** «Тепер збери тренування з нуля. Додай вправу Bench Press.»
- **Right path:** Quick-add chip *Bench Press*, **or** `+ Add exercise` →
  picker → tap the row.
- **Success:** an exercise lands in the list by either route.
- **Watch:** Do Quick-add chips read as "tap to add"? Do they look for a search
  instead (search field is static — note it as a gap, not a finding)?
- **Probes:** Builder model, Quick-add discoverability (spec §4).

### T3 — Create a superset (CORE · highest-risk concept)
- **Start:** `builder.html` with ≥2 exercises (or the row-menu state via
  `builder-row-menu-sheet.html`).
- **Say:** «Зроби так, щоб дві вправи виконувались по черзі як суперсет.»
- **Right path:** row `⋮` → **Add to superset** → config sheet.
- **Success:** opens the superset config sheet.
- **Watch:** Do they find the row `⋮`? Do they understand "superset" the same
  way the app models it (alternating, one rest)? First instinct (drag two
  together? long-press?).
- **Probes:** the hardest must-have concept in v1 (spec §6). If this confuses
  people, it is the most valuable finding of the session.

### T4 — Mark a set as warm-up (CORE · gesture discoverability)
- **Start:** `in-workout.html`.
- **Say:** «Твій другий підхід був розминочний. Познач його як warm-up.»
- **Right path:** tap the **set number** → set-actions sheet → **Mark as
  warm-up**.
- **Success:** opens the set-actions sheet via the set number.
- **Watch:** Does tapping the set number occur to them at all? (Known risk —
  the number doesn't look tappable.) Where do they hunt first?
- **Probes:** the tap-set-number affordance (spec §8) — a load-bearing,
  non-obvious interaction.

### T5 — Log a set: mental model only (CORE · static caveat)
- **Start:** `in-workout.html`.
- **Say:** «Ти щойно зробив 8 повторів на 60 кг. Покажи, куди б ти це вписав.»
- **Note:** the numpad is static — they cannot actually type. Observe **where
  they expect to enter values** and what they expect to happen on tap.
- **Success:** they point to the weight/reps field and articulate the right
  expectation (numpad/quick-entry appears).
- **Watch:** Do the fields read as editable? Do they expect a system keyboard
  vs a custom pad? Do they look for a confirm/✓?
- **Probes:** logging mental model (spec §5/§7). **Do not** read slowness as a
  finding — taps don't register here.

### T6 — Finish & save (optional)
- **Start:** `in-workout.html`.
- **Say:** «Тренування закінчилось. Заверши й збережи його.»
- **Right path:** Finish → completion screen → **Save**.
- **Watch:** Is "Finish" findable? Is the completion screen understood as a
  summary, not an extra obstacle? Save vs Discard clarity.

### T7 — Find where to add a custom exercise (optional · findability)
- **Start:** `profile.html`.
- **Say:** «Ти робиш вправу, якої немає в додатку. Де б ти додав свою власну?»
- **Right path:** Profile → DATA → Exercise database → Create custom.
- **Watch:** Does the database belonging inside Profile make sense, or do they
  expect it elsewhere (e.g. in the picker only)?

---

## 6. Capture sheet (print / copy one block per participant)

**Participant:** ____________  **Trains:** ___×/week  **Date:** __________

| Task | Result (✓ / ~ / ✗) | First tap | ~Time to find | Quote / observation |
|------|--------------------|-----------|---------------|---------------------|
| T1 Start path        |  |  |  |  |
| T2 Add exercise      |  |  |  |  |
| T3 Superset          |  |  |  |  |
| T4 Mark warm-up      |  |  |  |  |
| T5 Log set (model)   |  |  |  |  |
| T6 Finish & save     |  |  |  |  |
| T7 Custom exercise   |  |  |  |  |

**Wrap-up answers**
- Most confusing thing: ____________________________________________
- One thing they'd change: _________________________________________
- Unprompted reactions / quotes: ___________________________________

---

## 7. Known prototype gaps — do NOT log these as findings

These are v0-prototype limitations, not design defects. If a participant
stalls *because* of one, note "blocked by static prototype", not a UX issue:

- Numpad / weight / reps entry — static, no typing.
- Exercise search field — static.
- Muscle-group filter chips — static.
- Setting toggles (Show RPE, haptics, theme, language) — static.
- Custom-exercise form fields — static.
- Any screen not wired into the proto links (see `wireframes/INDEX.md` for the
  clickable map).

---

## 8. Synthesis (after all sessions)

1. **Pool issues** across participants. An issue hit by ≥2 of 3 is a strong
   signal; a single dramatic stall still matters.
2. **Severity:**
   - **S1 Blocker** — could not complete a core task (T1–T5).
   - **S2 Friction** — completed but with confusion/backtracking.
   - **S3 Polish** — minor, cosmetic, or one-off.
3. **Decide per issue:** fix in `spec/<zone>.md` now, or log to
   `spec/decisions.md` as a conscious deferral. Tie each to its §-section.
4. **Gate:** only S1s should block starting visual work. S2/S3 can ride along
   into the visual phase.

Append findings below as a dated log so the test stays a living record.

### Findings log

_(empty — fill after the first session)_
