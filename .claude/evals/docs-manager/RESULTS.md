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
