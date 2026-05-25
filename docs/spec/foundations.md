# Foundations · принципи та навігація

> Базові обмеження in-workout UI (§1) і навігація / IA (§2). Частина UI/UX-специфікації Kachka v1 — повна карта і §-індекс: [spec map](../gym-tracker-spec.md).
> Поведінка описана тут; візуальна система — `../gym-tracker-visual.md`.

---

## 1. Базові принципи

- React Native, кросплатформенний (iOS + Android)
- Цільовий контекст — людина в спортзалі: одна рука, потіє, 5–15 секундні взаємодії між сетами, 15–30 циклів "глянув → залогував → відклав" за тренування
- Власна візуальна мова, не клонуємо Hevy / Strong / Boostcamp
- MVP-філософія: суперсети — must-have, AMRAP / drop sets / cluster — у v2
- v1 ціль: найшвидший спосіб залогувати тренування. Структура планується ad-hoc на старті або клонуванням з історії

З цього випливають базові обмеження для in-workout UI:

- Великі тач-таргети (палець, не курсор)
- Мінімум тапів на сет
- Читабельність на відстані витягнутої руки
- Очевидний "де я зараз" з одного погляду
- Темна тема обов'язкова
- Усі action menus — bottom action sheets, той самий pattern на iOS і Android. Стосується top-bar `⋯`-меню, per-row `⋮`-меню (вправа, група), set actions (§8), numpad (§7.2), superset config (§6.2). Причина: thumb-reach однією рукою; уникаємо top-anchored dropdown-ів. Native action sheet (iOS) і Material Bottom Sheet (Android) — еквівалентні impl-варіанти, візуально уніфікуються
- Усі confirmations — теж bottom sheet (той самий компонент): title + опц. description + дві кнопки `Cancel` (вгорі) і destructive (внизу). Свайп вниз = Cancel. Cancel вгорі — захист від випадкового тапу destructive: швидкий dismiss без точного прицілу, основна дія далі від великого пальця. Узгоджено з Apple HIG (action sheet для destructive confirms) і Material 3 (modal bottom sheet). Стосується Discard workout (§3.1.c, §9.2), Discard setup (§4.8), Remove exercise / Remove set (§4.4, §4.5, §5.5), Save partial (§9.1), Delete custom (§11.8) і будь-яких майбутніх confirm-flows


---

## 2. Навігація / IA

### 2.1 Top-level каркас

3 bottom tabs:

| Tab | Зміст |
|-----|-------|
| **Today** | Старт тренування: Repeat last / Choose from history / Start blank. Banner при in-progress workout-і |
| **History** | Минулі тренування хронологічно, деталь |
| **Profile** | Preferences, exercise database, backup/restore, about |

Exercise database живе всередині Profile (а не як окремий 4-й таб). Profile — generic hub для усього що не workout / history.

### 2.2 Active workout — modal full takeover

In-workout екран — modal поверх tab navigator. Tab bar ховається. Вийти можна тільки через свідому дію: `Finish` або `Discard`.

Свідома відмова від mini-bar / minimize-режиму:

- Максимальний фокус, нема відволікань
- Простіша архітектура, менше edge cases

App backgrounded → state preserved → при поверненні відкривається на тому ж місці. Старт нового workout-у при активному неможливий: на Today висить in-progress banner, головні CTA disabled, поки юзер не зробить Resume або Discard (див. §3.1.c).

### 2.3 Workout Builder — modal pre-workout

Pre-workout екран де юзер збирає список вправ і груп — теж modal overlay над Tab Navigator. Деталі — §4.

### 2.4 Дерево навігації

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

Today — single screen без stack. Workout Builder і Active Workout — modals. Решта табів мають свої стеки.

