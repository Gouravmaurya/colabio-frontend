# Strict rendered gates

Read before concept selection and at slice/final review for a substantial build
or redesign. A small change compares only the affected surface. These are working
gates for the agent, not extra user permission questions.

## Gate 0 — inspect the real reference before deciding

For a redesign, render the incumbent before selecting a concept, font or palette.
If a live URL is supplied, inspect that URL; do not silently substitute an old
local version. Record which source/version was observed. A code read, DOM scrape
or first-screen screenshot is not a full visual review.

Capture the opening, strongest proof, primary action and a whole-page or scene
sequence at desktop and narrow sizes. A full-page capture cannot represent a
pinned/horizontal scene: also capture settled checkpoints and its middle state.
Record `innerWidth`, `innerHeight`, device pixel ratio, zoom if exposed, scroll
position/state, asset/font readiness and route. Do not assume requested viewport
dimensions equal actual CSS dimensions. Compare equivalent states and widths.

Write three to five baseline strengths and three to five concrete target advances.
Separate identity, composition, typography, assets/proof, motion/continuity,
clarity, accessibility and task completion. A requested palette/style change is
not permission to discard useful structure, imagery, identity or working paths.

If the browser is unavailable, continue useful implementation, but mark visual
gates unverified and do not claim a verified visual upgrade. Do not ask the user
to approve routine design decisions just because a gate is unverified.

## Gate 1 — a representative slice must earn the direction

Build the opening, the strongest real proof/signature component and their
transition before filling out the site. Compare against the corresponding
baseline at the same desktop and narrow dimensions. For cinematic work, capture
before/middle/settled frames and a static/reduced-motion composition.

Reject the slice and revise the concept if:
- It loses the incumbent's presence, useful identity or content specificity.
- An abstract diagram, generic logo object or decorative UI has replaced real
  work, a portrait, a useful product view or an actual workflow.
- The explanation is easier to scan but the composition is materially weaker.
- The supposedly signature interaction teaches nothing specific to this product.
- Reading/action requires waiting, precision scrubbing, hover or an unsupported
  canvas; headings finish clipped or blank frames persist at navigation targets.

Fix the responsible layer: missing proof → assets/content; weak hierarchy →
composition/type; broken continuity → scene ownership; task friction → behavior.
Do not compensate with louder effects. Do not multiply a rejected slice.

## Gate 2 — compare the complete journey, without averaging failures away

Use a criterion table with one verdict per row: **improved, preserved, regressed,
unverified**. Cite matching baseline/candidate captures, the exact observable gain
or loss, and any correction/recheck. No numerical jury score is required or
accepted as proof. Build checks and library counts belong to engineering evidence.

Required dimensions:
1. Identity/concept: is the person/product still recognizable and the idea sustained?
2. Composition/presence: focal scale, density changes, authored overlap and rhythm.
3. Typography: family roles, optical hierarchy, readable small text, wrapping/masks.
4. Assets/proof: actual work, credible product states, appropriate crop/resolution.
5. Motion/continuity: useful transitions, pacing, interruption and settled states.
6. Clarity: role/offer and next action understood without deciphering the concept.
7. Usability/accessibility: keyboard/touch equivalents, focus, contrast, text zoom,
   reduced motion, no unintended overflow, functional navigation and main action.
8. Content completeness: relevant projects, details, routes, ending and honest states.

**A redesign is not ready as an upgrade if any required row is regressed or
unverified.** At least one target dimension must be demonstrably improved.
An intentional user-requested tradeoff can be delivered with its scope and cost
explained, but must not be relabelled as a universal visual upgrade. A deliberate
redesign may change the brand; evaluate against that explicit intent.

For greenfield work use the same dimensions against the brief and chosen reference
mechanisms, marked pass/fail/unverified rather than pretending it has an incumbent.
The reference is a craft/interaction benchmark, not an identity to copy.

## Gate 3 — fixes must be observed

Perform at least two look/fix/recheck rounds for substantial work. Stop when
consequential findings are resolved, or at the agreed time/scope limit. Reaching
round three never changes a failed gate into a pass. If limits remain, deliver
the working artifact as a candidate with unresolved findings clearly listed.
Do not keep polishing indefinitely and do not hide weak dimensions behind an
average, completed paperwork, or a claim of Awwwards quality.

Verify the production preview where available, inspect console errors, and
exercise real input events. Reading an event handler is not an interaction test.
Use the host's supported browser controls; never bypass browser or approval rules
to manufacture a screenshot. Wait for an observable final state (animation finished,
images loaded, expected heading visible); never judge a half-entered title as final.

## Compact record and deterministic verifier

Keep a `visual-review.json` in the task's output, not the installed skill. Run the
read-only helper at each applicable gate when Node is available; it checks
completeness and blocks recorded failures. Without Node check the fields manually
and disclose that limitation:

`node <skill>/scripts/verify-visual-gates.mjs --project <output> --record visual-review.json --stage baseline|slice|final`

Use the example in [visual-review.example.json](visual-review.example.json).
Each capture has a unique id, phase, actual viewport, state, ISO capture time and
a relative PNG file. Header dimensions are inspected; filenames/checkboxes alone
do not establish a capture. The record includes baseline strengths, target
advances, a design-start timestamp, comparisons, findings and check results.

- `baseline`: requires settled baseline desktop/narrow captures predating design.
- `slice`: also requires matching slice captures, explicit per-dimension verdicts
  and a passing signature-depth review. Do not fill in final comparisons early.
- `final`: also requires final comparisons/captures, two recorded review rounds,
  full-journey coverage, interaction checks and no unresolved blocking findings.
- Cinematic slice/final adds before/middle/after and reduced-motion captures.
- Greenfield has no incumbent requirement; cite the brief/reference study instead.

Exit 0: recorded gate complete; exit 2: failed/unverified/missing evidence; exit 1:
invalid record or invocation. The helper cannot see aesthetics, prove provenance,
or certify any human/agent judgment. An agent must inspect the actual captures.
It can reject missing comparisons; it cannot turn a bad comparison into a good one.
