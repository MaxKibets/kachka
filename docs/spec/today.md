# Today · pre-workout flow

> Старт тренування: три режими Today, Repeat last, Choose from history, onboarding (§3). Частина UI/UX-специфікації Kachka v1 — повна карта і §-індекс: [spec map](README.md).
> Поведінка описана тут; візуальна система — `../visual/README.md`.

---

## 3. Pre-workout flow (Today)

### 3.1 Today — три режими

Today має три можливі стани:

**(a) Has history, no in-progress workout** — основний flow. Картка "Repeat last" + посилання `Choose from history` і `Start blank`.

**(b) No history (first launch)** — empty state. Один CTA "Start your first workout".

**(c) In-progress workout exists** — banner зверху "In-progress · Resume / Discard" + основний flow під ним.

#### 3.1.a Has history

```
┌─────────────────────────┐
│ Today              ⋯    │
├─────────────────────────┤
│                         │
│  ┌───────────────────┐  │
│  │ Last workout      │  │
│  │ Push Day · 5d ago │  │
│  │                   │  │
│  │ Bench, Pull-ups,  │  │
│  │ Push-ups, Squat   │  │
│  │                   │  │
│  │ [ Repeat last ]   │  │
│  └───────────────────┘  │
│                         │
│  Or                     │
│  > Choose from history  │
│  > Start blank workout  │
│                         │
└─────────────────────────┘
```

- **Repeat last** card показує summary останнього завершеного тренування: назва, відносна дата (`5d ago`, `2 weeks ago`), one-liner списку вправ.
- **Choose from history** — тап → list з усіма завершеними тренуваннями (chronological). Тап на тренування → клонується. Корисно для split routines (PPL, upper/lower) — юзер обирає "last upper day".
- **Start blank workout** — тап → Workout Builder з пустим списком + Quick-add chips.

#### 3.1.b No history (first launch)

```
┌─────────────────────────┐
│ Today              ⋯    │
├─────────────────────────┤
│                         │
│         💪              │
│                         │
│  Start your first       │
│  workout                │
│                         │
│  Build it from scratch  │
│  or pick from suggested │
│  exercises              │
│                         │
│  [ Start workout ]      │
│                         │
└─────────────────────────┘
```

CTA → Workout Builder з пустим списком. Quick-add chips (§4.2) видимі зверху — юзер бачить 7 знайомих вправ і починає одним тапом.

#### 3.1.c In-progress workout

Banner над основним вмістом (накладається поверх режиму (a) або (b)):

```
┌─────────────────────────┐
│ Today              ⋯    │
├─────────────────────────┤
│  ┌───────────────────┐  │
│  │ In-progress       │  │
│  │ Push Day          │  │
│  │ Resume · Discard  │  │
│  └───────────────────┘  │
│                         │
│  ... основний flow ...  │
└─────────────────────────┘
```

- Resume → Active workout modal відкривається на збереженому state
- Discard → workout прибирається з confirmation

Поки banner присутній, головні CTA режимів (a)/(b) — `Repeat last`, `Choose from history`, `Start blank` — **disabled** (приглушені, не реагують на тап). Єдиний шлях далі — Resume або Discard через banner. Constraint: один активний workout одночасно; новий не стартує доки старий не завершено або не відкинуто.

Свідомо НЕ auto-resume: ризик попасти в забуте старе тренування одразу при відкритті. Свідомо блокуємо CTA замість confirm-діалогу: banner уже несе Resume/Discard, дублювати вибір у sheet — зайвий стан.

### 3.2 Repeat last — клонування

Тап на "Repeat last" виконує:

1. Створює новий workout з ID (UUID v4) і поточною датою-часом
2. Копіює `name` з джерела
3. Копіює структуру: вправи в тому ж порядку, групи з тими ж rounds + rest, set count і таргети (reps + RPE)
4. **НЕ копіює залоговані значення** (kg, фактичні reps). Поля порожні
5. Прив'язує `prev` для кожного сета — значення з джерела клонування
6. Відкриває Workout Builder з заповненим списком — юзер може коригувати перш ніж стартувати

Юзер бачить готовий workout, може щось додати/прибрати/відредагувати, і стартує.

### 3.3 Choose from history

Окремий screen зі списком завершених тренувань (хронологічно). Те саме рендеринг що History list (§10.2). Тап на тренування → клонується (як §3.2) → відкривається Workout Builder.

`prev`-значення в клонованому workout-і беруться з обраного джерела, а не з найостаннього такого ж workout-у. Свідомо — юзер обрав цей конкретний день як точку відліку.

### 3.4 Start blank — Workout Builder

Тап → Workout Builder з пустим списком. Quick-add chips видимі зверху для швидкого старту. Можна також через "+ Add exercise" викликати full exercise picker.

Деталі builder-а — у §4.

### 3.5 Onboarding

Перший запуск:

1. App launches
2. Today screen → empty state (3.1.b)
3. Тап "Start workout" → Workout Builder з chips

Без welcome screens, без feature tour, без вибору мови (auto-detect з locale), без вибору юнітів (kg в MVP). Onboarding — функціональний, не маркетинговий.

### 3.6 Top-bar `⋯` меню Today

- Exercise database → Profile/Exercise db
- Settings → Profile (root)

