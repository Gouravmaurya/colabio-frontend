# Design council: discuss, reconcile, build, cross-review

Use for substantial new interfaces, redesigns and cinematic briefs. Keep local fixes local: involve only roles needed by the affected scope. The main agent chairs the work and may also build it. Role files are prompts, not a requirement to install another framework.

## One governing plan

Keep the shared brief, scene table and consequential decisions in `design-brief.md`. Before building, consolidate discussion into the complete, reusable design/build prompt in [prompt-enhancer.md](prompt-enhancer.md), including every agreed route, section, component, motion sequence and responsive/fallback state. Optional role notes in `council/01-subject.md`, `02-direction.md`, `03-motion.md`, `04-copy.md` and `05-architecture.md` support that plan; they never become competing specifications. Preserve approved regions and behavior explicitly. A user's rejection reopens the affected scope even when an earlier critic approved it.

The scene table names each scene's visitor question, truthful proof, dominant asset/type, composition, hand-off, motion/interaction states, phone composition and reduced/static equivalent. Moving rows use [cinematic-motion.md](cinematic-motion.md). Still rows need a reading or decision purpose, not fabricated animation geometry. Content determines the scene count.

## Run the exchange

1. **Chair briefs.** Record the request, product/audience, primary decision, actual assets, framework, performance constraints, approved regions and requested motion ambition. Read `agents/design-chair.md`.
2. **Subject establishes the argument.** Subject supplies real content and useful proof. Art sketches two concise structural directions: different journeys, persistent subjects or composition relationships, not recolors. Include body/proof, useful interaction and ending as well as the opening. Do not build two entire sites.
3. **Peers discuss before lock.** Motion and experience review the sketches; copy contributes where language changes the direction. Art challenges asset/crop/layer feasibility; motion challenges meaningful intermediate states and continuity; experience challenges visitor questions and task access. Use actual agent messaging or relay named concerns to their owners. Parallelize only work whose inputs exist; motion cannot depend on an art file that has not been written.
4. **Owners reply; chair reconciles.** For material concerns, owners accept, modify or reject with a reason and a changed specification or evidence. Record briefly: scene, peer concern, owner reply, chosen decision, verification needed. Do not invent disagreement or require everyone to review everyone. Independent documents without replies are preparation, not discussion. Resolve conflicts against the user's brief, approved work, content and feasible assets; do not average incompatible concepts.
5. **Lock, then audit.** Experience and chair merge one implementation-ready scene/state plan. Slop auditor reviews that exact version, not earlier drafts. `plan-lint.mjs council/` can find structural omissions when its legacy role files are used; it cannot judge originality or choreography. Resolve consequential findings before building the affected slice. Name limitations instead of treating scanner PASS as design approval.
6. **Preview, then build a representative slice.** The chair shows the selected skills and a concrete written website preview, asks for approval or revisions, and waits under `brief-intake.md`. After approval, include an opening hand-off, consequential body/proof scene and functional component's visual language. If the hero is approved, start with the affected body scene and its next hand-off. Interface builder implements the approved plan and raises infeasible assets/states before substituting another idea.
7. **Cross-review actual work.** Give peers the brief and raw renders/playback before prior praise, scores or passing-check summaries. Art reviews composition authored by others; motion reviews actual progression and interruption; experience reviews real keyboard/touch/control paths. Use one independent critic or rotate roles when a full panel adds little. An author cannot provide the only acceptance review of their own work. Owners answer consequential findings; a peer rechecks fixes.
8. **Complete and verify the journey.** Inspect beginning, body, proof, function and ending at desktop and phone widths. Observe motion start/middle/settled states, reverse/fast scroll, anchors, focus and fallbacks. Fix observed defects and recheck affected states. Stop when acceptance conditions are met, not when a round quota expires; do not manufacture three new issues every round.

## Roles

| Role file in `agents/` | Main responsibility | Peer obligation |
| --- | --- | --- |
| `design-chair.md` | Scope, alternatives, decisions, one plan | Resolve conflicts and preserve approved work |
| `subject-analyst.md` | Argument, real proof, specificity | Challenge scenes without a visitor question |
| `art-director.md` | Composition, type, assets, crops and layers | Review motion feasibility and another author's renders |
| `motion-director.md` | Scroll sequences, reveals, state transitions | Challenge poster-only plans; inspect playback |
| `copy-chief.md` | Accurate language and interface states | Resolve copy/composition conflicts |
| `experience-architect.md` | Shared scene/flow plan, controls, accessibility | Challenge blocked tasks and phone/fallback behavior |
| `slop-auditor.md` | Distinctiveness/completeness of reconciled plan | Audit the version the builder receives |
| `interface-builder.md` | Implement scenes and usable states | Raise deviations; supply raw evidence |
| `build-critic.md` | Independent full-journey review | Recheck fixes; separate facts from visual judgment |

## Dispatch and evidence

Use [ai-orchestration.md](ai-orchestration.md) for Codex, Claude and external-system dispatch: capability discovery, task packets, dependencies, file ownership, integration and recovery. The coordinator dispatches relevant roles using available, permitted tools; role files alone do not register agents. For peer passes, send another author's proposal or raw build evidence; deliver consequential concerns back to their owner for a reply. Do not auto-install project agents or modify unrelated configuration.

If independent agents are unavailable, conduct sequential role-based self-review and disclose the limitation. Do not call it independent agreement. Keep records concise. Observable checks may be pass/fail/unverified; visual judgments explain composition, specificity and motion against the brief. No numeric taste score, award claim or scanner result certifies the user's satisfaction.
