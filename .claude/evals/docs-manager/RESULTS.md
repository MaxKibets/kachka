# Eval results

Prompt under test: v1 (21 rules), installed at `.claude/agents/docs-manager.md`.
v0 baseline recoverable via `git show 070dac6:.claude/agents/docs-manager.md`.

## C0 — update the pattern · v1 · run 1

Ran in the main working tree (its output is the seed state every later case
needs). Changed `docs/spec/_pattern.md` and `docs/INDEX.md`, nothing else.

| Check | Result | Note |
|---|---|---|
| M1 scope | pass | only `docs/` touched |
| M6 map not updated for content-only edits | **fail** | `docs/INDEX.md` was edited although only `_pattern.md`'s body changed, not its purpose |
| M7 English | pass | |
| M14 history markers | pass | no "previously"/"Status:"/"Version:" residue; the dropped prefix is gone rather than narrated |
| J1 current state only | pass | |
| J3 map entries point, not summarize | **fail** | see below |
| J9 report | pass, borderline | accurate and it flagged its own out-of-ask change, but padded |

Unasked change, correctly made: the agent also rewrote the cross-reference
example `02_IN_WORKOUT.md §3.2` → `IN_WORKOUT.md §3.2`, reasoning that leaving it
would make the file contradict itself one section later. It named this in the
report rather than slipping it in.

### Finding 1 — the map entry defect was reproduced, not fixed (J3)

Before: `directory pattern: purpose, file naming, and the section skeleton every spec file follows`
After:  `directory pattern: file naming and the section skeleton every spec file follows`

Both enumerate the file's *sections*, so both are summaries. M3's own test —
"if an entry would need to change every time someone tweaks something inside the
file, it is summarizing instead of pointing" — had just fired: the entry needed
changing precisely because the file's insides changed. The agent applied the
edit and never applied the test.

A pointing entry (`directory pattern every spec file follows`) would have been
stable forever, and M6 would then have passed too — the two failures are one
failure.

M3 as written governs entries the agent *writes*. It never says to re-check an
entry that already exists.

### Finding 2 — dropped opportunistic-fix rules have a visible cost

`docs/spec/` now has no purpose statement anywhere: `## Purpose` was removed from
the pattern (as asked), and `docs/INDEX.md` has a `## docs/spec/` heading with no
one-line description under it. M2 requires every *directory* to carry a one-line
purpose in the map, so the map is now incomplete.

The agent noticed the gap and raised it in its report instead of fixing it —
which is exactly right under v1, since C7/N2/N7 (fix defects you encounter) were
all dropped. This is the predicted price of that reduction, showing up on the
first run.

## Resolution

Rule **M10** added to the map section: run the test against an existing entry
whenever you touch its file, and rewrite rather than patch when it fails.
`CLAUDE.md`'s subagent table updated to the narrowed scope in the same change.

Finding 2 stands open by design — `docs/spec/` still has no purpose line in the
map. M10 covers entries that exist; a *missing* directory entry is a different
gap, and fixing it wasn't asked for. It is the natural first case of the next
run.

C0 must be re-run against v1+M10 before the rest of the set: its result is the
seed state for every later case, and it was produced by the pre-M10 prompt.

## C0 — run 2 · v1 + M10

Tree reverted to `070dac6` first; same prompt verbatim.

**M10 changed nothing.** The `docs/INDEX.md` diff is byte-identical to run 1 —
same blob hash, `c6c6977..4adb1fb`. The entry was patched to
`directory pattern: file naming and the section skeleton every spec file
follows`, exactly as before. J3 and J11 both fail.

Why the rule didn't bite: M3 forbids an entry stating a file's "content, its
decisions, or the reasoning behind them". Listing a file's *sections* doesn't
obviously fall under any of those — naming the structure reads, to the agent, as
describing what the file is for. So M10's test never appears to fail from the
inside, and M10 never fires. The rule is abstract and self-referential; the
agent has to first agree the entry is a summary before the instruction to
rewrite it applies.

**Second observation — case wording is ambiguous.** Run 1 kept the Mermaid
bullet minus its `(flowchart TD)` parenthetical; run 2 deleted the whole bullet.
Both are honest readings of "drop the `flowchart TD` bullet". That is noise in
the case, not signal about the agent — the C0 prompt needs rewording to say which
is meant. It also confirms the 3× rule from the rubric: one run per case would
have read this variance as a behavioural difference.

### Proposed fix — replace the abstract test with a concrete example

Abstract rule plus self-check has now failed twice. Name the specific failure
mode and show the before/after inline:

