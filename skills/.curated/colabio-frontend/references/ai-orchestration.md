# AI orchestration: one plan, explicit tasks, observed completion

Read this for substantial frontend builds and redesigns, or when an external
orchestrator assigns this skill. Design responsibilities and peer discussion live
in [agent-council.md](agent-council.md); this guide explains how to execute them.
For a focused command, use [commands.md](commands.md) without launching a full council.

## Adapt to the host

The lead session is the coordinator unless its assignment names another owner.
Discover the capabilities and permissions exposed in that session before dispatch.
Do not assume a product name guarantees agents, shared files, messaging or a browser.

| Host | How to use the skill |
| --- | --- |
| Codex | Read this `SKILL.md` and applicable project instructions, including supplied `AGENTS.md`. Use the runtime's advertised agent creation, messaging and completion tools when available and permitted. |
| Claude Code | Read the same `SKILL.md` and applicable project instructions, including supplied `CLAUDE.md`. Pass role contents to the runtime's available delegation tool; use a registered role only if it actually exists. |
| External orchestrator | Load `SKILL.md`, assign a coordinator and send explicit task packets to workers. Map dispatch, messages, completion and artifacts to the system's actual API. |
| Single agent or restricted runtime | Perform the applicable roles sequentially, using the same plan and checks. Report self-review and any unavailable independent review or browser verification. |

Do not copy tool calls between hosts, guess tool names, or claim dispatch from
merely writing a role name. The role files under `agents/` are portable prompts;
do not automatically copy them into project configuration. Do not launch another
AI CLI or install an orchestration framework to simulate missing native tools.

Resolve all skill links and helper paths relative to the loaded skill folder.
Run helpers with absolute or correctly resolved paths while passing the actual
implementation project as their input. Check a helper's documented arguments
before invoking it; the model's current working directory is not the skill root.

## Choose the smallest useful team

The coordinator follows [conversational intake](brief-intake.md), retaining the
user conversation, scope, decisions, integration and final report. Ask useful
product/design questions, show the selected skills and written design preview,
and wait for approval or revisions before building. Pass settled answers to
workers; do not repeat intake or require users to select roles or libraries.
Read [design memory](design-memory.md) before direction selection. The coordinator
alone merges user feedback into the shared profile after rereading its current
contents; workers receive relevant preferences and report observations, not
competing memory edits. Delegate only a task with a concrete outcome and useful independence.
Use the available worker limit; queue remaining work rather than creating nested teams.

- A local bug, copy edit, component polish or critique usually stays with one agent.
- A substantial build uses the council roles where they change decisions. One
  worker may cover compatible planning roles; independence is needed when claiming
  another author's acceptance review, not for every role title.
- Use specialists for motion, content or architecture when the brief needs them.
  Prefer one implementer until files can be separated safely.

The coordinator assigns workers directly. Workers return results or request a
dependency; they do not recursively delegate unless the assignment permits it.
Do not count role prompts, tool calls or concurrent workers as evidence of quality.

## Keep tasks in the governing brief

Use `design-brief.md` for the accepted product facts, scope, locked regions, design
decisions and task state. Do not create a competing specification or a separate
tracking system when the existing brief can hold a small table:

| Task | Owner | Depends on | Write scope | State | Evidence or next action |
| --- | --- | --- | --- | --- | --- |
| direction | coordinator + art | subject facts | brief, coordinator merges | running | compare two journeys |
| slice | builder | accepted plan | assigned page and components | pending | opening hand-off, proof and useful interaction |
| slice-review | critic | rendered slice | findings only | pending | desktop, phone, interaction and motion evidence |

Use `pending`, `running`, `blocked`, `review`, `done` or `cancelled`. Record a real
blocker's missing input and owner. A task becomes `done` only when its output and
acceptance checks have been inspected; a worker's completion message alone is insufficient.
These are task states, not instructions to alter a host's goal lifecycle.

## Dispatch with an explicit contract

Send only the relevant references and artifacts, with enough context to work
without relying on inherited chat history. Use this packet as a compact template;
the bracketed values are filled from the actual assignment before dispatch:

