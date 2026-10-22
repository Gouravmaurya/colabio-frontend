# Colabio module router

This bundle is a toolbox for frontend work, not a universal page template.
`modules.json` records all included guides, source commits, licenses, and aliases.
There is one discoverable Colabio SKILL.md. Read only the guides needed for the
current phase, from their bundled locations below. Upstream tool names are
examples; use the host's available, permitted tools.

## Choose by the requested surface

- **Component libraries:** use [the integration guide](component-libraries.md)
  for shadcn/ui foundations, Vengeance UI or Skiper UI expressive components,
  and Motion interactions. These routes contain installation and selection
  guidance; the global skill does not bundle every library's component source.

- **New website:** use the coordinated workflow, current Taste Skill, and UI/UX
  Pro Max for targeted design-system questions. Consult premium-detail guidance
  after a project-specific concept and content architecture exist.
- **Existing interface:** inspect it first; use the redesign adapter, Emil design
  engineering, and relevant mobile/interface review guidance within the named scope.
- **Style brief:** choose the relevant minimalist, industrial, or Apple design
  lens. These are alternatives, not three layers to impose on one page. Preserve
  an existing brand before considering style preferences.
- **Image-led direction:** use image-to-code or the appropriate web/mobile image
  guide only when visual concept generation is part of the task. Prefer supplied
  or licensed assets. Brandkit applies to requested brand work, prototype to
  requested alternatives, and Stitch guidance to a Stitch/design-system handoff.
- **Web motion:** use animate/design-motion-principles for purpose, official GSAP
  guides for choreography, and Framer Motion/Motion guides for React state changes.
  Use the vocabulary guide for ambiguous motion descriptions. Use opportunity,
  improvement, and review guides for their corresponding review tasks.
- **Immersive scroll:** use Scroll Craft for an expressive narrative with useful
  assets, a meaningful peak, readable scroll states, and a static/mobile equivalent.
  Keep GSAP/Lenis ownership clear. Do not run the Scroll Craft engine and Lenis as
  competing scroll drivers. Its engine is optional; use its design guidance with
  the chosen GSAP implementation when that avoids competing runtimes.
- **3D/WebGL:** use Three.js/WebGL for scenes whose rendering needs actual 3D,
  shaders, lighting, or spatial interaction. Set a performance budget, dispose
  GPU resources, handle context loss, and provide a non-WebGL fallback. Install
  Three.js or React Three Fiber locally only when that mechanism is needed.
- **Native mobile:** use animate-expo for an existing or requested React Native/
  Expo target. It does not turn an ordinary website into a native application.

## Integration rules

Colabio and the user's brief control final decisions. Do not combine incompatible
house styles, mandate AIDA/bento/randomization on every page, change a working
framework for a bundled guide, or force a new interview for routine choices the
user delegated. Existing compatible dependencies take precedence over old guide
claims that a package name is universally obsolete. Check current official APIs.

The two locally installed copies of design-taste-frontend are deduplicated to the
bundled current version. Its v1 module is available for explicit compatibility
requests. Redesign-existing-projects is an adapter to the maintained Taste
workflow because upstream merged that standalone skill into the current skill.
Web-design-guidelines is an original adapter linking Vercel's live rules, rather
than redistributing text with no repository license identified.

Read-only audit guides remain read-only unless the user also requested fixes.
Do not run every audit for every task. Reports distinguish guidance consulted,
commands executed, and checks observed; bundled promises of frame rates, scores,
or output quality are not measurements of this implementation.

Installing the skill, including globally, installs instructions and supporting
resources. During an authorized implementation, follow SKILL.md to automatically
add needed website libraries to the actual application package. Reviews and plans
do not install website dependencies. Never install website libraries globally.

Bundled scripts must write generated files, history, and runtime caches into the
target project/output directory. Do not write into the global skill bundle or
home configuration as a side effect. Check script arguments before running it.
Honor the host's browser policy rather than bypassing it with a bundled inspector.
Optional Python/FFmpeg/Chrome/Blender/image tools are capabilities, not silently
installed prerequisites. Use an available equivalent or explain a limitation.
Paid image/video generation and account creation require the applicable existing
authorization. Never request API secrets in chat or invent an unavailable tool.

## Module directory