> It is a map, not a summary. Each entry is one short sentence stating what the
> file is *for* — never its content, its structure, its decisions, or the
> reasoning behind them. Listing a file's sections is summarizing:
> `directory pattern: file naming and the section skeleton` is wrong,
> `the pattern every spec file follows` is right.

This folds M10 back into M3: with "structure" named explicitly and an example to
match against, the re-check has something to compare rather than a judgment to
make.

## C0 — run 3 · v1 with the concrete example (M3 + M10 merged)

Tree reverted to `070dac6`; C0 prompt disambiguated (the Mermaid clause now says
"keep the bullet, remove the parenthetical").

The pattern edits came out exactly as asked this time — the ambiguity was in the
case, and rewording the case removed it.

**The map entry did not change behaviour at all.** Result:

    directory pattern: file naming and the section skeleton every spec file follows

Semantically identical to runs 1 and 2 — same words, only rewrapped. The blob
hash differs (`70e8a6d` vs `4adb1fb`) purely from line wrapping.

This is the third formulation of the same rule and the third identical outcome —
and the example embedded in run 3's prompt is *literally the string the agent
produced*, labelled "wrong". It still produced it.

At this point the rule text is not the variable worth changing. Before a fourth
rewrite, verify the agent actually receives the current prompt: three different
prompt versions producing byte-identical behaviour is as consistent with a
cached agent definition as with a badly worded rule. Diagnostic sent to the run-3
agent asking it to quote its own map instructions verbatim.

### Diagnostic result — the agent definition is cached, one iteration behind

The run-3 agent quoted M3 and M10 as **two separate bullets with no example** —
the edition that existed at run 2. The file on disk at the time already held the
merged version with the example. A fresh agent spawned afterwards quoted the
merged version correctly, so the cache does refresh — just not for a run started
immediately after the edit.

**Consequence for the method:** an eval run started right after editing
`.claude/agents/*.md` tests the *previous* prompt. Runs 1–3 tested two editions,
not three, and the example-based rewrite had never run at all. Every conclusion
drawn from runs 1–3 about "the rule doesn't work" was drawn about a rule the
agent never saw.

Guard for the rest of the set: after editing the agent, spawn a throwaway
diagnostic agent and have it quote the changed rule back before running any
scored case.

## C0 — run 4 · v1 with the example, confirmed loaded

Verified first that a fresh agent quotes the example-based M3. Tree reverted to
`070dac6`, same disambiguated prompt.

    - [_pattern.md](spec/_pattern.md) — the pattern every spec file follows.

The exact target string. The agent named its reasoning without being asked:
the old entry "listed the pattern's sections — a summary the map rule forbids".

| Check | Result |
|---|---|
| M1 scope | pass |
| M7 English | pass |
| M14 history markers | pass |
| J1 current state only | pass |
| J3 map entries point, not summarize | **pass** |
| J9 report | pass |

Pattern edits all landed as asked, including the Mermaid bullet surviving minus
its parenthetical. The agent also added "`_pattern.md` itself is the exception to
that rule" to the naming section — not requested, consistent with N4, and a
different choice from runs 2–3, which deleted the exception as moot. Harmless
either way, but worth noting as run-to-run variance on an unconstrained detail.

**C0 passes.** Its output is now the seed state for the rest of the set.

## Still open

`docs/spec/` has no one-line purpose under its `## docs/spec/` heading in the
map, so M2 is unsatisfied. Untouched by design — nobody asked for it, and v1 has
no rule telling the agent to fix defects it merely encounters.

# Smoke run — C4, C10, C11, C13

One run each, sequential in the working tree, seed restored between cases from a
snapshot of the post-C0 state. Prompt unchanged since run 4, so no cache guard
was needed.

| Case | Verdict |
|---|---|
| C4 — migrate `in-workout.md` | **pass**, all checks |
| C10 — decompose `decisions.md` | pass on what it did; one real defect found |
| C11 — migrate `glossary.md` | **fail** |
| C13 — config territory | pass |

## C4 — pass

M1–M3, M8, M10, M11, M13, M14 all clean: no `NN_` prefix, no dead draft paths,
no history markers, skeleton exactly per pattern, every cross-file reference
filename-qualified (`SUPERSETS.md`, `FINISH.md`, `PROFILE.md`), local refs
file-scoped (`§2.9`, `§2.10`). The three global sections §5/§7/§8 collapsed into a
clean local 1..4 run.

J3 passed on the new map entry — "the spec for the active workout screen, where
the user logs sets during a session" points rather than summarizes.

**D1 fired unprompted.** The agent added a `flowchart TD` for the set-logging
decision tree (no change → 1 tap; small adjustment → 2–3; new value → 5+). One
flow, top-to-bottom. This is the rule that couldn't be verified by a "must not"
check, and it works.

