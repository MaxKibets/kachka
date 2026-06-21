# Layout & density

> Base grid, touch targets, radii, in-workout metrics and spacing rhythm (§4).
> Part of the Kachka v1 visual system — full map and §-index:
> [visual map](README.md).

---

## 4. Layout & density

- Base grid **4px**. Padding/margins are multiples of 4 (4, 8, 12, 16, 20, 24, 32).
- Min touch target — `44×44pt` iOS / `48×48dp` Android (per spec §1: one hand, sweaty).
- Card radius scale: `14` (exercise/group cards), `12` (CTA, large buttons), `10` (timer chip), `8` (secondary buttons), `6` (letter chip), `50%` (✓ button).
- Card outline: `0.5px` subtle alpha-white border. **No shadows.**

### 4.1 In-workout metrics

- Set row height: `44px` (all states), 8–10px vertical padding.
- Set row grid: `32px [Set#] | 1fr [Prev] | 78px [kg] | 60px [Reps] | 40px [✓]` with 8px gaps, 14px horizontal card padding.
- Exercise card: ~280–320px tall with 4 sets + add-set button.

### 4.2 Spacing rhythm

- Card-to-card vertical: `10px`
- Section header (e.g. day in History) margin: `16px` top, `8px` bottom
- Bottom action bar: `64px` tall, `12px` top, `18px` bottom (iPhone home indicator clearance — reconciled via safe area at implementation)
- Screen horizontal padding: `12px` (outside the exercise card) — cards add up to `26px` of effective inset for content
