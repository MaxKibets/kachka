# Components · patterns, icons, motion

> Component patterns (§5), iconography (§6) and motion (§7) — how the working-screen
> elements look and behave. Part of the Kachka v1 visual system — full map and
> §-index: [visual map](README.md).

---

## 5. Component patterns

### 5.1 Set row states

| State | Treatment |
|---|---|
| **Done** | Opacity `0.5–0.55` on all values. ✓ in a solid mallard `#1F6E5C` circle (`28×28` main / `24×24` in a group), icon `#0A0F0E` strokeWidth 3.2 |
| **Active** | Full row width, top + bottom amber `rgba(242,165,58, 0.4)` borders, surface-2 background, amber `#F2A53A` set number weight 500. kg/Reps cells: flat (no fill), table-size Plex Mono `15`, in amber `#F2A53A` as the editable-field hint. Empty active circle: `1.5px solid #F2A53A`, transparent fill |
| **Pending** | Opacity 1.0, but all values in `text.tertiary`. Empty pending circle: `1px solid #2C3833`, transparent fill |
| **Failed reps (0)** | Allowed per spec §7. Visual trigger TBD |
| **Warmup** | Per spec §8 — set actions via a tap on the number. Visual trigger TBD |

### 5.2 Group active row consistency

An active set row inside a group has the identical structural treatment as one outside a group:

- Edge-to-edge of its container (standalone: full card width; in a group: flush from the mallard rail to the card's right edge)
- Top + bottom amber borders, **no side borders**, **no round corners**
- Surface-2 background

Structural consistency is more important than "isolating" the group. The header letter chip + the mallard rail running alongside the exercises already carry the group affordance — an extra border on the active row would be overload.

### 5.3 Cards

| Card | Spec |
|---|---|
| Exercise card | `surface.1` background, `0.5px` subtle border, radius 14. Header padding `12×14`, body padding `0×14` |
| Group card | `surface.1` background, `0.5px` subtle border all around, radius 14. The `3px solid mallard` rail runs **flush along the left edge**, but only alongside the exercises — it starts under the header (full-width) and runs down to the card's **bottom edge** (no bottom padding, so the rail reaches the corner). A `0.5px` divider separates the header from the exercises: it runs **full-width from the rail to the right edge and meets the rail** at the top-left (the active-workout card is the reference). Rows stay indented for the reorder-handle hierarchy |
| Profile section | `surface.1` background, radius 14 |

### 5.4 Buttons

| Type | Spec |
|---|---|
| **Primary CTA** | `bg: #F2A53A`, `color: #0A0F0E`, weight 500, radius 12, padding `12×18`, chevron-right SVG after the text. Pressed: `bg: #C9821F` |
| **Secondary** | Transparent bg, `0.5px dashed #2C3833` border, `color: #8A9A95`. Compact, non-aggressive (e.g. Add set) |
| **Icon button** | Transparent bg, padding 6, `color: currentColor` from the parent text token. Tap target `32×32` |

### 5.5 Inputs

- **Active set kg/Reps**: flat (no fill), table-size Plex Mono `15` in amber `#F2A53A` — the editable-field hint, not a boxed input. Custom numpad on focus per spec §7
- **Edit-pencil**: a thin `12–13px` line icon in `text.tertiary` — affordance next to editable text

### 5.6 Chips & badges

- **Letter chip**: see §2.5
- **Tinted letter**: see §2.5
- **Timer chip** (header): `surface.1` background, `0.5px` subtle border, radius 9, padding `6×10`, Plex Mono Medium 16

### 5.7 Sheets (bottom sheet + page sheet)

Two sizes of one family, sharing one container so they read as the same surface:

- Background `surface.1`, **top corners** radius 18, top border `0.5px` subtle.
- **Grab handle**: `36×4`, radius 2, `rgba(255,255,255,0.16)`, centered — 4px below the top edge / 12px above the content.
- **Scrim** over the dimmed parent (opacity 0.4): `rgba(0,0,0,0.6)`. **Elevation** shadow `0 -8px 24px rgba(0,0,0,0.45)`.
- **Dismiss**: swipe-down or scrim-tap on every sheet. **Content / form sheets** also carry a leading `[×]` — *close* on a selection sheet (exercise picker), *cancel* on a form (superset config), where it pairs with the primary commit and confirms per §1 if there are unsaved edits. Menus and confirmations (§1) have no `×`; they dismiss via their own actions or swipe-down.
- **Header**: the title (and optional description) is **centered**; on a content/form sheet the leading `[×]` and a trailing spacer balance it. A destructive action sits at the bottom, set off by a `0.5px` hairline (`border-divider`) + a small gap — never a heavy fill band.

This shared "grab handle + rounded top + scrim" chrome is what reads as **modal** — a surface you dismiss to return to the caller — versus a pushed screen (full-bleed, slides in from the side, `←` back).

- **Bottom sheet** — menus and confirmations (spec §1). Height hugs its content; the parent shows above. Divider / destructive-button details — TBD in the sheets mockup.
- **Page sheet** — a full-screen modal for substantial value-selection: the exercise picker in **Add mode** (§11, opened from Builder / Active workout). Near-full height; a strip of the dimmed parent peeks at the very top. Header **inside** the sheet: title + `[×]` close on the leading edge — **no** back arrow (dismiss is `×` or swipe-down). Same `surface.1` container; inputs inside step up to `surface.2` so they stay legible.

Push screens (Builder, Active workout, History detail, Exercise database / Browse) do **not** get this chrome: full-bleed, slide-in from the right, `←` back. So the same content can read two ways by role — the exercise list is a **page sheet** in Add mode (pick & return) but a **pushed** Profile screen in Browse mode. See foundations §2.5 for the full surface taxonomy.

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
