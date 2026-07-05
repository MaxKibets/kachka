---
name: kachka-design
description: Use this skill to generate well-branded interfaces and assets for Kachka, a workout-tracking mobile app — for production or throwaway prototypes/mocks. Contains design tokens, components (buttons, progress, workout set-tracking, stats), icons, and a mobile UI kit.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without other guidance, ask what they want to build or design, ask clarifying questions, and act as an expert designer who outputs HTML artifacts _or_ production code depending on the need.

Key things to know before designing:
- Dark is the default/canonical theme; light is a full alternate, not an afterthought.
- One accent (`#F26522`), used sparingly — never a large fill. One semantic exception color (`#E0A23E`) exists only for warmup-set labels.
- Manrope, weight 700 everywhere — hierarchy comes from size and color only, never weight.
- Borders (1px hairline) define cards, not shadows. Shadow is reserved for bottom-bar elevation and accent-CTA glow only.
- Only one product surface (a workout session screen + rest-timer overlay) has real source material. Don't invent additional screens (home, login, history, etc.) without new source — ask the user first.
