Circular icon-only ghost button — the product's only icon-button shape. Used for header navigation (back, edit) and per-card "more" actions.

```jsx
<IconButton size="lg" ariaLabel="Back" icon={<ChevronLeft />} onClick={goBack} />
<IconButton size="sm" ariaLabel="More" icon={<MoreHorizontal />} onClick={openMenu} />
```

Variants: `size="lg"` (44px, `--surface` bg, full-contrast `--text` icon color) for primary navigation — meets the 44px touch-target minimum. `size="sm"` (30px, `--surface-2` bg, muted `--text-2` icon color) for secondary/kebab actions — intentionally below the touch minimum, confirmed acceptable for this secondary role. Both share a 1px `--line` border and a fully round shape; there is no third icon-button style in the product.
