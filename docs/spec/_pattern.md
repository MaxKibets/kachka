# docs/spec/ Pattern

Pattern file for `docs/spec/`. Every file in this directory follows the rules below; read
this before creating or restructuring any spec file.

## Expected files & naming

One file per product zone; add a zone file when a new part of the product needs its own
spec.

Naming: the project's UPPER_CASE rule — `NAME.md` (e.g. `FOUNDATIONS.md`). `_pattern.md`
itself is the exception to that rule.

## Zone file skeleton

```
# <Zone title>

> Scope: <one line — what this zone covers>. Map: docs/INDEX.md.
> Behavior only; the visual system is maintained in the Claude Design project.

## 1. Overview

<when/why the user is in this zone>

## 2. <Section title>

...

## N. <Section title>

## Deferred to v2   <!-- omit unless this zone postpones something past v1 -->
```

- **Header blockquote** — two fixed lines: the zone's one-line scope plus a pointer to the
  map, then the disclaimer line verbatim.
- **`## 1. Overview`** — always the first numbered section: user context, when/why the user
  is in this zone.
- **`## 2.` … `## N.`** — the zone's own sections: flows, screen structure, behaviors,
  rules. Titles and count are free per zone.
- **`## Deferred to v2`** — optional; when present, always last and unnumbered. Include it
  only when this zone genuinely postpones something past v1 — a section whose only content
  would be "None" is noise, so omit it otherwise.

## Numbering & cross-references

Section numbers are file-scoped — there is no global, cross-file §-numbering space.

- Same-file reference: `§3.2`.
- Cross-file reference: filename + local section, e.g. `IN_WORKOUT.md §3.2` — only when that
  section exists in the target file as it stands today. Section numbers are assigned when a
  file is written, so a number carried over from elsewhere points at nothing while still
  looking valid. When the target file doesn't exist yet, or its numbering can't be verified,
  cite the filename alone: `IN_WORKOUT.md`.

## Decisions and open items

A zone file's own text IS the locked/decided state for that zone — there is no separate
locked-decisions checklist, in the file or anywhere else. Anything else goes elsewhere:

- **Unresolved questions** → `docs/OPEN_QUESTIONS.md`, not the zone file.
- **Deferred scope** → the zone's own closing `## Deferred to v2` section.

## Content devices

Use whichever fits the content; mix freely within a section:

- **Reference tables** — enumerable structure: states, columns, actions.
- **Mermaid diagrams** — flows and decision trees.
- **ASCII screen mockups** in fenced code blocks — layout.
- **Numbered step lists** — procedures.
- **Bold-led rule bullets** — hard rules.

Write a rule's rationale inline, next to the rule it justifies — not split into a separate
rationale section.
