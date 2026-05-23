# Gym Tracker · Handoff Context

> Контекст для AI-асистента що підхоплює UI/UX роботу над цим проєктом. Прочитати перед першою відповіддю.

---

## Що це за проєкт

React Native (iOS + Android) трекер тренувань у спортзалі. Хобі-проєкт без монетизації. Цільова аудиторія — міжнародна, реліз в App Store + Google Play.

Мова дискусії: **українська**. Технічні терміни (RPE, PR, superset, set) лишаються англійською.

## Поточний стан

**v1 scope locked: ad-hoc workouts.** Юзер створює тренування на льоту або клонує з історії, виконує, логує в історію. Програмний шар повністю відкладено у v2.

UI/UX **закрито концептуально** для v1:
- Navigation / IA (3 tabs: Today · History · Profile)
- Today flow (Repeat last / Choose from history / Start blank)
- Workout Builder (pre-workout list + Quick-add chips + supersets)
- In-workout зона (вся, включно з editing мід-tworkout)
- Суперсети ad-hoc з color-coded letter labels
- History (list + detail без фільтрів/експорту)
- Exercise picker / Database (один компонент, два режими, 7 muscle groups, custom з soft delete)
- Profile + Settings (hybrid hub: PREFERENCES / WORKOUT / DATA / About)

**Зафіксовано**: технічні і продуктові рішення. Програмний JSON-формат також зафіксований на рівні полів — заморожений, повертається у v2. Візуальна система — фундамент зафіксований (mood, brand, palette, typography, letter rotation, базові компонентні патерни).

Лишається опрацювати: формальну модель даних; візуально — мокапи інших екранів (Today / History / Builder / Profile), action sheets, custom numpad, iconography lock, motion, mascot character + empty state illustrations. Технічно: exercise database seed-список.

## Документація проєкту

Чотири md-файли в проєкті, треба читати їх як єдине ціле:

| Файл | Зміст | Status |
|------|-------|--------|
| `gym-tracker-spec.md` | UI/UX v1 — Navigation, Today, Workout Builder, In-workout, Суперсети, History | Active |
| `gym-tracker-tech.md` | Технічні і продуктові рішення — платформа, storage, юніти, локалізація, монетизація, дистрибуція | Active |
| `gym-tracker-visual.md` | Візуальна система — палета, типографіка, density, компонентні патерни, letter rotation, iconography/motion stubs | Active · v0 |
| `gym-tracker-program-format.md` | JSON-формат програм для імпорту/експорту | **Frozen — v2** |

**Перед будь-якою відповіддю — прочитати spec, tech і visual.** Program format читати тільки якщо запит явно стосується v2 / шарингу / імпорту.

## Найважливіші зафіксовані рішення

Скорочений список — деталі в md-файлах:

**Контекст і базові обмеження**
- Юзер у залі, потіє, одна рука, 5–15с на сет, 15–30 циклів за тренування. UI оптимізує саме під цей сценарій
- Темна тема обов'язкова, великі тач-таргети, мінімум тапів

**Скоуп v1**
- v1 = ad-hoc workouts (build / execute / log to history)
- Програми / import / deep linking → v2
- 3 bottom tabs: Today · History · Profile
- Active workout — modal full takeover (без mini-bar)
- Workout Builder — modal pre-workout
- Exercise database — всередині Profile

**Today flow**
- 3 режими: has history (Repeat last + Choose from history + Start blank) / first launch (single CTA) / in-progress (banner)
- Repeat last — primary CTA, клонує структуру + назву + targets, prev = з джерела клонування
- Choose from history — список усіх завершених для split routines
- Crash restoration — banner на Today (Resume / Discard), не auto-resume

**Workout Builder**
- Quick-add chips: 7 popular exercises (Squat, Bench Press, Deadlift, Barbell Row, Overhead Press, Pull-up, Bicep Curl), en + uk
- Default sets для нової вправи: 3 × 8
- Editable workout name, reorder через drag, supersets через action menu

**In-workout**
- Список вправ — скрол, не карусель
- Сети з опц. ціллю — ghost text у полях (з clone-джерела)
- Custom numpad замість системної клавіатури з quick-adjust ±2.5/±5
- Set actions через тап на номер сета — warmup, RPE, note, delete
- Active workout = full editor: add/remove set, add/insert/remove exercise, skip, reorder
- Skip exercise — soft remove що зберігає структуру для clone
- Failed reps (0 reps) — дозволено

**Суперсети (must-have в v1)**
- Тільки alternating, 2-5 вправ, 2-10 раундів, один rest на групу
- Створення pre-workout (Builder) і мід-tworkout (Active) з constraint: 0 залогованих сетів у кандидатів
- UI: per-exercise `⋮` → Add to superset → один combined sheet (multi-select партнерів + rounds + rest), не двоступеневий
- Color-coded letter labels (A/B/C з ротацією)
- Edit мід-tworkout: rounds (constrained), rest, add/remove exercise (під те ж обмеження), ungroup завжди

**History**
- Flat хронологічна стрічка, найновіше зверху, infinite scroll
- Sticky section headers (week / month)
- Detail — read-only full snapshot з group rendering для суперсетів
- Discarded не зберігаються; partial-completed зберігаються
- Filter / search / export / PR badges / графіки — у v2

