# Gym Tracker · Технічні вимоги

> Архітектурні та продуктові рішення. UI/UX — у `gym-tracker-spec.md`. Модель даних — у `gym-tracker-data-model.md` (TBD).

**Версія**: v0.1 · початковий draft, продуктові рішення зафіксовані

---

## 1. Платформа

- React Native, кросплатформенний (iOS + Android)
- Цільові магазини: App Store + Google Play
- Мінімальні версії OS — TBD (типово iOS 15+, Android 8+)

---

## 2. Зберігання даних

### 2.1 Поточна стратегія: local-only

На MVP-етапі усі дані живуть локально на пристрої. Без бекенду, auth, sync.

- Без email / accounts / реєстрації
- Юзер відкрив застосунок і одразу почав тренування
- "Backup to file" як ручний механізм збереження (експорт усіх даних в JSON)

### 2.2 Sync-ready фундамент

Закладаємо в моделі даних з першого дня, щоб через рік не довелось мігрувати дані всіх юзерів:

| Що | Навіщо |
|----|--------|
| `id: UUID v4` для кожної сутності | Можна генерувати на клієнті без координації з сервером |
| `createdAt`, `updatedAt` ISO timestamps | Обов'язково для будь-якого merge / last-write-wins |
| `deletedAt: Timestamp \| null` (soft delete) | Інакше при sync неможливо відрізнити "видалено" від "ще не синхронізовано" |
| `schemaVersion` на рівні застосунку | Майбутні міграції формату |
| Експорт/імпорт у JSON "як є" | Ручний бекап + entry point для майбутнього sync |

### 2.3 Кандидати на локальну БД

Не зафіксовано остаточно — варіанти для оцінки:

- **WatermelonDB** — sync-ready з коробки, реактивні запити, оптимізована для RN
- **RxDB** — теж sync-ready, працює в RN
- **op-sqlite / expo-sqlite** — низькорівневий SQLite, повний контроль, треба самому писати query layer
- **MMKV + JSON-файли** — найпростіше, підходить якщо обсяг даних малий

Рекомендація: WatermelonDB як найбільш відповідний майбутньому sync.

### 2.4 Майбутній sync (відкладено)

Якщо колись додаватимемо:

- Auth: email / OAuth (Google, Apple)
- Backend: Supabase / Firebase / власний
- Sync engine: PowerSync, Replicache, або власний шар поверх WatermelonDB
- Conflict resolution: last-write-wins для більшості полів, окрема логіка для видалень

Sync — кандидат на paid feature, базове тренування лишається free.

---

## 3. Юніти

### 3.1 MVP

- **kg only** — primary і internal storage
- Поле `weight: number` без `unit` поруч у моделі даних
- Quick-adjust на numpad-і фіксовано: `−5`, `−2.5`, `+2.5`, `+5`

### 3.2 Майбутнє додавання lb

- User setting `units: 'kg' | 'lb'`
- Конвертування на льоту в UI: `displayWeight = storedKg * 2.2046`
- У БД завжди kg
- Quick-adjust перемикається на `−10`, `−5`, `+5`, `+10` для lb

### 3.3 Інші юніти

- Reps — завжди integer
- Час (rest timers, workout duration) — завжди seconds internally, форматуємо в UI

---

## 4. Локалізація

### 4.1 Мови MVP

- **English** — primary і base
- **Українська** — перший переклад

### 4.2 Архітектура i18n

- Бібліотека: `react-i18next` (стандарт для React Native)
- Усі лейбли через ключі: `t('workout.finish')`, не hardcoded стрінги
- Ключі англійською base, переклади в окремих JSON-файлах
- Закладається з першого дня — додавати i18n потім дорого

### 4.3 Вибір мови

- Автодетект з locale пристрою при першому запуску
- Override у settings
- Без вибору мови на onboarding — зайвий крок

### 4.4 Decimal separator

**Окреме від мови UI рішення** — залежить від системного locale, не від UI-мови:

- `uk-UA` locale → numpad показує `,`
- `en-US` locale → numpad показує `.`
- Юзер з українською локаллю + англійським UI бачить `,` — це коректно
- Внутрішньо завжди point: зберігаємо `60.5`, відображаємо за локаллю

### 4.5 Багатомовний exercise database

Системний (готовий) список вправ зберігається багатомовно:

