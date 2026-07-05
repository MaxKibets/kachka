The checkbox-shaped marker at the end of every set row. Three states:

```jsx
<SetMarker status="pending" />   {/* outline ring only */}
<SetMarker status="active" />    {/* rotating conic-gradient ring — set in progress */}
<SetMarker status="complete" />  {/* filled accent circle + check */}
```

The `active` ring overhangs the 30px circle by exactly 2px on each side (34px outer diameter) — an earlier draft used a 7px overhang; treat that as incorrect if you see it anywhere. Always render inside `SetTable`'s trailing grid column, `justify-self: end`.
