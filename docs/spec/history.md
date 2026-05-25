# History

> Перегляд минулих тренувань: список + read-only detail (§10). Частина UI/UX-специфікації Kachka v1 — повна карта і §-індекс: [spec map](../gym-tracker-spec.md).
> Поведінка описана тут; візуальна система — `../gym-tracker-visual.md`.

---

## 10. History

> Перегляд минулих тренувань. Минулі тренування — read-only факт. MVP мінімальний: список + detail без фільтрів і експорту (винесено в §16).

### 10.1 Огляд

History — окремий bottom tab (`Today · History · Profile`). Стек з двох екранів:

- *List* — хронологічна стрічка завершених тренувань
- *Detail* — read-only знімок одного тренування

Без topbar actions, без filter, без search, без export — все це переноситься в v2. Ціль MVP: бачити що я робив, у простій timeline-формі.

### 10.2 Список тренувань

- *Структура*: flat хронологічна стрічка, найновіше зверху, infinite scroll з lazy loading
- *Sticky section headers*: при скролі зверху приклеюється label поточного тижня/місяця (`This week`, `Last week`, `April`). Це візуальна пунктуація в flat list, не зміна структури
- *Topbar*: заголовок `History`, без actions, без back-кнопки (це root-екран таба)

Row (medium density), два рядки:

```
[Date · Workout name]                    [Duration]
[N sets · Volume kg]
```

- *Date format*: relative для останніх 7 днів (`Today`, `Yesterday`, `Mon`), absolute далі (`28 Apr 2026`)
- *Volume*: `sum(weight × reps)` по робочих сетах, warmups виключаються (узгоджено з §9.4)
- *Bodyweight*: вправи без weight дають 0 у внеску до volume

Tap на рядок → push detail screen.

### 10.3 Detail screen

Read-only знімок тренування. Жодних actions редагування.

*Header* (sticky):
- Back-кнопка
- Назва workout-у
- Підзаголовок: дата (повна) + duration

*Body* — full snapshot:
- Усі вправи в порядку виконання
- Для кожного сета: номер (або `W` для warmup), `weight × reps`, RPE (якщо було), маркер нотатки
- Workout note (якщо була залогована при completion)

*Суперсети* — group rendering як у in-workout, але read-only:
- Group header: letter label (`A · Superset · 3 rounds`)
- Список вправ у групі з префіксами A1/A2/A3
- Сети показуються по раундах
- Letter color консистентний з тим як був у workout-і

*Без actions*: немає edit, repeat workout from this entry, export — все в §16.

### 10.4 Empty state

Юзер ніколи не завершив тренування → центрований stack:

- Проста іконка (стиль ілюстрації — TBD з візуальним стилем)
- Title: `No workouts yet`
- Subtitle: `Complete your first workout to see it here.`

Bottom tab bar лишається. Без CTA — Today вже доступний в табах.

### 10.5 Що потрапляє в History

| Подія | Поведінка |
|---|---|
| Юзер натиснув `Save to history` на completion screen | Додається в History з тими сетами що залогував |
| Завершено з partial-completed (не всі заплановані сети) | Додається з логованими сетами, відсутні просто не показуються |
| Юзер натиснув `Discard workout` | Не зберігається в History |
| Skipped exercise мід-tworkout | Зберігається з тими сетами що залогувалися (якщо були) |

