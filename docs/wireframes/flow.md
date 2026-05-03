# Kachka · Flow diagram

> Високорівнева мапа усіх екранів v1 і переходів між ними. Кожна нода — окремий wireframe HTML. Кожне ребро — конкретний користувальницький екшн (тап, swipe, тощо).

Читай разом з [INDEX.md](INDEX.md) (статус мокапів) і `../gym-tracker-spec.md` (поведінка).

**Status**: Today batch wired up. Інші ноди — placeholders, активуються по мірі додавання батчів.

---

## Top-level state diagram

```mermaid
stateDiagram-v2
    direction LR
    [*] --> AppLaunch

    AppLaunch --> TodayFirst: no history
    AppLaunch --> TodayHasHistory: has history
    AppLaunch --> TodayInProgress: in-progress workout exists

    state "Today / first launch" as TodayFirst
    state "Today / has history" as TodayHasHistory
    state "Today / in-progress banner" as TodayInProgress

    TodayFirst --> Builder: tap Start workout
    TodayHasHistory --> Builder: tap Repeat last (clone)
    TodayHasHistory --> HistoryPicker: tap Choose from history
    TodayHasHistory --> Builder: tap Start blank workout
    TodayInProgress --> ActiveWorkout: tap Resume
    TodayInProgress --> ConfirmDiscard: tap Discard
    ConfirmDiscard --> TodayHasHistory: confirm

    HistoryPicker --> Builder: tap workout (clone)
    Builder --> ActiveWorkout: tap Start workout
    Builder --> TodayHasHistory: tap back / Discard setup
    ActiveWorkout --> FinishSheet: tap Finish workout
    FinishSheet --> HistoryList: save → land in history
    FinishSheet --> ActiveWorkout: tap Cancel sheet

    TodayHasHistory --> HistoryList: tab History
    TodayHasHistory --> Profile: tab Profile
    HistoryList --> HistoryDetail: tap row
    Profile --> ExerciseDatabase: tap Exercise database
    Profile --> BackupRestore: tap Backup &amp; restore
    Profile --> Settings: tap Settings rows

    state "Workout Builder" as Builder
    state "Exercise picker (Add mode)" as ExercisePickerAdd
    state "Exercise picker (Browse mode)" as ExercisePickerBrowse
    state "Active In-workout" as ActiveWorkout
    state "Finish workout sheet" as FinishSheet
    state "History list" as HistoryList
    state "History detail" as HistoryDetail
    state "History picker" as HistoryPicker
    state "Profile root" as Profile
    state "Exercise database" as ExerciseDatabase
    state "Backup &amp; restore" as BackupRestore
    state "Settings sub-screens" as Settings
    state "Discard confirm sheet" as ConfirmDiscard

    Builder --> ExercisePickerAdd: tap + Add exercise
    ActiveWorkout --> ExercisePickerAdd: tap + Add exercise
    ExercisePickerAdd --> Builder: pick exercise
    ExercisePickerAdd --> ActiveWorkout: pick exercise (mid-workout)
    Profile --> ExercisePickerBrowse: tap Exercise database
    ExercisePickerBrowse --> ExerciseCreate: tap Create custom
    state "Exercise create" as ExerciseCreate

    ActiveWorkout --> Numpad: tap kg/Reps tile
    Numpad --> ActiveWorkout: dismiss
    ActiveWorkout --> SetActionsSheet: tap set number
    SetActionsSheet --> ActiveWorkout: dismiss / pick action
    ActiveWorkout --> SupersetConfig: tap ⋮ → Add to superset
    Builder --> SupersetConfig: tap ⋮ → Add to superset
    SupersetConfig --> Builder: confirm
    SupersetConfig --> ActiveWorkout: confirm

    state "Custom numpad" as Numpad
    state "Set actions sheet" as SetActionsSheet
    state "Superset config sheet" as SupersetConfig
```

---

## Subflows

### Today flow (Batch 1, ✅ wired)

```mermaid
stateDiagram-v2
    direction LR
    [*] --> Today

    state Today {
        [*] --> Mode
        Mode --> TodayFirst: no history
        Mode --> TodayHasHistory: default
        Mode --> TodayInProgress: in-progress saved

        state "First launch" as TodayFirst
        state "Has history" as TodayHasHistory
        state "In-progress banner" as TodayInProgress
    }

    TodayFirst --> Builder: Start workout
    TodayHasHistory --> Builder: Repeat last / Start blank
    TodayHasHistory --> HistoryPicker: Choose from history
    TodayInProgress --> ActiveWorkout: Resume
    TodayInProgress --> DiscardSheet: Discard
    DiscardSheet --> TodayHasHistory: confirm

    state "Workout Builder" as Builder
    state "History picker" as HistoryPicker
    state "Active In-workout" as ActiveWorkout
    state "Discard confirm" as DiscardSheet
```

Файли:
- [today-has-history.html](today-has-history.html)
- [today-first.html](today-first.html)
- [today-in-progress.html](today-in-progress.html)

---

## Conventions

### Тригери на ребрах

Описуються коротко, у формі дії. Приклади:
- `tap Repeat last` — простий тап на CTA
- `tap row` — тап на елемент списку
- `swipe down` — gesture
- `long press set` — long-press
- `pick exercise` — вибір з модалки/списку

### Bottom sheets

Confirmation і action sheets рендеряться як окремі ноди (e.g. `Discard confirm`, `Superset config sheet`) — це візуально перекриває попередній екран, але state-machine це окремий стан.

### Modal screens

Workout Builder і Active In-workout — modal full-takeover (per spec §1). У state-машині це звичайні переходи; візуально на phone це slide-up.

---

## Що робить наступна сесія

1. Заповнюй `state` ноди для свого batch-у з конкретними іменами файлів
2. Додавай ребра з тригерами що деталізують екшени
3. Якщо ноди вже є — перевір, чи відкривають вони свій HTML кліком (Mermaid не підтримує клікабельні стейти у `stateDiagram-v2` напряму, тому файли посилаються через текст під діаграмою)
4. Якщо щось не вкладається — перевір з користувачем перш ніж створювати нову конвенцію
