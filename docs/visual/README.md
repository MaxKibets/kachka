# Gym Tracker · Visual System

> Working contract for visual style v1. Palette, typography, density, component patterns. Source of truth for UI implementation. Tuned as mockups of other screens land.

**Status**: v0 working draft — foundation locked, refinement expected after Today / History / Builder / Profile mockups.

**Version**: v0.1 · initial fix after In-workout mockup

Read together with `../spec/README.md` (UI/UX behavior) and `../tech/README.md` (platform, localization). The spec is what happens. This document is how it looks.

---

## 1. Foundation

### 1.1 Mood

**Utility data-dense.**

- Information > chrome. Maximum useful data on screen at once without chaos.
- Numbers are the priority. Proportional font for text, monospace for everything the user logs/reads as data (weight, reps, RPE, duration, tonnage, time, date).
- Surfaces are light: thin borders or subtle surface-ladders instead of heavy shadows.
- No decorative gradients, illustrations, or character chrome in working screens.
- Mood reference — Hevy / Strong (density, on-the-go readability). This is a reference to the **philosophy**, not the visual image — per spec §1, our own visual language, we don't clone.

### 1.2 Brand identity

The name **Kachka** is a play on words: качка (the bird) + the slang "качалка" / "качатися" (gym / working out). "Open Kachka" = "go work out". The name is both an object and an action at once.

The brand lives in:

- the name
- the app icon (mascot-oriented)
- splash screen
- onboarding
- empty states (Today first launch, History empty, Exercise database empty)
- About section
- the mallard-rooted palette (keeps the brand visible even when the mascot is not on screen)

The brand does NOT live in working screens: In-workout, Builder, History list/detail, Profile body, nav menu, action sheets.

### 1.3 Mascot scope

**Bounded** per the visual-style session decision.

- The mascot character appears only in the bounded zones above (1.2).
- Persistent presence in the logging UI = forbidden.
- Celebratory presence (PR / finish moments) — a candidate for v2, not included yet.

Mascot character details (illustration style, expressiveness) — a separate session, see §9.

---

## 2. Color

All tokens are for the dark theme (mandatory per spec §1). The light theme is a system fallback, not a priority; it will be a separate pass.

### 2.1 Surface ladder

| Token | Hex | Use |
|---|---|---|
| `surface.canvas` | `#0A0F0E` | App background, status bar, bottom action bar, modal background |
| `surface.1` | `#131A18` | Primary cards (exercise card, group card, profile sections) |
| `surface.2` | `#1C2521` | Active row background, raised secondary surfaces |
| `surface.3` | `#28332E` | Tile inputs (active kg/Reps cells), interactive hover, focus rings |
| `border.subtle` | `rgba(255,255,255, 0.04–0.06)` | Card outlines |
| `border.divider` | `rgba(255,255,255, 0.05)` | Set row separators, list dividers |

All surfaces have a light teal-tint (rooted in mallard). This is not a neutral gray — it is a cold green-gray.

### 2.2 Brand colors

| Token | Hex | Use |
|---|---|---|
| `brand.mallard` | `#1F6E5C` | Primary brand, success, done states, group left-border, secondary CTA |
| `brand.amber` | `#F2A53A` | Accent, active focus, primary CTA, "current" indicator |
| `brand.mallard.dim` | `#163E36` | Lower-contrast mallard fills (selected chip background, badge background) |
| `brand.amber.dim` | `#C9821F` | Amber pressed/active states |

**Two-color brand-system.** Mallard = primary, amber = accent. We do not introduce a separate primary blue / generic green / red — that would dilute the duck identity.

### 2.3 Text

| Token | Hex | Use |
|---|---|---|
| `text.primary` | `#F1F5F4` | Body text, headings, active set values |
| `text.secondary` | `#8A9A95` | Subtitles, meta info ("Working set 3 of 4"), inactive labels |
| `text.tertiary` | `#5D6B66` | Disabled, placeholders, ghost prev values, column headers |

All text tokens have the same cool-neutral tint that matches the mallard surfaces.

### 2.4 Semantic — TBD

Conflicts to resolve in the next iteration:

- success → mallard (already primary) — OK, we reuse it
- warning → amber (already accent — conflict with the CTA pattern)
- danger → ?
- info → dusty blue (already letter A — conflict)

First we check whether semantic states are needed in working screens in v1, then we reserve/reuse.

