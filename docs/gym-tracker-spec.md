# Gym Tracker · UI/UX Specification — карта

> Трекер тренувань у спортзалі для React Native (iOS + Android). v1 — ad-hoc workouts: побудова → виконання → логування в історію. Програми, імпорт/експорт, deep linking — у v2.

**Status**: v1 scope locked — ad-hoc workouts. Programs / import / deep linking — deferred to v2.

**Версія**: v0.12 · spec розбито на зонні файли в `spec/`; цей файл тепер карта + §-індекс (контент без змін, лише реструктуризація)

---

## Як читати

Специфікація розбита на тематичні зони у каталозі [`spec/`](spec/). Цей файл — точка
входу: оглядове дерево і §-індекс для resolve будь-якого `§N.M`-посилання. Кожен
зонний файл **зберігає оригінальну §-нумерацію**, тож крос-референси між файлами
(`§6.2`, `§9.1`, `§11.8`…) лишаються однозначними — знайди номер у §-індексі нижче,
щоб дізнатись, у якому файлі секція.

Читати разом з:

- `gym-tracker-tech.md` — платформа, storage, юніти, локалізація (active)
- `gym-tracker-visual.md` — візуальна система: палета, типографіка, density (active)
- [`spec/decisions.md`](spec/decisions.md) — лог зафіксованих рішень + відкриті питання + відкладене у v2
- `gym-tracker-program-format.md` — JSON-формат програм (**frozen — v2**)

Wireframes (per-screen HTML мокапи) — у `wireframes/`, див. `wireframes/INDEX.md` і
`wireframes/flow.md`.

## Зони

| Файл | Зміст | §§ |
|---|---|---|
| [spec/foundations.md](spec/foundations.md) | Базові принципи + навігація / IA | §1–2 |
| [spec/today.md](spec/today.md) | Today / pre-workout flow | §3 |
| [spec/builder.md](spec/builder.md) | Workout Builder | §4 |
| [spec/in-workout.md](spec/in-workout.md) | In-workout: архітектура, custom numpad, set actions | §5, §7, §8 |
| [spec/supersets.md](spec/supersets.md) | Суперсети / групи вправ | §6 |
| [spec/finish.md](spec/finish.md) | Завершення тренування | §9 |
| [spec/history.md](spec/history.md) | History | §10 |
| [spec/exercises.md](spec/exercises.md) | Exercise picker / database | §11 |
| [spec/profile.md](spec/profile.md) | Profile, Settings & Backup | §12–13 |
| [spec/glossary.md](spec/glossary.md) | Глосарій | §14 |
| [spec/decisions.md](spec/decisions.md) | Рішення · відкрите · відкладене | §15–17 |

> Суперсети (§6) винесені в окремий файл, бо зона спільна для Builder (§4) і
> In-workout (§5). Exercise picker (§11) — теж спільний компонент (Builder, Active,
> Profile). In-workout файл навмисно тримає §5 + §7 + §8 разом (архітектура →
> логування → дії з сетом — це один робочий контур).

## §-індекс

| § | Секція | Файл |
|---|---|---|
| §1 | Базові принципи | [foundations.md](spec/foundations.md) |
| §2 | Навігація / IA | [foundations.md](spec/foundations.md) |
| §3 | Pre-workout flow (Today) | [today.md](spec/today.md) |
| §4 | Workout Builder | [builder.md](spec/builder.md) |
| §5 | Архітектура in-workout екрана | [in-workout.md](spec/in-workout.md) |
| §6 | Суперсети / групи вправ | [supersets.md](spec/supersets.md) |
| §7 | Логування одного сета | [in-workout.md](spec/in-workout.md) |
| §8 | Меню дій з сетом | [in-workout.md](spec/in-workout.md) |
| §9 | Завершення тренування | [finish.md](spec/finish.md) |
| §10 | History | [history.md](spec/history.md) |
| §11 | Exercise picker / Exercise database | [exercises.md](spec/exercises.md) |
| §12 | Profile + Settings | [profile.md](spec/profile.md) |
| §13 | Backup & restore | [profile.md](spec/profile.md) |
| §14 | Глосарій | [glossary.md](spec/glossary.md) |
| §15 | Що ще не вирішено | [decisions.md](spec/decisions.md) |
| §16 | Свідомо відкладено в v2 / пізніше | [decisions.md](spec/decisions.md) |
| §17 | Список зафіксованих рішень | [decisions.md](spec/decisions.md) |
