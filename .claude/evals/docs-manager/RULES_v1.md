# docs-manager rules — v1 rewrite (work in progress)

Running register of the rule set being rebuilt. v0 = the current
`.claude/agents/docs-manager.md`. Groups are reviewed in order; groups not yet
reviewed still hold their v0 content. IDs keep their v0 numbers for
traceability, so gaps in the numbering are expected.

Status: **all groups reviewed. 47 rules → 20.** Assembled candidate:
`DOCS_MANAGER_v1.md` (not yet installed — `.claude/agents/docs-manager.md` still
holds v0 so it can serve as the eval baseline).

## A. Role and monopoly — REVIEWED

| ID | Rule | Status |
|---|---|---|
| ~~R1~~ | ~~Sole authority for create / edit / update / delete / reconcile on project documentation~~ | **dropped** — already carried by the agent's frontmatter `description` and by the CLAUDE.md subagent table |
| ~~R2~~ | ~~No one else — main session or other agents — edits these files directly~~ | **dropped** — addressed to the main session, not to the agent; it lives in CLAUDE.md, where it already is |

Group A: 2 rules → 0. Replaced by a single framing line opening the prompt —
not a rule: *you maintain this project's documentation under `docs/`.*

## B. Scope — REVIEWED

| ID | Rule | Status |
|---|---|---|
| S1 | Scope is exactly one thing: the `docs/` directory | **rewritten** |
| ~~S2~~ | ~~`CLAUDE.md` anywhere and `.claude/**` are out of scope~~ | **dropped** — noise; with scope pinned to `docs/`, everything else is out by construction |
| ~~S3~~ | ~~On refusal, report that the target is out of scope~~ | **dropped** — same |
| ~~S4~~ | ~~`draft_docs/**` is read-only~~ | **dropped** |
| ~~S5~~ | ~~May read `draft_docs` as raw material for migration~~ | **dropped** |
| ~~S6~~ | ~~`docs/` states current state in its own words, no "per the old draft"~~ | **dropped** |
| ~~S7~~ | ~~Nothing is decided merely because the draft says so~~ | **dropped** |

Rationale for dropping S4–S7: `draft_docs/` is slated for deletion. Rules about
it would outlive the directory and rot inside the agent prompt. The draft's
existence and purpose stay documented **temporarily in `CLAUDE.md`** instead —
already present there, no change needed.

Group B: 7 rules → 1.

## C. Language and naming — REVIEWED

| ID | Rule | Status |
|---|---|---|
| N1 | All content is written in English, always | **simplified** — exception clause dropped |
| ~~N2~~ | ~~Existing non-English content is a defect; translate it during the edit~~ | **dropped** — covered by N1 |
| N3 | Filenames are UPPER_CASE (`README.md`, `API_INTEGRATION.md`) | v0 |
| N4 | Exception: files starting with `_` stay lowercase (`_pattern.md`) | v0 |
| ~~N5~~ | ~~Content files in `docs/` subdirectories carry an `NN_` ordering prefix~~ | **dropped** — prefix abandoned |
| ~~N6~~ | ~~Root standing files and `_pattern.md` carry no prefix~~ | **dropped** — moot without N5 |
| ~~N7~~ | ~~Rename a non-compliant existing file when touching it for another reason~~ | **dropped** — structural twin of N2 |

Group C: 7 rules → 3.

## D. Pattern files — REVIEWED

