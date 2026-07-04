# Gym Tracker · Visual System — map

> How the Kachka v1 UI looks. Brand strategy and the mascot/empty-state layer.
> Source of truth for brand identity. The spec is what happens; this described
> how it looked — see the status note below for what still applies.

**Status**: styling retired (2026-07-04). See `../CONTEXT.md` ("Visual system —
reopened", 2026-06-21) for the current state: brand/product strategy below
stays locked, but concrete styling (palette, typography, layout, component
patterns) is superseded — actual UI design now happens in Claude Design, not
as in-repo tokens or mockups. Reconciliation of this zone against the Claude
Design output is still pending.

**Version**: v0.3 · retired the styling zones (color, typography, layout,
components, open-items — §2–§7, §10) after the token-system revert (PR
#31→#35) and the move to Claude Design. Foundations (§1, strategy) and brand
(§8–9, mascot/empty states) remain.

---

## How to read

This file (`README.md`) — entry point: overview and §-index for resolving any
`§N.M` link. Remaining zone files **keep the original §-numbering**, so
cross-references from the spec, issues and wireframes that predate the
retirement stay resolvable.

Read together with:

- [`../CONTEXT.md`](../CONTEXT.md) — current status of the visual reset (active)
- [`../spec/README.md`](../spec/README.md) — UI/UX behavior: what happens (active)
- [`../tech/README.md`](../tech/README.md) — platform, storage, units, localization, positioning (active)

Wireframes (per-screen HTML mockups) — in `../wireframes/`, see
[`../wireframes/INDEX.md`](../wireframes/INDEX.md). Reference-only per the
2026-06-21 reset, not a styling constraint.

## Zones

| File | Contents | §§ |
|---|---|---|
| [foundations.md](foundations.md) | Mood, positioning, brand personality, tone of voice, brand identity, mascot scope | §1 |
| [brand.md](brand.md) | Empty states + mascot character | §8–9 |

> §2–§7 (color, typography, layout, components, iconography, motion) and §10
> (open items) were retired 2026-07-04 — the concrete styling they held was
> superseded by the 2026-06-21 reset and is being redone in Claude Design.

## §-index

| § | Section | File |
|---|---|---|
| §1 | Foundation (mood, positioning, brand, tone, mascot scope) | [foundations.md](foundations.md) |
| §8 | Empty states | [brand.md](brand.md) |
| §9 | Mascot character | [brand.md](brand.md) |
