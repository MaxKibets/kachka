# Gym Tracker · Visual System — map

> How the Kachka v1 UI looks. Palette, typography, density, component patterns,
> and the brand/mascot layer. Source of truth for UI implementation. The spec is
> what happens; this is how it looks.

**Status**: v0 working draft — foundation locked (mood / positioning / brand, §1), refinement expected after Today / History / Builder / Profile mockups.

**Version**: v0.2 · visual split into zone files in this directory (`visual/`); this file (`README.md`) — map + §-index. Mood / positioning / brand personality / tone of voice locked (§1).

---

## How to read

The visual system is split into thematic zones in this directory (`visual/`). This
file (`README.md`) — entry point: overview and §-index for resolving any `§N.M`
link. Each zone file **keeps the original §-numbering**, so cross-references from
the spec, issues and wireframes (`§5.1`, `§5.7`, `§2.5`, `§7`, `§9`…) stay
unambiguous — find the number in the §-index below to learn which file the section
is in.

Read together with:

- [`../spec/README.md`](../spec/README.md) — UI/UX behavior: what happens (active)
- [`../tech/README.md`](../tech/README.md) — platform, storage, units, localization, positioning (active)

Wireframes (per-screen HTML mockups) — in `../wireframes/`, see
[`../wireframes/INDEX.md`](../wireframes/INDEX.md).

## Zones

| File | Contents | §§ |
|---|---|---|
| [foundations.md](foundations.md) | Mood, positioning, brand personality, tone of voice, brand identity, mascot scope | §1 |
| [color.md](color.md) | Surface ladder, brand colors, text, semantic, letter rotation | §2 |
| [typography.md](typography.md) | Families, mono usage, scale, number formatting | §3 |
| [layout.md](layout.md) | Grid, density, in-workout metrics, spacing rhythm | §4 |
| [components.md](components.md) | Set rows, cards, buttons, inputs, chips, sheets + iconography + motion | §5–7 |
| [brand.md](brand.md) | Empty states + mascot character | §8–9 |
| [open-items.md](open-items.md) | Open items / visual roadmap | §10 |

> Iconography (§6) and motion (§7) are kept with component patterns (§5) — they all
> describe how the working-screen elements look and behave. Empty states (§8) and the
> mascot character (§9) live together in `brand.md`: §8 is "closely tied to §9" and
> both are the artistic side of the brand zones (foundations §1).

## §-index

| § | Section | File |
|---|---|---|
| §1 | Foundation (mood, positioning, brand, tone, mascot scope) | [foundations.md](foundations.md) |
| §2 | Color | [color.md](color.md) |
| §3 | Typography | [typography.md](typography.md) |
| §4 | Layout & density | [layout.md](layout.md) |
| §5 | Component patterns | [components.md](components.md) |
| §6 | Iconography | [components.md](components.md) |
| §7 | Motion | [components.md](components.md) |
| §8 | Empty states | [brand.md](brand.md) |
| §9 | Mascot character | [brand.md](brand.md) |
| §10 | Open items | [open-items.md](open-items.md) |
