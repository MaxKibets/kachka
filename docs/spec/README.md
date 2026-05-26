# Gym Tracker · UI/UX Specification — карта

> Трекер тренувань у спортзалі для React Native (iOS + Android). v1 — ad-hoc workouts: побудова → виконання → логування в історію. Програми, імпорт/експорт, deep linking — у v2.

**Status**: v1 scope locked — ad-hoc workouts. Programs / import / deep linking — deferred to v2.

**Версія**: v0.13 · spec розбито на зонні файли в цьому каталозі (`spec/`); цей файл (`README.md`) — карта + §-індекс

---

## Як читати

Специфікація розбита на тематичні зони в цьому каталозі (`spec/`). Цей файл
(`README.md`) — точка входу: оглядове дерево і §-індекс для resolve будь-якого
`§N.M`-посилання. Кожен
зонний файл **зберігає оригінальну §-нумерацію**, тож крос-референси між файлами
(`§6.2`, `§9.1`, `§11.8`…) лишаються однозначними — знайди номер у §-індексі нижче,
щоб дізнатись, у якому файлі секція.

Читати разом з:

- [`../tech/README.md`](../tech/README.md) — платформа, storage, юніти, локалізація (active)
- [`../visual/README.md`](../visual/README.md) — візуальна система: палета, типографіка, density (active)
- [`decisions.md`](decisions.md) — лог зафіксованих рішень + відкриті питання + відкладене у v2
- [`../program-format.md`](../program-format.md) — JSON-формат програм (**frozen — v2**)

Wireframes (per-screen HTML мокапи) — у `../wireframes/`, див. [`../wireframes/INDEX.md`](../wireframes/INDEX.md) і
[`../wireframes/flow.md`](../wireframes/flow.md).

## Зони

| Файл | Зміст | §§ |
|---|---|---|
| [foundations.md](foundations.md) | Базові принципи + навігація / IA | §1–2 |
| [today.md](today.md) | Today / pre-workout flow | §3 |
| [builder.md](builder.md) | Workout Builder | §4 |
| [in-workout.md](in-workout.md) | In-workout: архітектура, custom numpad, set actions | §5, §7, §8 |
| [supersets.md](supersets.md) | Суперсети / групи вправ | §6 |
| [finish.md](finish.md) | Завершення тренування | §9 |
| [history.md](history.md) | History | §10 |
| [exercises.md](exercises.md) | Exercise picker / database | §11 |
| [profile.md](profile.md) | Profile, Settings & Backup | §12–13 |
| [glossary.md](glossary.md) | Глосарій | §14 |
| [decisions.md](decisions.md) | Рішення · відкрите · відкладене | §15–17 |

> Суперсети (§6) винесені в окремий файл, бо зона спільна для Builder (§4) і
> In-workout (§5). Exercise picker (§11) — теж спільний компонент (Builder, Active,
> Profile). In-workout файл навмисно тримає §5 + §7 + §8 разом (архітектура →
> логування → дії з сетом — це один робочий контур).

## §-індекс

| § | Секція | Файл |
|---|---|---|
| §1 | Базові принципи | [foundations.md](foundations.md) |
| §2 | Навігація / IA | [foundations.md](foundations.md) |
| §3 | Pre-workout flow (Today) | [today.md](today.md) |
| §4 | Workout Builder | [builder.md](builder.md) |
| §5 | Архітектура in-workout екрана | [in-workout.md](in-workout.md) |
| §6 | Суперсети / групи вправ | [supersets.md](supersets.md) |
| §7 | Логування одного сета | [in-workout.md](in-workout.md) |
| §8 | Меню дій з сетом | [in-workout.md](in-workout.md) |
| §9 | Завершення тренування | [finish.md](finish.md) |
| §10 | History | [history.md](history.md) |
| §11 | Exercise picker / Exercise database | [exercises.md](exercises.md) |
| §12 | Profile + Settings | [profile.md](profile.md) |
| §13 | Backup & restore | [profile.md](profile.md) |
| §14 | Глосарій | [glossary.md](glossary.md) |
| §15 | Що ще не вирішено | [decisions.md](decisions.md) |
| §16 | Свідомо відкладено в v2 / пізніше | [decisions.md](decisions.md) |
| §17 | Список зафіксованих рішень | [decisions.md](decisions.md) |
