Fixed-height stat pill for the bottom bar, always paired with `CTAButton` in a row.

```jsx
<StatBlock value="5" suffix="/ 14" label="Sets done" />
<StatBlock value="5120" unit="kg" label="Total" />
```

Use `suffix` for a same-size trailing value (a fraction like "/ 14"); use `unit` for a smaller trailing label (like "kg"). Don't use both at once — the source never does.
