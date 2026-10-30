# Conversational intake: describe it, clarify it, build it

This is the single source of truth for intake in Codex, Claude and external
orchestrators. Users can start with what they want and the kind of UI or feeling
they imagine. They do not need a complete brief, technical vocabulary or agent roles.
Use this flow for new interfaces, substantial redesigns and ambiguous design
feedback. Keep small fixes local and preserve supplied answers and approved work.

## Design defaults and saved preferences

Read [design-memory.md](design-memory.md) and the user's shared preference file
before intake. Landing pages default to premium, expressive cinematic craft, with
fresh subject-specific typography, colour, imagery, components and motion. Do not
re-ask settled preferences; clarify their product-specific interpretation when it
matters. Explicit quiet/static/minimal requests and brand constraints override the
default. Operational UI and small fixes retain appropriate motion and scope.

## 1. Understand before asking

Read the request, settled conversation, project instructions, existing interface,
framework, dependencies, assets and supplied references. Discover the product,
audience, main task, scope and constraints before asking. Ask only what cannot
be discovered and would materially change the result; do not turn this into a form.

Keep three independent decisions:

| Decision | Examples | Determines |
| --- | --- | --- |
| UI type | Dashboard, landing page, store, portfolio, editorial, event | Structure, density and user tasks |
| Feel | Refined, cinematic, playful, minimal, technical, industrial | Composition, typography, imagery and character |
| Motion | Quiet, moderate, expressive | Feedback, transitions and narrative pacing |

These can combine. A premium dashboard may be light, precise and quiet; a playful
store still needs clear browsing; a cinematic page can use daylight imagery.
Premium means deliberate craft and usability, not mandatory dark surfaces, serif
fonts, 3D, image quotas or an animation stack. Match this user's needs and preserve
explicit expressive requests. Never choose the template's look as the user's taste; an approved example is a
craft reference, not a mandatory palette or component recipe.

## 2. Ask a small, relevant set of questions

Ask 1-3 questions initially when important choices remain. Follow up only when
an answer leaves a material ambiguity. There is no gap-count threshold or fixed
round quota. Stop interviewing once enough is known to build.

Use the host's available structured question tool, otherwise ordinary chat.
Offer 2-3 relevant choices, recommended first, with plain-language descriptions.
Accept custom answers and reference links through free text; if the tool lacks
that facility, invite a chat reply. Do not assume host-specific tool names,
option limits or multi-select support. Choose from actual gaps, for example:

- Purpose: "What should people do first: check inventory, review sales, or manage orders?"
- Feel: "Should this feel calm and refined, bold and playful, or precise and technical?"
- Motion: "Quiet feedback, some animated transitions, or a cinematic experience?"
- Scope: "Is this the public landing page, the working dashboard, or both?"
- Content: "Do you have product photos, or should I use clearly labelled samples?"

Do not ask all of these automatically. Do not re-ask a supplied style or project
stack. Clarify the meaning of cinematic or premium only when the interpretation
would change the work. Users should not need to choose libraries or specialist roles.

For a detailed brief, use its answers directly and clarify consequential conflicts
only. For "you decide" or "no questions", skip optional questions, recommend a
fitting direction, state assumptions and proceed to the preview checkpoint. Identify genuinely necessary
missing input without inventing facts or treating silence as approval.

## 3. Show the skills and written preview, iterate, then build

Before frontend implementation, show a written design preview and ask whether
to build it or change the direction. Wait for the user's response before source
edits, scaffolding or dependency installation. Planning and read-only inspection
may continue. This is a design checkpoint, not permission to deploy or publish.

Start with **Skills used**: Impeccable, Taste Skill, MotionSites and GSAP are
required; list selected additional specialists only, with a short reason for each.
Use readable source names, not raw paths or internal agent/tool logs.

Then describe **What the website will look like** in concrete, plain language:
the overall feel; pages and visitor journey; hero composition and why it is
specific to the product; each major section's form and ordering; font roles,
palette and imagery; distinctive component anatomy; component/scroll animation
and the phone/reduced-motion version. Include the ending, key actions and what
is sample or missing. A short focused fix needs only the affected visual change
and relevant skills; a full site needs enough detail for the user to picture it.
Link the complete prompt as well, but do not substitute a file link for the preview.

