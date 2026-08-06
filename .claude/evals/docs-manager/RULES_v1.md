# docs-manager rules — v1 rewrite (work in progress)

Running register of the rule set being rebuilt. v0 = the current
`.claude/agents/docs-manager.md`. Groups are reviewed in order; groups not yet
reviewed still hold their v0 content. IDs keep their v0 numbers for
traceability, so gaps in the numbering are expected.

Status: **all groups reviewed. 47 rules → 26.** Assembled candidate:
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
| P4 | A directory that holds a series of same-shaped documents and no `_pattern.md` → stop and ask whether it needs one, proposing a concrete draft with that directory's naming convention and section skeleton; the requested file waits for the answer; act on the answer | **merged** from v0 P1 + P4 + P5, **retriggered after C20**; **made blocking after C21** — 2 of 3 runs wrote the file and asked alongside, and a file added ahead of the answer either predates the contract or silently becomes it |
| P10 | A directory receiving its first file is not a series yet: write the file, invent no pattern, ask nothing — report that the question arises once a second file of the same kind joins it | **new** — added after C20 |
| P6 | A file that isn't part of a series of same-shaped documents needs no pattern; when editing it, follow its own existing structure | **redefined** from v0 P6 + P7, and absorbs P8 |
| ~~P8~~ | ~~Standalone from scratch — judgment, confirm if non-trivial~~ | **dropped** — duplicated A2, and A3 covers the risk that mattered |

Group D: 8 rules → 5.

P4 and P6 contradicted each other for two sessions without either being wrong on
its own: P4 said "directory without a pattern → ask", P6 said "a file outside a
series needs no pattern", and every new directory starts as one file outside a
series. C20 hit it twice, and both runs chose P6 and defended the choice. P4 now
keys on the series rather than on the directory, and P10 names the case the
collision lived in.

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
| C2 | No historical narration: "we used to use X", "this replaces the old Y", version logs, mentions of superseded decisions. **Applies to your own edits**: when changing a rule, state the new rule only — no delta against what it replaced, no "now" against an unstated "before". Carries wrong/right example pairs | v0, **extended after C17** |
| ~~C3~~ | ~~Exceptions: an explicit changelog/history section, or the user asks for history~~ | **dropped** |
| C4 | Never describe what doesn't exist yet — no roster of anticipated files, sections, or features. A rule states how content is named and structured whenever it gets created, not a forecast of what will be created; an illustrative format example is fine, a list of concrete future filenames is not | **merged** from v0 C4 + C5 + C6 |
| ~~C7~~ | ~~Stale historical content found during an edit is removed as part of that edit~~ | **dropped** — same opportunistic-fix pattern as N2/N7 |
| C8 | On conflicting docs the newer/confirmed decision wins; remove the superseded statement rather than annotating both, and report what made it the winner | v0, **extended after C18** |
| C10 | When neither side is newer, confirmed, nor corroborated elsewhere in `docs/` — stop and ask which is current, quoting both. Not on file ownership, not on which value appears more often, not on plausibility: those name the authoritative file, never the decision. Carries the wrong-move example | **new** — added after C18 |
| C9 | Never link to `draft_docs/` from content you write — state the fact in your own words instead of pointing at where you found it | **new** — narrow restoration of v0's S6 after C10 wrote dangling links into `OPEN_QUESTIONS.md` |

Group E: 8 rules → 6.

C8 was a rule with a precondition and no else-branch. C18 seeded a conflict where
neither statement was newer or confirmed, so the precondition never held — and
rather than stop, the agent manufactured a criterion of its own (the file that
defines a field outranks the file that renders it). Reasonable, and unrelated to
which value the user actually chose. C10 is that else-branch.

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
| M3 | `docs/INDEX.md` is a map, not a summary: each entry is one short sentence stating what the file is *for* — never its content, structure, decisions, or rationale. Listing a file's sections is summarizing, in every directory rather than only the spec one; carries a spec-shaped and a non-spec wrong/right pair. Holds for entries that already exist — when an edit forces you to reword an entry, that entry was a summary: rewrite it as a pointer instead of patching the wording. A file that gains content keeps its purpose: don't append the new topic to its entry | **merged** from v0 M3 + M4 + M5 + M6, rewritten twice under eval, **generalised after C20** |
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
| A3 | A change that would delete content the user may still want → confirm before deleting. Content that moves somewhere else intact isn't lost: a fold needs no confirmation, only an accurate report of where it went | keep — the only rule in the whole set guarding against content loss; **the fold clause added after C19** |
| A4 | Removing a file is `rm <path>`, and that single command is the whole reason `Bash` exists in the tool list. Remove a file only once the content has moved or is being dropped with confirmation, and in the same turn drop the map entry and repoint every reference. Never leave an unreferenced file on disk | **new** — added after C19; **narrowed to `rm` at the end of session 4** |
| ~~A5~~ | ~~`Bash` also reads git history when a conflict turns on which statement is newer~~ | **dropped** — see below |