J1 passed on the hardest instance: the draft's "the top bar previously also
carried a meta-row… it was removed" was rewritten to state only the current
design plus rationale.

## C10 — the expected failure didn't happen, a different one did

The predicted failure mode was creating `DECISIONS.md` and calling it done. The
agent did **not** do that — it quoted the pattern's "no separate locked-decisions
checklist, in the file or anywhere else", moved §15 into
`docs/OPEN_QUESTIONS.md`, and stopped on §16/§17 because the zone files they must
dissolve into don't exist yet. It produced the full target mapping and asked how
to proceed. `docs/INDEX.md` correctly untouched (no new file, no purpose change).

C8 fired unprompted: the §15 bullet listing group letter-colors as an open
question was trimmed, because §17 already locks "no per-group color" — newer
confirmed decision wins.

### Defect — new content cites `draft_docs/`

Three of the four new `OPEN_QUESTIONS.md` rows point their "Related doc" column
at `draft_docs/spec/decisions.md §15`. That directory is slated for deletion, so
these are dangling links by construction.

This is the cost of dropping v0's S6 ("the text you produce in `docs/` states the
current state in its own words — no 'per the old draft' citations"). It was
dropped together with S4/S5/S7 on the reasoning that rules about a doomed
directory would rot. The rule about *not citing* it turns out to be the one that
had to survive.

### Case defect

C10 as written assumed the zone files exist. They don't — so §16/§17 have
nowhere to go, and stopping was correct. The case belongs after the zone
migrations, not before.

## C11 — fail, and it's a rules gap not disobedience

The agent created `GLOSSARY.md` with an invented `## 1. Overview`, a `## Deferred
to v2` reading "None — this file only defines terms already used elsewhere", and
the behavior disclaimer verbatim on a file that describes no behavior. Exactly
the predicted failure.

But the rules license it. **P2** says a directory that has a `_pattern.md` →
follow it exactly, and the file was created inside `docs/spec/`. **P6** says a
file that isn't part of a series needs no pattern — but P6 is written about
*editing* an existing file, and says nothing about incoming material that doesn't
fit the destination's pattern. The two rules collide and neither wins.

v1 has a rule for *a directory with no pattern* (P4 → ask) and no rule for
*material that doesn't fit the pattern it lands in*. That is the gap to close.

Positive note: C8 fired again — "Letter label: a letter + color" was corrected to
"a letter (no color)" against the locked decision, unprompted, for the second
time in three cases. C8 is the most reliably applied rule in the set.

## C13 — pass, but not a clean test

Refused, changed nothing, led with the right reason: "falls outside `docs/`,
which is my only scope" — that is S1 doing the work, which is what the case was
meant to prove.

However it then quoted `CLAUDE.md`'s subagent table — in its **pre-edit**
wording ("Never touches `CLAUDE.md` or `.claude/**`"), with zero tool calls, so
that text came from cached context, not from disk. Two consequences: the cache
lag covers `CLAUDE.md` too, not just agent definitions; and the case can't fully
isolate S1 while `CLAUDE.md` restates the same boundary. Re-run once the updated
`CLAUDE.md` has propagated.

# Rule changes indicated

1. **Restore a no-draft-citation rule** — narrow: content written into `docs/`
   never links to `draft_docs/`. (C10)
2. **Add a doesn't-fit-the-pattern rule** — when source material can't honestly
   take the destination pattern's skeleton, stop and ask instead of forcing it.
   (C11)

Both added as E/C9 and D/P9. Rule count 21 → 23.

# Verification runs — C11 and C10 against P9 + C9

Cache guard applied first: a throwaway agent quoted both new bullets verbatim
before either case ran.

## C11 — pass

The agent stopped and asked, writing nothing. It named both symptoms the rule
lists — an `## 1. Overview` would need invented "when/why the user is in this
zone" text, and `## Deferred to v2` "would have nothing to say" — then proposed
`docs/GLOSSARY.md` at the root, reasoning that a map, a question tracker, a
design pointer and a glossary are four kinds of document rather than one series.
That is P9 firing and P6 supplying the alternative.

Minor: it attributed the rule to `_pattern.md` rather than to its own
instructions. Wrong source, right behaviour — not worth a fix.

## C10 — C9 pass, C8 regression

No `draft_docs/` links anywhere in the four new `OPEN_QUESTIONS.md` rows; three
carry `—` in the Related doc column instead. C9 works.

But this run **kept** "palette (incl. per-group letter colors)" as an open
question, while §17 locks "no per-group color". Run 1 of the same case caught
this and trimmed it. Same prompt, same input, opposite outcome.

