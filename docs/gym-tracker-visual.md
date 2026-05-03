# Gym Tracker · Visual System

> Робочий контракт по візуальному стилю v1. Палета, типографіка, density, компонентні патерни. Джерело істини для UI імплементації. Тюніться по мірі мокапів інших екранів.

**Status**: v0 working draft — foundation locked, refinement очікується після мокапів Today / History / Builder / Profile.

**Версія**: v0.1 · initial fix після In-workout мокапу

Читати разом з `gym-tracker-spec.md` (UI/UX поведінка) і `gym-tracker-tech.md` (платформа, локалізація). Spec — що відбувається. Цей доку­мент — як це виглядає.

---

## 1. Foundation

### 1.1 Mood

**Utility data-dense.**

- Інформація > хром. Максимум корисних даних на екрані за раз без хаосу.
- Числа — пріоритет. Пропорційний шрифт для тексту, моноширинний для всього що user логує/читає як дані (вага, повтори, RPE, тривалість, тоннаж, час, дата).
- Поверхні легкі: тонкі borders або subtle surface-ladders замість важких shadows.
- Декоративних gradient-ів, illustrations і character chrome у робочих екранах немає.
- Mood-референс — Hevy / Strong (щільність, читабельність на бігу). Це референс на **філософію**, не на візуальний імідж — per spec §1, власна візуальна мова, не клонуємо.

### 1.2 Brand identity

Назва **Kachka** — гра слів: качка (птаха) + сленгове "качалка" / "качатися" (gym / тренування). "Відкрити Качку" = "піти качатися". Назва водночас і об'єкт, і дія.

Бренд живе в:

- назві
- app icon (mascot-orientована)
- splash screen
- onboarding
- empty states (Today first launch, History empty, Exercise database empty)
- About section
- mallard-rooted палеті (тримає бренд видимим навіть коли mascot не на екрані)

Бренд НЕ живе в робочих екранах: In-workout, Builder, History list/detail, Profile body, nav-меню, action sheets.

### 1.3 Mascot scope

**Bounded** per вибір сесії візуального стилю.

- Mascot character з'являється лише в bounded зонах вище (1.2).
- Persistent presence у logging UI = заборонено.
- Celebratory presence (PR / finish moments) — кандидат на v2, поки не входить.

Деталі mascot character (стиль ілюстрації, експресивність) — окрема сесія, див. §9.

---

## 2. Color

Усі токени — для dark theme (mandatory per spec §1). Light тема — system fallback, не пріоритет; буде окремою прохідкою.

### 2.1 Surface ladder

| Token | Hex | Use |
|---|---|---|
| `surface.canvas` | `#0A0F0E` | App background, status bar, bottom action bar, modal background |
| `surface.1` | `#131A18` | Primary cards (exercise card, group card, profile sections) |
| `surface.2` | `#1C2521` | Active row background, raised secondary surfaces |
| `surface.3` | `#28332E` | Tile inputs (active kg/Reps cells), interactive hover, focus rings |
| `border.subtle` | `rgba(255,255,255, 0.04–0.06)` | Card outlines |
| `border.divider` | `rgba(255,255,255, 0.05)` | Set row separators, list dividers |

Всі поверхні мають легкий teal-tint (вкорінений у mallard). Це не нейтрально-сірий — це холодно-зелений-сірий.

### 2.2 Brand colors

| Token | Hex | Use |
|---|---|---|
| `brand.mallard` | `#1F6E5C` | Primary brand, success, done states, group left-border, secondary CTA |
| `brand.amber` | `#F2A53A` | Accent, active focus, primary CTA, "current" indicator |
| `brand.mallard.dim` | `#163E36` | Mallard fills нижчого контрасту (selected chip фон, badge background) |
| `brand.amber.dim` | `#C9821F` | Amber pressed/active states |

**Two-color brand-system.** Mallard = primary, amber = accent. Окремих primary blue / generic green / red не вводимо — це б розмило дук-ідентичність.

