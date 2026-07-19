---
description: Answer a question about how this project or codebase works via search-manager, without spending main-session context on the search.
---

Delegate the following question to the `search-manager` subagent (via the Agent tool) and relay
its answer back to the user — verbatim if short, lightly summarized if long. Do not run your own
Glob/Grep/Read search in this session first; let `search-manager` do the searching.

Question: $ARGUMENTS