End with one clear question, such as: "Should I build this direction, or would
you like to change the layout, colors, fonts, components or motion first?"
Revise the affected prompt entries and preview when feedback arrives. Start
implementation after the user approves the current direction. A clear approval
in this conversation remains valid; do not ask again for the same unchanged plan.
Silence is not approval. An explicit instruction to skip this design checkpoint
waives it; "you decide" or "no questions" alone only skips optional discovery.

Example after clarifying a clothing-business dashboard:

> Skills used: Impeccable for usability, Taste for composition, MotionSites for
> precise visual specification, and GSAP for restrained component transitions.
>
> I'll use a refined, light dashboard with inventory as the main view, clear
> typography, compact product thumbnails and subtle state transitions. It should
> feel polished while keeping daily stock decisions fast. I'll reuse your framework
> and brand; demonstration inventory will be labelled sample data.
>
> Should I build this direction, or would you like to change it first?

After discussion, synthesize the answers, assumptions and decisions into the
project's `design-brief.md`: a complete, reusable design/build prompt using
`prompt-enhancer.md`. Resolve the page, section, component and motion details
before implementing them. Share the file's location alongside the short
recommendation so the user can inspect or reuse the full prompt. When file output
is unavailable, provide the complete prompt in chat. Keep private preference-file
paths and internal council exchanges out of the reusable prompt.
For substantial work use [prompt-enhancer.md](prompt-enhancer.md), the relevant
journey in [site-types.md](site-types.md) and character in [styles.md](styles.md).
The agent writes the specification; the user does not need to complete a template.
If the request is only to create a prompt, deliver it and stop before source edits,
dependency installation or deployment. For a build request, implement from the
completed prompt after the preview checkpoint above. A detailed supplied brief still receives one
consolidated prompt; do not restart discovery or replace approved decisions.

Selectors and templates provide candidates and reusable mechanisms. They do not
impose a dark/cream theme, single HTML file, configurator or showpiece motion.
Preserve the existing stack. For a new standalone project with no stack preference,
choose the simplest suitable implementation and state the assumption. Never invent
customers, awards, reviews, prices or statistics as real. Label sample content
and simulated behavior. Facts that materially block the task require clarification.

Use [ai-orchestration.md](ai-orchestration.md) where delegation helps. The
coordinator owns clarification and passes settled answers to workers. Workers
do not repeat intake. Show selected source names and reasons; keep internal role management backstage.

## 4. Interpret feedback in context

Use the brief and actual renders to interpret "too plain", "more playful", "less
busy" or "keep the hero". Preserve explicit locks. Ask one focused question only
when multiple plausible interpretations would cause materially different work.
For example, playful might mean warmer copy and colour or expressive motion;
ask which if context does not resolve it. Explain the adjustment briefly, implement
it and recheck affected states. Update the brief and invalidate affected evidence.
Do not replay discovery or redesign approved regions for every correction.
Update actual likes/dislikes in the shared profile using `design-memory.md`, with
scope and evidence. General praise approves the overall example only; do not
invent specific likes or dislikes.

## 5. Deliver the result

Report what was built or changed, observed checks and remaining limitations.
Do not require "next time say" coaching or ask users to improve their prompts.
Provide prompting advice only when requested. Use [verify.md](verify.md) and
[visual-comparison-gates.md](visual-comparison-gates.md) for verification.

## Real brands and companies

If the idea names a real company or product ("a landing page for YouTube"), ask which it is
before designing: the user's own page about it (an owner, creator or partner), a tool for that
product's audience, or an **unofficial concept**. For an unofficial concept: say so in a visible
banner and in the footer, use the name only as plain text, use no logo, wordmark styling, brand
mark, trade-dress colours or third-party assets, make no statistics or feature claims beyond
widely known ones, keep all interactions local and sample, and choose a palette that cannot be
mistaken for the brand's own (palette-lab's category flags help). Never imply endorsement.
