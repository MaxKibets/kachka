# Kachka · Wireframes index

> Per-screen HTML мокапи v1 + flow-діаграма + спільні токени. Кожен файл self-contained — відкривай у браузері без серверу.

**Status**: v0 in-progress · Batch 1 (Today) — done · Batches 2–5 — TBD

Читай разом з `../CONTEXT.md`, `../gym-tracker-spec.md` (поведінка), `../gym-tracker-visual.md` (візуальна система).

---

## Структура

```
wireframes/
├── INDEX.md                  ← цей файл
├── flow.md                   ← Mermaid state-diagram, посилання на HTML
├── shared/
│   └── tokens.css            ← Mallard токени + wireframe page chrome (всі HTML імпортують)
└── *.html                    ← один файл = один екран
```

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

### Batch 2 — Workout Builder · Exercise picker · Superset config

- [ ] `builder.html` — pre-workout list, Quick-add chips, editable name, drag reorder, action menu
- [ ] `builder-with-supersets.html` — Builder з суперсетом A
- [ ] `exercise-picker-add.html` — picker у Add режимі (з Builder/Active)
- [ ] `exercise-picker-browse.html` — picker у Browse режимі (з Profile/DATA)
- [ ] `superset-config-sheet.html` — bottom sheet створення/edit суперсету
- [ ] `builder-row-menu-sheet.html` — per-row action sheet (`⋮` на вправі: Add to superset, Remove, Replace TBD)

### Batch 3 — In-workout family

- [ ] `in-workout.html` — refined основний In-workout (за основу взяти мокап з v0 + tokens)
- [ ] `in-workout-with-supersets.html` — приклад з суперсетом і round indicator
- [ ] `numpad.html` — custom numpad (overlay або bottom sheet)
- [ ] `set-actions-sheet.html` — bottom sheet після тапу на номер сета (warmup, RPE, note, delete)
- [ ] `rest-timer.html` — rest timer overlay/state
- [ ] `pull-to-cursor.html` — floating chip коли cursor поза viewport

### Batch 4 — Finish · History

- [ ] `finish-sheet.html` — finish workout summary sheet
- [ ] `history-list.html` — flat хронологічна стрічка з sticky section headers
- [ ] `history-detail.html` — read-only snapshot з group rendering
- [ ] `history-empty.html` — empty state
- [ ] `history-picker.html` — list для Choose from history (той самий рендер що list)

### Batch 5 — Profile · Settings · Database · Backup

- [ ] `profile.html` — root hybrid hub (PREFERENCES / WORKOUT / DATA / About)
- [ ] `settings-theme.html`, `settings-language.html` — sub-screens (можна об'єднати один файл-варіант)
- [ ] `exercise-database-empty.html` — без custom вправ
- [ ] `exercise-database-list.html` — alphabetical, з search/filter
- [ ] `exercise-create.html` — inline create custom (name + muscle group + isBodyweight)
- [ ] `backup-restore.html` — root з Export / Import
- [ ] `backup-import-preview.html` — preview screen перед import
- [ ] `about.html` — app version + GitHub + privacy note

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

1. Прочитай `../CONTEXT.md` + `../gym-tracker-spec.md` + `../gym-tracker-visual.md`
2. Подивись цей файл, знайди наступний незакреслений batch
3. Прочитай вже зроблені wireframes у поточному batch для tone reference
4. Додай нові HTML файли. Стиль — як в Today batch
5. Онови checklist у цьому файлі (закресли done, додай нові якщо виявились)
6. Онови `flow.md` — додай нові ноди і edges, увімкни кліки
7. Якщо знайшов проблему/невідповідність зі spec — постав питання користувачу, не вирішуй мовчки

---

## Open questions (накопичуємо по ходу)

- **today-in-progress.html**: що відбувається при тапі на Repeat last / Choose / Start blank коли є in-progress workout? Блокування + Resume-only? Confirm? Spec не уточнює (§3.1.c) — потрібно з'ясувати
- **Iconography library**: Lucide vs Phosphor — лочимо коли почнеться імплементація. У wireframes вживаю inline SVG в Lucide-стилі
- **Mascot**: усі empty states зараз з placeholder. Реальні ілюстрації — окрема сесія
