# Brief intake: upgrade the prompt, learn what the user expects

Most weak results come from a thin prompt, not a weak build. "Create a landing
page for X, a 3D printing website" names a category and nothing else: no
audience, no action, no look, no proof, no scope. A model fills those gaps with
the average of every website it has seen. This file turns a thin prompt into a
brief that produces a specific result, and finds out what the user pictures.

Run it at the very start of a new site, a redesign, or whenever the user says the
result feels cheap, generic, or not premium. Skip it for small fixes, for users
who already gave a detailed brief, and for users who said "no questions" or
"you decide" (then state assumptions and continue).

## Step 1: score the prompt (30 seconds, silent)

Check which of these the prompt already answers. Each gap is a place the build
would otherwise guess.

| Gap | What is missing | Cost of guessing |
| --- | --- | --- |
| Product | What it is, what it sells or does, one real fact or number | Generic copy, wrong category cues |
| Audience | Who visits and what they want right now | Wrong tone and density |
| Action | The one thing a visitor should do | Weak hierarchy, three equal CTAs |
| Look | Style character, references, colors, fonts, things to avoid | The usual dark-purple or cream-serif default |
| Scope | One page or many, which sections, languages | Wrong amount of work |
| Content | Real copy, logo, photos, prices, testimonials the user owns | Invented or placeholder content |
| Interaction | A signature moment, motion level, device mix | Decoration instead of a product moment |
| Stack | Plain HTML, React, Next, existing repo, hosting | Rework, wrong dependencies |

Three or more gaps means ask. Zero or one means build, and list the assumption.

## Step 2: ask what kind of website they expect (one round)

Use one question round of 3-4 questions with the AskUserQuestion tool. Put the
recommended option first and label it "(Recommended)". Always leave room for
"Other". Never ask what the repo, the prompt, or the screenshot already answers.
If the user is in a hurry, ask only questions 1 and 2.

**Q1. What kind of website is this?** (multi-select no)
- Landing page for a product or service (one action, proof, a form)
- Studio or portfolio (work first, contact second)
- Game or entertainment (the product is playable or watchable)
- Store or catalogue (browse, compare, buy)
- Software or dashboard (workflow, data, accounts)
- Editorial or content site (reading, archive)
- Event or campaign (a date, a place, a sign-up)

The chosen type selects the section order, proof and signature options in
`site-types.md`; read that section before writing the brief.

**Q2. Which look is closest to what you picture?** Map the answer to a recipe in
`styles.md`; offer 3-4 that fit the product, not all eight.
- Editorial and refined: big serif, hairlines, paper or ink tones -> editorial-print
- Cinematic and immersive: dark, one 3D object, scroll scenes -> cinematic-immersive
- Precise and technical: grid, mono labels, real data -> swiss-precision
- Bold and playful: color, big shapes, physical hover -> playful-kinetic
- Raw and industrial: thick borders, loud accent, exposed structure -> industrial-brutal
- Soft and atmospheric: photographic, calm, warm -> atmospheric-soft
- Fluid and product-led: the object is the hero -> apple-fluid
- Motion-led and experimental: pinned scenes, scrubbed type -> gsap-experimental
Add: "Any site you like, or one to avoid?" (links welcome).

**Q3. What should a visitor do?** One answer: buy, book, request a quote, sign up,
join a waitlist, play, call, read. This becomes the primary button label.

**Q4. How big and in what stack?**
- One-page site in a single HTML file (Recommended for tests and quick starts)
- One page in the existing React / Next project
- Multi-page site (list the pages)
- Add to an existing site (point to the repo)

Optional if the answers are thin: do you have a logo, brand colors, photos, real
prices or copy? how much motion (calm, moderate, showpiece)? languages? Ask them
in plain words, one line each, not as a form.

## Step 3: write the improved brief and show it

Rewrite the user's prompt into this template, fill every field with their words
first and clearly marked assumptions second, and show it in 8-12 lines before
building. Do not wait for approval unless an assumption changes cost or brand.

```
Idea:        <one sentence in the product's own nouns, no adjectives like premium>
Visitor:     <who, and the moment they arrive in>
Action:      <the single primary action, as a button label>
Proof:       <what makes the claim believable: real number, demo, process, work>
Look:        <one style recipe + at most two borrowed details; type and colour direction>
Signature:   <one interactive or scroll moment specific to this product>
Sections:    <ordered, each with its dominant asset or interaction>
Content:     <what the user supplied / what is sample and labelled as sample>
Motion:      <level, owner library, reduced-motion behaviour>
Scope:       <pages, devices, stack, languages>
Assumptions: <each guess, so the user can correct it in one line>
```

Pick the direction with the brief's own words so the style matches it:
`node <colabio>/scripts/pick-direction.mjs --seed "<product>" --brief "<their words>" --type <type>`.
If the output says `fallback: true`, part of the pick matched nothing; choose by hand.

Facts rules: never invent customers, logos, awards, stats, testimonials, or prices
as real. A fictional or test brand is allowed; say so in the page and in the notes.

## Step 4: teach the better prompt

End the intake (and the final delivery) with a short "next time say" line, so the
user's prompts improve. Keep it to one pasteable sentence built from the brief:

