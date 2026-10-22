# Haven / Field study 001

## Project evidence

Haven is a U.S. property research and investment-analysis platform. The source
facts describe illustrative return modeling and a multi-factor property risk
audit. This independent demo uses a fictional property, sample assumptions,
illustrative photography, and a conceptual plan. It has no live listings or backend.

## Structural concepts considered

1. A comparison atlas linking several properties to a market view. This would
   need credible geographic and market data that this isolated test does not have.
2. A property investigation that follows one place from visual inspection to
   explicit assumptions, a cost breakdown, and open due-diligence questions.

The second concept is selected. A single subject connects the entire experience.
The page is a working field study, rather than a sequence of marketing blocks.

## Narrative and component contracts

| Scene | Visitor question | Component and action |
| --- | --- | --- |
| Opening | What does Haven help me see? | Broad typographic introduction leads directly to a property inspection. |
| Inspection | What is known, assumed, or unresolved? | Annotated photo/concept-plan switch, three linked inspection lenses, and a contextual evidence sheet. |
| Transition | Why do the assumptions matter? | A compact research ledger connects the asset's sample price and rent to the financial experiment. |
| Experiment | Where does rent actually go? | A live cost waterfall, adjustable inputs, linked summary, and two sensitivity scenarios. |
| Handoff | What should I check before a decision? | An open-question ledger and a downloadable text record of the current scenario. |

The inspection works through buttons, keyboard focus, and touch without hover.
Its plan is explicitly conceptual, not a representation of the photographed home.
The waterfall uses the existing tested mortgage calculation and disclosed costs.
An accessible cost ledger presents the same amounts as the visual chart.

## Art direction

The drawing-board motif comes from inspecting evidence, not a decorative theme.
Fine survey lines, numbered annotations, and document metadata connect photo,
plan, costs, and notes. Large open compositions alternate with dense functional
views. No feature-card grid, testimonial strip, or generic FAQ sequence is used.

Local Manrope provides display and reading roles at real 400–700 weights.
Local IBM Plex Mono differentiates financial values and document indices at 400.
Body copy is 16px with comfortable line-height; functional labels are 12–14px.
The palette uses cool paper, graphite, slate blue, and oxide accents. Error and
negative values use their own deep-red token. Focus, touch, and contrast remain
functional constraints. This test imports no original-site styles or components.

## Motion ownership

GSAP owns the staggered title entrance, inspection-sheet transitions, SVG bar
updates, document progress, and restrained image depth. Lenis owns wheel-scroll
interpolation through the GSAP ticker. Native touch scrolling remains available.
Motion-off and the OS reduced-motion preference restore static readable content
and native scrolling. Chart labels update immediately even while bars interpolate.

The first rendered review covers the property inspection and its transition.
The financial experiment and handoff are then completed and tested. Framer
Motion is not added because this isolated demo remains plain HTML/JavaScript.

## Observed verification

- The first rendered property component was reviewed before completing the lab.
  Photo/plan switching and the linked income and due-diligence lenses worked.
- The finished page changes the information structure, not just the theme:
  property investigation, connected cost experiment, open questions, saved notes.
- Browser checks confirmed a $376 base remainder, $63 under the rent stress,
  $226 with the additional cost, a negative shortfall, and restoration on reset.
- Selecting the income lens after the rent stress shows the same effective
  $3,240 rent used in the waterfall and text ledger.
- A real case-notes download was created and its contents inspected.
- Mobile navigation, the alternate mobile cost visualization, and heading fit
  were checked. Measured 291px and 355px viewports had no horizontal overflow.
- Motion-off removed Lenis, disabled replay, and left all inspected content
  visible. Re-enabling motion restored Lenis. OS media emulation was not available;
  the preference guard is implemented but that OS path was not separately simulated.
- Seven focused model/geometry/export tests passed. Browser console checks
  showed no errors or warnings. Public assets loaded and private routes stayed blocked.
- The original site's tracked source and dependency fingerprint matched before
  and after this rebuild. All implementation changes are inside `testing`.

These observations establish a functional structural retest, not an award rating
or a complete accessibility/performance audit.
