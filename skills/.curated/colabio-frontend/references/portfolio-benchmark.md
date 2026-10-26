# Portfolio benchmark: what a strong hand-built portfolio does

Teardown of the owner's own live portfolio (gouravmaurya.vercel.app, studied
2026-10-26: rendered at 1024x768, source of its CSS and `motion.js` read). Use it as a
bar for studio/portfolio/personal sites and as a source of mechanisms for any
editorial page. Learn the decisions; do not copy its copy, photo, project art or
exact layout. The starter `templates/editorial-portfolio/` re-implements these
mechanisms with fictional content.

## Why it does not read as a template

1. **One idea, stated by the layout.** The name is the hero: two giant condensed
   words with the portrait sandwiched between them (first word behind the photo,
   surname in front of its bottom edge). The page's identity survives with motion off.
2. **Three typefaces, three jobs, no overlap.** Barlow Condensed 800 for display and
   section statements, Italiana (a thin Didone serif) for the voice: taglines, the
   large "g." monogram, signatures, index numerals; DM Sans for body and labels.
   Contrast between a heavy condensed and a delicate serif is the signature.
3. **A paper-and-ink palette with one earthy accent.** `#eeeae1` paper, `#23231f` ink,
   `#9a4030` brick accent, `#c8c2b6` hairlines, `#636057` muted. On dark sections the
   accent lightens (`~#e0a590`) so small text keeps contrast. Grain overlay at ~7%.
4. **Structure from hairlines and numbering, not cards.** Sections start with a
   `01 / THE PROJECT INDEX`-style kicker over a 1px rule; skills are numbered rows
   between rules; experience is a timeline of rules. No shadows, no icon tiles.
5. **A navigation object, not a header.** A small floating dock on the left edge
   (monogram + vertical-text links, active link in accent), collapsing to a bottom
   bar on phones. It takes no vertical space and keeps the first screen clean.
6. **Light and dark sections alternate and rise out of each other.** Dark sections
   morph their background from paper via a scrubbed `backgroundColor` tween that
   finishes before the section's text is on screen.
7. **Real work, honestly framed.** Four projects with kicker (number / domain),
   a name, a one-sentence outcome, stack tags, and one link. No logo wall, no
   testimonials, no invented numbers.
8. **Copy has a voice.** "Ideas into products. Built with purpose." "Let's make it
   matter." Specific verbs, short lines, a status chip ("Open to opportunities").

## Motion system (one owner per job)

- **Lenis owns the scroll, driven by the GSAP ticker** (`autoRaf:false`,
  `gsap.ticker.add(t => lenis.raf(t*1000))`, `lagSmoothing(0)`); `window.lenis` is
  exposed as the off switch. Anchors route through `lenis.scrollTo`.
- **GSAP owns everything scroll-linked**; a separate spring owns pointer motion.
- **Opening sequence:** the portrait's clip window opens from a full-viewport crop
  to its slot while the image scales uniformly (never stretched, framed on the face),
  then the two name words arrive letter by letter, then the rest of the page
  assembles. A SKIP button, input-to-skip (wheel/touch/key/pointer/resize) and a
  timer-based hard release (rAF freezes in background tabs) guard it. The
  intro is gated on first paint of fonts and the photo decoding, not a made-up delay.
- **Three entrance grammars by role:** statements arrive word by word, images wipe
  open with `clip-path`, body text rises 14-22px. Display headings come into focus
  from `blur(6px)`. Utility rows (contact links, footer) do not animate.
- **Pinned horizontal work track** at `(min-width:900px) and (min-height:700px)`:
  the section pins, the project row translates by `scrollWidth - room`, scrub 0.6,
  `pinType:'transform'`, `invalidateOnRefresh:true`, and every panel fades in with
  `containerAnimation: travel`. Below that, the same markup is a vertical stack
  with normal reveals. The JS query string and the CSS media query are identical.
- **Reveals use IntersectionObserver, not ScrollTrigger**, because pinning inserts
  a spacer that leaves trigger positions stale. Observe the *parent* of a clipped
  element (a fully clipped element has no visible area).
- **Fail-open everywhere:** reveals are set with `gsap.set` after the script runs, not
  with CSS `opacity:0`, so a script failure leaves a visible page; the intro class is
  removed by a head script on a 6 s timer; `MOTION_OK` is `(not (prefers-reduced-motion: reduce))`
  so browsers that do not know the feature still animate.
- **Reduced motion resolves, it does not freeze:** fades only, no travel, blur, pin,
  parallax, smooth scroll or cursor.
- **Cursor ring** trails the real cursor with a spring and grows on links; the native
  cursor stays; fine pointers only; never under reduced motion.

## Page anatomy to reuse

hero (name + portrait + intro + status + CTA) -> work index (pinned track) -> about
(sticky-feeling two columns, big serif monogram, toolkit rows) -> background
(sticky heading + timeline) -> contact (huge statement, circular CTA, copy-email,
links) -> footer. About 5 sections, ~15k px tall at 1024 wide.

## Where to improve on it (do not copy these)

- Dock text is small and low contrast on the dark section; give it a dark variant.
- The pinned track hides work from keyboard users until they scroll; provide the
  vertical layout when `(prefers-reduced-motion: reduce)` (already done) and keep
  project links reachable by tab.
- Project art is screenshots of title cards; stronger case narratives (problem,
  role, decision, result) would earn the "deep case study" row that award juries reward.
- Add per-project pages or an expanded panel, and measured outcomes if real.

## How to use this in a build

1. Run the intake, then read `site-types.md` (Studio or portfolio) and this file.
2. `node scripts/scaffold.mjs editorial-portfolio <out> --brand "Name"` and rewrite
   everything: copy, palette, fonts, portrait, project art, project list.
3. Keep the mechanisms (dock, pinned track with vertical fallback, IO reveals,
   dark-section morph, intro with skip) unless the content argues otherwise; change
   the display/serif/sans trio and the palette so the result is not a clone.
4. Verify with `references/verify.md`: drive the pin by scrubbing progress, check
   1440/1024/390, reduced motion, and the no-library path.