```
{
  id: "bench-press",
  names: { en: "Bench press", uk: "Жим лежачи" },
  muscleGroups: ["chest", "triceps"],
  ...
}
```

- Юзерські кастомні вправи — тільки одна назва, без перекладу
- Юзерські нотатки — будь-якою мовою без перекладу

### 4.6 Що НЕ перекладаємо

- Юніти (`kg` лишається `kg`)
- Скорочення: `RPE`, `PR`, `RIR`
- Цифри
- Назви вправ у юзерських кастомних програмах

---

## 5. Privacy і монетизація

### 5.1 Модель: free, без реклами

- Усе free, без feature gating, без crippled-режиму
- Без реклами — не лягає на gym-context (потні руки, 5 секунд на сет, банер недоречний)
- Хобі-проєкт без тиску монетизації

### 5.2 Privacy-by-default

- Жодної телеметрії за замовчуванням
- Якщо колись додамо аналітику — opt-in, прозоро в settings, з можливістю вимкнути
- Crashlytics / Sentry — для технічних крашів, не для збору юзерських даних. Стандартна практика, юзери очікують
- Local-only автоматично означає що даних на сервері просто немає

### 5.3 Account deletion

- Local-only → "Delete all my data" в settings знищує локальну БД
- App Store вимога з 2022: якщо є accounts — має бути account deletion
- У нас accounts немає, тому достатньо локального wipe

---

## 6. Дистрибуція

### 6.1 App Store + Google Play

Обидва store-и потребують:

- Privacy policy (можна на сайті чи Notion-сторінці) — Apple перевіряє посилання
- Privacy disclosure у App Store Connect: для local-only — "no data collected"
- Account deletion — у нашому випадку local wipe в settings
- Підтримуючий email для review-команди
- Скріншоти, опис, ключові слова

### 6.2 Реалістичні очікування

- Один розробник, хобі-проєкт → 6–9 місяців до релізу обох store-ів
- Перший білд зазвичай завертає review-команда — закладати +2 тижні на review-цикли

### 6.3 Deep linking

Закладати з першого дня для майбутнього шарингу програм:

- URL-схема `gymtracker://import?routine=...` (custom scheme)
- Universal links / App Links (https-based) для надійного відкриття
- `react-native-url-scheme` або Expo Linking

Шаринг через JSON-аттач у пошті — теж робочий fallback, але deep link зручніше.

---

## 7. Інструменти і бібліотеки

### 7.1 Зафіксовано

- React Native (kросплатформа)
- `react-i18next` (локалізація)

### 7.2 Кандидати (TBD)

- **State management**: Zustand / Redux Toolkit / Jotai
- **Local DB**: WatermelonDB (recommended) / RxDB / op-sqlite
- **Forms**: React Hook Form
- **Animations**: Reanimated 3 (для жестів і таймерів)
- **Testing**: Jest + React Native Testing Library
- **Build**: Expo (managed workflow) vs bare RN — TBD
- **CI/CD**: EAS Build (якщо Expo) / Fastlane (якщо bare)
- **Crash reporting**: Sentry

### 7.3 Ще не вирішено

- Expo vs bare RN
- Чи використовувати React Native New Architecture (Fabric + TurboModules)
- Конкретний state management

---

## 8. Що зафіксовано — чеклист

- [x] Платформа: RN, iOS + Android
- [x] Storage: local-only, sync-ready фундамент
- [x] UUID v4, soft delete, timestamps на кожній сутності
- [x] Юніти: kg only для MVP, lb через user setting пізніше
- [x] Локалізація: English (base) + Ukrainian, i18n з першого дня
- [x] Decimal separator залежить від системного locale, не UI-мови
- [x] Багатомовні системні вправи: `names: { en, uk }`
- [x] Privacy-by-default: жодної телеметрії, жодних accounts
- [x] Free, без реклами, без paywall
- [x] Дистрибуція: App Store + Google Play, міжнародна
- [x] Deep linking з першого дня

---

## 9. Відкриті технічні питання

- Локальна БД: WatermelonDB чи альтернатива
- Expo (managed) чи bare RN
- State management library
- Мінімальні версії iOS / Android
- Стратегія міграцій схеми БД між версіями застосунку
- Exercise database: де брати seed-список (open-source бази типу wger, або власний)
- Чи потрібна синхронізація з Apple Health / Google Fit
