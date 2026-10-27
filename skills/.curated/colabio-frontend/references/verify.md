# Verify the rendered result

Use this at the end of a build and after every substantial fix. Claim only what
the browser showed. Stills do not prove behaviour; drive the page.

## 1. Serve it

```sh
node <colabio>/scripts/serve.mjs . --port 5173     # static, no cache
```
For the desktop app's preview pane, put the printed `launch.json` snippet in
`.claude/launch.json` of the project, then start it with the preview tool by name.
Delete the temporary launch file at the end unless the user wants it kept. Never
install a server globally. Stop the server when finished (or leave it running only
if the user asked for it).

## 2. Capture protocol

1. Navigate, wait 2-4 s for fonts and WebGL, then capture.
2. WebGL canvases often return a blank first frame. Capture twice before concluding
   the scene is broken, and check the console for errors.
3. Viewport emulation can produce a scaled-down capture (page in a corner). If it
   happens, reset to the desktop preset, capture, then re-apply the size.
4. A hidden pane stops requestAnimationFrame. Animations will look frozen and JS that
   waits on frames will time out; bring the pane forward or test by calling state
   functions directly.
5. Sizes to cover: 1440, 1024, 768, 390 plus one full-page pass. Always reset the
   emulated viewport when done.
6. Smooth-scroll libraries delay `scrollIntoView`. For tests set
   `document.documentElement.style.scrollBehavior='auto'` or scroll with
   `window.scrollTo` to a computed ScrollTrigger start/end, then wait ~2 s.
7. Mid-animation captures look broken (half-revealed tiles, faded headings). Wait for
   the reveal to finish, or nudge the scroll by a few pixels and capture again.
8. The console log accumulates across reloads. After a fix, add
   `addEventListener('error', ...)` in the page, reload, and compare counts instead of
   trusting old entries.

## 3. Mechanical checks (run in the page)

```js
[document.documentElement.scrollWidth, innerWidth]            // overflow: should be equal
document.fonts.check('600 16px "Family Name"')                // font actually loaded
getComputedStyle(el).fontFamily                               // what the browser resolved
ScrollTrigger.getAll().map(s => [s.start, s.end, !!s.pin])    // pin ranges, to scrub by progress
```
Console: read errors after load and after interaction. Scripts, from the project root
(both accept a folder or a single file):
```sh
node <colabio>/scripts/slop-lint.mjs .
node <colabio>/scripts/check-contrast.mjs <page.html>         # real token pairs
```

## 4. Behaviour checks

- Drive real events: `el.dispatchEvent(new KeyboardEvent('keydown', {key:'ArrowDown', bubbles:true}))`,
  `button.click()`, and read the visible state (HUD text, aria-live message, class
  names). For games: play every level to its win state, test a blocked move, undo,
  restart and the limit rules. For shops: change every option and compare the
  computed price, size and total with the formula; add, remove, open and close the cart.
- Forms: submit empty, submit invalid, submit valid; confirm the error text, focus
  position and the honest "nothing was sent" state when there is no backend.
- Keyboard: tab order, visible focus, escape closes dialogs, focus returns to the
  trigger.
- Reduced motion: emulate `prefers-reduced-motion: reduce`; content must be reachable
  and structure intact with no pinned scenes.
- No WebGL / no JS libraries: block the CDN or set a flag; the page must stay usable.

## 5. Report

List: pages and widths actually viewed, interactions actually driven, console state,
scripts run with their output, fixes made after the first look, and what was not
checked (real phone, performance measurement, other browsers). Do not claim
performance, accessibility compliance, awards or a score you did not measure.

## Build-time lessons that cost rounds before

- A wide display face (Syne, Clash) at 5vw+ clips inside `overflow:hidden` line masks.
  Give the mask `padding-bottom:.1em` with a matching negative margin, or use
  `clip-path: inset(-.1em -50vw 0 -.1em)`, and test the longest word at 1440 and 390.
- Do not let desktop grid placement rules leak into mobile (a leftover
  `grid-column: 7 / -1` created a second column); reset placement in the media query.
- Component class names can collide with utility classes: a cart row named `.line`
  restyled every `.btn.line` button. Prefix component classes and search for reused
  names before shipping.
- Captions placed over a decorative bar need an explicit stacking order; a later
  `::after` pseudo-element paints above positioned siblings with `z-index:auto`.
- Absolutely positioned labels (shelf captions, dimension text) collide on narrow
  screens; hide secondary parts (prices) or shorten them below 860px.
- When editing files with a script, `String.replace` treats `$$` and `` $` `` in the
  replacement text specially and can corrupt code or duplicate the file. Use a
  function replacement (`s.replace(a, () => b)`) or a heredoc for code that contains `$`.
- Do not leave scratch or assembly files in the project folder: the desktop preview opens new files by itself and shows a load error when they are deleted. Build intermediates in the scratchpad directory.
- One fixed WebGL canvas directed by scroll beats one canvas per section.
- If the user says "looks cheap", ask what bothers them (brief-intake.md triage)
  instead of restyling blindly.

## WebGL-specific checks

- **Snapshot the canvas itself.** In a hidden or throttled pane, rAF and the GSAP ticker
  do not run, so intro tweens stay at 0 and screenshots show stale frames. Expose a
  `tick(time, ms)` on `window` while testing, set `document.hidden` to false with
  `Object.defineProperty(document,'hidden',{get:()=>false})`, run 100+ ticks, then call
  `canvas.toDataURL('image/png')` in the same task and show it in a full-screen `<img>`
  overlay on the page background colour. That gives an exact frame to judge lighting.
  Remove the debug hook before finishing.
- **Overexposed or white objects:** check light `decay`, `intensity`, `envMapIntensity` and
  tone-mapping exposure with real numbers before changing colours.
- **Object in the wrong place:** read the slot element's `getBoundingClientRect()`; a
  `position: sticky` child inside a grid row only as tall as itself never sticks, so give
  the grid a `min-height`.
- **Fallback path:** load the page with the fallback switch (`?no3d`) and confirm there are
  no console errors and every control still works.

## Exact-size captures for the visual gates

`verify-visual-gates.mjs` needs real PNGs whose width and height match the recorded CSS viewport, and baseline captures taken **before** design starts.
Headless Chrome windows cannot be narrower than about 500 px, so a plain `--window-size=390` capture is a cropped 500 px layout. Use:

```sh
node scripts/capture.mjs <url> --out review/captures/baseline-narrow.png --width 390 --height 844 --wait 14000
node scripts/capture.mjs <url> --out review/captures/baseline-desktop.png --width 1440 --height 900 --wait 14000
# add --full-page, --reduced-motion, --scroll <y> as needed
```
The JSON it prints holds the actual viewport, DPR, `scrollWidth` and `overflowX`; paste those into the record. WebGL pages need a long `--wait`
(the first capture can miss the object). A page wider than the requested width reports `overflowX: true`, which is itself a finding.
