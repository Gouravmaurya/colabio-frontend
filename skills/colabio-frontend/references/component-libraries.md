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
Do not migrate a non-React app merely to use these React-oriented components.

## Install selected source components

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