**Exercise picker / Database**
- Один screen-component, два режими: Add (modal з Builder/Active) і Browse (sub-screen з Profile/DATA)
- Search: case-insensitive substring + 7 muscle groups (Chest · Back · Legs · Biceps · Triceps · Shoulders · Core), single-select chip
- System exercises — multi-tag, read-only, без detail. Custom — single-tag, edit + soft delete
- Custom creation: inline `Create as 'X'` (no-results) + sticky `+ Create custom` button
- Custom fields: name + muscle group + isBodyweight
- Soft delete зберігає past workouts (entity by ID, `deletedAt` flag)
- Sort alphabetical; search/filter reset на open

**Profile + Settings**
- Profile root = hybrid hub: inline preferences + grouped sections (PREFERENCES / WORKOUT / DATA / About)
- Theme: System / Dark / Light (default System); Language: System / English / Ukrainian (default System, fallback English)
- Show RPE toggle (default ON); Rest haptic (default ON), Rest sound (default OFF)
- Exercise database, Backup & restore — окремі sub-screens
- About: app version + GitHub + privacy note
- Без push-нотифікацій, без Delete all data, без units toggle у v1

**Backup & restore**
- Manual export/import у JSON (auto-backup, encryption → v2)
- Export: тап → native share sheet (Files / iCloud / AirDrop / etc.)
- Import: file picker → preview screen (counts + дата + версія + mode picker) → bottom sheet confirmation → atomic transaction
- Two import modes: Replace all (default) і Merge skip-by-UUID
- Older `schemaVersion` → auto-migrate. Newer → блокується
- Без stale-backup nudge

**Базові UI patterns**
- Усі action menus — bottom action sheets (top-bar `⋯`, row `⋮`, set actions, numpad, superset config)
- Усі confirmations — bottom sheet з Cancel вгорі і destructive внизу. Свайп вниз = Cancel
- In-workout pull-to-cursor: floating chip над bottom bar (з'являється коли cursor поза viewport), тап → smooth scroll + auto-scroll re-engages

**Технічні**
- Storage: local-only, sync-ready фундамент (UUID, soft delete, timestamps)
- Юніти: kg only для MVP, lb потім через user setting
- Локалізація: English (base) + Ukrainian, i18n з першого дня
- Free, без реклами, без accounts

## Свідомо відкладено в v2 — не обговорювати в v1

**Програмний шар**
- Bundled programs / custom programs / program editor
- Linear progression, pointer-based scheduling
- One active program at a time
- Програмний JSON-формат (заморожений у `gym-tracker-program-format.md`)

**Імпорт / шаринг**
- Import flow (file picker, conflict resolution, preview, land)
- Deep linking (gymtracker://import)
- Universal links / App Links
- Export програми / single workout (Markdown для LLM-чатів)

**Тренувальні механіки**
- AMRAP / time-based циркуляри
- Drop sets, rest-pause, cluster sets
- Уневен сети в групі
- 1RM / e1RM estimation
- Replace exercise мід-tworkout (в v1 = Remove + Insert after)

**UX полегшення**
- Mid-workout grouping для вправ із залогованими сетами
- Save as draft у Workout Builder
- Mini-bar / minimize active workout
- PR badges на сетах у History detail
- History filter / search / export
- Quick-add chips ranked by usage

**Інші зони**
- Соціальні фічі
- Wearable integration
- Voice input
- Plate calculator
- Calendar-based scheduling
- Streak counters і motivational gamification
- Графіки прогресу, тенденції, PR timeline

## Що далі — план роботи

Зони які лишилось опрацювати у v1:

1. **Модель даних** — формальна схема `Workout → Group | Exercise → Set` з типами полів і правилами (TBD як окремий документ; впливає на JSON-формат backup-у)
2. **Візуальний стиль** — типографіка, кольори (включно з letter-colors для груп), density, motion, ілюстрації для empty states

Чотири технічних рішення для v1: локальна БД (рекомендовано WatermelonDB), Expo vs bare RN, мінімальні версії OS, exercise database seed-список (повний каталог окрім 7 chip-вправ).

## Як працювати

**Стиль**: ставиш питання → показуєш каркас з трейд-офами → юзер дає напрямок → фіксуємо в md. Не вирішуй за юзера — давай вибір.

**Каркаси**: ASCII / mermaid — для процесів і простих структур. Для повноцінних мокапів — окрема розмова про візуальний стиль (поки відкладено).

**Питання юзеру**: AskUserQuestion з 2-4 опціями. Не більше 3 питань за раз.

**Mermaid-діаграми**: для процесів, state machines, ієрархій. Не для всього — тільки коли діаграма реально допомагає.

**Фіксація**: Коли зона закрита — оновлюємо відповідний md (або створюємо новий). Файли — в `D:\DEV\kachka\docs\`.

**Не плодити документи без потреби**. UI/UX рішення → в `gym-tracker-spec.md`. Технічні → в `gym-tracker-tech.md`. Новий документ заводити тільки якщо тема справді окрема (наприклад модель даних).

## Тон і прагматичність

Юзер — досвідчений розробник, не пояснювати базові речі. Цінує trade-offs і чесні рекомендації, не ухиляйся коли запитують "що краще". Працює сам, без команди — час дорогий, не плодити фіч.

При сумнівах — простіше краще ніж складніше, MVP-філософія.
