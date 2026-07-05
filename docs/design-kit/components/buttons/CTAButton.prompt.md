The bottom-bar primary action on the workout screen. A flag icon flanks the label; every 3.6s the label swaps to "Hold to" to hint the hold-to-confirm gesture, then swaps back — driven by the `wt-cta-a`/`wt-cta-b` keyframes in `tokens/motion.css`.

```jsx
<CTAButton label="FINISH" holdLabel="Hold to" onClick={handleFinish} />
```

Always paired with two `StatBlock`s in the bottom bar row (see the Workout component card). This text-swap is a signature, singular interaction pattern in the product — don't reuse it elsewhere without an equally strong "hold to confirm" need.
