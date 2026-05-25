# Profile, Settings & Backup

> Hub налаштувань — PREFERENCES / WORKOUT / DATA / About (§12) і backup / restore (§13). Частина UI/UX-специфікації Kachka v1 — повна карта і §-індекс: [spec map](../gym-tracker-spec.md).
> Поведінка описана тут; візуальна система — `../gym-tracker-visual.md`.

---

## 12. Profile + Settings

> Profile tab — generic hub для всього що не workout / history. Архітектура hybrid: settings inline на root-екрані, важкі workflows (Exercise db, Backup/Restore) як окремі sub-screens.

### 12.1 Profile root — структура

```
┌─────────────────────────┐
│ Profile                 │
├─────────────────────────┤
│  PREFERENCES            │
│  Theme        System ▾  │
│  Language     System ▾  │
│  Show RPE          [✓]  │
├─────────────────────────┤
│  WORKOUT                │
│  Rest haptic       [✓]  │
│  Rest sound        [⚪] │
├─────────────────────────┤
│  DATA                   │
│  Exercise database  >   │
│  Backup & restore   >   │
├─────────────────────────┤
│  About              >   │
└─────────────────────────┘
```

Profile root — root-екран таба, без back-кнопки. Заголовок `Profile`. Скрол.

Чотири блоки з grouped section headers:

| Секція | Зміст | Тип контролів |
|---|---|---|
| `PREFERENCES` | Theme, Language, Show RPE | Picker rows + toggle |
| `WORKOUT` | Rest haptic, Rest sound | Toggles |
| `DATA` | Exercise database, Backup & restore | Sub-screen rows |
| `About` | About | Sub-screen row (без префікса-секції) |

### 12.2 PREFERENCES

#### Theme

Tap → action sheet з трьома опціями: `System` (default), `Dark`, `Light`. Вибір застосовується миттєво. `System` означає auto-follow OS-теми.

