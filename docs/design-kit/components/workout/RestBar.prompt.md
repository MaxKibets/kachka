The full-width bottom sheet shown while resting between sets: "RESTING" label + which exercise, a big countdown clock, a countdown progress bar, and a ±15s / Skip rest control row.

```jsx
<RestBar
  exerciseLabel="Superset A · Dumbbell row"
  time="01:24"
  value={56}
  onAdjust={(delta) => adjustRest(delta)}
  onSkip={() => skipRest()}
/>
```

Its top corners use `--radius-sheet` (28px) — one step larger than the 24px card radius, reserved for this sheet only. Overlays the bottom of the workout screen; it is not part of the scrolling exercise list.