### 2.3 Text

| Token | Hex | Use |
|---|---|---|
| `text.primary` | `#F1F5F4` | Body text, headings, active set values |
| `text.secondary` | `#8A9A95` | Subtitles, meta info ("Working set 3 of 4"), inactive labels |
| `text.tertiary` | `#5D6B66` | Disabled, placeholders, ghost prev values, column headers |

Усі text-токени мають той самий cool-neutral tint що пасує до mallard surfaces.

### 2.4 Semantic — TBD

Конфлікти, які треба розрулити в наступній ітерації:

- success → mallard (вже primary) — OK, перевикористовуємо
- warning → amber (вже accent — конфлікт із CTA pattern)
- danger → ?
- info → dusty blue (вже letter A — конфлікт)

Спочатку перевіряємо, чи semantic states потрібні в робочих екранах v1, потім резервуємо/перевикористовуємо.

### 2.5 Letter rotation (superset groups)

Послідовність: A → B → C → D → E. Після E — wrap до A. Constraint per spec §6 — до 5 вправ у групі — отже 5 кольорів вистачає без повторів.

| Letter | Color | Hex |
|---|---|---|
| A | Dusty blue | `#5C7B95` |
| B | Ochre | `#C29548` |
| C | Plum | `#7B4257` |
| D | Sage | `#87A07B` |
| E | Rust | `#B85842` |

Палета з wetland / bird спектру, навмисно віддалена від mallard primary і amber accent — щоб chip-літера не плуталась з brand-кольорами на побіжному погляді.

**Letter chip** (на групі і на вправі в групі):

- Solid colored fill, square, `24×24`, `border-radius: 6`
- Текст: `#0A0F0E` (dark on color), Inter weight 500, font-size 13

**Tinted letter** (для next-exercise indicator collapsed-рядка):

- Background: `rgba(letter, 0.15)`
- Border: `0.5px solid rgba(letter, 0.5)`
- Текст: letter color сам, weight 500

---

## 3. Typography

### 3.1 Families

| Role | Family | Fallback | License |
|---|---|---|---|
| Body / UI / headers | **Inter** | system-ui, -apple-system | OFL |
| Numbers / data | **IBM Plex Mono** | ui-monospace, Menlo | OFL |

**Чому Inter**: neutral, dense, повна кирилиця, OpenType `tnum` для tabular figures, де-факто стандарт для utility-dense UI (Linear, Vercel, Notion).

**Чому IBM Plex Mono** (а не JetBrains Mono): тепліша, гуманістична, краще пасує до Mallard-палети. JetBrains Mono — суворіший code-editor вайб, конфліктував би з brand-теплом.

### 3.2 Where to use mono

Plex Mono використовується ВСЮДИ де відображаються дані які user логує або читає як числа:

- Вага, повтори, RPE
- Тривалість, тоннаж
- Сет-номера, set count
- Час (timer, elapsed), дата (числова частина)

Не-числова meta типу `Round 2 of 3 · Rest 90s` — числа inline у Plex Mono (`<span class="num">…</span>`), решта в Inter.

### 3.3 Scale (mobile, working values)

| Role | Font | Size | Weight | Use |
|---|---|---|---|---|
| Title / screen header | Inter | 17 | 500 | "Push A", screen titles |
| Section heading | Inter | 16 | 500 | Exercise name |
| Group heading | Inter | 14 | 500 | "Superset", "Dumbbell row" inside group |
| Body | Inter | 14 | 400 | Default text |
| Meta / subtitle | Inter | 12 | 400 | "Working set 3 of 4", subtitles |
| Caption | Inter | 11 | 400 | Column headers, status meta |
| Number large | Plex Mono | 17–18 | 500 | Active set values, timer |
| Number medium | Plex Mono | 15–16 | 400 | Set values (kg, Reps) |
| Number small | Plex Mono | 12–14 | 400 | Set numbers, prev values, meta numbers |

