A thin rounded progress track used in two modes that share one visual language: filled/active portions are always accent-at-40%-opacity, never solid accent.

```jsx
{/* Superset round progress: 3 rounds, 2 done/active */}
<ProgressBar segments={3} current={2} />

{/* RestBar countdown: continuous fill */}
<ProgressBar value={56} />
```

Track is always `--surface-2`. Never render a filled segment or fill at full opacity — that's a deviation from every instance in the source.
