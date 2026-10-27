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

## Reading registries with `component-source.mjs`

Read-only: it prints or saves component source for review. It installs nothing.

```
node scripts/component-source.mjs local:list                 # 16 bundled originals
node scripts/component-source.mjs local:marquee
node scripts/component-source.mjs shadcn:button --files
node scripts/component-source.mjs magicui:marquee
node scripts/component-source.mjs aceternity:spotlight
node scripts/component-source.mjs reactbits:SplitText-TS-CSS
node scripts/component-source.mjs skiper:skiper40
node scripts/component-source.mjs vengeance:animated-rays
node scripts/component-source.mjs --list shadcn
node scripts/component-source.mjs shadcn:card --out ./review/components   # save for review
```

Endpoints it uses: ui.shadcn.com/r/styles/new-york-v4, magicui.design/r, ui.aceternity.com/registry, reactbits.dev/r
(`<Name>-<LANG>-<STYLE>`), skiper-ui.com/registry, vengenceui.com/r. If one returns an error, the name is wrong or the
registry changed: browse the site for the current name and report the registry as unavailable if needed.

### 21st.dev (needs the user's own key)

21st.dev requires sign-in, and the skill never asks for credentials in chat. Tell the user once:

1. Sign in at https://21st.dev/mcp and generate an API key.
2. Store it yourself as the environment variable `API_KEY_21ST`. Windows PowerShell:
   `[Environment]::SetEnvironmentVariable("API_KEY_21ST", "<your key>", "User")`; macOS or Linux: `export API_KEY_21ST=...` in your shell profile.
3. Restart the terminal and Claude Code.

Then: `node scripts/component-source.mjs --search21 "pricing section"` and `node scripts/component-source.mjs 21st:<user>/<slug> --files`.
Without a key the script prints these steps and exits 3. Alternative: the user signs in to 21st.dev in the browser pane and the agent reads the component page there.
If no key is set, continue with the other sources; do not stall.

Licences differ per registry and per item. Read the notice, keep required attributions, and do not use a component whose licence forbids the use.

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