The table below is generated from the pinned module inventory. Each path is
relative to the installed Colabio skill root. Consult the selected GUIDE.md and
its relevant references, then return to Colabio's single implementation plan.

| Module | Role | Guide |
| --- | --- | --- |
| design-taste-frontend | design | [Read](../companions/taste/GUIDE.md) |
| impeccable | design | [Read](../companions/impeccable/GUIDE.md) |
| hallmark | design | [Read](../companions/hallmark/skills/hallmark/GUIDE.md) |
| redesign-existing-projects | improve adapter | [Read](../references/redesign-adapter.md) |
| web-design-guidelines | improve reference | [Read](../references/web-guidelines-adapter.md) |
| design-taste-frontend-v1 | design | [Read](../modules/design-taste-frontend-v1/GUIDE.md) |
| high-end-visual-design | design | [Read](../modules/high-end-visual-design/GUIDE.md) |
| gpt-taste | design | [Read](../modules/gpt-taste/GUIDE.md) |
| minimalist-ui | style | [Read](../modules/minimalist-ui/GUIDE.md) |
| industrial-brutalist-ui | style | [Read](../modules/industrial-brutalist-ui/GUIDE.md) |
| stitch-design-taste | concept | [Read](../modules/stitch-design-taste/GUIDE.md) |
| image-to-code | concept | [Read](../modules/image-to-code/GUIDE.md) |
| imagegen-frontend-web | concept | [Read](../modules/imagegen-frontend-web/GUIDE.md) |
| imagegen-frontend-mobile | concept | [Read](../modules/imagegen-frontend-mobile/GUIDE.md) |
| brandkit | concept | [Read](../modules/brandkit/GUIDE.md) |
| apple-design | style | [Read](../modules/apple-design/GUIDE.md) |
| emil-design-eng | improve | [Read](../modules/emil-design-eng/GUIDE.md) |
| mobile-native | improve | [Read](../modules/mobile-native/GUIDE.md) |
| prototype | concept | [Read](../modules/prototype/GUIDE.md) |
| animate | animation | [Read](../modules/animate/GUIDE.md) |
| animate-expo | animation | [Read](../modules/animate-expo/GUIDE.md) |
| animation-vocabulary | animation | [Read](../modules/animation-vocabulary/GUIDE.md) |
| find-animation-opportunities | animation | [Read](../modules/find-animation-opportunities/GUIDE.md) |
| improve-animations | animation | [Read](../modules/improve-animations/GUIDE.md) |
| review-animations | animation | [Read](../modules/review-animations/GUIDE.md) |
| ui-ux-pro-max | design | [Read](../modules/ui-ux-pro-max/GUIDE.md) |
| framer-motion | animation | [Read](../modules/framer-motion/GUIDE.md) |
| motion-dev-animations | animation | [Read](../modules/motion-dev-animations/GUIDE.md) |
| design-motion-principles | animation | [Read](../modules/design-motion-principles/GUIDE.md) |
| scroll-craft | scroll | [Read](../modules/scroll-craft/GUIDE.md) |
| threejs-webgl | webgl | [Read](../modules/threejs-webgl/GUIDE.md) |
| gsap-core | gsap | [Read](../modules/gsap-core/GUIDE.md) |
| gsap-frameworks | gsap | [Read](../modules/gsap-frameworks/GUIDE.md) |
| gsap-performance | gsap | [Read](../modules/gsap-performance/GUIDE.md) |
| gsap-plugins | gsap | [Read](../modules/gsap-plugins/GUIDE.md) |
| gsap-react | gsap | [Read](../modules/gsap-react/GUIDE.md) |
| gsap-scrolltrigger | gsap | [Read](../modules/gsap-scrolltrigger/GUIDE.md) |
| gsap-timeline | gsap | [Read](../modules/gsap-timeline/GUIDE.md) |
| gsap-utils | gsap | [Read](../modules/gsap-utils/GUIDE.md) |
| shadcn-ui | Component-library integration | [Guide](../references/component-libraries.md) |
| vengeance-ui | Component-library integration | [Guide](../references/component-libraries.md) |
| skiper-ui | Component-library integration | [Guide](../references/component-libraries.md) |
| motion | Component-library integration | [Guide](../references/component-libraries.md) |