> Build a one-page cinematic landing page for Reclone Studio, a 3D printing
> service that reproduces discontinued parts. Visitor: someone holding a broken
> knob. Action: "Price my part". Signature: a layer-height estimator. Dark, one
> orange accent, serif headline. Sample prices, no invented customers.

## Before / after

| Thin prompt | Upgraded brief (shortened) |
| --- | --- |
| "create a landing page reclone studio a 3d printing website" | Idea: Reclone Studio prints replacements for parts no longer sold. Visitor: person with a broken part or a CAD file. Action: "Send a file". Proof: a layer-height estimator that shows time vs. surface finish. Look: swiss-precision + industrial details, paper and ink with one filament-orange accent. Content: fictional studio, sample prices labelled. |
| "now create reclone studio as game studio" | Idea: a small studio whose games turn your finished run into a teammate. Visitor: player or collaborator. Action: "Join the playtest". Signature: a playable two-room prototype in the hero. Look: cinematic-immersive, dark, lime = you, amber = clones. Content: one playable game, other projects labelled concepts. |
| "make it premium and creative" | Ask what felt cheap (see triage below), then name one signature moment, one type pair, one palette with contrast ratios, and one scroll-driven scene. |

## When the user says it looks cheap, boring, or generic

Do not restyle blindly. Ask (one line, multi-select): "Which of these bothers you
most?" then fix the cause, not the paint.

| Complaint | Usual cause | Fix |
| --- | --- | --- |
| Flat, like a template | Equal boxes, uniform padding, no depth or imagery | One dominant visual, varied section rhythm, real art or a 3D/illustrated object |
| Cheap type | Heavy default grotesk everywhere, no scale contrast | Editorial pair, huge display against small mono labels, tight tracking |
| Too plain | No motion story, static sections | One scroll-driven scene that explains the product; mask-line headline reveals |
| Too busy | Many effects, many accents | One accent, one hero moment per screen, remove ornament |
| Doesn't feel like us | Wrong style for the product | Re-pick the recipe from the product's nouns; rewrite the signature |
| Hard to use | Controls unclear, tiny targets, broken mobile | Fix hierarchy and states first; ornament later |
| Lifeless photos or none | Placeholder art | Build objects in code, generate hero art, or use owned photography |

## Build-time lessons

Verification and rendering lessons from earlier runs live in `verify.md`
(capture protocol, WebGL blank frames, mask clipping, driving real events).

### When the complaint is "not award-level" or "not cinematic"

Ask what they have seen that they mean (one link or one word), then check these in order.
Most pages that read as "good but not award-level" fail the first two.

| Gap | Fix |
| --- | --- |
| The object is a flat illustration, not a physical thing | Real 3D lit like a product photo (motion-recipes.md, cinematic 3D scene); bake the catalogue from the same engine |
| No opening moment | Lights ramp up, the object rises and the brand word sits behind it; no loader |
| Sections are the same mood top to bottom | Alternate dark and light sections with a switched theme; the object travels between sections |
| Scroll only reveals | Make scroll drive a transformation that explains the product (lump to vase) |
| Nothing to touch | Drag-to-turn, live configurator tied to size, capacity and price |
| Type is one size and weight | One huge display moment (outlined wordmark, 28vw) against small tracked labels |
| It breaks on phones or without WebGL | Slot-based layout for mobile; 2D fallback and a `?no3d` test switch |

## The short-prompt path (default quality, minimal questions)

A prompt such as "build me a shop for handmade ceramics" is complete enough to reach the
award-level bar (`award-bar.md`) with the template defaults. Treat the missing pieces as
decisions the skill makes and states, not as questions:

| Missing piece | Default the skill applies and states |
| --- | --- |
| Type | From the nouns: shop/store -> product shop; game/studio -> scroll stage; service -> precision |
| Look | The template's look (dark hero, cream builder, serif display); `pick-direction.mjs --brief` only if the brand needs something else |
| Signature | The template's configurator or demo, re-modelled for this product |
| Action | Add to cart / join the playtest / get a price |
| Content | Fictional sample brand with labelled sample prices; invent nothing as real |
| Scope and stack | One HTML file, no build step, desktop and phone |

Ask at most these two, with the recommended option first, then proceed:
1. "Which look?" (3-4 options mapped to style recipes, template default first).
2. "Which signature moment?" (the template's, plus two alternatives from site-types.md).

State the improved brief (8-12 lines) and the assumptions, then scaffold and build. Do not wait for
approval. End with the "next time say" sentence so the user can reproduce or vary the result.

Example: "build me a shop for handmade ceramics" -> asks look and signature, picks
`cinematic-product-shop`, scaffolds it, replaces the object model, copy and process stages, verifies
with the WebGL snapshot technique, and reports which of the ten bar rows were met.

## Real brands and companies

If the idea names a real company or product ("a landing page for YouTube"), ask which it is
before designing: the user's own page about it (an owner, creator or partner), a tool for that
product's audience, or an **unofficial concept**. For an unofficial concept: say so in a visible
banner and in the footer, use the name only as plain text, use no logo, wordmark styling, brand
mark, trade-dress colours or third-party assets, make no statistics or feature claims beyond
widely known ones, keep all interactions local and sample, and choose a palette that cannot be
mistaken for the brand's own (palette-lab's category flags help). Never imply endorsement.
