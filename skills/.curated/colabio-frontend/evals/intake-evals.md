# Intake evals (manual)

Run each prompt against the skill in a fresh session. Check the expected behaviour
by reading the transcript; none of this is automated. A pass means every "Expect"
line is true and no "Must not" line is.

## 1. "create a landing page reclone studio a 3d printing website"
- Gaps scored: audience, action, look, content, interaction, stack (6 of 8) -> asks.
- Expect: one question round (3-4 questions); Q1 website type with "landing page" first;
  Q2 look options mapped to style recipes (swiss, industrial, cinematic...);
  Q3 primary action; Q4 scope/stack. Then an improved brief in the template with
  assumptions marked, then a "next time say" line.
- Expect: brief notes Reclone is treated as a fictional test brand; prices labelled sample.
- Must not: invent customers or prices as real; start building before showing the brief.

## 2. "now create reclone studio as game studio"
- Gaps: product facts, look, signature, content (4 of 8) -> asks, shorter.
- Expect: asks type (game/entertainment) only if unclear; proposes a playable hero as
  the signature; marks non-playable projects as concepts; pick-direction run with
  `--type game`.
- Must not: ship fake titles with sales or player counts.

## 3. "it's very cheap, I want premium and creative"
- Expect: the skill asks which part bothers the user (multi-select from the triage
  table: flat, type, plain, busy, not us, hard to use, no imagery) before restyling.
- Expect: names one signature moment, one type pair, one palette with contrast ratios,
  one scroll scene as the fix plan.
- Must not: only swap colours or fonts.

## 4. "build me a shop for handmade ceramics"
- Gaps: audience, action, look, content, stack -> asks.
- Expect: type = store; asks look with atmospheric-soft / editorial-print / apple-fluid
  options; asks whether real product photos and prices exist; plans product images as
  authored or supplied, not placeholder hosts.
- Must not: use placehold/picsum; invent reviews.

## 5. "dashboard for tracking team timesheets, no questions, just build it"
- Expect: zero questions (user opted out); a short assumptions list in the first
  message; app-style density, written empty/loading/error states.
- Must not: ask anything; use marketing-page whitespace for a working app.

## Pass criteria for script changes
- `node scripts/pick-direction.mjs --brief "<prompt words>"` prints `matched` and
  sets `fallback:false` for prompts 1, 2 and 4; prints `fallback:true` for gibberish.
- `node scripts/check-contrast.mjs <built page>` passes for body text and muted text.

## 6. "build me a shop for handmade ceramics" (the short-prompt, award-level path)
- Expect: at most two questions (look, signature); improved brief shown; type = store; template
  `cinematic-product-shop` chosen and scaffolded with `scripts/scaffold.mjs`.
- Expect: the object model, copy, process stages and collection are rewritten (not the template's
  sample text); `slop-lint.mjs --sample ...` reports no leftover sample content.
- Expect: verification uses the WebGL snapshot technique; report names which of the ten rows in
  `references/award-bar.md` were met and which were not checked.
- Must not: ship the template unchanged, invent customers or reviews, leave `window.__dbg`.

## 7. "build me a shop for handmade candles" (same template, different product)
- Expect: same flow; shapes and finishes re-modelled for candles (jars, tins, pillars); a different
  process sequence (melt, scent, pour, cure) in `PSTG`; the page boots with no console errors.
- Verified once by hand: scaffolding with a swapped `SHAPES` config boots and renders a new
  object with no code changes to the stage.

## 8. "make a simple one-page site for my dentist" (explicit simple request)
- Expect: no 3D, no template; a clean single page that still passes contrast, mobile and honesty
  checks; the award-level bar is NOT forced when the user asks for simple.

## 9. "build me a landing page for my game studio"
- Expect: template `scroll-stage-game`; a playable or scrubbed demo as the hero; projects with
  honest statuses; the demo logic replaced with the studio's own mechanic.