| ID | Rule | Status |
|---|---|---|
| ~~P1~~ | ~~`_pattern.md` describes the naming convention and the section skeleton~~ | **folded into P4** — a definition, needed only where the agent drafts a new pattern |
| P2 | A directory that has a `_pattern.md` → follow it exactly | **merged** from v0 P2 + P3 — looking a pattern up and obeying it are one act |
| P9 | Material that can't honestly take that pattern's skeleton doesn't belong under it — stop and ask instead of forcing it in. An invented `Overview`, or a closing section that exists only to say "None", is the signal that you forced it | **new** — added after C11 forced a glossary into the spec-zone skeleton |
| P4 | A directory that has none → ask whether it needs one, proposing a concrete draft with that directory's naming convention and section skeleton; act on the answer | **merged** from v0 P1 + P4 + P5 |
| P6 | A file that isn't part of a series of same-shaped documents needs no pattern; when editing it, follow its own existing structure | **redefined** from v0 P6 + P7, and absorbs P8 |
| ~~P8~~ | ~~Standalone from scratch — judgment, confirm if non-trivial~~ | **dropped** — duplicated A2, and A3 covers the risk that mattered |

Group D: 8 rules → 3.

The v0 definition of "standalone" was *a file with no siblings*, which broke
under the narrowed scope: `docs/` root holds three files side by side, so by the
letter of v0 the agent would have to ask for a `docs/_pattern.md` before touching
any of them. The redefinition keys on kind, not adjacency — a map, a question
tracker and a design pointer are three kinds; spec zone files are one kind.

Dropping "expected files" from v0's P1 also resolved a real conflict: P1 demanded
a roster of expected files while C4 forbade enumerating files that don't exist
yet.

## E. Content — current state only — REVIEWED

| ID | Rule | Status |
|---|---|---|
| C1 | Documentation describes ONLY the current, decided state | v0 |
| C2 | No historical narration: "we used to use X", "this replaces the old Y", version logs, mentions of superseded decisions | v0 |
| ~~C3~~ | ~~Exceptions: an explicit changelog/history section, or the user asks for history~~ | **dropped** |
| C4 | Never describe what doesn't exist yet — no roster of anticipated files, sections, or features. A rule states how content is named and structured whenever it gets created, not a forecast of what will be created; an illustrative format example is fine, a list of concrete future filenames is not | **merged** from v0 C4 + C5 + C6 |
| ~~C7~~ | ~~Stale historical content found during an edit is removed as part of that edit~~ | **dropped** — same opportunistic-fix pattern as N2/N7 |
| C8 | On conflicting docs the newer/confirmed decision wins; remove the superseded statement rather than annotating both | v0 |
| C9 | Never link to `draft_docs/` from content you write — state the fact in your own words instead of pointing at where you found it | **new** — narrow restoration of v0's S6 after C10 wrote dangling links into `OPEN_QUESTIONS.md` |

Group E: 8 rules → 5.

C9 is the one draft-related rule that had to survive the S4–S7 cull. The others
described how to *treat* `draft_docs/`; this one constrains what goes into
`docs/`, so it stays relevant after the directory is gone — the prohibition just
becomes vacuous rather than wrong.

## F. Project map — REVIEWED

| ID | Rule | Status |
|---|---|---|
| M1 | Maintain a single documentation map at `docs/INDEX.md` | **simplified** — create-if-missing clause dropped |
| M2 | The map lists every documentation directory and file with a one-line purpose | v0 |
| M9 | The map carries reading order: entries are listed in reading order, and a new file goes to its place in that order rather than being appended at the end | **new** — replaces the ordering that `NN_` used to encode |
| M3 | `docs/INDEX.md` is a map, not a summary: each entry is one short sentence stating what the file is *for* — never its content, structure, decisions, or rationale. Listing a file's sections is summarizing: `directory pattern: file naming and the section skeleton` is wrong, `the pattern every spec file follows` is right. Holds for entries that already exist — when an edit forces you to reword an entry, that entry was a summary: rewrite it as a pointer instead of patching the wording | **merged** from v0 M3 + M4 + M5 + M6, then rewritten twice under eval |
| M7 | Update `docs/INDEX.md` in the same turn whenever the set of documentation files changes, or a file's purpose changes — not when its content changes | **merged** from v0 M7 + M8 |

Group F: 8 rules → 5.

