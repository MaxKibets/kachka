# Gym Tracker · Handoff Context

> Контекст для AI-асистента що підхоплює UI/UX роботу над цим проєктом. Прочитати перед першою відповіддю.

---

## Що це за проєкт

React Native (iOS + Android) трекер тренувань у спортзалі. Хобі-проєкт без монетизації. Цільова аудиторія — міжнародна, реліз в App Store + Google Play.

Мова дискусії: **українська**. Технічні терміни (RPE, PR, superset, set) лишаються англійською.

## Поточний стан

UI/UX **закрито концептуально**:
- Navigation / IA
- Pre-workout flow
- In-workout зона (вся)
- Import flow (acquire → validate → reconcile → preview → land)
- History (list + detail без фільтрів/експорту в MVP)

**Зафіксовано**: формат програм для імпорту/експорту, технічні і продуктові рішення.

Лишається опрацювати решту UI зон (див. "Що далі" нижче).

## Документація проєкту

Три md-файли в проєкті, треба читати їх як єдине ціле:

| Файл | Зміст |
|------|-------|
| `gym-tracker-spec.md` | UI/UX. Navigation, Pre-workout, In-workout, Import, History зони, custom numpad, set actions, completion, суперсети |
| `gym-tracker-tech.md` | Технічні і продуктові рішення — платформа, storage, юніти, локалізація, монетизація, дистрибуція |
| `gym-tracker-program-format.md` | JSON-формат програм для імпорту/експорту — повна специфікація з валідацією і прикладами |

**Перед будь-якою відповіддю — прочитати всі три.** Вони пов'язані крос-посиланнями, рішення в одному часто впливає на інші.

## Найважливіші зафіксовані рішення

Скорочений список — деталі в md-файлах:

**Контекст і базові обмеження**
- Юзер у залі, потіє, одна рука, 5–15с на сет, 15–30 циклів за тренування. UI оптимізує саме під цей сценарій
- Темна тема обов'язкова, великі тач-таргети, мінімум тапів

**Навігація / IA**
- 4 bottom tabs: Today · Programs · History · Profile
- Active workout — modal full takeover (без mini-bar)
- One active program at a time, per-program pointer
- Exercise database — всередині Profile

**Pre-workout flow**
- Перша програма: bundled (2-3) + import. Editor у v1.1
- Linear progression, pointer-based (не календарний)
- Today shape — expanded preview list з sticky `Start workout`
- Today density — minimal (без streak, без summary cards)
- Exercise preview — one-liner default, expand на тап
- Onboarding — straight to picker, без welcome screens
- Crash restoration — banner на Today (Resume / Discard)

**In-workout**
- Список вправ дня — скрол, не карусель
- Сети з опціональною ціллю (ghost text у полях). Якщо нема — прочерк
- Суперсети в MVP — alternating only, 2-5 вправ, однакові раунди, один rest на групу, без rest всередині раунду
- Custom numpad замість системної клавіатури з quick-adjust ±2.5/±5
- Set actions через тап на номер сета — warmup, RPE, note, delete

**Import flow**
- Entry points: file picker + deep link. Paste / share sheet — у v1.x
- 5 фаз: acquire → validate → reconcile → preview → land
- Validate — dead-end errors без деталей (3 типи: JSON, structure, schemaVersion)
- Reconcile — batch list з двома секціями (Did you mean? + Not in library), auto-resolve exact matches silently, hard gate (Continue до 0 unresolved)
- Picker reuse з `Replace exercise`, custom exercise створена при імпорті — permanent у db
- Preview — повна структура з expand-абельними workout-ами, resolution summary з можливістю перерезолву
- Imported = окрема юзерська копія, decoupled від source, read-only до editor v1.1
- Land — `Save` / `Save & activate`, дублікати назв allowed
- Deep link під активним тренуванням — payload в queue + банер на Today

**Технічні**
- Storage: local-only, sync-ready фундамент (UUID, soft delete, timestamps)
- Юніти: kg only для MVP, lb потім через user setting
- Локалізація: English (base) + Ukrainian, i18n з першого дня
- Free, без реклами, без accounts

**Формат програм**
- Сети без ваги (тільки структура), reps як `number` або `[min, max]`
- RPE only без RIR, прогресія через explicit weeks без формул
- Вправи як вільний текст з conflict resolution на імпорті

## Свідомо відкладено в v2 — не обговорювати в v1

- AMRAP / time-based циркуляри
- Drop sets, rest-pause, cluster sets
- Уневен сети в групі
- 1RM / e1RM estimation
- Соціальні фічі
- Wearable integration
- Voice input
- ШІ-генерація програм
- Sync між пристроями
- Substitutions у форматі (замінено generic Replace exercise + ШІ враховує availableEquipment)
- Tempo як окреме поле
- Прогресія через формули
- Freestyle workout (без програми) — потребує окремої моделі і entry points
- Calendar-based scheduling (прив'язка днів тижня до workout-ів)
- Streak counters і motivational gamification
- Editor програм (винесено у v1.1)
- Mini-bar / minimize active workout

## Що далі — план роботи

Три зони лишилось:

1. **Programs tab** — список програм, program detail screen, switch active flow (частково випливає з Today + Import)
2. **Редактор програм** — CRUD вправ/сетів/груп (винесено у v1.1, можна не закривати в MVP-фазі)
3. **Profile + edge cases** — exercise database UI, settings, onboarding bundled-content, +зачеплені побіжно edge cases

Edge cases що зачепили побіжно і треба закрити: редагування completed сета мід-тренування, pause/resume workout, skip exercise, failed reps, auto-scroll override, reordering мід-тренуванням.

Чотири технічних рішення для v1: локальна БД (рекомендовано WatermelonDB), Expo vs bare RN, мінімальні версії OS, exercise database seed-список.

## Як працювати

**Стиль**: ставиш питання → показуєш каркас з трейд-офами → юзер дає напрямок → фіксуємо в md. Не вирішуй за юзера — давай вибір.

**Каркаси**: спершу пробуй `visualize:show_widget` (з попереднім `visualize:read_me`). Якщо tool падає (були випадки 400-х) — fallback на HTML-файл у `/mnt/user-data/outputs/` з `present_files`. ASCII / mermaid — для процесів і простих структур, не для full-screen mockup-ів.

**Питання юзеру**: ask_user_input_v0 з 2-4 опціями. Не більше 3 питань за раз.

**Mermaid-діаграми**: для процесів, state machines, ієрархій. Не для всього — тільки коли діаграма реально допомагає.

**Фіксація**: Коли зона закрита — оновлюємо відповідний md (або створюємо новий). Файли йдуть в `/mnt/user-data/outputs/`, юзер сам копіює в проєкт. Project files read-only.

**Не плодити документи без потреби**. UI/UX рішення → в `gym-tracker-spec.md`. Технічні → в `gym-tracker-tech.md`. Формат програм → в `gym-tracker-program-format.md`. Новий документ заводити тільки якщо тема справді окрема (наприклад модель даних, ШІ-сценарій).

## Тон і прагматичність

Юзер — досвідчений розробник, не пояснювати базові речі. Цінує trade-offs і чесні рекомендації, не ухиляйся коли запитують "що краще". Працює сам, без команди — час дорогий, не плодити фіч.

При сумнівах — простіше краще ніж складніше, MVP-філософія.