`Dark` — основна тема (з §1: «темна тема обов'язкова»). `Light` робиться у v1 для повноти і System-режиму, але не як рекомендований use-case.

#### Language

Tap → action sheet з трьома опціями: `System` (default), `English`, `Ukrainian`. `System` auto-detect-ить з locale; якщо locale не English і не Ukrainian — fallback English. Override переписує detection без рестарту.

#### Show RPE

Toggle, default ON.

- ON: RPE picker доступний у set actions sheet (§8.2), бейдж `@8` рендериться у рядку сета
- OFF: пункт `RPE` зникає з set actions sheet, бейджі `@8` не показуються; раніше залоговані RPE-значення зберігаються в db і повертаються при ON

### 12.3 WORKOUT

Сигнали по закінченні rest-таймера.

| Toggle | Default | Поведінка коли ON |
|---|---|---|
| Rest haptic | ON | Haptic impact (medium) при досягненні 0:00 |
| Rest sound | OFF | Короткий cue-sound через системний audio channel |

Без push-нотифікацій у v1 (background → v2). Коли обидва OFF — таймер просто візуально доходить до 0:00.

### 12.4 DATA

#### Exercise database

Тап → відкриває §11 Exercise picker у Browse mode як push на Profile stack.

#### Backup & restore

Тап → окремий sub-screen. Деталі — §13.

### 12.5 About

Тап → push sub-screen зі статичним контентом:

- App name + version: `Kachka · 1.0.0 (build 42)` (build number з CI)
- Source code link → GitHub (open source)
- Privacy note: `Your data stays on this device. No accounts, no servers, no analytics.`

Без acknowledgements у v1 — додамо коли стек обраний і список залежностей зафіксується.

### 12.6 Свідомо НЕ робимо у v1

- **Delete all data** — рідкісний use case (юзер може перевстановити додаток). Якщо колись треба — окрема destructive-дія в DATA з double-confirm
- **Units toggle (kg/lb)** — kg only у v1, lb через user setting у v2 (з tech doc: «Юніти: kg only для MVP»)
- **Decimal separator override** — locale-driven, без user-facing toggle (§7.5)
- **Notifications** — push, scheduled reminders, rest-end banner у background → v2. У v1 тільки local haptic/sound (§12.3)


---

## 13. Backup & restore

> Manual export/import усіх юзерських даних у JSON-файл. Точка входу: Profile → DATA → Backup & restore (§12.4). Local-only фундамент (tech §2), без серверів і accounts; backup — єдиний механізм disaster recovery і device migration у v1.

### 13.1 Екран Backup & restore

Push sub-screen на Profile stack. Дві симетричні зони — Export і Import.

```
┌─────────────────────────┐
│ ← Backup & restore      │
├─────────────────────────┤
│                         │
│  EXPORT                 │
│  Save all your data to  │
│  a file you can store   │
│  or share.              │
│                         │
│  [ Export backup ]      │
│                         │
├─────────────────────────┤
│                         │
│  IMPORT                 │
│  Restore data from a    │
│  backup file.           │
│                         │
│  [ Import backup ]      │
│                         │
└─────────────────────────┘
```

Без `Last export` індикатора — чистий manual режим.

### 13.2 Export flow

1. Тап `Export backup`
2. App серіалізує усі юзерські дані в JSON:
   - Усі workouts (з сетами і structure суперсетів, з references на exercises по UUID)
   - Усі custom exercises (включно з soft-deleted, бо History на них посилається — див. §11.9)
   - User settings (theme, language, Show RPE, Rest haptic, Rest sound)
   - Metadata: `schemaVersion`, `appVersion`, `exportedAt` (ISO timestamp)
3. Створюється тимчасовий файл `kachka-backup-YYYY-MM-DD.json`
4. Native share sheet (iOS Share / Android Intent) — юзер обирає destination: Files, iCloud Drive, AirDrop, Drive, email, Telegram, тощо
5. На успіх — toast `Backup exported`

Свідомо без свого destination-picker — share sheet нативно покриває усі сценарії.

### 13.3 Import flow

1. Тап `Import backup`
2. Native file picker, фільтр `.json`
3. App читає файл, валідує (§13.6). При помилці — error sheet з причиною
4. Якщо OK — push preview screen:

```
┌─────────────────────────┐
│ ← Import preview        │
├─────────────────────────┤
│  kachka-backup-         │
│  2026-04-15.json        │
│                         │
│  Created: 18 days ago   │
│  App version: 1.0.0     │
│                         │
│  Backup contains:       │
│   • 47 workouts         │
│   • 12 custom exercises │
│   • Settings            │
│                         │
│  IMPORT MODE            │
│  ● Replace all          │
│  ○ Merge (skip dupes)   │
│                         │
│  [ Import ]             │
└─────────────────────────┘
```

5. Юзер переглядає preview і обирає import mode (default — Replace all). Тап `Import`.
6. Bottom sheet confirmation (§1):
   - *Replace*: title `Replace all data?`, description `Current data will be lost. This cannot be undone.`, `Cancel` (вгорі) + destructive `Replace` (внизу)
   - *Merge*: title `Import 47 workouts and 12 exercises?`, description `Existing data is preserved. Duplicates by ID are skipped.`, `Cancel` (вгорі) + primary `Import` (внизу)
7. На confirm — atomic transaction (§13.4). При failure — rollback до pre-import стану, error sheet
8. На success — toast `Backup imported`, повернення на Profile root

### 13.4 Import modes

Дві опції, юзер обирає на preview screen:

| Mode | Що робить з entities | Що робить з settings | Use case |
|---|---|---|---|
| **Replace all** (default) | Wipe local db → insert backup as-is | Settings з backup замінюють поточні | Disaster recovery / device migration / "хочу повернути все як було" |
| **Merge (skip dupes)** | Insert тільки нові entities (новий UUID); existing — skip | Поточні settings зберігаються | Multi-device: додати тренування з іншого пристрою без втрати поточних |

Default Replace — типовий сценарій. Merge — для рідкісного multi-device флоу.

Skip-by-UUID означає: якщо сутність уже є з тим самим ID — лишається поточна версія. Per-field merge не робимо у v1: складно і потребує conflict resolution UX, відкладено до повноцінного sync (v2).

### 13.5 Файл і формат

- *Назва за замовчуванням*: `kachka-backup-YYYY-MM-DD.json`
- *Розширення*: `.json`
- *Encoding*: UTF-8
- *Структура*: окремо специфікується у data model doc (поки відкрите питання, див. §15)
- *Plain JSON у v1* — без encryption / password. Sensitivity даних низька (тренувальна історія); юзер сам обирає де зберігати файл. Encryption — окреме питання у v2 разом з sync

### 13.6 Validation і помилки

При читанні файлу — error sheet (bottom sheet з §1) з конкретною причиною:

| Помилка | Повідомлення |
|---|---|
| Невалідний JSON / пошкоджений файл | `Could not read backup. The file may be corrupted.` |
| Незрозумілий формат (нема `schemaVersion`) | `This file is not a Kachka backup.` |
| Newer `schemaVersion` | `This backup was created with a newer version of Kachka. Update the app to import.` |
| Older `schemaVersion` | Auto-migrate JSON → current schema перед preview (без участі юзера). Якщо migration fails — `Could not upgrade backup to current version.` |

### 13.7 Що НЕ робимо у v1

- Auto-backup (background tasks, permissions, reliability) → v2
- Encryption / password protection → v2 разом з sync
- Stale-backup nudge (`Last export: X days ago`) — manual режим без напоминання
- Selective export (тільки workouts / тільки exercises) — backup завжди повний
- Import dry-run (виконати без commit) — preview screen вже виконує цю роль перед confirm
- Backup history (зберігати кілька snapshot-ів локально) — це вже робить filesystem користувача