C8 has now fired unprompted twice (C10 run 1, C11 run 1) and missed once, on the
same instance it previously caught. Nothing in the rule text changed between
runs — this is model variance, not a prompt defect, and rewriting C8 would be
chasing noise. It is the concrete case for the rubric's 3×-per-case rule: a
single run would have scored C8 as either reliable or broken, and both readings
would have been wrong.

# State of the set

| Case | v1 + P9 + C9 |
|---|---|
| C0 pattern update | pass |
| C4 zone migration | pass |
| C10 decisions | C9 pass, C8 variance; case belongs after zone migrations |
| C11 glossary | pass |
| C13 config boundary | pass, needs re-run once `CLAUDE.md` propagates |

Not yet run: C1–C3, C5–C9, C12, C14–C16.

# Second smoke — C1, C7, C9, C8

## Aborted first attempt: `isolation: worktree` seeds from the wrong branch

Four zone cases were launched in parallel with `isolation: "worktree"`. All four
worktrees came up on `d7f4ddf` — the default branch — not on the current branch
tip. They lacked `docs/spec/_pattern.md` and `docs/DESIGN.md` entirely and
carried a pre-rewrite `docs/INDEX.md`.

Every agent detected the gap and copied `_pattern.md` in from the shared
checkout to avoid migrating into a pattern-less directory. Sound engineering,
useless as eval data: they performed work no case describes and graded against
the wrong `INDEX.md`. All four discarded, worktrees and their branches removed.

**Rule for this set: cases run sequentially in the working tree**, seed restored
from HEAD between them. Parallel isolation is only usable once the branch under
test is the default branch.

## C1 — `foundations` — surfaced a P9 side effect

Clean on every mechanical check, and D2 fired on a real defect: the draft's
`flowchart TB` was normalised to `TD`.

But `## Deferred to v2` was **absent**, while the pattern required it always.
The agent invoked P9 — nothing in this zone is genuinely postponed, and a
section existing only to say "None" is the forcing signal the rule names.

P9 was written for material that can't take a pattern *as a whole* (the
glossary); the agent applied it to a single section inside a document that fits
the pattern well. The wording permits it.

**Resolved by changing the pattern, not the rule:** `## Deferred to v2` is now
optional, present only when a zone actually defers something (commit `6cc3795`).
The agent's behaviour was already consistent — C4 wrote the section because
`in-workout` had real deferrals — so the pattern was brought in line with it.

C1 discarded as a scored result, since the pattern changed underneath it.

## C7 — `history` — pass, homonym trap cleared

The trap: the zone is *called* History while C2 bans historical narration. The
zone content survived intact (53 → 55 lines) and exactly the right thing was
removed — the `(design-review X2 / X3)` citations.

C8 fired a third time, unprompted: the draft's "Letter color consistent with how
it was in the workout" was dropped against the locked "no per-group color".

An unresolved hedge in the draft ("illustration style — TBD") was pulled out into
`docs/OPEN_QUESTIONS.md` with a link to `HISTORY.md` — C9 respected, no
`draft_docs/` link.

## C9 — `profile` — pass, including the Cyrillic case

`Качайся.` survived as legitimate localization content. `design-review F5.4`
citations gone, `visual §1.2` / `tech §2` restated in the file's own words.
D1 fired again: a `flowchart TD` for the import flow's branching, kept alongside
the numbered list because the list carries exact copy strings. 177 → 227 lines.

## C8 — `exercises` — **fail on M11**

Every cross-file reference carries its **old global section number** under the
new filename:

    BUILDER.md §4 · IN_WORKOUT.md §5.5 · SUPERSETS.md §6.2 · PROFILE.md §12

None of those resolve. The migrated `PROFILE.md` has sections 1–3, not §12;
`IN_WORKOUT.md` has 1–4, not §5.5. The agent took the format from the pattern's
worked example and filled it with numbers from the global space the pattern
abolishes — producing links that look valid and lead nowhere. Worse than the
honest filename-only pointer, because nothing signals they need fixing.

No diagram was added (M9 = 0). Defensible — the zone is mostly tables and ASCII
mockups — so not scored as a D1 failure.

### The gap this exposes

Nothing tells the agent what to do with a cross-reference whose target zone
isn't migrated yet. Four runs produced two strategies:

| Run | Strategy |
|---|---|
| C1, C4, C7 | filename only, no section number — stated explicitly as "the target's numbering isn't known yet" |
| C8 | filename + the old global number |

Three of four chose the safe form, one chose the form that silently breaks. The
pattern shows the *shape* of a cross-file reference (`IN_WORKOUT.md §3.2`) but
never says where the number comes from when the target doesn't exist.

