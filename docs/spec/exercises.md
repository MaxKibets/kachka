# Exercise picker / database

> Спільний компонент пошуку / вибору / management вправ: Add і Browse режими, custom з soft delete (§11). Частина UI/UX-специфікації Kachka v1 — повна карта і §-індекс: [spec map](../gym-tracker-spec.md).
> Поведінка описана тут; візуальна система — `../gym-tracker-visual.md`.

---

## 11. Exercise picker / Exercise database

> Спільний компонент: пошук, фільтри, перегляд і management вправ. Використовується у трьох контекстах і двох режимах.

### 11.1 Use cases і режими

| Контекст | Mode | Тригер |
|---|---|---|
| Workout Builder — `+ Add exercise` | Add | Юзер обирає вправу для додавання у Builder (§4) |
| Active workout — Top bar `⋯` → Add exercise | Add | Те саме мід-tworkout (§5.5) |
| Active workout — Per-exercise `⋯` → Insert after | Add | Insert після поточної вправи (§5.5) |
| Profile → Exercise database | Browse | Перегляд + edit/delete custom exercises |

Один screen-component, два режими:

- **Add mode** — modal overlay. Тап на рядку обирає вправу і повертає в caller з payload. Header: `← Add exercise` + `[×]` close
- **Browse mode** — pushed sub-screen у Profile stack (з Profile root → DATA → Exercise database). Custom-рядок має `⋮` → action sheet (Edit / Delete). Тап на тілі рядка (як custom, так і system) — нічого: окремого detail-екрана у v1 немає. Header: `← Exercise database` (з back-кнопкою)

### 11.2 Структура екрана

```
┌─────────────────────────┐
│ ← Add exercise      [×] │  Add mode header
│ ← Exercise database     │  Browse mode header
├─────────────────────────┤
│  🔍 Search exercises    │
├─────────────────────────┤
│  All  Chest  Back  Legs │  muscle group chips
│  Biceps Triceps Sho…    │  (horizontal scroll)
│  Core                   │
├─────────────────────────┤
│                         │
│  Bench Press            │
│  Chest, Triceps         │
│                         │
│  Bicep Curl             │
│  Biceps                 │
│                         │
│  My weird squat [Cus] ⋮ │  ⋮ only Browse + custom
│  Legs · Bodyweight      │
│                         │
│  ...                    │
│                         │
├─────────────────────────┤
│  + Create custom        │  sticky bottom (always)
└─────────────────────────┘
```

### 11.3 Search

- Case-insensitive substring match (`bench` знаходить `Bench Press`)
- Без fuzzy / Levenshtein у v1 (відкладено)
- Search працює одночасно з muscle group filter (AND-композиція)
- Empty search + selected filter → всі вправи з тим тегом
- Empty search + `All` → весь каталог
- Search reset кожен раз як відкривається picker

### 11.4 Muscle group filter

7 категорій у v1: **Chest · Back · Legs · Biceps · Triceps · Shoulders · Core**.

- Sticky `All` чіп завжди першим, selected by default
- Single-select (один активний чіп за раз)
- Системні вправи мають multi-tag (наприклад `Bench Press = Chest + Triceps`); фільтр по будь-якому тегу їх включає
- Custom вправи мають single-tag (один з 7), вибраний при створенні
- Фільтр reset кожен раз як відкривається picker

### 11.5 List item

Один рядок:

```
[Назва вправи]   [Custom?]  [⋮ if Browse+custom]
[muscle groups · attrs]
```

- **Назва** — primary text
- **Muscle groups** — list через кому (`Chest, Triceps`)
- **Атрибути** — `Bodyweight` якщо `isBodyweight: true`
- **Custom badge** — маленький чіп `Custom` справа від назви для custom-вправ (identity-маркер, в обох режимах)
- **`⋮` menu** — тільки в Browse mode для custom: відкриває action sheet з Edit / Delete (§11.8). System-рядки menu не мають

Сортування — alphabetical (case-insensitive).

### 11.6 Empty state — нема результатів

Якщо search не знаходить нічого:

