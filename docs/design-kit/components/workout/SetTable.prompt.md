The per-exercise set log: header row + one row per set, always ending in a `SetMarker`. Lives inside `ExerciseCard`.

```jsx
<SetTable
  showPreColumn
  sets={[
    { set: 'W', previous: '70 × 8', pre: 8, kg: 70, reps: 8, status: 'complete', warmup: true },
    { set: 2, previous: '72.5 × 8', pre: 8, kg: 72.5, reps: 8, status: 'complete' },
    { set: 3, previous: '20 × 12', pre: 8, kg: null, reps: null, status: 'active' }
  ]}
/>
```

Grid is `28px minmax(0,1fr) 24px minmax(0,1fr) minmax(0,1fr) 30px` (Set · Previous · Pre · Kg · Reps · marker) — always `minmax(0,1fr)` for flexible columns, never bare `1fr`, or long content in one row drifts that row's columns out of alignment with the rest. `showPreColumn={false}` drops the 24px Pre track entirely (5-column grid), it does not just hide the cell. Unlogged kg/reps render as "—" at 18px (up from the normal 14px) in `--text-3`.
