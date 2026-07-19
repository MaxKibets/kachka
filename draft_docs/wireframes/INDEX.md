# Kachka · Wireframes index

> Per-screen HTML мокапи v1 + flow-діаграма + спільні токени. Кожен файл self-contained — відкривай у браузері без серверу.

**Status**: v0 drafts complete · Batches 1–5 — initial drafts done. Очікують ревью + точкові правки.

Читай разом з `../CONTEXT.md`, `../spec/README.md` (поведінка), `../visual/README.md` (візуальна система).

---

## Структура

```
wireframes/
├── INDEX.md                  ← цей файл
├── flow.md                   ← Mermaid state-diagram, посилання на HTML
├── prototype.html            ← entry point для тестування (живий клікабельний прототип)
├── shared/
│   ├── tokens.css            ← Mallard токени + wireframe page chrome (всі HTML імпортують)
│   └── proto-mode.js         ← runtime який активує proto-режим за ?proto=1
└── *.html                    ← один файл = один екран
```

## Два режими використання

**Default mode** (відкрив будь-який `*.html` напряму): wireframe з side-panel анотаціями, для дизайнерського ревʼю.

**Prototype mode** (відкрий `prototype.html` → обери стартову точку): тестер бачить тільки phone frame, всі основні CTA/links/tabs клікабельні і ведуть до правильних екранів. Реалізовано через `?proto=1` URL-параметр який активує `proto-mode.js`.

Що клікабельно (через `data-href` атрибут): tab bar, primary CTA, list rows, action sheet items, back chevrons, sheet backdrop. Що неактивно: toggle switches, search inputs, form fields, muscle group filter chips — це поза скоупом v0 prototype, тестер просто бачить статичний state.

Кожен HTML:
- 375px phone frame з dark Mallard
- Side panel: Opens from · Opens to · Interactions · Notes · Edge cases · footer-посилання
- Імпортує `shared/tokens.css`
- Інтерактив декоративний (це wireframe, не прототип)

---

## Batch plan і checklist

### Batch 1 — Today flow ✅

- [x] [today-has-history.html](today-has-history.html) — основний стан з last-workout card
- [x] [today-first.html](today-first.html) — empty state, single CTA
- [x] [today-in-progress.html](today-in-progress.html) — banner + основний flow під ним

### Batch 2 — Workout Builder · Exercise picker · Superset config ✅

- [x] [builder.html](builder.html) — pre-workout list, Quick-add chips, editable name, drag reorder, action menu
- [x] [builder-with-supersets.html](builder-with-supersets.html) — Builder з суперсетом A
- [x] [exercise-picker-add.html](exercise-picker-add.html) — picker у Add режимі (з Builder/Active). Browse режим — Profile-екран бази вправ (Batch 5: exercise-database-list / -empty)
- [x] [superset-config-sheet.html](superset-config-sheet.html) — bottom sheet створення/edit суперсету
- [x] [builder-row-menu-sheet.html](builder-row-menu-sheet.html) — per-row action sheet
- [x] [exercise-note-sheet.html](exercise-note-sheet.html) — per-exercise note editor (form bottom sheet, shared with Active-workout note icon)

### Batch 3 — In-workout family ✅

- [x] [in-workout.html](in-workout.html) — refined основний In-workout (live state)
- [x] [in-workout-pending.html](in-workout-pending.html) — pending (pre-start) state: налаштування сетів/reps до старту, soft start (redesign, spec §5.9)
- [x] [in-workout-with-supersets.html](in-workout-with-supersets.html) — приклад з суперсетом і round indicator
- [x] [numpad.html](numpad.html) — custom numpad (bottom sheet)
- [x] [set-actions-sheet.html](set-actions-sheet.html) — bottom sheet після тапу на номер сета
- [x] [rest-timer.html](rest-timer.html) — rest timer bottom-bar countdown state
- [x] [pull-to-cursor.html](pull-to-cursor.html) — floating chip коли cursor поза viewport

### Batch 4 — Finish · History ✅