```
┌─────────────────────────┐
│ ← Add exercise      [×] │
├─────────────────────────┤
│  🔍 cable woodchopper   │
├─────────────────────────┤
│                         │
│  Nothing found          │
│                         │
│  ┌───────────────────┐  │
│  │ + Create as custom│  │
│  │ "cable woodchopper"│ │
│  └───────────────────┘  │
└─────────────────────────┘
```

Inline affordance створення custom з тою самою назвою. Тап → відкриває Custom creation sheet з prefilled name (§11.7).

`+ Create custom` sticky-кнопка внизу теж лишається доступною — fallback для випадків коли юзер не ввів search.

### 11.7 Custom creation sheet

Викликається з:
- Inline `Create as custom 'X'` affordance (з prefilled name)
- Sticky `+ Create custom` button (з порожнім name)
- Profile → Exercise database → `+ Create custom` (з порожнім name)

```
┌─────────────────────────┐
│ ← New custom exercise   │
├─────────────────────────┤
│  Name                   │
│  [_______________]      │
│                         │
│  Muscle group           │
│  Chest Back [Legs] ...  │  single-select chips
│  Biceps Triceps Sho...  │
│  Core                   │
│                         │
│  Bodyweight     [⚪]    │  toggle
│                         │
│  [    Create    ]       │
└─────────────────────────┘
```

Поля:
- **Name** — required, non-empty
- **Muscle group** — required, single-select з 7 категорій
- **Bodyweight** — toggle, default off

Validation: name unique (case-insensitive). Якщо така вправа вже існує (system або non-deleted custom) — warning + Create disabled.

Create → нова custom вправа в db. Modal закривається. Якщо викликалось з Add mode — вправа автоматично селектиться і повертається в caller.

### 11.8 Custom exercise actions (Browse mode)

`⋮` на custom-рядку в Profile → Exercise database → bottom action sheet:

```
┌─────────────────────────┐
│  My weird squat         │  sheet header (context)
│  Legs · Bodyweight      │
├─────────────────────────┤
│  Edit                   │  → Custom creation sheet з prefill
│  Delete           (red) │
└─────────────────────────┘
```

- **Edit** → Custom creation sheet (§11.7) з prefilled поточними даними. Confirm → updates entity in place — той самий ID, нова назва відображається у всіх past workouts
- **Delete** → confirmation: `"Delete 'X'? It won't appear in the picker anymore. Past workouts using it stay unchanged."` → soft delete (§11.9)

Окремого detail-екрана у v1 немає: edit/delete — єдині дії, тож bottom action sheet (узгоджено з патерном §1 «усі меню — bottom sheets») дешевший за full screen. Detail-екран зарезервовано на v2, коли зʼявиться per-exercise статистика (§11.10).

Системні вправи `⋮` не мають — у Browse mode тап на system-рядку нічого не робить.

### 11.9 Soft delete

Custom exercise delete = soft delete:

- Entity отримує `deletedAt: timestamp`
- Не відображається в picker (Add mode) і в Exercise database list (Browse mode)
- В History всі past workout-и продовжують показувати назву і атрибути як було (референс по ID)
- Юзер може створити нову custom з тою ж назвою — буде окрема сутність з новим ID (validation §11.7 враховує лише non-deleted)

Hard delete (видалити з History назавжди) у v1 не передбачено. Якщо колись треба — окрема дія у Settings (`Delete all data` у v1 не робимо, див. §12).

### 11.10 Що відкладено в v2 / пізніше

- Recency-based sort (нещодавно використовувані зверху)
- Multi-select в Add mode (додати кілька вправ одним flow)
- Equipment filter (Barbell / Dumbbell / Machine / Cable / Bodyweight / Kettlebell)
- Multi-tag для custom exercises (одна custom = кілька груп)
- Fuzzy search (Levenshtein, typo tolerance)
- Notes на custom exercise
- Custom exercise detail screen + per-exercise statistics (used in N workouts, last used). У v1 edit/delete йдуть через `⋮` action sheet (§11.8); detail-екран зʼявиться разом зі статистикою
- Bulk import / export exercise db
- Hard delete custom з cascade видаленням з History

