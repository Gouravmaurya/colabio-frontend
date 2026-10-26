# Site-type playbooks

The intake (brief-intake.md, Q1) names a website type. This file turns the type
into a page structure: section order, the proof that works, signature-interaction
options, hero compositions and copy patterns. Treat every list as a starting
set to adapt to the product, not a template to fill. Pick one style recipe from
styles.md after reading the type, and run `scripts/pick-direction.mjs --type <type>`.

Honest-sample rule for all types: a fictional or test brand is fine when the page
says so. Prices, rates, timings and counts that are not real are labelled
"sample"; never invent customers, logos, awards, reviews or statistics.

Types: [service or product landing](#service-or-product-landing) ·
[studio or portfolio](#studio-or-portfolio) · [game or entertainment](#game-or-entertainment) ·
[store or catalogue](#store-or-catalogue) · [software or dashboard](#software-or-dashboard) ·
[editorial or content](#editorial-or-content) · [event or campaign](#event-or-campaign)

## Service or product landing

Visitor holds a problem and wants a price, a yes, or a next step.
- Order: hero with the outcome in nouns -> the tool that proves it (signature) ->
  how it works as a real sequence -> what it is made of / options -> price or quote
  form -> FAQ that answers objections -> footer.
- Proof that works: a working calculator or configurator, a process with real
  steps, spec tables, before/after of the actual outcome. Not logo walls.
- Signature options: scenario calculator showing the trade-off (not just a total);
  configurator that changes the product; document-to-result transformer; annotated
  object explorer.
- Hero: split diptych (claim | working state), oversized type with one precise
  object, or product-in-situ.
- Copy: headline = noun + verb or a number; button = the outcome ("Price my part").
- Worked example (3D-printing service, `index.html`): headline "Send a broken part.
  Get its clone." A layer-height estimator shows stair-step error vs. print hours
  and price; materials table with typical use temperature; quote form with a file
  drop that states plainly it sends nothing in the test.
- Mobile: hero image below the copy, calculator controls as large segmented buttons,
  tables become labelled stacks.

## Studio or portfolio

Visitor judges taste and fit, then makes contact.
- Order: statement + selected work index -> 2-3 deep case narratives -> how we
  work -> team or principles -> contact.
- Proof: the work itself, process artefacts, named collaborators only if real.
- Signature options: index-list hero where the list is the navigation; case
  narrative that unfolds one real project down the page; draggable canvas of work.
- Hero: single huge sentence with inline media words, or index list.
- Copy: specific verbs of what was made; no "we craft digital experiences".
- Mobile: work index becomes a vertical list with one image per row.

## Game or entertainment

Visitor wants to feel the game in seconds, then wishlist, play, or follow.
- Order: playable or watchable hero -> the one rule explained as a scroll sequence
  -> what is on the desk (each project with an honest status) -> design principles
  -> playtest or wishlist -> footer.
- Proof: the game itself in the browser, a short loop, real captured footage. Label
  status honestly: playable, prototype, concept.
- Signature options: a playable room in the hero; a scroll-scrubbed demo of the
  core mechanic; a level or character explorer; a sound instrument.
- Hero: the playable scene as the background with copy in a clear half, glass HUD
  for controls (`game.html`: isometric room, clones as teammates).
- Copy: the mechanic as a sentence ("Your last run is now your teammate").
- Mobile: scene sits in a slot between headline and controls; add an on-screen
  D-pad; keyboard instructions only for fine pointers.
- Engineering: recompute game state from (recorded inputs + current inputs) so
  undo and restart are exact; keep the scripted demo and live play on one engine.

## Store or catalogue

Visitor compares, chooses, buys.
- Order: category entry with a strong product -> filters or collections -> product
  detail pattern -> shipping/returns facts -> reviews only if real -> checkout path.
- Proof: real specs, real photos, clear price and delivery. Sizing or fit help.
- Signature options: configurator that updates the image and price; comparison
  matrix with filters; 3D turntable with state-linked camera moves.
- Hero: product as hero on a calm field, or an index of collections.
- Copy: price, material, dimension, lead time on the card; no filler adjectives.
- Mobile: sticky add-to-cart, thumb-reachable filters, no hover-only information.

## Software or dashboard

Visitor evaluates whether the workflow fits, or a signed-in user works fast.
- Order (marketing site): the product's real UI at fidelity -> the workflow in 3-4
  states -> integrations / data model -> pricing -> docs entry.
- Order (app): dense, scannable, keyboard-first; empty, loading, error, success
  states written out; no marketing whitespace.
- Proof: a real or honestly simulated UI, runnable snippet, changelog.
- Signature options: command or terminal playground using the product's real
  vocabulary; live data board; before/after of a real task.
- Hero: dense spec-sheet hero or product-in-situ.
- Copy: nouns and verbs from the product; numbers with units.
- Mobile: tables become cards with the primary column first; sticky primary action.

## Editorial or content

Visitor reads, browses an archive, subscribes.
- Order: lead story or thesis -> archive index -> reading view with a measure of
  45-75 characters -> related -> subscribe.
- Proof: the writing; bylines, dates, sources.
- Signature options: typographic index hero; scroll-scrubbed manifesto where words
  fill in as you read; annotated figures.
- Hero: oversized serif crop with a caption rail.
- Mobile: single column, generous leading, sticky progress rule.

## Event or campaign

Visitor needs date, place, programme, and a way in.
- Order: date + place + one action above the fold -> programme or schedule ->
  speakers or participants (real only) -> practical info -> sign-up.
- Proof: concrete schedule, venue, capacity, price tiers labelled as final or sample.
- Signature options: schedule explorer with filters and "add to calendar"; map with
  layers; countdown only when the date is real.
- Hero: huge date and place set as type; pinned scene for the programme.
- Mobile: sign-up button sticks; schedule groups by day.

## Choosing a signature, in one minute

Ask: what can the visitor do on this page in ten seconds that proves the claim
better than a sentence? If the answer is "move a slider and watch the number or
picture change", build that. If nothing real can be demonstrated, use the work
itself (case narrative) rather than a decorative effect.

## Templates per type (start here, then adapt)

| Type | Starting template | Notes |
| --- | --- | --- |
| Service or product landing (computable trade-off) | `templates/precision-service/` | Replace the model and the cross-section drawing |
| Game or entertainment | `templates/scroll-stage-game/` | Replace the playable demo, keep the scroll stage |
| Store or catalogue (round objects) | `templates/cinematic-product-shop/` | Replace shapes, finishes, copy, making stages |
| Store (non-round), studio, software, editorial, event | nearest template for structure | See `templates/README.md` (Choosing) for the object adapters |