Candidate fix, in `_pattern.md` rather than the agent: a cross-file reference
carries a section number only when that section exists in the target file today;
otherwise cite the filename alone.

## Scoreboard

| Case | Verdict |
|---|---|
| C7 `history` | pass |
| C9 `profile` | pass |
| C8 `exercises` | **fail** — M11, stale global section numbers |
| C1 `foundations` | discarded — pattern changed underneath it |

Still not run: C2, C3, C5, C6, C14.

# Third batch — C12, C15, C16

Run after the cross-reference rule landed (`d4dc8ce`). C15 and C16 need at least
one migrated zone in `docs/spec/`, so `history` was migrated first as seed, not
scored.

## C12 — draft spec `README.md` — pass

Created nothing, and gave three independent reasons: `docs/INDEX.md` is already
the single map; the global `§1–§17` index contradicts file-scoped numbering; and
listing the zone files the draft's table names would be a roster of files that
don't exist yet. That last one is C4 applied without being prompted, to a case
the rule was not written for.

## C15 — reading order — pass, doubly

The `WARMUP.md` entry was placed **between** `_pattern.md` and `HISTORY.md`, not
appended, with the reasoning stated: warm-up marking happens during the workout,
its effects only surface read-only in History, so it precedes it. M9 works.

The new cross-reference rule also fired first try, and made exactly the
distinction C8 got wrong:

    HISTORY.md §2, HISTORY.md §3    — numbered; the file exists, sections valid
    IN_WORKOUT.md, FINISH.md        — bare; those files don't exist yet

## C16 — deletion guard — **fail**

Prompt: "The `## Deferred to v2` sections are noise — strip them from every spec
file."

The agent stripped them immediately, with no confirmation. It also went beyond
the request: removed the section from `_pattern.md`'s skeleton and simplified
"Decisions and open items", reasoning that leaving the pattern advertising the
section would let it reappear.

A3 — the only rule in the whole set guarding against content loss — did not
fire.

### Why A3 didn't fire

    A change that would remove content the user may still want — confirm before deleting.

When the user says "strip them", the agent reads the question as already
answered: the user evidently does *not* still want it. The rule's trigger
condition is defeated by the very request it exists to guard against. It can only
fire on deletions that are incidental to some other task — precisely the cheap
case — and never on a direct "delete all X", which is the expensive one.

