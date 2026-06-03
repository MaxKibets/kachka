# Foundations · principles and navigation

> Base constraints of the in-workout UI (§1) and navigation / IA (§2). Part of the Kachka v1 UI/UX spec — full map and §-index: [spec map](README.md).
> Behavior is described here; the visual system lives in `../visual/README.md`.

---

## 1. Base principles

- React Native, cross-platform (iOS + Android)
- Target context — a person in the gym: one hand, sweating, 5–15 second interactions between sets, 15–30 "glance → log → defer" cycles per workout
- Own visual language, we don't clone Hevy / Strong / Boostcamp
- MVP philosophy: supersets — must-have, AMRAP / drop sets / cluster — in v2
- v1 goal: the fastest way to log a workout. Structure is planned ad-hoc at the start or by cloning from history

From this follow the base constraints for the in-workout UI:

- Large touch targets (finger, not cursor)
- Minimum taps per set
- Readability at arm's length
- Obvious "where am I now" at a glance
- Dark theme mandatory
- All action menus — bottom action sheets, the same pattern on iOS and Android. Applies to the top-bar `⋯` menu, per-row `⋮` menu (exercise, group), set actions (§8), numpad (§7.2), superset config (§6.2). Reason: thumb-reach with one hand; we avoid top-anchored dropdowns. Native action sheet (iOS) and Material Bottom Sheet (Android) — equivalent impl variants, visually unified
- All confirmations — also bottom sheet (the same component): title + opt. description + two buttons `Cancel` (top) and destructive (bottom). Swipe down = Cancel. Cancel on top — protection against accidental tap on destructive: fast dismiss without precise aim, the main action farther from the thumb. Aligned with Apple HIG (action sheet for destructive confirms) and Material 3 (modal bottom sheet). Applies to Discard workout (§3.1.c, §9.2), Discard setup (§4.8), Remove exercise / Remove set (§4.4, §4.5, §5.5), Save partial (§9.1), Delete custom (§11.8) and any future confirm flows


---

## 2. Navigation / IA

### 2.1 Top-level frame

3 bottom tabs:

| Tab | Content |
|-----|-----|
| **Today** | Start workout: Repeat last / Choose from history / Build from scratch. Banner when there is an in-progress workout |
| **History** | Past workouts chronologically, detail |
| **Profile** | Preferences, exercise database, backup/restore, about |

Exercise database lives inside Profile (not as a separate 4th tab). Profile — generic hub for everything that is not workout / history.

### 2.2 Active workout — modal full takeover

In-workout screen — modal on top of the tab navigator. Tab bar hides. You can exit only through a deliberate action: `Finish` or `Discard`.

Deliberate refusal of mini-bar / minimize mode:

- Maximum focus, no distractions
- Simpler architecture, fewer edge cases

App backgrounded → state preserved → on return it opens in the same place. Starting a new workout while one is active is impossible: on Today an in-progress banner is shown, the main CTAs disabled, until the user does Resume or Discard (see §3.1.c).

### 2.3 Workout Builder — modal pre-workout

Pre-workout screen where the user assembles the list of exercises and groups — also a modal overlay above the Tab Navigator. Details — §4.

### 2.4 Navigation tree

```mermaid
flowchart TB
    App[App]
    App --> Onb[Onboarding<br/>one-shot first launch]
    App --> Main[Main]
    Main --> TabNav[Tab Navigator]
    Main --> Builder[Workout Builder<br/>modal overlay]
    Main --> Modal[Active Workout<br/>modal overlay]

    TabNav --> Today[Today]
    TabNav --> History[History Stack]
    TabNav --> Profile[Profile Stack]

    History --> H1[History list]
    History --> H2[Workout detail]
    Today --> CFH[Choose from history list]

    Profile --> Pr1[Exercise db]
    Profile --> Pr2[Backup / Restore]
    Profile --> Pr3[About]

    Builder --> B1[Build screen — exercises + supersets]
    Builder --> B2[Exercise picker]
    Builder --> B3[Superset config sheet — partners + rounds + rest]

    Modal --> M1[Workout screen]
    Modal --> M2[Sheets: numpad / set actions / exercise actions]
    Modal --> M3[Superset config sheet — partners + rounds + rest]
    Modal --> M4[Completion screen]
```

Today — single screen without a stack. Workout Builder and Active Workout — modals. The rest of the tabs have their own stacks.
