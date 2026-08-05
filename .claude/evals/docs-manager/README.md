# docs-manager evals

Prompt-evaluation material for the `docs-manager` subagent. Config territory —
maintained in the main session, out of scope for every subagent including
`docs-manager` itself.

| File | What it is |
|---|---|
| `RULES_v1.md` | Every rule the prompt states, as a reviewed register: what v0 had, what survived, what was merged or cut, and why. Read this first. |
| `RUBRIC.md` | How a run is graded — mechanical checks computed from the git diff, judge checks needing an LLM. |
| `CASES.md` | The case set: real migrations out of `draft_docs/spec/`, plus synthetic boundary cases. |
| `RESULTS.md` | Run log — what each run produced, which checks failed, and which rule changes came out of it. |

## Running a case

1. **Check the cache.** Editing `.claude/agents/*.md` does not reach a subagent
   spawned right after — that run still gets the previous edition, and the same
   lag covers `CLAUDE.md`. Spawn a throwaway agent, have it quote the changed
   rule verbatim, and only then run anything scored. Skipping this produces
   conclusions about rules the agent never saw.
2. **Seed the tree.** Cases assume `docs/spec/` holds the current `_pattern.md`
   and nothing else. Snapshot that state and restore it between cases — results
   from one case are not input to the next unless the case says so.
3. **Run one case, one prompt.** Case prompts are deliberately thin; padding
   them grades the operator instead of the agent.
4. **Score from the diff**, not from the agent's report. The report says what it
   believes it did.
5. **Three runs per case.** Judge checks are unstable: one rule in this set fired
   on two runs and missed on a third with identical input. A single run scores
   that as either reliable or broken, and both readings are wrong.

## What this set has already established

The prompt went from 47 rules to 23. Three of the 23 came from runs rather than
from review — and two of those restore something the review had cut, which is
the argument for running cases at all.