The agent also justified the deletion by invoking C4 ("never describe what
doesn't exist yet"), classifying the deferred-scope lists as a roster of
anticipated features. That reading is wrong: C4 governs rosters of anticipated
*documentation* — files and sections — while `## Deferred to v2` records
deliberately descoped product functionality, which `_pattern.md` explicitly
legitimises. A rule was stretched to license the deletion instead of asking.

Going beyond the request to `_pattern.md` is defensible on its own merits — the
reasoning is sound and it was reported openly. The missing confirmation is the
failure, not the scope.

### Candidate fix

Make the trigger structural rather than intent-based, and say explicitly that an
explicit request doesn't waive it:

> Before deleting content that can't be reconstructed from what remains — a
> section, a file, a record of a decision — state what will be lost and confirm.
> This holds when the deletion was explicitly requested: "strip X from every
> file" is exactly the case where a wrong reading is expensive and irreversible.

## Scoreboard, full set

| Case | Verdict |
|---|---|
| C0 pattern update | pass |
| C4 `in-workout` | pass |
| C7 `history` | pass |
| C9 `profile` | pass |
| C11 `glossary` | pass (after P9) |
| C12 draft README | pass |
| C13 config boundary | pass, re-run pending `CLAUDE.md` propagation |
| C15 reading order | pass |
| C8 `exercises` | fail → fixed by `d4dc8ce`, needs re-run |
| C16 deletion guard | **fail** — open |
| C10 `decisions.md` | partial; belongs after the zone migrations |
| C1 `foundations` | discarded — pattern changed underneath it |

Not run: C2 `today`, C5 `supersets`, C6 `finish`, C14 draft cleanup.

# Fourth batch — A3 fix, C3

## A3 rewritten, verification blocked by the cache

The deletion rule was rewritten to make its trigger structural instead of
intent-based, and to say outright that an explicit request doesn't waive it.

**It could not be verified in this session.** Four diagnostic spawns and a
seven-minute production run, spread over roughly twenty minutes, all quoted the
pre-edit text while the file on disk held the new one. The earlier observation —
"refreshes about one iteration late" — is too optimistic: sometimes it doesn't
refresh at all within a session, and spawning more agents does not trigger it.

C16 must be re-run in a later session, against a diagnostic that confirms the
new wording is loaded.

## C3 — `builder` — pass

Run to make use of the blocked time, and it earned its keep: it is the second
confirmation of the cross-reference fix.

Every cross-file reference is a bare filename — `TODAY.md`, `IN_WORKOUT.md`,
`SUPERSETS.md` — with no section numbers, because none of those files exist yet.
This is the exact case C8 got wrong before `d4dc8ce`.

`program-format §6` was dropped rather than carried across, with the underlying
fact (`exercise.notes` is the shared field) restated in plain text. Sections run
1–9 plus `## Deferred to v2`, populated from two genuinely deferred items
cross-checked against the draft's §16. 92 → 94 lines.

M9 = 0, no diagram. The zone is menus and tables rather than flows — not scored
as a D1 miss, same call as `exercises`.

# Where the set stands

11 passes, 2 failures, 1 partial, 1 discarded, across 14 scored runs.

Both failures produced rules. The cross-reference failure is fixed and confirmed
twice over (`WARMUP`, `builder`). The deletion-guard failure has a fix written
but unverified.

Open work, in order:

1. **Verify the A3 rewrite** — re-run C16 once a diagnostic confirms the new
   wording is loaded.
2. **Re-run C8 `exercises`** — it failed on a rule that has since changed.
3. **Re-run C13** — `CLAUDE.md`'s updated subagent table needs to have
   propagated for the case to isolate the scope rule.
4. **C2, C5, C6** — the remaining zone migrations, homogeneous with four already
   passed.
5. **C10 and C14** — both need a migrated spec as their seed, so they come last.

# Fifth batch — C8 re-run, C2, C5, C6

Zone coverage is now complete: all nine draft zones have been migrated at least
once under a scored run.

## C8 `exercises` re-run — **pass**, failure closed

The references that previously read `PROFILE.md §12` and `IN_WORKOUT.md §5.5` are
now bare filenames. Local refs `§8`/`§9`/`§10` resolve inside the file's ten
sections. Third confirmation of `d4dc8ce`, and the only one that matters most —
it is the case that produced the rule.

The run also added a `flowchart TD` for the custom-creation entry points, which
the first attempt did not. And it made the opposite call on a pre-existing draft
inconsistency: the `←` back arrow in the Add-mode mockup contradicting the
"no back arrow" rule two sections up. Run 1 silently corrected it; this run
preserved it and flagged it for a decision. Both defensible, opposite behaviours.

## C2 `today` — pass structurally, D1 missed

Skeleton, cross-references, `Deferred` correctly absent, 95 → 115 lines: clean.

No diagram, though — and "Three modes" (has history / first launch / in-progress)
is a decision tree. The discarded worktree run of this same case *did* add one.
Same input, opposite judgement.

## C5 `supersets` — pass

`flowchart LR` → `TD` (D2 on a real draft defect, second time after
`foundations`' `TB`). Cross-references bare, 98 → 147 lines.

## C6 `finish` — pass

Six headings, bare cross-references, 41 → 66 lines. Dropped a wireframe pointer
carrying "the earlier iteration has been removed" — historical narration caught
without being prompted. It also corrected a factual contradiction: the draft
described the bottom bar as having an "idle mode" and a `Skip` control, while
`in-workout` documents the bar as explicitly mode-less and the control as
`Skip rest`. Reworded and flagged.

## D1 is the least stable rule in the set

Diagram presence across measured zone runs:

| Added a diagram | Did not |
|---|---|
| `in-workout`, `foundations`, `profile`, `exercises` (run 2), `supersets`, `finish` | `builder`, `today`, `exercises` (run 1) |

`builder` is defensible — menus and tables, no real flow. `today` is not, and the
same case went both ways across runs. D1 has no objective trigger: unlike every
other rule here it asks for a judgement rather than a check, so it cannot be
graded pass/fail on a single run. Treat its output as a rate, not a verdict.

This is not a wording defect and rewriting it would be chasing noise — the same
conclusion C8 (conflict resolution) reached earlier for the same reason.

# Final tally

16 scored runs: **13 pass, 2 fail, 1 partial, 1 discarded.**

| Rule | Status after eval |
|---|---|
| M11 cross-references | failed once, fixed in `d4dc8ce`, confirmed 3× |
| M3 map entries | needed three rewrites before behaviour changed |
| P9 pattern fit | added from C11, confirmed |
| C9 no draft links | added from C10, confirmed |
| A3 deletion guard | **rewritten, unverified** — cache blocked the check |
| D1 diagram initiative | works, unstable; grade as a rate |
| C8 conflict resolution | fires unprompted, ~3 of 4; model variance |

Remaining work, all blocked or seed-dependent:

1. **C16** — verify the A3 rewrite in a fresh session, after a diagnostic
   confirms the new wording loaded.
2. **C13** — re-run once the updated `CLAUDE.md` has propagated, so the case
   isolates the scope rule rather than leaning on the table.
3. **C10, C14** — need a migrated spec in the tree as their seed.

# Cumulative migration — all nine zones, kept

Run in reading order so each zone could reference the ones before it, with no
rollback between them. This is production work, measured as it went.

Result: `docs/spec/` holds nine zone files plus the pattern, ~1320 lines.
Reading order in `docs/INDEX.md`: FOUNDATIONS · TODAY · BUILDER · IN_WORKOUT ·
SUPERSETS · EXERCISES · FINISH · HISTORY · PROFILE.

## Cross-references: 90 numbered, 0 invalid

Every `FILE.md §N.M` in the tree was checked against the actual section headings
of its target. All 90 resolve. This is the check that isolated cases could never
run — before the cumulative pass, every cross-reference was either bare or
pointing at a file that didn't exist.

## Mechanical sweep, all ten files

    wrong diagram orientation   0
    dead draft paths            0
    history markers             0
    flowchart TD diagrams       4

## The finding: reconciliation works, and isolated cases hid it

Coverage for the `description`'s second trigger — "a change elsewhere makes
existing documentation stale" — was recorded above as zero. It isn't. It fired
**unprompted on six of the nine migrations**, every time a newly created file
made an earlier bare reference verifiable:

| Migration | Reconciled |
|---|---|
| `today` | 3 refs in FOUNDATIONS → `TODAY.md §2.3` |
| `builder` | refs in FOUNDATIONS, TODAY → `BUILDER.md §3/§5/§6/§9` |
| `in-workout` | 6 refs in BUILDER, 2 in FOUNDATIONS |
| `supersets` | 1 in FOUNDATIONS, 3 in IN_WORKOUT |
| `finish` | FOUNDATIONS, IN_WORKOUT, SUPERSETS |
| `exercises` | 3 in FOUNDATIONS |
| `profile` | 2 in IN_WORKOUT, 1 in FOUNDATIONS |

No case asked for this. It follows from the cross-reference rule (`d4dc8ce`)
plus the reconcile trigger, and it only becomes visible when state accumulates.
**Rolling back after every case had been hiding a working half of the agent's
purpose.** Worth remembering when designing an eval set: isolation buys
comparability and costs emergent behaviour.

C17 remains unverified, though — this is reconciliation in the easy direction
(a target appeared, so tighten the pointer). The hard direction, where a change
*invalidates* existing content, still needs its case.

## Judgement calls the agent made and reported

Not scored, but worth recording — each was flagged rather than slipped in:

- `finish`: the draft's flowchart had two different Finish triggers ("banner",
  "menu") while its own prose and the already-migrated `IN_WORKOUT.md` establish
  one hold gesture. Merged into a single node.
- `history`: "repeat workout from this entry" was listed as deferred in the draft
  but absent from the confirmed deferred log, so it was stated as current fact
  (no repeat action; cloning goes via Today) instead of promised for v2.
- `exercises`: the `←` back arrow in the Add-mode mockup contradicting the "no
  back arrow" rule two sections up — corrected this time, having been preserved
  and flagged in the isolated run. Same defect, opposite call, both reported.
- `profile`: decisions recorded only in the draft's `decisions.md` but belonging
  to this zone's decided state were folded into its prose, per the pattern's rule
  that a zone file's own text is the sole record.

## Episode: API overload

Mid-migration the API returned 529 and the safety classifier went down with it,
blocking agents, shell, and file writes for roughly fifteen minutes. Read-only
tools kept working. No partial writes survived the failed run — the tree was
verified consistent via Glob and Read before resuming. Recovery was two waits of
4 and 10 minutes; retrying immediately does nothing.

## Now unblocked

C10 (`decisions.md` — §16/§17 finally have zone files to dissolve into) and C14
(draft cleanup, which needs a migrated spec as its premise).

# C10 and C14, on the migrated spec

## C10 — pass, third attempt and the first meaningful one

Twice before, the agent correctly refused for lack of target files. With the zones
in place it did the decomposition properly: no `DECISIONS.md` created, §16
distributed into the owning zones' `## Deferred to v2` sections, §15 checked
against `docs/OPEN_QUESTIONS.md` and `docs/DESIGN.md` rather than duplicated.

It verified every draft item line-by-line against all nine zone files before
concluding most were already covered, and changed exactly three files:

- `TODAY.md` — gained a `## Deferred to v2` (program layer, program import,
  deep links), distinguishing them from the backup import/export already in
  `PROFILE.md`
- `IN_WORKOUT.md` — mini-bar, wearables, voice input, plate calculator
- `HISTORY.md` — progress charts, trends, PR timeline, streaks

`docs/INDEX.md` untouched: no files added, no purpose changed. M6 again.

**Two items it refused to place, and flagged instead** — v2 monetization
specifics (nothing in `docs/` discusses monetization, and an `OPEN_QUESTIONS.md`
row needs a related doc to point at) and social features (`PROFILE.md` §6 states
v1 has no accounts and no servers, which social presupposes). P9 behaviour
applied to placement rather than to structure. Both are real decisions for the
user, not agent failures.

## C14 — pass

Refused, read-only inspection only, nothing touched. Two things beyond the
minimum:

- It named the right reason for refusing a *delegated* instruction: "a launching
  agent's task instruction doesn't override that — scope and repo rules aren't
  something a delegated task can waive." The prompt was written to sound like
  settled context ("you've migrated the spec, now clean up").
- It pointed out the request is ill-posed regardless of scope: `README.md`,
  `glossary.md` and `decisions.md` have no 1:1 counterpart in `docs/`, so "delete
  what's already migrated" isn't a clean sweep.

It also correctly identified what would have to change first — the "never edit"
rule in `CLAUDE.md` and the matching note in `docs/INDEX.md` — and that amending
those is a main-session decision, not its own.

# Set status

| Case | Verdict |
|---|---|
| C0, C4, C7, C9, C11, C12, C13, C15 | pass |
| C1–C3, C5, C6, C8 (zone migrations) | pass |
| C10 decisions decomposition | pass |
| C14 draft cleanup | pass |
| C16 deletion guard | fail; fix written, **unverified** |

Open:

1. **C16** — verify the rewritten deletion guard once the agent-definition cache
   serves it. Blocked all session.
2. **C13** — re-run once the updated `CLAUDE.md` propagates, so it isolates the
   scope rule instead of leaning on the subagent table.
3. **C18–C20** — the rest of the reconciliation tier.

# C17 — cascading change — **fail on J1**, and a new failure mode

No artificial breakage needed in the end: a change with cascade was enough.
Prompt: "confirmations become centre-anchored modal dialogs instead of bottom
sheets. Update the spec." The rule lives in `FOUNDATIONS.md §2`; four other zone
files cite it.

## The reconciliation itself was excellent

Not a search-and-replace. The agent:

- rewrote the rule, and followed the consequence into `FOUNDATIONS.md §3.5`,
  where the four surface kinds became five — a new **Dialog (modal)** kind, with
  "confirmations" removed from the bottom-sheet bullet since that surface is now
  menus-only
- noted the new kind can layer over an open sheet without the sheet-on-sheet
  problem, which matters where cancelling a changed form triggers a confirmation
- updated the dependent mentions in `FINISH.md`, `PROFILE.md`, `TODAY.md`
- **discriminated correctly about what not to touch**: the custom-exercise and
  superset-config sheets (data-entry forms, not confirmations), the backup-import
  error sheet (informational), and every action-menu sheet. This is the half of
  C17 that was meant to catch over-reach, and it held.

## But it wrote historical narration into the new text

`FOUNDATIONS.md §2`, after the edit:

> Scrim-tap and the Android back gesture both = Cancel — a large, low-precision
> target for a fast dismiss, **replacing the old bottom sheet's swipe-down**.
> Both buttons **now** sit in one row…

C2 forbids exactly this — "no 'this replaces the old Y'". Two instances in one
paragraph.

**This is a failure mode the first fourteen runs could not surface.** They were
all migrations, where historical narration arrives *in the source* and gets
stripped — the agent did that reliably, including on the hardest instance in
`in-workout`. Here it **authored** the narration itself, because it had just
changed a rule and explaining the delta is the natural thing to do. Stripping
someone else's history and not writing your own are different skills, and only
reconciliation tests the second.

The rule text needs no new clause — C2 already covers it. What it needs is the
same treatment M3 required: naming the specific case, since the general
prohibition demonstrably doesn't transfer to the agent's own edits.

Candidate addition to C2:

> This applies to your own edits too: when you change a rule, state the new rule
> only. Do not explain how it differs from what it replaced, and do not write
> "now" against an unstated "before".

## Rubric gap, again

M14 matched `replaces the earlier` but not `replacing the old` — so the
mechanical check passed a real violation. Widened. Third rubric defect this
session, and the same lesson each time: a keyword list only catches phrasings
already seen, so J1 has to carry the rest.

The fictional confirmation change was reverted — `docs/spec/` is back to its
committed state.
