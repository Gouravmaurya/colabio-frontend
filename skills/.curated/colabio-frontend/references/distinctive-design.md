# Beyond the template

A page looks templated when its parts could be swapped with another product's without anyone noticing.
Use this file at the Plan stage (before the scene score is final) and again at Verify.

## 1. Why sites look the same

- Same skeleton: hero, logo strip, three cards, testimonials, final call to action.
- Same moves: gradient blob, glass card, fade-up on every block, centred everything.
- Same components copied from a catalogue with the demo copy swapped.
- Colour and type picked from the category default instead of the product's real materials.

## 2. The category inventory (do this first)

Write down, in five lines, what every competitor page in this category does: the hero layout, the palette,
the type, the proof device, the call to action. That list is what you must not simply reproduce. Then pick
three references **inside** the category and three **outside** it (a museum catalogue, a field guide, a
film title sequence, a timetable, a ledger). Note one structural idea from each. Never copy a layout or
trade dress; borrow principles.

## 3. One distinctive move

Every page gets exactly one move that only this product could own, stated in one sentence in the brief:

> "The hero is the actual order ticket, and scrolling prints it." / "Every section is a drawer in the roaster's cabinet."

It must come from the Understanding Sheet (its objects, vocabulary, workflow). It must change structure,
not paint. Rotating logos, floating cards and orbiting dots are not a move.

## 4. Section grammar (plan the forms before the copy)

Give each section a form from this menu and write it next to the scene in the score.

| Form | Example |
| --- | --- |
| Statement | One huge sentence with inline media |
| Index | Numbered list with a row-reveal |
| Stage | A pinned object that changes as copy scrolls |
| Track | A sideways story inside vertical scroll |
| Ledger | A table or log presented as the content |
| Specimen | One real object shown large with callouts |
| Compare | Before and after, with and without |
| Timeline | Real durations or dates |
| Conversation | A dialogue, thread or transcript |
| Instrument | A working calculator, picker or builder |
| Atlas | A map, grid or diagram |
| Quiet | Space and one line, on purpose |

Rules:

- No form more than twice per page. No identical form in adjacent sections.
- The banned skeleton (hero, logos, three cards, testimonials, closing call to action) is allowed only if the brief explains why this product needs it.
- At least one **Quiet** section and one **Instrument** or **Specimen**.
- Vary density, alignment and background between neighbours.

## 5. Sourcing components

Order: (1) `library/components` (16 originals, read `library/components/INDEX.md`); (2) Hallmark recipes in `library/`;
(3) a registry through `node scripts/component-source.mjs` (shadcn, Magic UI, Aceternity UI, React Bits, Skiper UI,
Vengeance UI, Kokonut UI, 21st.dev with the user's own key; see `references/libraries.md`); (4) build it custom.
Whatever the source, run the six-step transform checklist in `library/components/INDEX.md` and write the provenance line.
Use at most three registry pieces per page, from at least two sources, and no piece twice.

## 6. Specificity tests (run before delivery)

- **Logo swap:** cover the name. Could this page belong to a competitor? If yes, it is a template.
- **Category swap:** replace the nouns with another industry's. If nothing breaks, nothing was specific.
- **Greyscale:** drop the colour. The hierarchy and the structure must still read.
- **Squint:** blur the page. The eye should land on one place, then a second, in a deliberate order.
- **Three seconds:** a stranger names what it is, who it is for and what to do next.

## 7. The scanner

`node scripts/variety-check.mjs <page.html|folder>` reads each section's form, flags repeats and the banned skeleton, and
lists demo copy. It is a heuristic: use it to prompt a design decision, not as a score.

If a section is built by script (a track, a timeline, a board), the scanner cannot see its form. Put `data-form="track"` (or `stage`, `instrument`, `specimen`, `ledger`, `quiet`, `faq`, `close`) on the `<section>` and it is used as declared. Declare honestly: it is a self-report, and the specificity tests still apply.

## AI tells (what makes a page look generated) and the fix

`variety-check.mjs` counts the first three.

| Tell | Fix |
| --- | --- |
| Every section opens with the same small mono eyebrow, a giant heading and a grey lede | Vary the openings: a sentence that is the control, a heading inside the figure, a caption, or no label at all |
| Numbered labels 01, 02, 03 | Drop them. Numbering is for real sequences (a timetable), not section headers |
| Letter-spaced uppercase micro-text everywhere | Keep it for one or two data roles; set the rest in sentence case |
| Stock vector scenery (a flat skyline, blobs, floating cards) | Draw a specific object from the product: a map of its real routes, a printed form, a ticket, an instrument at the real reading |
| Aphorism copy ("X is the Y", rule of three) | Say something concrete and a little dry. Use the product's own numbers and nouns |
| Everything the same size, aligned and tidy | Break the grid on purpose: tilt a paper object a degree, crop a huge element off the edge, offset alternate items |
| Smooth gradients and glows as the only texture | Add real texture: paper grain, print rules, perforations |
| A control row of sliders under a heading | Put the controls in the sentence |