OpenType: для Inter примусово вмикаємо `tnum` (tabular figures) щоб inline-числа в meta-рядках не "стрибали" по ширині.

---

## 4. Layout & density

- Базова сітка **4px**. Padding/margins кратні 4 (4, 8, 12, 16, 20, 24, 32).
- Min touch target — `44×44pt` iOS / `48×48dp` Android (per spec §1: одна рука, потіє).
- Card radius scale: `14` (exercise/group cards), `12` (CTA, large buttons), `10` (timer chip), `8` (input tiles, secondary buttons), `6` (letter chip), `50%` (✓ button).
- Card outline: `0.5px` subtle alpha-white border. **Без shadows.**

### 4.1 In-workout метрики

- Set row height: `52px` (active) / `44px` (done / pending), 8–10px vertical padding.
- Set row grid: `32px [Set#] | 1fr [Prev] | 78px [kg] | 60px [Reps] | 40px [✓]` з 8px gaps, 14px horizontal card padding.
- Exercise card: ~280–320px tall з 4 сетами + add-set button.

### 4.2 Spacing rhythm

- Card-to-card vertical: `10px`
- Section header (e.g. day in History) margin: `16px` top, `8px` bottom
- Bottom action bar: `64px` tall, `12px` top, `18px` bottom (iPhone home indicator clearance — узгоджується через safe area при імплементації)
- Screen horizontal padding: `12px` (зовні exercise card-у) — карти доповнюють до `26px` ефективного inset для контенту

---

## 5. Component patterns

### 5.1 Set row states

| State | Treatment |
|---|---|
| **Done** | Opacity `0.5–0.55` на всі значення. ✓ у solid mallard `#1F6E5C` circle (`28×28` головний / `24×24` в групі), іконка `#0A0F0E` strokeWidth 3.2 |
| **Active** | Full row width, top + bottom amber `rgba(242,165,58, 0.4)` borders, surface-2 фон, amber `#F2A53A` set number weight 500. kg/Reps cells = "tile": surface-3 фон, radius 8, padding 6×0, Plex Mono Medium 17. Empty active circle: `1.5px solid #F2A53A`, transparent fill |
| **Pending** | Opacity 1.0, але всі значення в `text.tertiary`. Empty pending circle: `1px solid #2C3833`, transparent fill |
| **Failed reps (0)** | Дозволено per spec §7. Візуальний trigger TBD |
| **Warmup** | Per spec §8 — set actions через тап на номер. Візуальний trigger TBD |

### 5.2 Group active row consistency

Active set row всередині групи має ідентичне structural treatment, що й поза групою:

- Full card width
- Top + bottom amber borders, **без бічних бордерів**, **без round corners**
- Surface-2 background

Структурна консистентність важливіша за "ізоляцію" групи. Letter chip + лівий 3px mallard border на самій group card вже несуть group-affordance — додаткова рамка на active row була б перенавантаженням.

### 5.3 Cards

| Card | Spec |
|---|---|
| Exercise card | `surface.1` фон, `0.5px` subtle border, radius 14. Header padding `12×14`, body padding `0×14` |
| Group card | `surface.1` фон + `3px solid mallard` left-border. Top/right/bottom — звичайний `0.5px` subtle border |
| Profile section | `surface.1` фон, radius 14 |

### 5.4 Buttons

| Type | Spec |
|---|---|
| **Primary CTA** | `bg: #F2A53A`, `color: #0A0F0E`, weight 500, radius 12, padding `12×18`, chevron-right SVG після тексту. Pressed: `bg: #C9821F` |
| **Secondary** | Transparent bg, `0.5px dashed #2C3833` border, `color: #8A9A95`. Compact, неагресивний (e.g. Add set) |
| **Icon button** | Transparent bg, padding 6, `color: currentColor` від батьківського text-токену. Tap target `32×32` |

### 5.5 Inputs

