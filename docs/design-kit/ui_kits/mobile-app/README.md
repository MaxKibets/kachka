# Kachka — Mobile App UI kit

Interactive recreation of the one product surface evidenced in the source
material: the active **Workout Session** screen, composed entirely from
the `components/` primitives (`ExerciseCard`, `SetTable`, `SetMarker`,
`RestDivider`, `RestBar`, `StatBlock`, `CTAButton`, `LiveIndicator`,
`IconButton`, `ProgressBar`).

Open `index.html`. Controls above the phone frame toggle the same two
states the original mockup exposed as tweaks (theme, Pre column).
Tap any undone set in "Tricep pushdown" to start a rest countdown — the
`RestBar` slides in over the bottom bar; skip it or adjust ±15s to
dismiss it, exactly as the audited `RestBar.dc.html` mockup behaved.

Only one screen exists because only one screen was in the source. Do not
add a home/history/login/etc. screen without new source material —
ask first.

Device chrome is the generic `ios-frame.jsx` starter (not part of the
Kachka product itself — the product has no iOS-specific chrome in its
own source), used here only to present the screen in context.