### 2.5 Letter rotation (superset groups)

Sequence: A → B → C → D → E. After E — wrap to A. Constraint per spec §6 — up to 5 exercises in a group — so 5 colors are enough without repeats.

| Letter | Color | Hex |
|---|---|---|
| A | Dusty blue | `#5C7B95` |
| B | Ochre | `#C29548` |
| C | Plum | `#7B4257` |
| D | Sage | `#87A07B` |
| E | Rust | `#B85842` |

A palette from the wetland / bird spectrum, deliberately kept away from mallard primary and amber accent — so the chip letter doesn't get confused with the brand colors at a quick glance.

**Letter chip** (on the group and on the exercise in a group):

- Solid colored fill, square, `24×24`, `border-radius: 6`
- Text: `#0A0F0E` (dark on color), Inter weight 500, font-size 13

**Tinted letter** (for the next-exercise indicator in the collapsed row):

- Background: `rgba(letter, 0.15)`
- Border: `0.5px solid rgba(letter, 0.5)`
- Text: the letter color itself, weight 500

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
| Number large | Plex Mono | 17–18 | 500 | Active set values, timer |
| Number medium | Plex Mono | 15–16 | 400 | Set values (kg, Reps) |
| Number small | Plex Mono | 12–14 | 400 | Set numbers, prev values, meta numbers |

OpenType: for Inter we force-enable `tnum` (tabular figures) so that inline numbers in meta rows don't "jump" in width.

### 3.4 Number formatting

- **No thousands separator** for volume / tonnage and other large counters: render `4540 kg`, not `4 540 kg` or `4,540 kg`. A space-grouped `4 540` collides with the `·` meta separator and reads as two numbers (the leading digit gets mistaken for a count); a comma is anglo-centric and clashes with the UA convention (space as the grouping mark). Workout values are 3–5 digits and stay legible ungrouped (design-review X2 / X3 / F4.3).
- Decimal separator is locale-driven (no user-facing toggle, spec §7.5); the no-grouping rule above is locale-independent.

---

## 4. Layout & density

- Base grid **4px**. Padding/margins are multiples of 4 (4, 8, 12, 16, 20, 24, 32).
- Min touch target — `44×44pt` iOS / `48×48dp` Android (per spec §1: one hand, sweaty).
- Card radius scale: `14` (exercise/group cards), `12` (CTA, large buttons), `10` (timer chip), `8` (input tiles, secondary buttons), `6` (letter chip), `50%` (✓ button).
- Card outline: `0.5px` subtle alpha-white border. **No shadows.**

### 4.1 In-workout metrics

- Set row height: `52px` (active) / `44px` (done / pending), 8–10px vertical padding.
- Set row grid: `32px [Set#] | 1fr [Prev] | 78px [kg] | 60px [Reps] | 40px [✓]` with 8px gaps, 14px horizontal card padding.
- Exercise card: ~280–320px tall with 4 sets + add-set button.

### 4.2 Spacing rhythm

- Card-to-card vertical: `10px`
- Section header (e.g. day in History) margin: `16px` top, `8px` bottom
- Bottom action bar: `64px` tall, `12px` top, `18px` bottom (iPhone home indicator clearance — reconciled via safe area at implementation)
- Screen horizontal padding: `12px` (outside the exercise card) — cards add up to `26px` of effective inset for content

---

## 5. Component patterns

### 5.1 Set row states

| State | Treatment |
|---|---|
| **Done** | Opacity `0.5–0.55` on all values. ✓ in a solid mallard `#1F6E5C` circle (`28×28` main / `24×24` in a group), icon `#0A0F0E` strokeWidth 3.2 |
| **Active** | Full row width, top + bottom amber `rgba(242,165,58, 0.4)` borders, surface-2 background, amber `#F2A53A` set number weight 500. kg/Reps cells = "tile": surface-3 background, radius 8, padding 6×0, Plex Mono Medium 17. Empty active circle: `1.5px solid #F2A53A`, transparent fill |
| **Pending** | Opacity 1.0, but all values in `text.tertiary`. Empty pending circle: `1px solid #2C3833`, transparent fill |
| **Failed reps (0)** | Allowed per spec §7. Visual trigger TBD |
| **Warmup** | Per spec §8 — set actions via a tap on the number. Visual trigger TBD |

### 5.2 Group active row consistency

