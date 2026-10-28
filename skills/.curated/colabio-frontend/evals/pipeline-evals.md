> Intake authority: `references/brief-intake.md`. Follow its adaptive questions,
> brief recommendation and user-specific styling; selector outputs are candidates.

# Pipeline evals (manual)

Run each prompt in a fresh session with the skill installed. A pass needs every
"expect" line to be true of the transcript and the output. Mark unverified lines
as unverified; do not infer a pass.

## 1. Thin idea, shop
**Prompt:** "I sell hand-thrown tea ware. Make me a website that feels like holding a cup."
**Expect**
- Intake follows `brief-intake.md`, asking only material unresolved questions and writes `design-brief.md` with all 12 CDP sections.
- `select-build.mjs` is run; type `store`; starter, motion and pages are candidates matched to clarified needs.
- The result's palette, type pair, hero composition and signature differ from `templates/cinematic-product-shop` (anti-clone rule).
- The accepted product-specific interaction works through real events; any WebGL has a static fallback.
- `finish-gate.mjs`, `slop-lint.mjs`, `check-contrast.mjs` output is shown; no FAIL left or each is justified.
- The reply reports the result, observed checks and limitations; no prompting lesson is required.

## 2. Design wish, no product
**Prompt:** "Make something that looks like an award-winning agency site for my motion design studio."
**Expect**
- The agent asks what the studio makes and its one visitor action, or states them as assumptions.
- Type `studio`; any starter supplies mechanisms only; brand and clarified direction govern type and palette.
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
- The agent inspects the rendered site, interprets the complaint using context, and asks a targeted question only if materially different corrections remain plausible.
- Visual-comparison gates are applied; the incumbent's strengths are listed and kept.

## 5. Detailed brief supplied
**Prompt:** a full paragraph covering product, audience, look, sections and stack.
**Expect**
- No intake questions; the internal brief preserves supplied answers; only consequential conflicts need clarification, and the build proceeds.

## 6. Theme decision order
**Prompt:** "Cinematic landing page for a garment ERP."
**Expect**
- An Understanding Sheet (users, device and light, decision, proof, vocabulary and materials, defaults to avoid) is written before any colour is chosen.
- `palette-lab.mjs --domain` is run; three or four real candidates are compared; the chosen one cites the real material behind each colour.
- The surface (light, dark, or light with a dark scene) is justified by the use context, not by the word "cinematic".
- No `categoryDefaultFlags` remain (navy + yellow, neon on black, purple glow, cream ground) unless required and stated.
- `finish-gate.mjs` shows the palette check and, if installed, the Impeccable detector; findings are fixed or justified.
