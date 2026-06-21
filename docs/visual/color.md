# Color · surfaces, accent, text, categories

> Color tokens for the dark theme (§2): surface ladder, the orange accent,
> text, semantic + set states, category colors, light fallback. Part of the
> Kachka v1 visual system — full map and §-index: [visual map](README.md).

> **Status: working draft — orange-on-black direction, under review. Not final.**
> The owner is still evaluating the overall palette; values here may change. The
> structure (single accent, neutral done, shared category gamut) is the current
> direction, not a locked decision.

---

## 2. Color

All tokens are for the dark theme (mandatory per spec §1) — the primary theme. A **single vivid orange** accent carries everything active; surfaces are neutral near-black so the orange and the data do the talking. The light theme is a system fallback (§2.6), not a priority.

### 2.1 Surface ladder

| Token | Hex | Use |
|---|---|---|
| `surface.canvas` | `#0A0A0A` | App background, status bar, bottom action bar, modal background |
| `surface.1` | `#141414` | Primary cards (exercise card, group card, profile sections) |
| `surface.2` | `#1F1F1F` | Raised surfaces, chips, selected-chip background |
| `surface.3` | `#2A2A2A` | Raised controls, hover, focus base |
| `border.subtle` | `rgba(255,255,255, 0.06–0.08)` | Card outlines |
| `border.divider` | `rgba(255,255,255, 0.05)` | Set row separators, list dividers |

Neutral near-black — no brand tint on the canvas. The brand shows up in the accent, not the surfaces.

### 2.2 Accent

A **single-accent** system: one orange does brand + action.

| Token | Hex | Use |
|---|---|---|
| `accent.orange` | `#FF7A40` | active set, primary CTA, selected, "current" indicator, exercise icons, focus, brand presence |
| `accent.orange.dim` | `#3A2113` | low-contrast orange fills (exercise icon-circle background, selected fills) |
| `accent.orange.tint` | `#211408` | active set-row background |

One orange carries everything that is "live". We do **not** add a second brand hue — `success`-green is dropped (see §2.4); category colors (§2.5) are a separate, non-brand system.

### 2.3 Text

| Token | Hex | Use |
|---|---|---|
| `text.primary` | `#F5F5F5` | Body text, headings, set values |
| `text.secondary` | `#8E8E93` | Subtitles, meta info, descriptions, inactive labels |
| `text.tertiary` | `#5A5A5E` | Disabled, placeholders, ghost prev values, column headers |

Neutral gray — matches the neutral surfaces.

### 2.4 Semantic + set states

| Token | Hex | Use |
|---|---|---|
| `danger` | `#F5404C` | Destructive text / icons (Discard workout, Delete custom). Text/icon tint, **never a heavy fill band** (§5.7) |

**Set states** (per visual §5.1):

- **done** — **neutral**: a `#262626` circle with a `#9A9A9A` ✓; values dim (`text.primary` at ~0.6 opacity). Orange does **not** touch done — completed sets recede.
- **active** — **orange**: `accent.orange.tint` row background, top/bottom `accent.orange` borders, orange set number + values, orange outline circle.
- **pending** — `text.tertiary` values, 1px subtle empty circle.

**No success-green.** done is deliberately neutral so that orange means exactly one thing — "now". This is the cleanest use of the single accent. `warning` / `info` are not introduced in v1.

### 2.5 Category colors

A **shared muted gamut** feeds two category systems (one source, processed by role). The systems live on different screens (letters in In-workout/Builder, muscle tags in the exercise database), so their colors may overlap without conflict.

| Hue | Hex |
|---|---|
| slate | `#5C7B95` |
| teal | `#4FA095` |
| green | `#5FA86A` |
| olive | `#A8A052` |
| gold | `#C9A14A` |
| rust | `#BC6A4A` |
| rose | `#C66E80` |
| plum | `#8E5A78` |
| purple | `#9374C8` |

**Superset letters A–E** — solid chips (group-header identity), reading `Superset A`. Sequence A→B→C→D→E, wraps after E (spec §6, ≤5 per group):

| Letter | Hue | Hex |
|---|---|---|
| A | slate | `#5C7B95` |
| B | gold | `#C9A14A` |
| C | plum | `#8E5A78` |
| D | green | `#5FA86A` |
| E | rust | `#BC6A4A` |

Letter chip: solid fill, height `16`, min-width `16`, padding `0 4`, radius `6`, Inter 500 / 11. Text `#0A0A0A` (dark on color); the one dark hue (C, plum) takes light `text.primary`. The `A1 / A2` ordinal is the cross-reference notation where there is no group-card frame (History detail, rest bar `A · Rest`, return-to-cursor chip).

**Muscle-group tags (7)** — tinted pills on exercise cards: background `rgba(hue, 0.16)`, text the hue itself.

| Group | Hue |
|---|---|
| Chest | rose |
| Back | green |
| Legs | teal |
| Biceps | purple |
| Triceps | slate |
| Shoulders | olive |
| Core | gold |

### 2.6 Light theme (fallback)

A system fallback (spec §1: dark mandatory, light low-priority). The role logic is identical; tokens get light variants:

- Surfaces invert: canvas `#F7F7F8`, cards `#FFFFFF` (with a `rgba(0,0,0,0.07)` border instead of glow).
- Text inverts: `#18181B` / `#71717A` / `#A1A1AA`.
- **Orange splits**: fills (CTA bg, active border, circles) stay `#FF7A40`; orange-as-text (set numbers, values, warmup `W`, timer) takes a **deeper `#D9560F`** for contrast on white. CTA on light = orange fill + white text. Active-row tint → `#FFF1EB`.
- `danger`, category hues get deeper variants for contrast on white.

Full light tuning (contrast pass on every pairing) is deferred to implementation.
