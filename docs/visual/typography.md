# Typography · families, scale, numbers

> Type families, where mono is used, the mobile scale, and number formatting
> (§3). Part of the Kachka v1 visual system — full map and §-index:
> [visual map](README.md).

---

## 3. Typography

### 3.1 Families

| Role | Family | Fallback | License |
|---|---|---|---|
| Body / UI / headers | **Inter** | system-ui, -apple-system | OFL |
| Numbers / data | **IBM Plex Mono** | ui-monospace, Menlo | OFL |

**Why Inter**: neutral, dense, full Cyrillic, OpenType `tnum` for tabular figures, the de-facto standard for utility-dense UI (Linear, Vercel, Notion).

**Why IBM Plex Mono** (and not JetBrains Mono): warmer, humanist, fits the Mallard palette better. JetBrains Mono is a stricter code-editor vibe that would conflict with the brand warmth.

### 3.2 Where to use mono

Plex Mono is used EVERYWHERE that data the user logs or reads as numbers is displayed:

- Weight, reps, RPE
- Duration, tonnage
- Set numbers, set count
- Time (timer, elapsed), date (numeric part)

Non-numeric meta like `Round 2 of 3 · Rest 90s` — numbers inline in Plex Mono (`<span class="num">…</span>`), the rest in Inter.

### 3.3 Scale (mobile, working values)

| Role | Font | Size | Weight | Use |
|---|---|---|---|---|
| Title / screen header | Inter | 17 | 500 | "Push A", screen titles |
| Section heading | Inter | 16 | 500 | Exercise name |
| Group heading | Inter | 14 | 500 | "Superset", "Dumbbell row" inside group |
| Body | Inter | 14 | 400 | Default text |
| Meta / subtitle | Inter | 12 | 400 | "Working set 3 of 4", subtitles |
| Caption | Inter | 11 | 400 | Column headers, status meta |
| Number large | Plex Mono | 17–18 | 500 | Timer, large numeric displays |
| Number medium | Plex Mono | 15–16 | 400 | Set values (kg, Reps) |
| Number small | Plex Mono | 12–14 | 400 | Set numbers, prev values, meta numbers |

OpenType: for Inter we force-enable `tnum` (tabular figures) so that inline numbers in meta rows don't "jump" in width.

### 3.4 Number formatting

- **No thousands separator** for volume / tonnage and other large counters: render `4540 kg`, not `4 540 kg` or `4,540 kg`. A space-grouped `4 540` collides with the `·` meta separator and reads as two numbers (the leading digit gets mistaken for a count); a comma is anglo-centric and clashes with the UA convention (space as the grouping mark). Workout values are 3–5 digits and stay legible ungrouped (design-review X2 / X3 / F4.3).
- Decimal separator is locale-driven (no user-facing toggle, spec §7.5); the no-grouping rule above is locale-independent.
