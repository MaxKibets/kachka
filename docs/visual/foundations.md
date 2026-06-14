# Foundations · mood, brand & positioning

> Mood, positioning, brand personality, tone of voice, brand identity and mascot
> scope (§1) — the strategic layer the rest of the visual system derives from.
> Part of the Kachka v1 visual system — full map and §-index: [visual map](README.md).
> Read together with `../spec/foundations.md` (behavior) and `../tech/README.md`
> (positioning, distribution, localization).

---

## 1. Foundation

Kachka has **two mood levels** that must not be conflated: the *product UI mood*
of the working screens (§1.1) and the *brand personality* that lives only in the
bounded brand zones (§1.3, §1.6). The working screens stay dry and utilitarian;
the brand gets its warmth and character in a few bounded surfaces. The split is
deliberate — see §1.3.

### 1.1 Mood — product UI

**Utility data-dense.** Governs the working screens (In-workout, Builder, History,
Profile body, sheets).

- Information > chrome. Maximum useful data on screen at once without chaos.
- Numbers are the priority. Proportional font for text, monospace for everything the user logs/reads as data (weight, reps, RPE, duration, tonnage, time, date).
- Surfaces are light: thin borders or subtle surface-ladders instead of heavy shadows.
- No decorative gradients, illustrations, or character chrome in working screens.
- Mood reference — Hevy / Strong (density, on-the-go readability). This is a reference to the **philosophy**, not the visual image — per spec §1, our own visual language, we don't clone.

### 1.2 Positioning

**The empty quarter: data-dense *and* characterful.**

The gym-tracker market splits along two axes — *simple logger ↔ data-dense* and
*sterile / pure-utility ↔ characterful / warm*:

- Utility trackers (Hevy, Strong, Fitbod) cluster in *data-dense + sterile* — powerful tables, no brand.
- Characterful apps (Ladder, Centr; Duolingo outside the niche) sit *characterful* but not data-dense.
- The *data-dense + characterful* quarter is empty.

Kachka targets that quarter: a tool as dense and fast as Hevy / Strong, but with a
brand the sterile competitors lack. The differentiator is **not features — it is
brand warmth**, delivered through the bounded duck (§1.6) without costing data
density (the mascot never appears in working screens).

### 1.3 Brand personality — "Tool + spark"

Two levels, a deliberate contrast:

- **Working screens** (In-workout, Builder, History, Profile body, sheets) — dry, functional, utility data-dense (§1.1). No character, no duck, no decoration.
- **Brand zones** (app icon, splash, onboarding, empty states, About) — the carriers of character and warmth, through the mallard duck. A deliberate contrast with the working screens.

The duck is characterful but **bounded**: it provides the spark, it does not take
over the product. This is what lets Kachka sit in the empty quarter (§1.2) without
diluting the utility mood.

### 1.4 Tone of voice

**Concise and upbeat.** Applies to microcopy in the brand zones: empty states,
onboarding, About, share texts, tagline.

- Short, light energy, action verbs. The tagline is the benchmark: "Get lifting." / "Качайся."
- **Not**: whiny / Duolingo-style pleading, overwrought emotion, motivational tirades, exclamation spam.
- In working-screen UI labels the voice is neutral-instrumental, not upbeat — the brand voice is bounded to the brand zones, like the mascot.

### 1.5 Brand identity

The name **Kachka** is a play on words: качка (the bird) + the slang "качалка" /
"качатися" (gym / working out). "Open Kachka" = "go work out". The name is both an
object and an action at once.

The brand lives in:

- the name
- the app icon (mascot-oriented)
- splash screen
- onboarding
- empty states (Today first launch, History empty, Exercise database empty)
- About section
- the orange accent (drake's bill / feet) — keeps the brand visible even when the mascot is not on screen

The brand does NOT live in working screens: In-workout, Builder, History
list/detail, Profile body, nav menu, action sheets.

### 1.6 Mascot scope

**Bounded** per the visual-style session decision.

- The mascot character appears only in the bounded zones above (§1.5).
- Persistent presence in the logging UI = forbidden.
- Celebratory presence (PR / finish moments) — a candidate for v2, not included yet.

Mascot character details (illustration style, expressiveness) — a separate
session, see §9.