```text
Task: [id and concrete result]
Role: [absolute role prompt path; read it before work]
Skill root: [absolute installed skill folder]
Project: [absolute implementation workspace, branch/worktree if applicable]
Brief: [governing file and current accepted revision or phase]
User intent: [relevant request, constraints, corrections and approved regions]
Inputs: [existing source, proposal, assets and raw evidence paths]
Dependencies: [completed prerequisites and any missing input]
Write scope: [exact owned files/directories, or findings only]
Acceptance: [observable conditions and required checks]
Return: [artifact paths, changes/findings, checks, limitations and blockers]
Delegation: [none unless the coordinator explicitly assigns it]
```

For a critic, provide the brief and raw evidence before author praise or scanner
verdicts. For an external worker without shared storage, transfer the relevant
file contents or use accessible artifact locations; local paths alone are not a handoff.

## Schedule by dependencies and ownership

Follow the council's design exchange, with these execution boundaries:

1. Establish scope, baseline and subject facts. Independent read-only repository
   inspection and asset inventory may run together after scope is known.
2. Art proposes alternatives from those facts. Motion, experience and copy review
   the existing alternatives in parallel where useful. Relay material concerns
   to their owners; the coordinator reconciles one accepted plan and records replies.
3. Audit the reconciled plan. Build the representative slice only after the
   affected scene/state plan is accepted. Plan acceptance is an internal decision;
   do not insert user approval unless requested or required by the current permissions.
4. Review the rendered slice, answer findings and recheck consequential fixes.
   Extend the accepted design across the remaining requested pages and states.
5. Run final applicable source and rendered checks, review the completed journey,
   and integrate the result. Report incomplete checks or unresolved findings honestly.

Assign one writer per source file at a time. The coordinator alone merges shared
brief changes, global styles, dependency files and shared exports unless ownership
is explicitly transferred. Separate components may be built in parallel only
after their interface and token decisions exist. Workers propose shared-file
changes to the owner instead of overwriting one another.

In a shared workspace, inspect current changes before editing and preserve edits
outside the assignment. With isolated worktrees or artifacts, review and integrate
each worker's diff before dependent work begins. A branch-local result is not
available to another worker until it has been transferred or merged.

Worker output includes task status, inspected inputs, artifact locations, touched
files, observed check results and outstanding limitations. Findings identify the
scene/file, state, evidence, consequence and proposed correction. Report commands
and actual outcomes; distinguish failed checks from checks that were not run.

## Recover and resume

- On a missing dependency, complete any independent assigned work and return the
  missing input to the coordinator. Do not invent assets, decisions or test results.
- On a worker error or timeout, inspect saved output and current edits first.
  Retry when a changed condition makes success plausible; otherwise reassign or
  continue sequentially. Do not dispatch a replacement writer until the earlier
  writer is stopped or isolated, and do not repeat the same failing call indefinitely.
- On a material user correction, update the governing brief, stop affected work
  and invalidate dependent proposals or evidence. Preserve unaffected approved work.
- Before context handoff, record the accepted direction, task owners/states,
  completed evidence, unresolved findings and next action in the brief. On resume,
  inspect that record and the actual files; do not repeat intake or trust a stale summary.

Finish when the requested scope meets the applicable acceptance conditions. If a
required capability remains unavailable, deliver the inspectable candidate with
that limitation and keep unverified conditions unverified. Never infer independent
agreement from sequential personas or visual approval from a static scanner.

## Example requests

- **Codex or Claude:** "Use colabio-frontend to redesign this dashboard. Keep
  authentication and approved navigation. Coordinate relevant specialists if
  available, build the affected slice, then verify desktop, phone and keyboard use."
- **External coordinator to a worker:** "Use the loaded colabio-frontend skill as
  interface-builder. Implement task `slice` from the attached accepted brief.
  Write only `src/components/ReportPreview.tsx`. Propose any shared style changes
  to the coordinator. Return the diff, observed checks and remaining blockers."

These are invocation examples, not host-specific command syntax. Fill the dispatch
packet from the real project and choose checks from [verify.md](verify.md) and
[visual-comparison-gates.md](visual-comparison-gates.md).
