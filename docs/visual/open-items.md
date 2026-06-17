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

**Phase 2 status (color cleanup) — done.** All recurring color literals across
the 30 wireframes now resolve to tokens (`--surface-3`, `--canvas`, `--letter-a`,
`--danger`, `--border-subtle`, `--scrim`, `--grab-handle`, `--accent-a40`,
`--accent-a50`, `--sheet-shadow`). The `rgba(white, 0.16)` bug is fixed. A few
near-duplicates were unified into one token (imperceptible: `rgba(10,10,10,0.6)`
and `rgba(0,0,0,0.55)` → `--scrim`; `rgba(255,255,255,0.18)` → `--grab-handle`).

Deliberately **left as literals** (genuine one-offs / intentional — each needs a
small semantic decision, not a silent pixel change):

- `#000` (prototype.html host-page background) — proto viewer frame, not an app token.
- `rgba(255,122,64,0)` (rest-timer pulse keyframe) — alpha-0 animation endpoint.
- `rgba(255,122,64,0.15)` (set-actions selected-fill) — accent tint; add `--accent-a15`?
- `rgba(0,0,0,0.3)` ×2 (numpad / set-actions sheet shadow) — drifted lighter than
  `--sheet-shadow` (0.45); unify or keep?
- `rgba(0,0,0,0.35)` (pull-to-cursor chip) — *downward* floating-chip shadow,
  distinct from the upward sheet shadow; needs its own `--chip-shadow`?
- `rgba(255,255,255,0.55)` (about) — secondary text on a dark surface; map to an
  `on-dark` text token?
- `rgba(92,123,149,0.12 / 0.45)` (completion-screen) — slate/`letter-a` category
  tints; part of the category-tint system (§2.5), one screen.

**Doc/wireframe discrepancy logged:** components.md §5.1 says the pending-set
circle border is `border.subtle`, but the wireframes render `#2A2A2A`
(`--surface-3`, a solid grey). Phase 2 preserved the wireframe appearance
(`--surface-3`); reconcile which is correct in the in-workout mockup pass.

**Phase 3 status (spacing / radii / type) — in progress; `in-workout.html` done
(reference screen).** Established the per-screen pattern: tokenize every
spacing / radius / font-size that maps to a scale; fixed component dimensions
(button/circle sizes, grid tracks `32/78/60/40`, row height `44`), border widths
and icon sizes stay literal (separate axes, out of scope). All radii mapped
cleanly (`14→--radius-card`, `12→--radius-button`, `10`/`9→--radius-chip`).

*Off-scale spacing — snapped to the nearest 4-grid step (owner decision: snap,
not keep-literal), ties rounded **up** to protect touch ergonomics (spec §1):*

| was | → token | value | where |
|-----|---------|-------|-------|
| `2`  | `--space-1` | 4  | meta margin-top, note-edit padding |
| `6`  | `--space-2` | 8  | title/chip/add-set gaps |
| `9`  | `--space-2` | 8  | note padding (the 9px **radius** → `--radius-chip`) |
| `10` | `--space-3` | 12 | card-to-card margin, chip/note padding |
| `11` | `--space-3` | 12 | note padding |
| `14` | `--space-4` | 16 | card horizontal padding (≈8×) |
| `18` | `--space-5` | 20 | action-bar safe-area bottom |

*Type left as literals (preserved + commented in-file; wireframe↔spec
discrepancies for the owner to reconcile — same class as the circle-border case
above, not silent pixel changes):*

- `set-num` **14px** mono vs spec `--num-sm` (13, §3.3 "set numbers").
- `set-prev` **12px** mono vs spec `--num-sm` (13, §3.3 "prev values").
- `iw-progress` **12px** mono vs spec `--num-sm` (13, §3.3 "meta numbers").
- timer chip **16px** mono — off the `--num-*` scale (15/18).
- `en-text` / `add-set` label **13px** sans — off the `--text-*` sans scale (12/14).

**Spec reconciliation flagged (needs owner OK before editing source):** the snap
makes `layout.md §4.1/§4.2` literal metrics (`14px` card padding, `10px`
card-to-card) diverge from the now-grid-aligned wireframe (`16` / `12`). Left
`layout.md` unchanged for now; update those metrics to the grid values (or
re-decide the tie direction) once confirmed, so `tokens.css` stays the single
source of truth. Before/after screenshots diffed — change is a subtle, uniform
loosening, structure identical.

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