A5 lived for one session. It was written to legalise what the C18 runs already
did — read git to satisfy C8's "newer wins" — and the C8 regression showed the
grant was the problem, not its wording: given git, the agent found `git checkout`.
The rule it was propping up never needed it. Git dates when a line entered a file,
and a migration commit stamps everything it moved with one date, so it cannot
answer "which decision is current" — in C18 it returned "silent" both times it was
consulted and produced a false claim once. C8 now states where "newer" comes from
(the task, or what the documents mark as decided) and names history as
non-evidence; C10 catches everything left over, 5 runs for 5.

Group I: 3 rules → 2. `Bash` is `rm` and nothing else.

**And the word `git` left the prompt entirely.** The first pass at removing the
grant still explained *why* git was the wrong oracle — two paragraphs of it, plus
a clause in C8 naming commit history as non-evidence. All of it argued against a
capability the agent no longer has, and naming a tool is how you put it in reach:
the prompt would have been the only place the agent learned that a repository
exists. C8 now states its two sources positively and stops there. Nothing in the
prompt mentions git, and `git-manager` owns that territory unmentioned — the
subagent table in `CLAUDE.md` is where boundaries between agents belong, not in
each agent's own prompt.

## Open items

1. **C13 has never run.** The harness classifier refuses to spawn a subagent whose
   prompt asks it to edit `.claude/agents/*`, so the one case that proves dropping
   v0's S2/S3 was safe needs an interactive session.
2. **The `Bash`-narrowing and C8's evidence clause are banked, not verified.** The
   cache held the previous edition for the rest of session 4. Both need a cache
   check, then C19 (deletion still works through plain `rm`) and C18 against a
   deliberately dirty tree (no git reached for at all).

Closed:

- **The whole register is verified except C13.** P4's blocking clause ran 3/3 on
  C21 and I/A5 ran 2/2 on C18, both in the session that wrote them — the cache
  refreshed within minutes, which the check caught.

- Everything session 3 left unverified ran clean in session 4: D/P4 and D/P10
  (C20 3/3, C21 3/3 once the fixture was a real series), E/C10 (C18 3/3, a
  straight reversal of session 3's fail 3/3), F/M3's generalisation (C20 3/3
  outside `docs/spec/`), and I/A3's fold clause with I/A4's delete path (C19 —
  the file left the tree).

- The report duty for P4's negative branch was considered and declined: the agent
  judges "not a series" correctly and silently, and the report is for what
  changed.

- I/A3's structural trigger and the E/C2 extension both ran clean 3/3 in session
  3 — the two rules the previous session could not verify.

- `docs/spec/_pattern.md` was rebuilt for the new rules: `NN_` prefix gone,
  `## Purpose` gone, the `flowchart TD` line removed from Content devices,
  `## Deferred to v2` made optional, and the cross-reference rule now states
  where the section number comes from.
- Eval set reworked: `NN_`-based checks dropped, checks added for reading order
  and diagram initiative, and a reconciliation tier (C17–C20) written.

- Root `README.md` is out of scope — the agent owns `docs/` only, and no rule is
  written for it. The file itself stays in the repo.
- Reading order is carried by `docs/INDEX.md`, stated explicitly as M9.
- `Bash` removed from the agent's tool list — no use for it once scope is
  `docs/`.

## Tally so far

v0: 47 rules → v1: 26.

A 2→0 · B 7→1 · C 7→3 · D 8→5 · E 8→6 · F 8→5 · G 3→3 · H 5→1 · I 3→2

Nine rules were changed by eval rather than by the review pass: F/M3 (rewritten
twice before behaviour moved, then generalised beyond spec entries), D/P9 and
E/C9 (added after smoke runs exposed gaps), I/A3 (trigger made structural, then
given a fold clause), E/C2 (extended to the agent's own edits), and four written
in session 3 — D/P4 + D/P10, E/C10, I/A4. Two of them restore something the
review had cut; the rest close cases no rule had named.

The set has grown for three sessions running, and every addition has the same
shape: a rule that was right in general met a case it did not name. The count is
not the metric — 47 unreviewed rules and 26 case-driven ones are different kinds
of object.

One pattern runs through all five: **the abstract statement of a rule was never
what changed behaviour.** M3 started working once it carried a wrong/right pair;
P9 once it named the tell ("a section that exists only to say None"); C2 once it
showed the exact sentence shape to avoid. Generalisation and worked example are
not interchangeable here — the example is what transfers.

Tools: Read / Write / Edit / Glob / Grep / Bash. `Bash` was dropped in the v1
review as having no use once scope was `docs/`, and restored after C19 for the
one use the review missed: nothing else in the tool set can remove a file, so
without it the agent could fold a file's content away, repoint every reference,
drop its map entry — and still leave the empty file sitting there. A4 is what
keeps the restoration narrow.
