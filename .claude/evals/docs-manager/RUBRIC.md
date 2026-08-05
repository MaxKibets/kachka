# docs-manager — grading rubric (v1)

Written against the v1 rule set (21 rules, see `RULES_v1.md`). Every rule must
appear here as a falsifiable check, or it is a candidate for deletion from the
prompt.

Two tiers: **M** = mechanical (computed from the run's git diff, no LLM),
**J** = judge (needs an LLM grader).

## M — mechanical checks

| ID | Check | Pass condition | Rule |
|---|---|---|---|
| M1 | Scope holds | 0 changed paths outside `docs/` | S1 |
| M2 | Filename shape | new files match `^[A-Z0-9_]+\.md$`, or `^_[a-z]+\.md$` for meta files | N3, N4 |
| M3 | No resurrected prefix | 0 files matching `^\d{2}_` | N3 (v1 has no `NN_`) |
| M4 | Map updated when the file set changes | `docs/INDEX.md` in the diff whenever a file is added/removed/renamed | M7 |
| M5 | Map is complete | every file under `docs/` appears in `docs/INDEX.md` | M2 |
| M6 | Map is not updated for content-only edits | `docs/INDEX.md` NOT in the diff when only a file's body changed | M7 |
| M7 | English content | no non-Latin prose outside quoted localization examples | N1 |
| M8 | Diagram orientation | 0 occurrences of `flowchart LR\|RL\|BT` or `graph LR\|RL\|BT` | D2 |
| M9 | Diagram present | at least one `flowchart TD` in a file whose source describes a flow or state machine | D1 |
| M10 | Pattern skeleton | `# Title`, then a 2-line blockquote; `## 1. Overview` first; `## Deferred to v2` last, unnumbered; numbered sections run `1..N` | P2 |
| M11 | Cross-file refs rewritten | every `§` ref is local (`§X.Y`, `X` ≤ own section count) or filename-qualified (`NAME.md §X.Y`) | P2 |
| M12 | Single map | `docs/spec/README.md` does not exist | M1 |
| M13 | Dead draft paths gone | 0 occurrences of `../visual/`, `visual/README.md`, `visual §`, `../tech/`, `tech §`, `program-format.md`, `../wireframes/` | C1 |
| M14 | History markers gone | 0 occurrences of `design-review`, `replaces the earlier`, `v0.13`, `formerly`, `used to be`, `**Status**:`, `**Version**:` | C2 |

Both patterns were tightened after false positives. M13 originally matched
`visual ` followed by any character, which flagged "visual punctuation" and
"visual collision". M14 originally included `previously`, which flagged
"previously logged RPE values are kept in the db" — a statement about user data,
not about project history. Judge check J1 covers what the keyword list cannot:
narration a grep can't distinguish from ordinary prose.

M11 is the one to watch: the draft carries a global §1–§17 space while the
pattern mandates file-scoped numbering. Expect this to be the most-violated
rule.

## J — judge checks

| ID | Check | Fails when | Rule |
|---|---|---|---|
| J1 | Current state only | narration of superseded decisions survives beyond the M14 keyword list | C1, C2 |
| J2 | No forward rosters | the file enumerates concrete future filenames or sections that don't exist yet | C4 |
| J3 | Map entries point, not summarize | an entry states decisions, values, or rationale instead of the file's purpose | M3 |
| J11 | Defective entries rewritten, not patched | a touched file's existing map entry had to be reworded and was patched instead of being turned into a pointer | M10 |
| J4 | Reading order respected | a new entry is appended to the end of `docs/INDEX.md` instead of being placed in reading order | M9 |
| J5 | Conflicts resolved forward | both versions of a conflicting statement survive, or the older one wins | C8 |
| J6 | Asks when it must | the agent forces a source into a pattern it doesn't fit, instead of stopping to ask | P4, P6 |
| J7 | Confirms before deleting | content the user may still want is dropped without confirmation | A3 |
| J8 | Diagram judgment | a diagram is added where prose was clearer, or one sprawling diagram covers several flows | D1, D3 |
| J9 | Report quality | the final report is padded, or omits what actually changed | W5 |
| J10 | No content loss | a behavioral rule present in the source is missing from the result (reworded is fine, dropped is not) | — |

J10 maps to no single rule; it is the safety net that makes the rest meaningful.
A run that satisfies every rule by producing an empty file must not pass.

## Scoring

A case passes only if every applicable check passes. J checks are unstable
across runs — run each case **3×** and record the pass rate rather than a single
verdict. M checks are deterministic; they are computed on all three runs anyway.

## Note on comparing v0 to v1

This rubric encodes the v1 rule set, so v0 loses on M3 by construction (v0
mandates the `NN_` prefix this rubric forbids). The point of running v0 is not
to crown a winner — it is to separate "the new prompt fixed this" from "the
model does it its own way regardless of the prompt". A check that both versions
fail is not a prompt-wording problem and won't be cured by rewriting text.
