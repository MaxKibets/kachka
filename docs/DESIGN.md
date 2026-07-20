# Design System

The visual system (colors, type, spacing, motion, components) lives outside this repo, in the
claude.ai/design project **"Kachka Design System"** (projectId
`85018260-893e-4648-b4f0-72cb209ac0c7`). Repo docs never duplicate its content — this file
is the pointer and the contract, not a copy.

## Division of authority

- **Behavior** — `docs/spec/` wins: flows, screen structure, rules.
- **Visuals** — the design project wins: tokens, component look and feel, motion.

## Naming contract

Spec files reference design components by their canonical name (e.g. `ExerciseCard`,
`SetTable`). Future React Native code implements components 1:1 under the same name —
`ExerciseCard.tsx` implements `ExerciseCard`. The live component inventory is the design
project itself; browse it on claude.ai/design or via DesignSync `list_files`. No inventory
copy is maintained in this repo.

## What crosses into the repo at implementation time

One-way, design → code:

- `tokens/*.css` translate into the RN theme, keeping names 1:1 (`--color-accent` →
  `colors.accent`).
- `assets/icons/*.svg` are consumed directly via `react-native-svg`.
- Each component's `.d.ts` + `.prompt.md` are the props/behavior contract for its RN
  implementation.

The design project's `.jsx` is web-preview code only and is never copied into the app.

## Drift rules

- A design change that affects behavior → reconcile the affected `docs/spec/` zone file(s).
- A spec need with no matching design component → add a row to `docs/OPEN_QUESTIONS.md`, or
  design the component in the design project first.

## Sync mechanism

Authoring stays in claude.ai/design. Claude Code sessions read the project via the DesignSync
tool (`list_projects` / `list_files` / `get_file`) — read-only from the repo's side.
