# Component libraries

Reviewed 2026-10-22. These are original Colabio integration instructions, not
vendored component collections. Global skill installation makes this guidance
available everywhere; source components and runtime dependencies belong to the
application being built. Fetch current official documentation when selecting a
component. If unavailable, report that limitation rather than inventing an API.

## Choose a mechanism, not a template

| Library | Use when | Official source |
| --- | --- | --- |
| shadcn/ui | Accessible application controls, dialogs, forms, and navigation foundations | [Installation](https://ui.shadcn.com/docs/installation), [CLI](https://ui.shadcn.com/docs/cli) |
| Vengeance UI | A selected animated component supports the project's signature interaction | [Catalog](https://www.vengenceui.com/components), [CLI](https://www.vengenceui.com/docs/cli), [repository](https://github.com/Ashutoshx7/VengeanceUI) |
| Skiper UI | A specific expressive component fits the content and art direction | [Catalog](https://skiper-ui.com/), [quick start](https://www.skiper-ui.com/docs/quick-start) |
| Motion | React layout, presence, gesture, or state transitions | [React installation](https://motion.dev/docs/react-installation) |

Reuse existing components first. Evaluate these libraries when their mechanism
fits the brief; do not install all four or assemble a page from unchanged demo
blocks. Adapt content, typography, palette, dimensions, and behavior to the
project. A catalog effect does not replace a useful domain-specific component.
Distinguish foundations, minor polish, and signature behavior in the usage report.
A borrowed underline or hover link may be good polish, but cannot satisfy the
signature-component requirement. Judge product-specific information and behavior,
not the number of component sources listed. Use the depth check in quality-gates.md.
Do not migrate a non-React app merely to use these React-oriented components.

## Install selected source components

### Research before accepting or rejecting a library

For a substantial creative React build, inspect the current shadcn/ui, Vengeance
UI, and Skiper UI catalogs as part of component research. For each applicable
source, compare two or three relevant mechanisms when the catalog offers them.
Choose candidates against the actual content and interaction needs; do not browse
random effects to meet a count. Inspect the demo, source, dependencies, license,
responsive behavior, and keyboard/reduced-motion implications of finalists.
For a narrow task, research only what can improve that task.

Do not reject an entire library after seeing one unsuitable image list, background,
or hover effect. A library may contribute a useful primitive, navigation mechanism,
state transition, spatial composition, or part of the signature interaction.
When the user explicitly requests a library, prioritize a compatible contribution
to the working result. If none fits, explain the concrete compatibility, access,
accessibility, or product constraint after this research and identify the alternative.
Unavailable catalogs must be reported as unavailable, not reviewed and rejected.

Record source URLs, candidates inspected, the selected mechanism, and its intended
component role. Distinguish catalog research, source inspected, source adapted,
package installed, runtime used, and browser verified. Only claim the level reached.
Researching Vengeance does not mean Vengeance code ships in the page.

### Compose an original component

Start from a product-specific interaction contract: what changes, what the visitor
learns or accomplishes, and which real content drives it. Adapt suitable library
mechanisms into that contract using the project's anatomy, typography, assets,
states, and mobile composition. Preserve source attribution where required.
Use shadcn for sound foundations, Vengeance or Skiper for suitable expressive
mechanisms, Motion for React state transitions, and the relevant bundled GSAP
skills for choreography. They are complementary options, not quotas.

Before expanding the page, inspect the working signature component and adjoining
scene. Ask whether its information model, composition, and behavior belong to this
product. If removing the logo makes it interchangeable with another demo, revise
the underlying relationship or interaction. A reskinned catalog block, extra
animation, or more installed packages does not pass this check. Keep navigation
familiar and practical; originality must not make buying, reading, or operating harder.

## Integrate the chosen components

During authorized implementation, inspect the actual app package, lock file,
framework, Tailwind version, aliases, global CSS, and existing components.json.
Keep its primitive family and customized components. Initialize shadcn only if
needed; init changes dependencies, utilities, and CSS variables. Preserve brand
tokens and inspect the resulting diff. Do not apply a theme preset incidentally.

Run commands from the target application. Examples below use npm's runner;
use pnpm dlx, Bun's bunx, or the project's supported Yarn runner as appropriate.

```sh
# Only for an application that needs initial shadcn configuration:
npx shadcn@latest init

# Preview the specific addition, then install it when suitable:
npx shadcn@latest add button --dry-run
npx shadcn@latest add button

# Skiper's documented free-component example; inspect its current demo first:
npx shadcn@latest add @skiper-ui/skiper40 --dry-run
npx shadcn@latest add @skiper-ui/skiper40
```

For Vengeance, use the selected component's official registry URL with the same
shadcn add preview/install flow. Its documented example URL is
https://raw.githubusercontent.com/Ashutoshx7/VengeanceUI/main/public/r/animated-rays.json.
Do not infer other component URLs or install this background by default.

Inspect registry source, dependency declarations, CSS additions, and target
paths before writing. Do not use --all, --overwrite, or init --force by default.
Install only required components and their dependencies. These are source-copy
registries, not a reason to npm install an assumed vengeance-ui, skiper-ui, or
shadcn-ui package. Vengeance's separate agent/MCP setup is unnecessary for this
integration; do not silently add its MCP configuration or agent instructions.

Use free components or the user's existing licensed access. Paid Skiper or
Motion offerings are optional; do not purchase them, bypass access, or request
license keys in chat. Retain required source notices and follow component terms.

## Coordinate Motion with GSAP and Lenis

Reuse an existing compatible framer-motion or motion dependency. Existing
framer-motion imports stay valid; a component importing motion/react requires
the motion package or a verified compatible adaptation. Avoid duplicate engines
when imports can be safely unified. For new work explicitly choosing Motion:

```sh
npm install motion
```

Use motion/react imports with that package. Verify React compatibility against
the current docs. The existing dependency helper retains its documented default
for --react-motion; it is not a registry-component installer.

Give each animated element/property one owner: GSAP for coordinated sequences,
Lenis for suitable smooth scrolling, and Motion for React interaction states.
Adapt imported components to that ownership. Check keyboard, touch, focus,
reduced motion, mobile layout, cleanup, hydration, and bundle cost. Remove demo
cursor effects, shaders, or perpetual motion when they weaken the product.
Report the components actually installed, libraries reused, and checks run.

## Library websites to mine for a premium build

Added 2026-10-23. Catalogs change; open the site, read the current install
instructions and license, and report unavailable ones as unavailable.

| Need | Sites |
| --- | --- |
| Accessible foundations, registry directory | ui.shadcn.com (docs/directory lists community registries) |
| Community components with copyable prompts/source | 21st.dev |
| Animated marketing blocks, backgrounds, text effects | magicui.design, ui.aceternity.com, reactbits.dev, animate-ui.com |
| Motion-first React primitives | motion-primitives.com, cult-ui.com, motion.dev |
| Expressive registries already in this skill | vengenceui.com, skiper-ui.com |
| CSS-only elements and loaders | uiverse.io |
| WebGL, GSAP, scroll and transition techniques with source | tympanus.net/codrops (tutorials and demos) |
| Scroll and animation engines | gsap.com/docs, lenis.darkroom.engineering |
| 3D and interactive runtime | threejs.org, spline.design, rive.app, lottiefiles.com |
| Fonts | fonts.google.com, fontshare.com, fontsource.org |
| Structure and craft research only (never copy) | awwwards.com, godly.website, land-book.com, siteinspire.com |

### Mining protocol (full builds)

1. From the scene list in the design spec, write the mechanism each scene needs
   (e.g. "pinned text scrub", "spotlight card hover", "marquee of real logos").
2. Search 2-4 of the sites above for that mechanism; open the demo and the
   source. Shortlist 3-6 across the page, from at least two different catalogs
   when React is in use. Check dependencies, license, bundle cost, touch,
   keyboard, reduced motion, SSR/hydration.
3. Preview the install (`npx shadcn@latest add <item> --dry-run`, or copy the
   source into `components/` for sites without a registry). Install finalists only.
4. **Transform before shipping**: replace content with real content, retoken
   colors/type/radii, retime easing to the spec, remove demo cursor/noise/glow
   that the concept does not need, and wire it to the motion ownership map.
5. Cap: library pieces support scenes; the signature component stays original.
   No page may be mostly unchanged catalog blocks. Record source URL, item,
   adaptation and verification in the selection record.