An active set row inside a group has the identical structural treatment as one outside a group:

- Full card width
- Top + bottom amber borders, **no side borders**, **no round corners**
- Surface-2 background

Structural consistency is more important than "isolating" the group. The letter chip + the left 3px mallard border on the group card itself already carry the group affordance — an extra border on the active row would be overload.

### 5.3 Cards

| Card | Spec |
|---|---|
| Exercise card | `surface.1` background, `0.5px` subtle border, radius 14. Header padding `12×14`, body padding `0×14` |
| Group card | `surface.1` background + `3px solid mallard` left-border. Top/right/bottom — the usual `0.5px` subtle border |
| Profile section | `surface.1` background, radius 14 |

### 5.4 Buttons

| Type | Spec |
|---|---|
| **Primary CTA** | `bg: #F2A53A`, `color: #0A0F0E`, weight 500, radius 12, padding `12×18`, chevron-right SVG after the text. Pressed: `bg: #C9821F` |
| **Secondary** | Transparent bg, `0.5px dashed #2C3833` border, `color: #8A9A95`. Compact, non-aggressive (e.g. Add set) |
| **Icon button** | Transparent bg, padding 6, `color: currentColor` from the parent text token. Tap target `32×32` |

### 5.5 Inputs

- **Tile input** (active set kg/Reps): surface-3 background, radius 8, Plex Mono Medium 17. Custom numpad on focus per spec §7
- **Edit-pencil**: a thin `12–13px` line icon in `text.tertiary` — affordance next to editable text

### 5.6 Chips & badges

- **Letter chip**: see §2.5
- **Tinted letter**: see §2.5
- **Timer chip** (header): `surface.1` background, `0.5px` subtle border, radius 9, padding `6×10`, Plex Mono Medium 16

### 5.7 Action sheets

Per spec §1 — all menus and confirmations via bottom sheets. The visual details of the container, divider, destructive button — TBD in the sheets mockup.

---

## 6. Iconography

**Style**: thin-line, weight `1.8–2px`, rounded `line-cap` and `line-join`. Lucide-style.

- Size: `16–20px` in compact places, `24px` in hero contexts, `12–13px` for inline modifier-affordance (edit-pencil)
- Color: inherit from `currentColor`
- No filled / duotone icons in v1
- Library: **Lucide** — **locked for v1** (RN-compatible, OFL). Phosphor (also OFL, RN-compatible, multiple weights) was considered but not chosen — one consistent set keeps the chrome legible at arm's length.

Icons are needed for: back, edit, ⋮ (3 dots), checkmark, plus, chevron (right/down/up), close, search, filter, share, settings, info. Muscle-group icons — TBD (text-only may be enough).

---

## 7. Motion

TBD in the next iteration. Expected principles:

- **Easing**: `ease-out` for appearance, `ease-in-out` for transitions, `ease-in` for disappearance
- **Durations**: 150ms tap feedback, 220ms component state, 300ms screen transitions
- **What animates**: state transitions (set done/active), sheet open/close, screen push/pop, rest timer bottom-bar countdown (progress bar depletion), pull-to-cursor chip
- **What does NOT animate**: data updates, list reorderings — no artificial delay
- **Haptics**: per spec — rest haptic ON by default, sound OFF

We lock the concrete tokens when we mock up the rest timer and sheets.

---

## 8. Empty states

TBD in the next iteration, closely tied to §9 (mascot character).

Zones that need an empty state:

- Today first launch (per spec §3.1.b — single CTA)
- History with no records
- Exercise database with no custom exercises
- Search no-results (with inline `Create as 'X'` per spec §11)

Style: a stylized mascot illustration + 1–2 lines of microcopy (tone playful but not Duolingo-whiny) + an optional CTA.

---

## 9. Mascot character

**Status: TBD — a separate session.**

This is a standalone artistic task, not resolved within the token system.

Vision: a bounded mascot per scope §1.3. Style to be chosen among: flat geometric / modern flat illustration / thin-line minimal. Outputs:

- App icon (1024px master, all size variants iOS/Android)
- Splash + onboarding hero
- Empty state illustrations (§8)
- About section accent

Not planned: a full character system with reactions, mascot-driven onboarding tour (Duolingo pattern), persistent in-workout presence.

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
| Token export | Low | JSON / TS / CSS variables — when implementation starts |
