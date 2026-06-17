# Components · patterns, icons, motion

> Component patterns (§5), iconography (§6) and motion (§7) — how the working-screen
> elements look and behave. Part of the Kachka v1 visual system — full map and
> §-index: [visual map](README.md).

---

## 5. Component patterns

### 5.0 Spec format

Each component is documented as **tokens + states**, not prose values — method
borrowed from a reference system (Pinterest DESIGN.md), adapted to Kachka.
Every property resolves to a token from `tokens.css` (`--surface-1`,
`--radius-card`, `--space-3`, `--text-section`, `--on-accent`…), never a raw
literal. Variants are separate state entries, not buried in a sentence:

```
component-name
  surface:   --surface-1
  text:      --on-surface
  radius:    --radius-card
  padding:   --space-3 --space-4
  type:      --text-section
  states:    default | pressed | disabled | (focus — secondary on mobile)
```

> **Palette synced to orange.** §5.1–5.7 below now reference the orange tokens
> by name (`accent.orange`, `--accent-a40`, `--done-circle`, `--radius-chip`…)
> instead of the old mallard/amber hexes — `tokens.css` + color.md stay the
> source of truth. Still pending: reflowing these prose specs into the §5.0
> *spec-format* block layout (open-items §10.2).

### 5.1 Set row states

| State | Treatment |
|---|---|
| **Done** | Values dim (`text.primary` ~0.6 opacity). ✓ in a **neutral** `--done-circle` (`#262626`) circle (`28×28` main / `24×24` in a group), `--done-check` (`#9A9A9A`) glyph strokeWidth 3.2. Orange never touches done (§2.4) |
| **Active** | Full row width, top + bottom `--accent-a40` borders, `accent.orange.tint` background, `accent.orange` set number weight 500. kg/Reps cells: flat (no fill), `--num-md` Plex Mono `15`, in `accent.orange` as the editable-field hint. Empty active circle: `1.5px solid accent.orange`, transparent fill |
| **Pending** | Opacity 1.0, but all values in `text.tertiary`. Empty pending circle: `1px solid border.subtle`, transparent fill |
| **Failed reps (0)** | Allowed per spec §7. Visual trigger TBD |
| **Warmup** | Per spec §8 — set actions via a tap on the number. Visual trigger TBD |

### 5.2 Group active row consistency

An active set row inside a group has the identical structural treatment as one outside a group:

