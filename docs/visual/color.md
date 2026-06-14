# Color · surfaces, brand, text, letters

> Color tokens for the dark theme (§2): surface ladder, brand colors, text,
> semantic, superset letter rotation. Part of the Kachka v1 visual system — full
> map and §-index: [visual map](README.md).

---

## 2. Color

All tokens are for the dark theme (mandatory per spec §1). The light theme is a system fallback, not a priority; it will be a separate pass.

### 2.1 Surface ladder

| Token | Hex | Use |
|---|---|---|
| `surface.canvas` | `#0A0F0E` | App background, status bar, bottom action bar, modal background |
| `surface.1` | `#131A18` | Primary cards (exercise card, group card, profile sections) |
| `surface.2` | `#1C2521` | Active row background, raised secondary surfaces |
| `surface.3` | `#28332E` | Raised controls, interactive hover, focus rings |
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

**Letter chip** (group identity — on the group header):

- Sits **inline on the header title**, reading `Superset A` — small: height `16`, min-width `16`, padding `0 4`, `border-radius: 6`
- Solid colored fill, text `#0A0F0E` (dark on color), Inter weight 500, font-size 11
- Inside the group card the children carry **no boxed per-letter** — order is conveyed by their position in the card. The `A1 / A2 / A3` ordinal is kept as the cross-reference notation where there is no group-card frame: History detail, the rest bar (`A · Rest`), and the return-to-cursor chip (`A · Set 3`)

**Tinted letter** (for the next-exercise indicator in the collapsed row):

- Background: `rgba(letter, 0.15)`
- Border: `0.5px solid rgba(letter, 0.5)`
- Text: the letter color itself, weight 500
