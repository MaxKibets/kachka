# Рішення · відкрите · відкладене

> Проєктна пам'ять: відкриті питання (§15), відкладене у v2 (§16), зафіксовані рішення (§17). Частина UI/UX-специфікації Kachka v1 — повна карта і §-індекс: [spec map](../gym-tracker-spec.md).
> Поведінка описана тут; візуальна система — `../gym-tracker-visual.md`.

---

## 15. Що ще не вирішено

- **Модель даних** — формальна схема `Workout → Group | Exercise → Set` з типами полів і правилами (TBD як окремий документ; впливає на JSON-формат backup-у §13)
- **Візуальний стиль** — типографіка, кольори (включно з letter-colors для груп), density, motion, ілюстрації для empty states
- **Exercise database seed-список** — повний каталог системних вправ (окрім 7 chip-вправ); де брати: wger чи власний


---

## 16. Свідомо відкладено в v2 / пізніше

**Програмний шар**
- Bundled programs / custom programs / program editor
- Linear progression, pointer-based scheduling
- One active program at a time
- Програмний JSON-формат (gym-tracker-program-format.md — заморожений)

**Імпорт / шаринг**
- Import flow (file picker, conflict resolution, preview, land)
- Deep linking (gymtracker://import)
- Universal links / App Links
- Export програми / single workout (включно з Markdown для LLM-чатів)

**Тренувальні механіки**
- AMRAP та time-based циркуляри
- Drop sets, rest-pause, cluster sets
- Уневен сети в групі
- 1RM / e1RM estimation і tracking
- Replace exercise мід-tworkout (в v1 = Remove + Insert after)

**UX полегшення**
- Mid-workout grouping для вправ із залогованими сетами
- Save as draft у Workout Builder
- Mini-bar / minimize active workout
- PR badges на сетах у History detail
- History filter (period + exercise) і search
- History export (Markdown single workout / period)
- Quick-add chips ranked by usage (зараз статичні)

**Інші зони**
- Соціальні фічі (sharing, friends, feed)
- Wearable integration (Apple Watch, Wear OS)
- Voice input для логування
- Plate calculator
- Calendar-based scheduling
- Streak counters і motivational gamification
- Графіки прогресу, тенденції по вправах, PR timeline


---

## 17. Список зафіксованих рішень

**Базові UI patterns**
- [x] Усі action menus — bottom action sheets (top-bar `⋯`, row `⋮`, set actions, numpad, superset config). Той самий pattern на iOS і Android. Причина — thumb-reach однією рукою
- [x] Усі confirmations — bottom sheet (той самий компонент): title + опц. description + `Cancel` (вгорі) + destructive (внизу). Cancel вгорі — захист від випадкового тапу destructive. Свайп вниз = Cancel

**Скоуп v1**
- [x] v1 = ad-hoc workouts (build / execute / log to history)
- [x] Програми / import / deep linking → v2
- [x] 3 bottom tabs: Today · History · Profile

**Today / Pre-workout**
- [x] Three modes: has history / first launch / in-progress
- [x] Repeat last як primary CTA
- [x] Choose from history для split routines
- [x] Start blank → Workout Builder
- [x] Onboarding — straight to empty Today, без welcome screens
- [x] Crash restoration — banner на Today (Resume / Discard)

**Workout Builder**
- [x] Modal overlay над Tab Navigator
- [x] Quick-add chips: Squat, Bench Press, Deadlift, Barbell Row, Overhead Press, Pull-up, Bicep Curl
- [x] Default sets для нової вправи: 3 × 8
- [x] Editable workout name (з джерела при clone, auto-name при blank)
- [x] Reorder через drag, supersets через action menu
- [x] Start workout button disabled поки список порожній

**In-workout**
- [x] Список вправ — скрол, не карусель
- [x] Сети з опц. ціллю — ghost text (з clone-джерела)
- [x] Custom numpad замість системної клавіатури
- [x] Quick-adjust кнопки на numpad-і (`±2.5`, `±5`)
- [x] Tap на номер сета → set actions sheet
- [x] Set actions: warmup toggle, RPE 1–10, note, delete
- [x] Active workout = full editor: add/remove set, add/insert/remove exercise, reorder
- [x] Skip exercise — soft remove що зберігає структуру для clone
- [x] Failed reps (0 reps) — дозволено, save + green ✓, не йде в volume і PR
- [x] Auto-scroll призупиняється при manual scroll; повернення через floating "return to current set" chip над bottom bar (з'являється коли cursor поза viewport, тап → smooth scroll + auto-scroll re-engages). Свайп-down — у v2 як power-user опція

**Суперсети**
- [x] Must-have в v1
- [x] Тільки alternating, 2-5 вправ, 2-10 раундів, один rest на групу
- [x] Створення pre-workout і мід-tworkout (з constraint: 0 залогованих сетів у кандидатах)
- [x] UI створення: per-exercise `⋮` → Add to superset → multi-select picker → config sheet
- [x] Color-coded letter labels (A/B/C з ротацією кольорів)
- [x] Edit rounds (constrained), rest, add/remove exercise (під те ж обмеження)
- [x] Ungroup завжди можливий, логовані сети лишаються прив'язані до своїх вправ
- [x] AMRAP / уневен / time-based — у v2

**Завершення**
- [x] Completion screen з 4 stats cards + note + summary
- [x] PR detection — простий MVP-варіант (вперше така вага в rep-діапазоні)
- [x] Volume = `sum(weight × reps)`, warmups виключені

**History**
- [x] Bottom tab `History`, root-екран без topbar actions
- [x] Flat хронологічна стрічка, найновіше зверху, infinite scroll
- [x] Sticky section headers (week / month) при скролі
- [x] Tap → detail (read-only full snapshot)
- [x] Detail body: усі вправи з усіма сетами, group rendering для суперсетів з letter labels
- [x] Volume в row — `sum(weight × reps)`, warmups виключені
- [x] Discarded workouts не зберігаються; partial-completed зберігаються
- [x] Empty state: текст + проста іконка
- [x] Filter / search / export / PR badges / графіки — у v2

**Exercise picker / Database**
- [x] Один screen-component, два режими (Add / Browse)
- [x] Search: case-insensitive substring; AND-композиція з muscle group filter
- [x] Filter: 7 muscle groups (Chest · Back · Legs · Biceps · Triceps · Shoulders · Core), single-select, sticky `All` first
- [x] System exercises — multi-tag, read-only, без detail screen
- [x] Custom exercises — single-tag, edit (entity-level rename) + soft delete
- [x] Custom creation: inline `Create as 'X'` (no-results affordance) + sticky `+ Create custom` button
- [x] Custom fields: name + muscle group + isBodyweight (notes/equipment → v1.x)
- [x] Sort alphabetical, search/filter reset на open
- [x] Single-select у Add mode (multi-select → v1.x)
- [x] Soft delete зберігає past workouts (entity by ID)

**Profile + Settings**
- [x] Profile root = hybrid hub: inline preferences + grouped sections (PREFERENCES / WORKOUT / DATA / About)
- [x] Theme: `System` / `Dark` / `Light`, default `System` (action sheet)
- [x] Language: `System` / `English` / `Ukrainian`, default `System` (auto-detect locale, fallback English)
- [x] Show RPE: toggle, default ON. OFF ховає picker з §8.2 і бейджі `@8`, не видаляє залогованих RPE-значень
- [x] Rest haptic: toggle, default ON
- [x] Rest sound: toggle, default OFF
- [x] Без push-нотифікацій у v1 (background → v2)
- [x] Exercise database, Backup & restore — окремі sub-screens
- [x] About: app version + GitHub link + privacy note (без acknowledgements у v1)
- [x] Без `Delete all data` у v1 (юзер перевстановлює додаток)

**Backup & restore**
- [x] Manual export/import у JSON; auto-backup → v2
- [x] Plain JSON, без encryption у v1 (encryption → v2 разом з sync)
- [x] Export: один тап → native share sheet (Files / iCloud / AirDrop / Drive / email / тощо). Без свого destination-picker
- [x] Файл: `kachka-backup-YYYY-MM-DD.json`, повний state (workouts + custom exercises включно з soft-deleted + settings + metadata з `schemaVersion`/`appVersion`/`exportedAt`)
- [x] Import: file picker → preview screen (counts + дата + версія + mode picker) → bottom sheet confirmation → atomic transaction
- [x] Two import modes: Replace all (default, для recovery/migration) і Merge skip-by-UUID (для multi-device). Per-field merge → v2
- [x] Older `schemaVersion` → auto-migrate JSON before preview. Newer → блокується з повідомленням оновити app
- [x] Без stale-backup nudge (`Last export` не показуємо)