- **Tile input** (active set kg/Reps): surface-3 фон, radius 8, Plex Mono Medium 17. Custom numpad на focus per spec §7
- **Edit-pencil**: тонка `12–13px` line icon у `text.tertiary` — affordance біля editable text

### 5.6 Chips & badges

- **Letter chip**: див. §2.5
- **Tinted letter**: див. §2.5
- **Timer chip** (header): `surface.1` фон, `0.5px` subtle border, radius 9, padding `6×10`, Plex Mono Medium 16

### 5.7 Action sheets

Per spec §1 — usі menus та confirmations через bottom sheets. Деталі візуалу контейнера, divider, destructive-кнопки — TBD у мокапі sheets.

---

## 6. Iconography

**Working choice**: thin-line, weight `1.8–2px`, rounded `line-cap` і `line-join`. Lucide-style.

- Розмір: `16–20px` у компактних місцях, `24px` у hero контекстах, `12–13px` для inline modifier-affordance (edit-pencil)
- Color: inherit from `currentColor`
- Без filled / duotone icons у v1
- Бібліотека-кандидат: **Lucide** (RN-сумісна, OFL). Підтвердити при імплементації — альтернатива Phosphor (теж OFL, RN-сумісна, має кілька варіантів ваги)

Icons потрібні для: back, edit, ⋮ (3 dots), checkmark, plus, chevron (right/down/up), close, search, filter, share, settings, info. Muscle-group icons — TBD (можливо текст-only достатньо).

---

## 7. Motion

TBD у наступній ітерації. Очікувані принципи:

- **Easing**: `ease-out` для появи, `ease-in-out` для transitions, `ease-in` для зникнення
- **Durations**: 150ms tap feedback, 220ms component state, 300ms screen transitions
- **Що анімується**: state transitions (set done/active), sheet open/close, screen push/pop, rest timer countdown ring, pull-to-cursor chip
- **Що НЕ анімується**: data updates, list reorderings — без artificial delay
- **Haptics**: per spec — rest haptic ON by default, sound OFF

Конкретні токени фіксуємо коли будемо мокати rest timer і sheets.

---

## 8. Empty states

TBD у наступній ітерації, тісно зв'язано з §9 (mascot character).

Зони які потребують empty state:

- Today first launch (per spec §3.1.b — single CTA)
- History без записів
- Exercise database без custom вправ
- Search no-results (з inline `Create as 'X'` per spec §11)

Стиль: stylized mascot illustration + 1–2 рядки microcopy (тон playful але не Duolingo-ниючий) + optional CTA.

---

## 9. Mascot character

**Status: TBD — окрема сесія.**

Це самостійна artistic-задача, не вирішується в межах системи токенів.

Vision: bounded mascot per scope §1.3. Стиль під вибір серед: flat geometric / modern flat illustration / thin-line minimal. Виходи:

- App icon (1024px master, всі size variants iOS/Android)
- Splash + onboarding hero
- Empty state ілюстрації (§8)
- About section accent

Не плануємо: full character system з reactions, mascot-driven onboarding tour (Duolingo-патерн), persistent in-workout presence.

---

## 10. Open items

| Item | Priority | Note |
|---|---|---|
| Мокапи інших екранів (Today, History, Builder, Profile) | High | Валідувати систему на простіших layouts і виявити gaps |
| Action sheets style | High | container, divider, destructive button pattern |
| Custom numpad style | High | окремий компонент, своя сітка кнопок (per spec §7.2) |
| Semantic colors | Medium | Resolve конфлікти з brand і letter palette |
| Iconography library lock | Medium | Lucide vs Phosphor, підтвердити при імплементації |
| Motion specifics | Medium | конкретні easing / durations |
| Set actions visual (warmup, RPE, note, delete) | Medium | per spec §8 |
| Mascot character | Low | окрема сесія |
| Empty state illustrations | Low | після mascot |
| Light theme tuning | Low | system fallback, не пріоритет |
| Token export | Low | JSON / TS / CSS variables — коли імплементація почнеться |