- Edge-to-edge of its container (standalone: full card width; in a group: flush from the accent rail to the card's right edge)
- Top + bottom `--accent-a40` borders, **no side borders**, **no round corners**
- `accent.orange.tint` background

Structural consistency is more important than "isolating" the group. The header letter chip + the group rail running alongside the exercises already carry the group affordance — an extra border on the active row would be overload. (Rail color: `accent.orange` today; whether it should adopt the group's letter color (§2.5) is a question for the supersets mockup.)

### 5.3 Cards

| Card | Spec |
|---|---|
| Exercise card | `surface.1` background, `0.5px` subtle border, radius 14. Header padding `12×14`, body padding `0×14` |
| Group card | `surface.1` background, `0.5px` subtle border all around, radius 14. The `3px solid accent.orange` rail runs **flush along the left edge**, but only alongside the exercises — it starts under the header (full-width) and runs down to the card's **bottom edge** (no bottom padding, so the rail reaches the corner). A `0.5px` divider separates the header from the exercises: it runs **full-width from the rail to the right edge and meets the rail** at the top-left (the active-workout card is the reference). Rows stay indented for the reorder-handle hierarchy |
| Profile section | `surface.1` background, radius 14 |

### 5.4 Buttons

| Type | Spec |
|---|---|
| **Primary CTA** | `bg: accent.orange`, `color: --on-accent`, weight 500, `--radius-button`, padding `12×18`, chevron-right SVG after the text. Pressed: `bg: --accent-pressed` |
| **Secondary** | Transparent bg, `0.5px dashed border.subtle` border, `color: text.secondary`. Compact, non-aggressive (e.g. Add set) |
| **Icon button** | Transparent bg, padding 6, `color: currentColor` from the parent text token. Tap target `32×32` |

### 5.5 Inputs

- **Active set kg/Reps**: flat (no fill), `--num-md` Plex Mono `15` in `accent.orange` — the editable-field hint, not a boxed input. Custom numpad on focus per spec §7
- **Edit-pencil**: a thin `12–13px` line icon in `text.tertiary` — affordance next to editable text

### 5.6 Chips & badges

- **Letter chip**: see §2.5
- **Tinted letter**: see §2.5
- **Timer chip** (header): `surface.1` background, `0.5px` subtle border, `--radius-chip` (10), padding `6×10`, Plex Mono Medium 16

### 5.7 Sheets (bottom sheet + page sheet)

Two sizes of one family, sharing one container so they read as the same surface:

- Background `surface.1`, **top corners** `--radius-sheet` (18), top border `0.5px` subtle.
- **Grab handle**: `36×4`, radius 2, `--grab-handle`, centered — 4px below the top edge / 12px above the content.
- **Scrim** over the dimmed parent: `--scrim` (opacity 0.6). **Elevation** `--sheet-shadow`.
- **Dismiss**: swipe-down or scrim-tap on every sheet. **Content / form sheets** also carry a leading `[×]` — *close* on a selection sheet (exercise picker), *cancel* on a form (superset config), where it pairs with the primary commit and confirms per §1 if there are unsaved edits. Menus and confirmations (§1) have no `×`; they dismiss via their own actions or swipe-down.
- **Header**: the title (and optional description) is **centered**; on a content/form sheet the leading `[×]` and a trailing spacer balance it. A destructive action sits at the bottom, set off by a `0.5px` hairline (`border-divider`) + a small gap — never a heavy fill band.

This shared "grab handle + rounded top + scrim" chrome is what reads as **modal** — a surface you dismiss to return to the caller — versus a pushed screen (full-bleed, slides in from the side, `←` back).

- **Bottom sheet** — menus and confirmations (spec §1). Height hugs its content; the parent shows above. Divider / destructive-button details — TBD in the sheets mockup.
- **Page sheet** — a full-screen modal for substantial value-selection: the exercise picker in **Add mode** (§11, opened from Builder / Active workout). Near-full height; a strip of the dimmed parent peeks at the very top. Header **inside** the sheet: title + `[×]` close on the leading edge — **no** back arrow (dismiss is `×` or swipe-down). Same `surface.1` container; inputs inside step up to `surface.2` so they stay legible.

Push screens (Builder, Active workout, History detail, Exercise database / Browse) do **not** get this chrome: full-bleed, slide-in from the right, `←` back. So the same content can read two ways by role — the exercise list is a **page sheet** in Add mode (pick & return) but a **pushed** Profile screen in Browse mode. See foundations §2.5 for the full surface taxonomy.

### 5.8 Do's & Don'ts

Rules-as-locks, in the spirit of the reference system (its "no third radius
value" discipline), restated for Kachka's palette and density.

**Do**
- Reserve `accent.orange` for the one live thing — active set, primary CTA,
  current indicator. Never decorative.
- Route every value through a token (`--space-*`, `--radius-*`, `--text-*`,
  color tokens). A raw `px`/hex literal in a component is a defect.
- Pair every text-bearing fill with its `on-X` token so contrast is decided once.
- Build hierarchy from font weight + size; keep body at `text.primary`.
- Reuse the surface ladder (§2.1) for depth — flat surfaces, no shadows except
  `--sheet-shadow`.

**Don't**
- Don't reintroduce a second brand hue (the dropped success-green, §2.4) or a
  second accent. Category hues (§2.5) are a separate, non-brand system.
- Don't add a radius outside the §4 scale without adding it there first (the
  9 / 18 strays were reconciled: timer chip → 10, sheet legalized as
  `--radius-sheet` = 18 in the scale).
- Don't put a heavy `danger` fill band — danger is tint-only (§5.7).
- Don't copy-paste an `rgba(…)` literal; name it as an alpha token (§2.7).
- Don't add a token before checking the existing vocabulary covers the need.

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
