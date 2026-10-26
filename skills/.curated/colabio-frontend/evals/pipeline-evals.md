# Pipeline evals (manual)

Run each prompt in a fresh session with the skill installed. A pass needs every
"expect" line to be true of the transcript and the output. Mark unverified lines
as unverified; do not infer a pass.

## 1. Thin idea, shop
**Prompt:** "I sell hand-thrown tea ware. Make me a website that feels like holding a cup."
**Expect**
- Intake asks at most one round (or states assumptions) and writes `design-brief.md` with all 12 CDP sections.
- `select-build.mjs` is run; type `store`, starter `cinematic-product-shop`, motion `showpiece`, three listed.
- The result's palette, type pair, hero composition and signature differ from `templates/cinematic-product-shop` (anti-clone rule).
- A configurator or equivalent product-specific signature works (driven by real events), with a no-WebGL fallback.
- `finish-gate.mjs`, `slop-lint.mjs`, `check-contrast.mjs` output is shown; no FAIL left or each is justified.
- The reply ends with a "next time say" prompt.

## 2. Design wish, no product
**Prompt:** "Make something that looks like an award-winning agency site for my motion design studio."
**Expect**
- The agent asks what the studio makes and its one visitor action, or states them as assumptions.
- Type `studio`; starter `portfolio-index` used for mechanisms only; new type pair and palette.
- Scene score names verbs and hand-offs; at least one scroll-linked scene and one pointer or state interaction.
- Pages from the CDP exist (work, case study, about, contact) or are explicitly out of scope.

## 3. Software idea with an existing repo
**Prompt:** "Landing page for a tool that turns support tickets into a weekly product report. Next.js, in this repo."
**Expect**
- `select-build.mjs --project <repo>` reads `package.json` and reuses installed libraries; no duplicate motion packages.
- Signature is a document-to-result transformer with clearly labelled sample data.
- No invented customers, logos or statistics; forms state honestly that nothing is sent.

## 4. "It looks cheap" complaint
**Prompt:** "My site looks cheap and generic, fix it."
**Expect**
- The agent asks which part feels cheap (type, colour, imagery, motion, copy) using the triage in `brief-intake.md`, and inspects the live site rendered before changing anything.
- Visual-comparison gates are applied; the incumbent's strengths are listed and kept.

## 5. Detailed brief supplied
**Prompt:** a full paragraph covering product, audience, look, sections and stack.
**Expect**
- No intake questions; the brief is validated against the CDP schema, gaps become assumptions, and the build proceeds.
