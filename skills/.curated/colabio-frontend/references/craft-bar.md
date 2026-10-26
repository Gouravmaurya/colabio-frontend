# Craft bar: the level to build at, never a design to copy

This file captures what makes strong hand-built sites feel authored, learned from
studying a high-craft personal portfolio (2026-10-26) and from award-site analysis
in `award-bar.md`. It is a **level**, not a look. Reaching it means making
decisions of the same quality for a new brief; it never means reusing another
site's typefaces, palette, hero arrangement, section order, copy or art.

## Anti-clone rule

For every build, the following must come from the new brief and be different from
any reference you studied (the owner's portfolio, a template in `templates/`, an
award site): typeface pairing, palette, hero composition, navigation form, the
signature interaction, the section order, copy, and artwork. If three or more match
a reference, redo the direction with `pick-direction.mjs` and a different seed.
Templates are starting points for *mechanisms and safety*, not for identity.

## The ten properties of the level

1. **One idea the layout states.** The page's identity is legible with motion off:
   a sentence, an object, an index, a map. Not a stack of equal sections.
2. **Typefaces with distinct jobs.** Two or three families, each with a role
   (display, voice/accent, text/labels), with real contrast between them
   (weight, width, serif vs sans, proportion). Never decorative variety.
3. **A restrained palette with a rule.** A named surface set (often a light and a
   dark), one accent per surface, tokens checked for contrast. The accent
   changes value on the other surface so small text stays readable.
4. **Structure from rules, numbers and space, not boxes.** Hairlines, numbered
   kickers, tables and generous gaps replace cards, shadows and icon tiles.
5. **A navigation form chosen for the content.** A floating dock, a top bar with
   numbered links and local time, a side index, a command pill: one that costs
   little space and suits the page. Never a default centered logo-and-links bar
   because it is the default.
6. **Sections that hand off.** Surfaces alternate or morph, a sticky element carries
   state across sections, or a scrubbed line connects steps. Hard cuts between
   identical bands are the template tell.
7. **A motion system with owners and roles.** One scroll owner (Lenis driven by the
   GSAP ticker), scroll-linked work in GSAP, pointer and component springs in
   Motion or GSAP `quickTo`. Different entrance grammars by content role
   (statements by word, images by wipe, body by rise, utility rows not at all).
8. **Fail-open, interruptible, reduced-motion-complete.** Hidden states are set by
   script after load or released by a timer; intros can be skipped by input;
   reduced motion gets fades or changed interaction, never a frozen page; the
   page works with no animation libraries.
9. **Honest, specific content.** Real or clearly labelled sample work, one
   measurable outcome per project, voice in short specific lines, no filler verbs.
10. **Craft in the margins.** Live local time, status chips, copy-email, focus
    states, `svh` units, text-wrap balance, aria-labels on split text, 44px targets.

## Mechanism menu: pick one per decision, vary across builds

| Decision | Options (different looks, same quality) |
| --- | --- |
| Hero | one huge sentence with inline media chips; name + object layered; index list that is the nav; full-bleed media with caption rail; pinned object that transforms; spec-sheet for experts |
| Work display | sticky stage + scrolling index (stage swaps by active item); pinned horizontal track with vertical fallback; hover-preview list; big alternating case narratives; draggable canvas |
| Type voice | condensed grotesk + thin serif + sans; grotesk variable display + sans + mono; serif display + grotesk; mono-forward technical; heavy slab + humanist sans |
| Navigation | left dock; top bar with index + clock; side rail; floating pill; bottom bar on phones |
| Section handoff | colour morph; sticky heading + scrolling body; scrubbed progress line; clip-path wipe between bands; shared object that moves between sections |
| Intro | word rise; photo/shape wipe; counter-to-content; none (often best) |
| Cursor/pointer | ring trail; magnetic buttons; letter-roll links; none on touch |
| Contact | giant address with hover roll; circular CTA; short form with honest result; calendar link |

Choose a combination that fits the content and differs from the last build and
from any reference; document the choice and why in the delivery notes.

## Reference teardown: mechanisms worth knowing (not to copy)

From the studied portfolio, transferable engineering lessons:
- Lenis `autoRaf:false` + `gsap.ticker.add(t => lenis.raf(t*1000))` + `lagSmoothing(0)`;
  expose `window.lenis` as the off switch.
- Use IntersectionObserver for reveals when the page pins or has sticky spacers:
  ScrollTrigger start positions are document positions and go stale. Observe the
  parent of a clipped element.
- Reveal with script (`gsap.set` then `gsap.to`), not CSS `opacity:0`, so a script
  failure leaves a visible page. Gate on `(not (prefers-reduced-motion: reduce))`
  so unknown-feature browsers still animate.
- Pinned horizontal tracks: identical query string in CSS and JS, `pinType:'transform'`,
  `invalidateOnRefresh:true`, `containerAnimation` for per-panel entrances.
- Intros: release by input and by a `setTimeout` (rAF freezes in background tabs);
  gate on fonts and image decode, not a fixed delay.
- Dark/light handoff: scrub `backgroundColor` and finish before the section's text
  is on screen.

## How to use this in a build

1. Intake, then `site-types.md` for the type's proof and signature options.
2. Run `pick-direction.mjs` with the brief; read the recipe in `styles.md`.
3. Choose one option per row of the mechanism menu; write them in the design spec.
4. If a template helps, copy it with `scripts/scaffold.mjs`, then replace type,
   palette, hero, navigation, signature and copy (anti-clone rule).
5. Verify with `verify.md`: drive the sticky/pinned states by progress, 1440/1024/390,
   reduced motion, and the no-library path. Score against `award-bar.md`.
