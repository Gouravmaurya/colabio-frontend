# Understand first, then plan, then decide the theme

The order is the quality. Theme, colour and type are *consequences* of what is being
built, who uses it, where and why. Choosing them from a style word ("cinematic",
"premium", "dark") before understanding the product produces a default. Do these
three steps in order and write each down in `design-brief.md`.

## Step 1: Understanding Sheet (before any visual decision)

Answer from the idea, the repo, links and screenshots. Ask the user only what
cannot be inferred and would change the build. One line each.

1. **What is it?** In the product's own nouns. What does it replace today (spreadsheets, WhatsApp, paper)?
2. **Who uses it?** Roles, expertise, how often. Who decides to buy vs who uses?
3. **Where, on what, in what light?** Office desktop, factory-floor tablet, phone in a shop, living room TV. Daylight or dim. This drives surface (light/dark), density and target size.
4. **What are they trying to decide or do?** The decision or pain that brings them here.
5. **What must they believe to act?** The proof that works for this audience (a working demo, a number, a process, a photo of the real thing).
6. **Domain vocabulary and materials.** The objects, units, tools, places and materials of the field (pcs, SAM seconds, markers, bobbins; glaze, kiln; ledgers, stamps). These are the source of metaphors and colours.
7. **Category defaults to avoid.** What every competitor's site looks like. Name it (navy + yellow, purple glow, neon on black, stock hands).
8. **Emotional register.** The feeling to create, as decisions: "calm under pressure" means low contrast noise, one signal colour, slow motion; "delight" means colour, springs, character.
9. **Constraints.** Brand assets, languages, accessibility, performance, stack, existing code.
10. **First-screen obligation.** What must be obvious in three seconds.

## Step 2: Plan around the understanding

Build the structure from items 4, 5 and 10 *before* styling:

- The visitor's question sequence becomes the scene or page list.
- The proof from item 5 becomes the signature component.
- Item 3 sets density and size: floor tablets need large targets and high contrast; dense office data tolerates smaller type and tables.
- Write the scene score (question, composition, asset, motion verb, hand-off) and the page list now.

## Step 3: Theme decisions, derived

Only now choose surface, colour, type and motion character. Use evidence from steps 1 and 2:

1. Run `node scripts/palette-lab.mjs --domain "<idea words>"`. It builds four candidates from the domain's real materials (`domain-swatches.json`), checks contrast, and flags category defaults. Add `--swatches "#hex,..."` when you have real photos or brand colours.
2. Pick one candidate and write which material each colour comes from and why the surface (light, dark, or light with one dark scene) fits item 3.
3. Reject any candidate carrying a `categoryDefaultFlags` entry unless the brand or the user requires it, and say so.
4. Type follows register and density (item 8, 3): a data-heavy tool needs a tabular-figure sans plus mono; a craft shop can carry a serif display.
5. Motion character follows register: calm = slow eases and few moves; delight = springs and variety.

## Context to implication

| Context | Implication |
| --- | --- |
| Daily use in bright rooms, dense data | Light default surface; a dark scene only for a hero or proof moment |
| Entertainment, nightlife, film | Dark default is justified |
| Trust-critical (finance, health, legal) | Calm neutrals, one decisive accent, no neon, no gradients as decoration |
| Physical craft or material product | Palette from the materials; photography or built objects over gradients |
| Expert audience | Density, mono data, fewer metaphors, real units |
| "Cinematic" requested | Cinematic is framing, light and pacing: scene score, depth, continuity. It does not require a dark theme |
| Floor or field use (gloves, glare) | Large targets, high contrast, no hover-only states |

## Anti-patterns this step prevents

- Theme chosen from a style word before understanding the product.
- A palette justified after the fact ("denim, chalk") when it was picked by default.
- Comparing the chosen palette to a straw alternative instead of three real candidates.
- Dark by habit because the brief said cinematic or premium.
