# Component library

Sixteen original, dependency-free components in [`components.html`](components.html), a live gallery
you can open in a browser (`node scripts/serve.mjs library/components`). Each one is wrapped in markers
so a script can pull it out. They are starting points, not finished parts: transform every one.

```
node scripts/component-source.mjs local:list
node scripts/component-source.mjs local:marquee
```

Each prints an HTML block, a CSS block (tokens `--c-*`), and a JS block. Nothing is written to your project.

| Name | Use when | Notes |
| --- | --- | --- |
| `nav-index-bar` | A site header with a real mobile menu | `aria-expanded`, Escape closes, no hidden links on phones |
| `hero-statement` | One huge statement with inline media chips | Line wipe fails open; text is readable with JS off |
| `marquee` | Proof, materials, places, tools in motion | Pauses on hover and focus; reduced motion becomes a scrollable row |
| `index-list` | A numbered list of work, services, episodes | Row hover is a state, not a decoration |
| `sticky-stage` | One pinned object that changes as copy scrolls | Plain `position: sticky`, no library |
| `scrub-timeline` | A process with real durations | Labels fit narrow widths |
| `compare-slider` | Before and after, with or without | Keyboard operable range input |
| `segmented-tabs` | Switching views of the same data | Roving tabindex, arrow keys |
| `disclosure-list` | FAQ, specs, policies | Native `details name=`, exclusive open |
| `command-palette` | Search and jump for dense sites | Native `dialog`, Ctrl/Cmd+K, combobox roles |
| `toast` | Confirmation of a real action | `role=status` |
| `magnetic-button` | One primary action, only on fine pointers | Off for touch and reduced motion |
| `count-up` | A measured number | Final value is in the markup |
| `field-validated` | Any input | Invalid and valid states with messages |
| `progress-thread` | Reading or journey progress | Scroll-driven, one transform |
| `horizontal-track` | A sideways story inside vertical scroll | Sticky plus transform, no library |

## The transform checklist (before a component enters a page)

A component is "used" only when all six are true. Otherwise it is a template block.

1. **Tokens.** Colours, radius, type and easing come from your design brief, not the `--c-*` defaults.
2. **Content.** Real words and numbers for this product. No "Feature one", no demo copy.
3. **Form.** Change at least one structural property: proportion, axis, count, reading order, or what the hover reveals.
4. **States.** Hover, focus-visible, active, disabled, empty and error are designed, not inherited.
5. **Motion.** Duration and easing match your motion system; one owner per property; reduced-motion path exists.
6. **Provenance.** Write one line in the delivery notes: source, what you changed, what you checked.

## Variants (change the form, not just the colour)

- `marquee`: vertical, two lanes in opposite directions, or a single line that reveals on scroll instead of looping.
- `index-list`: with a thumbnail that follows the row, or a split list where the right column swaps.
- `sticky-stage`: object left, copy right, or the reverse; or a stage that is the page background.
- `compare-slider`: vertical split, or a toggle instead of a drag.
- `segmented-tabs`: as a vertical rail, or as a timeline scrubber.
- `hero-statement`: statement across two scenes, second line revealed by scroll.

## Registries

When this set does not cover the need, `component-source.mjs` reads from shadcn, Magic UI, Aceternity UI, React Bits, Skiper UI,
Vengeance UI and (with the user's own key) 21st.dev. See [`references/libraries.md`](../../references/libraries.md). Registry
components are React; the transform checklist applies to them even more.
