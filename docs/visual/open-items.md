# Open items · visual roadmap

> Tracking list of what is still open in the visual system, with priority (§10).
> Part of the Kachka v1 visual system — full map and §-index:
> [visual map](README.md).

---

## 10. Open items

| Item | Priority | Note |
|---|---|---|
| Mockups of other screens (Today, History, Builder, Profile) | High | Validate the system on simpler layouts and surface gaps |
| Action sheets style | High | container, divider, destructive button pattern |
| Custom numpad style | High | a separate component, its own button grid (per spec §7.2) |
| Semantic colors | Medium | Resolve conflicts with the brand and letter palette |
| Iconography library lock | ✅ Done | Locked: **Lucide** (v1). Phosphor considered, not chosen |
| Motion specifics | Medium | concrete easing / durations |
| Set actions visual (warmup, RPE, note, delete) | Medium | per spec §8 |
| Mascot character | Low | a separate session |
| Empty state illustrations | Low | after mascot |
| Light theme tuning | Low | system fallback, not a priority |
| Token migration (wireframes) | Medium | Phase 1 done (scales in `tokens.css`); de-hardcode is incremental — plan in §10.1 |
| Token-system reconciliation | ✅ Done | Value conflicts resolved — see §10.2 |
| Components → §5.0 spec format | Low | Palette synced to orange ✅; reflow §5.1–5.7 prose into the §5.0 tokens+states block layout |
| Design-doc lint | Low | `npx @google/design.md lint` style check (`broken-ref` / `contrast-ratio` / `orphaned-tokens`) — anti-drift, when tooling is set up |
| Token export | Low | JSON / TS / CSS variables — when implementation starts |

## 10.1 Token migration (wireframes → complete token set)

Anti-drift measure: today `shared/tokens.css` tokenizes **color only**.
Spacing, radii, font-sizes and alpha layers are hardcoded across the 30
wireframes, so a redesign silently loses them. Goal: make `tokens.css` the
complete single source of truth (mirroring §2 / §3.3 / §4) and route every
wireframe value through a `var(--…)`.

**Measured scope (30 files):** ~75 hardcoded color literals (≈24 hex + ≈50
rgba); **1879** `px` literals (spacing + type + radii + icon sizes mixed). One
known bug surfaced: `rgba(white, 0.16)` is invalid CSS.

**Why it is not one mechanical sweep:** the same `px` literal plays different
roles in different places (`14px` = font-size *and* padding *and* icon size
*and* radius). A blind find-replace corrupts type and icons. Each non-color
literal needs a per-declaration decision about which axis it belongs to.

**Phases (ordered by risk):**

1. **Add the missing scales to `tokens.css`** — mirror the locked spec, do not
   invent values:
   - `--space-*` from §4 base-4 grid (`4/8/12/16/20/24/32`)
   - `--radius-*` from §4 (`14/12/10/8/6`, plus `50%` stays literal)
   - `--text-*` (font-size) from §3.3 (`17/16/14/12/11`; Plex `15–18`)
   - `--accent-aNN` / alpha tokens for the recurring rgba layers
   - `--icon-*` as a **separate axis** (`14/18/20/22`) — icon sizes never
     fold into `--space-*`.
2. **Color cleanup (safe, do first)** — replace the ~75 color literals with
   existing/new tokens; fix the `rgba(white,…)` bug. Low risk, finite,
   closes the primary drift fear.
3. **Spacing / radii / type — incremental, per-screen, never global.** Migrate
   only the screen currently being touched in the redesign; screenshot
   before/after (`?proto=1`) and diff. Establish the pattern on one reference
   screen (e.g. `in-workout`) before rolling on.
4. **(Later, when CI exists)** Playwright visual-regression snapshots over
   `?proto=1` — the real automated lock against pixel drift; reuses the
   existing `proto-mode.js`.

**Discipline rule (lock once Phase 1 lands):** no raw pixel/color literals in
wireframe local styles — `var(--…)` only. Makes drift visible in the diff.

## 10.2 Token-system reconciliation (resolved)

Adding the named scales (Phase 1) surfaced pre-existing conflicts between the
source-of-truth zone files. All resolved with the owner:

1. **Radius `9` vs `10` (timer chip)** → **`10`** (`--radius-chip`). `9` was an
   off-scale stray; snapped to the §4 scale (1px, imperceptible).
2. **Radius `18` (sheet tops)** → **legalized**. `--radius-sheet` = 18 added to
   the §4 scale as its top value, reserved for the dismissible sheet family
   (reads as elevation).
3. **Set-value size `15` vs `16`** → **`15`** (`--num-md`), matching
   `components.md §5.5`.
4. **Components palette pre-orange** → **synced now**. `components.md §5.1–5.7`
   recolored from mallard/amber to the orange tokens by name. Remaining work is
   only the prose→spec-format reflow (own roadmap row, Low).
5. **Spacing token naming** → **numeric** `--space-1…8` (1 unit = 4px), chosen
   over t-shirt names because Kachka's strict 4px grid maps to it without
   ambiguity (every §4 value representable).