M3 carries, narrowly, the opportunistic-fix pattern that N2, N7 and C7 were
dropped for — map entries only, where the check is nearly mechanical. Evidence
from the C0 runs: without it a defective entry survives every edit that touches
it, and the abstract version of the rule ("run this test") did not survive
contact — only naming the failure mode and showing a wrong/right example did.

## G. Diagrams — REVIEWED

| ID | Rule | Status |
|---|---|---|
| D1 | Add a Mermaid diagram wherever a flow, sequence, or state transition reads better than prose — on your own initiative, without waiting to be asked | **rewritten** — replaces v0's five-type roster |
| D2 | Diagrams render top-to-bottom: `flowchart TD` / `graph TD`, never LR/RL/BT unless the user asks | v0 — kept in the agent, **removed from `_pattern.md`** so the agent is its sole carrier |
| D3 | One diagram, one flow; several small top-to-bottom diagrams beat one sprawling diagram | v0 |

D1 is the only rule in the whole set that tells the agent to *do* something
rather than not to. It needs an eval case of its own — initiative is the one
behaviour a rubric can't catch by checking what the agent must not produce.

## H. Workflow — REVIEWED

| ID | Rule | Status |
|---|---|---|
| ~~W1~~ | ~~Identify every file you'll touch, confirm scope~~ | **dropped** — restates S1 |
| ~~W2~~ | ~~Resolve the directory's `_pattern.md`, or the standalone file's structure~~ | **dropped** — restates P2/P3/P4/P7 |
| ~~W3~~ | ~~Make the change, applying current-state-only and the naming rule~~ | **dropped** — restates C1/N3 |
| ~~W4~~ | ~~Update `docs/INDEX.md`~~ | **dropped** — restates M7 |
| W5 | Report back concisely: what changed and why | **compressed** |

Group H: 5 rules → 1. The v0 workflow section introduced no constraint of its
own; it was a third place where every rule could drift out of sync with itself.

## I. Stop and ask — REVIEWED

| ID | Rule | Status |
|---|---|---|
| ~~A1~~ | ~~Directory without `_pattern.md` → ask, with a proposed draft~~ | proposed drop — duplicates P4 verbatim |
| ~~A2~~ | ~~Standalone from scratch, non-trivial structure → confirm~~ | proposed drop — duplicates P8 verbatim |
| A3 | A change that would delete content the user may still want → confirm before deleting | keep — the only rule in the whole set guarding against content loss |

## Open items

1. **`docs/spec/_pattern.md` breaks** — it is built on the `NN_` prefix: the
   naming section, the `00_FOUNDATIONS.md` example, and the cross-file reference
   format `02_IN_WORKOUT.md §3.2`. It also opens with a `## Purpose` section, and
   carries a "Content devices" section — neither is covered by the new P1. The
   `flowchart TD` line inside "Content devices" is now confirmed for removal
   (D2 owns it); the fate of the rest of that section is still open.
2. **Eval set needs rework** — RUBRIC M4/M5 and case C15 are built entirely on
   the `NN_` prefix. Two checks are also missing: D1 (diagram initiative) and M9
   (reading order in the map).

Closed:

- Root `README.md` is out of scope — the agent owns `docs/` only, and no rule is
  written for it. The file itself stays in the repo.
- Reading order is carried by `docs/INDEX.md`, stated explicitly as M9.
- `Bash` removed from the agent's tool list — no use for it once scope is
  `docs/`.

## Tally so far

v0: 47 rules → v1: 23.

A 2→0 · B 7→1 · C 7→3 · D 8→4 · E 8→5 · F 8→5 · G 3→3 · H 5→1 · I 3→1

Three rules came from eval rather than from the review pass: F/M3 was rewritten
twice before it changed behaviour, D/P9 and E/C9 were added after smoke runs
exposed gaps. Two of the three restore something the review had cut — evidence
that the cull went one step past the line in exactly two places out of 26.

Tools: `Bash` dropped, leaving Read / Write / Edit / Glob / Grep.
