# Component library sites

Catalogs change. Open the site, read current install steps and license, and
report unavailable ones as unavailable. Libraries supply parts of scenes; the
signature component stays original.

| Need | Sites |
| --- | --- |
| Accessible foundations, registry directory | ui.shadcn.com (docs/directory lists community registries) |
| Community components with source | 21st.dev |
| Animated marketing blocks, backgrounds, text effects | magicui.design, ui.aceternity.com, reactbits.dev, animate-ui.com |
| Motion-first React primitives | motion-primitives.com, cult-ui.com, motion.dev |
| Expressive registries | vengenceui.com, skiper-ui.com |
| CSS-only elements and loaders | uiverse.io |
| WebGL, GSAP, scroll and transition techniques with source | tympanus.net/codrops |
| Engines | gsap.com/docs, lenis.darkroom.engineering, threejs.org |
| 3D / interactive runtimes | spline.design, rive.app, lottiefiles.com |
| Fonts | fonts.google.com, fontshare.com, fontsource.org |
| Research only, never copy | awwwards.com, godly.website, land-book.com, siteinspire.com |

## Mining protocol (full builds)

1. From the scene list in the design spec, write the mechanism each scene needs
   ("pinned text scrub", "spotlight card hover", "logo marquee of real logos").
2. Search 2-4 sites for it; open the demo and source. Shortlist 3-6 pieces
   across the page, from at least two catalogs when React is in use. Check
   dependencies, license, bundle cost, touch, keyboard, reduced motion, SSR.
3. Preview before writing: `npx shadcn@latest add <item> --dry-run`, or read the
   source and copy it into `components/` for sites without a registry. Install
   finalists only; never `--all`, `--overwrite`, or `init --force`. Initialize
   shadcn only if the project lacks `components.json`, then inspect the diff.
4. Transform before shipping: real content, project tokens (colors, type,
   radii), spec easing and durations, remove demo cursors/noise/glow the concept
   does not need, wire to the motion ownership map. Keep license notices.
5. No page may be mostly unchanged catalog blocks. Record source URL, item,
   adaptation and verification in the delivery notes. Do not buy paid tiers or
   request license keys.