- [x] [completion-screen.html](completion-screen.html) — повноекранний post-Finish screen per spec §9.2: 4 stats cards + info-accent PR card + collapsible exercise summary + note + Save/Discard (замінив видалений `finish-sheet.html`)
- [x] [history-list.html](history-list.html) — flat хронологічна стрічка з sticky section headers
- [x] [history-detail.html](history-detail.html) — read-only snapshot з group rendering
- [x] [history-empty.html](history-empty.html) — empty state
- [x] [history-picker.html](history-picker.html) — list для Choose from history

### Batch 5 — Profile · Settings · Database · Backup ✅

- [x] [profile.html](profile.html) — root hybrid hub
- [x] [settings-theme-language-sheet.html](settings-theme-language-sheet.html) — Theme + Language pickers (об'єднано в одному файлі для compact reference)
- [x] [exercise-database-empty.html](exercise-database-empty.html) — без custom вправ
- [x] [exercise-database-list.html](exercise-database-list.html) — alphabetical з custom mix
- [x] [exercise-create.html](exercise-create.html) — inline create custom
- [x] [backup-restore.html](backup-restore.html) — root з Export / Import
- [x] [backup-import-preview.html](backup-import-preview.html) — preview screen перед import
- [x] [about.html](about.html) — app version + GitHub + privacy note

### Later (post-v1 batch)

- [ ] Mascot character + ілюстрації empty states (окрема сесія, після artistic decisions per visual §9)

---

## Конвенції

### Іменування файлів
`<screen>-<modifier>.html`. `screen` — основна назва (today, builder, history-list). `modifier` — варіант стану/режиму, опціональний (first, has-history, in-progress, with-supersets).

### Анотації
У кожному HTML side-panel зі списками:
- **Opens from** — звідки і яким екшеном екран відкривається
- **Opens to** — куди можна піти, з тригером для кожного шляху. Linking до інших HTML файлів (TBD якщо ще не існує)
- **Interactions** — gesture/input специфічні для цього екрана (swipe, scroll, long-press, тощо)
- **Notes** — рішення які впливають на цей екран, відкриті питання
- **Edge cases · related states** — варіанти або сусідні стани цього ж потоку

### Footer-посилання
Кожен файл має footer з посиланнями на: flow.md, INDEX.md, relevant spec section, visual.md.

### TBD маркери
- `(TBD)` поряд з посиланням означає файл ще не існує
- `(TBD у Batch N)` уточнює, в якій сесії планується
- Відкриті продуктові питання — у Notes section

---

## Що робить наступна сесія

1. Прочитай `../CONTEXT.md` + `../spec/README.md` + `../visual/README.md`
2. Подивись цей файл, знайди наступний незакреслений batch
3. Прочитай вже зроблені wireframes у поточному batch для tone reference
4. Додай нові HTML файли. Стиль — як в Today batch
5. Онови checklist у цьому файлі (закресли done, додай нові якщо виявились)
6. Онови `flow.md` — додай нові ноди і edges, увімкни кліки
7. Якщо знайшов проблему/невідповідність зі spec — постав питання користувачу, не вирішуй мовчки

---

## Open questions (накопичуємо по ходу)

Зведено з агент-репортів Batches 2–5 + поточних попередніх. Список для прохідки ревью — кожен пункт або підтвердити, або переграти точково.

### Behavior gaps у spec

- ~~**today-in-progress + Choose / Repeat / Start blank**~~ — RESOLVED: CTA disabled поки banner присутній; лише Resume/Discard. Spec §3.1.c оновлено.
- ~~**Empty workout** (0 sets logged)~~ — RESOLVED: 0 сетів + Finish → пропуск completion screen, одразу Discard confirm. Spec §9.1 оновлено.
- ~~**In-progress + tap Choose from history**~~ — RESOLVED: див. перший пункт (CTA блокується, prompt не потрібен).
- ~~**Replace exercise** мід-tworkout~~ — RESOLVED: прибрано з v1 row menu повністю (Remove + Insert after). `builder-row-menu-sheet.html` оновлено.

### Spec-divergence (агент свідомо інакше)

- ~~**Drag handle position** у Builder~~ — RESOLVED: **зліва** (агентів варіант) — рознесення з `⋮` справа прибирає скупчення. Spec §4.6 оновлено.
- ~~**Custom mark на exercise-database-list**~~ — RESOLVED: `Custom` badge (identity) + `⋮` (дії); chevron `>` НЕ використовуємо (у v1 немає detail для навігації). Spec §11.5 оновлено.
- ~~**Default `All` chip у picker**~~ — RESOLVED: явний sticky `All`, active by default (spec §11.4 канон). Додано в `exercise-picker-add` / `-browse` (Browse-режим уже мав).
- ~~**finish-sheet vs spec §9.2 full completion screen**~~ — RESOLVED: повноекранний completion screen, один крок (Finish → screen → Save/Discard). Без quick-confirm sheet. `finish-sheet.html` видалено, створено `completion-screen.html`. Spec §9.2 оновлено.
- ~~**Edit/Delete custom exercise**~~ — RESOLVED: `⋮` action sheet (Edit/Delete), **без** detail-екрана у v1 (detail → v2 разом зі статистикою). Spec §11.1/§11.5/§11.8/§11.10 оновлено.

### Дизайн-рішення прийняті як defaults (можна переграти)

- **Letter E rust `#B85842` як destructive color** — частково розв'язує semantic colors з visual §2.4. Перевірити.
- **Rest timer**: floating circular dock над bottom action bar (агент Batch 3 обрав цей варіант, alt — bottom dock з horizontal bar — описаний у Notes файлу).
- **Numpad layout**: bottom sheet з обома fields (kg + reps) одночасно видимими. Active field має amber border.
- **Numpad ±0.5 quick-adjust** — не доданий, поки `±2.5/±5` для kg, `±1/±5` для reps.
- **Numpad decimal separator** — `.` (English locale). Локалізація на uk → `,` per spec §7.5, але це impl detail.
- **RPE picker у set-actions-sheet** — inline 6.0–10.0 з 0.5-step, не submenu.
- **Round indicator dots** у group meta — current round = amber. Альтернатива — letter color opacity. Поки amber.
- ~~**Combined picker + config sheet** для суперсету~~ — RESOLVED: один обʼєднаний sheet (multi-select + rounds + rest), не двоступеневий. Spec §6.2 переписано під combined flow.
- **Settings Theme + Language** — об'єднано в один файл для compact reference (у app це два незалежні sheets).
- ~~**Profile WORKOUT секція — `Default rest`**~~ — RESOLVED (design-review F5.3): локнуто у v1, default `90 s`, action sheet `60/90/120/180 + Off`. Spec §12.3 + in-workout §5.10.
- ~~**About: Report an issue + Licenses**~~ — RESOLVED (design-review F5.4): обидва рядки зрізано до §12.5 scope (licenses потребують стек → v1.x).
- ~~**About tagline `Качайся.`**~~ — RESOLVED (design-review F5.4): локалізовано — EN `Get lifting.` / UA `Качайся.`.
- ~~**Builder row menu обсяг**~~ — RESOLVED (redesign): row menu стало композиційним (`Add note` / `Add to superset` / `Move` / `Remove`); `Edit sets` прибрано — сети тепер налаштовуються в In-workout pending-стані (spec §5.9).
- **Group active row через negative margin** — production cleanup TBD; production варіант через grid layout без margin tricks.
- ~~**Floating timer + pull-to-cursor конфлікт**~~ — RESOLVED (design-review F3.1): rest = bottom bar's `rest` mode (accented countdown), не плаваюче коло; chip плаває над баром. Різні шари, без колізії. Spec §5.10 додано.
- **RPE remove value** через tap selected ще раз — поведінка TBD.
- **Pause на rest timer** — не доданий (типовий use-case = Skip або wait).
- **Default reps for group children** у builder-with-supersets: 8 для Dumbbell row, 12 для Face pull (reasonable).

### Технічні (impl-time)

- **Iconography library**: Lucide vs Phosphor — лочимо при імплементації.
- **Mascot illustrations**: усі empty states зараз з `placeholder-mascot`. Реальні ілюстрації — окрема artistic-сесія per visual §9.
