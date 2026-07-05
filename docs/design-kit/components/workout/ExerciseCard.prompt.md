The main workout-screen composite: icon chip + title + optional meta + kebab, an optional progress bar, a body (your `SetTable`s), and an optional footer button. Covers both card shapes seen in the source via one `bare` flag.

Simple exercise:
```jsx
<ExerciseCard icon={<Dumbbell/>} title="Bench press" addLabel="Add set" onAdd={addSet}>
  <SetTable sets={sets} />
</ExerciseCard>
```

Superset (outer card with accent icon + round progress, containing two `bare` nested exercise blocks joined by a `RestDivider`):
```jsx
<ExerciseCard
  icon={<Repeat/>} accentIcon
  title="Superset A"
  meta={<>Round 2 <span style={{color:'var(--text-3)'}}>of 3</span></>}
  progress={<ProgressBar segments={3} current={2} />}
  addLabel="Add round" onAdd={addRound}
>
  <ExerciseCard bare icon={<Dumbbell/>} title="Dumbbell row" kebab={false}>
    <SetTable sets={rowSets} />
  </ExerciseCard>
  <RestDivider label="90s rest" />
  <ExerciseCard bare icon={<Dumbbell/>} title="Face pull" kebab={false}>
    <SetTable sets={pullSets} />
  </ExerciseCard>
</ExerciseCard>
```

Nested/`bare` blocks in the source never show their own kebab or add-button — only the outer superset card has "Add round"; pass `kebab={false}` and omit `addLabel` on the nested ones, as shown.
