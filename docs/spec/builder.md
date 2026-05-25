# Workout Builder

> Pre-workout збірка списку вправ і груп перед стартом (§4). Частина UI/UX-специфікації Kachka v1 — повна карта і §-індекс: [spec map](../gym-tracker-spec.md).
> Поведінка описана тут; візуальна система — `../gym-tracker-visual.md`.

---

## 4. Workout Builder

> Pre-workout екран де юзер збирає список вправ перед стартом тренування. Точки входу: Start blank (§3.4), Repeat last (§3.2), Choose from history (§3.3).

### 4.1 Структура екрана

```
┌─────────────────────────┐
│ ← Build workout         │  modal header
├─────────────────────────┤
│  Workout name           │  editable text
│  Push Day               │
├─────────────────────────┤
│                         │
│  Quick add:             │
│  [Squat][Bench][Dead]   │  chips (popular exercises)
│  [Row][OHP][Pull-up]    │
│  [Curl]                 │
│                         │
│  ─ Exercises ──────     │
│                         │
│  Bench press        ⋮   │
│   4 × 8 · RPE 7-8       │
│                         │
│  ┌── A · Superset ──┐   │  group block
│  │ 3 rounds · 2:00  │   │
│  │ A1 Pull-ups   ⋮  │   │
│  │  [6-10]          │   │
│  │ A2 Push-ups   ⋮  │   │
│  │  [10-15]         │   │
│  └─────────────── ⋮ ┘   │  group menu
│                         │
│  + Add exercise         │
│                         │
├─────────────────────────┤
│  [   Start workout   ]  │  sticky bottom
└─────────────────────────┘
```

- **Header**: back button, screen title `Build workout`. Свайп вниз закриває (з confirmation якщо щось змінено).
- **Workout name**: editable inline. При Repeat last / Choose from history заповнено з джерела. При Start blank — auto `Workout · 2026-05-02`, юзер може переписати.
- **Quick add chips**: 7 popular exercises (§4.2). Тап додає вправу з default-сетами.
- **Exercises list**: вправи + групи в порядку виконання. Кожна вправа — секція з one-liner summary і `⋮`-меню.
- **+ Add exercise**: відкриває exercise picker (повний список + пошук + custom).
- **Start workout** sticky button: запускає Active Workout modal. Disabled поки список порожній.

### 4.2 Quick-add chips

Зашитий у v1 список з 7 вправ (powerlifting + базовий комплекс):

| EN | UK |
|---|---|
| Squat | Присідання |
| Bench Press | Жим лежачи |
| Deadlift | Станова тяга |
| Barbell Row | Тяга штанги в нахилі |
| Overhead Press | Жим стоячи |
| Pull-up | Підтягування |
| Bicep Curl | Згинання на біцепс |

- Чіпи видимі завжди (постійний UX, не онбординг)
- Локалізовані з системного exercise database через `exerciseId`
- Тап → додає вправу з default-сетами в кінець списку
- Без локального ranking-у в v1 (можливе майбутнє покращення — зараз чіпи статичні)

### 4.3 Default sets для нової вправи

Коли вправа додається через Quick-add або через picker — автоматично створюється 3 сети з `reps: 8`, без RPE, без warmup. Юзер може коригувати в `⋮`-меню вправи.

Bodyweight вправи (з системної db `isBodyweight: true`) додаються без kg-поля.

### 4.4 Меню вправи `⋮` (у Builder)

| Action | Result |
|---|---|
| Edit sets | Sheet з list-ом сетів. Кожен сет — `reps` (single або range) + опц. `rpe` + warmup toggle + delete. + Add set |
| Add to superset | Multi-select picker з інших standalone-вправ → config sheet (rounds, rest) → створює групу. §6 |
| Move up / Move down | Перемістити в списку |
| Remove exercise | Видалити вправу з confirmation |
| Add note | Per-exercise note — author hint що показується в Active workout |

### 4.5 Меню групи `⋮` (у Builder)

| Action | Result |
|---|---|
| Edit rounds / rest | Sheet з rounds (2-10) і restBetweenRounds |
| Add exercise to group | Picker → додає до групи (до ліміту 5) |
| Remove exercise from group | З confirmation. Якщо лишається 1 — auto-ungroup |
| Reorder inside | Drag handles в межах групи |
| Move group up / down | Як одне ціле |
| Ungroup | Розпадається на флет-вправи в тому ж порядку |

### 4.6 Reorder зовнішнього списку

Drag handle на **лівому** краю кожної секції (вправи або групи). Drag перемикає порядок. Групи рухаються цілком.

Handle зліва (а не на trailing-краю за iOS-конвенцією) свідомо: `⋮`-меню вже на правому краю, тож рознесення двох контролів по різних краях прибирає скупчення і unambiguous tap-таргети.

### 4.7 Empty list

Якщо список порожній:

```
  No exercises yet
  Tap a chip above or "+ Add exercise"
```

Start workout button disabled.

### 4.8 Discard / save для пізніше

- Закрити builder без старту → confirmation "Discard workout setup?". Підтвердити — все втрачається.
- "Save as draft" свідомо не робимо в v1: додає state-management без чіткої цінності. Юзер з готовим планом стартує одразу.

