The product's only two button treatments: `secondary` (`--surface-2` fill, muted label — "Add set", "Add round", RestBar ±15s) and `accent` (solid orange fill + accent glow shadow — "Skip rest", and the bottom CTA via the dedicated `CTAButton`).

```jsx
<Button variant="secondary" icon={<Plus />}>Add set</Button>
<Button variant="accent" gap={8} onClick={skipRest}>Skip rest<SkipForward /></Button>
<Button fullWidth={false} flex={1} tone="var(--text)" icon={<Minus />}>15s</Button>
```

Deviation flagged, not silently fixed: two of three `secondary` instances in the audited source (Add set/Add round) use `--text-2` for the label; the RestBar ±15s buttons use full `--text` instead. Reproduced here via the `tone` override rather than normalized — ask if you'd like these unified to one color.
