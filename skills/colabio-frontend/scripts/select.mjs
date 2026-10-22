import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const skillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const inventory = JSON.parse(fs.readFileSync(path.join(skillRoot, 'modules.json'), 'utf8')).modules;
const surfaces = ['landing', 'website', 'app', 'component', 'native'];
const tasks = ['build', 'redesign', 'polish', 'review', 'animation'];
const features = ['motion', 'static', 'scroll-story', 'webgl', 'image-concept', 'image-to-code', 'brand', 'alternatives', 'stitch', 'source-components', 'experimental-layout', 'animation-audit', 'motion-terms', 'gsap-plugins', 'legacy-taste'];
const styles = ['minimalist', 'industrial', 'apple'];

// Selection is a read-only plan. It neither executes guides nor installs packages.
export function selectModules({ project, surface, task = 'build', features: requestedFeatures = [], style, include = [] } = {}) {
  if (!surfaces.includes(surface)) throw new Error('Choose --surface ' + surfaces.join('|') + ' from the actual brief.');
  if (!tasks.includes(task)) throw new Error('Unknown task: ' + task);
  if (style && !styles.includes(style)) throw new Error('Unknown style: ' + style);
  for (const feature of requestedFeatures) if (!features.includes(feature)) throw new Error('Unknown feature: ' + feature);
  for (const id of include) if (!inventory.some(item => item.id === id)) throw new Error('Unknown module: ' + id);
  const root = path.resolve(project || '.');
  if (!fs.statSync(root).isDirectory()) throw new Error('Project must be a directory.');
  const packageFile = path.join(root, 'package.json');
  const manifest = fs.existsSync(packageFile) ? JSON.parse(fs.readFileSync(packageFile, 'utf8')) : {};
  const dependencies = { ...manifest.devDependencies, ...manifest.dependencies };
  const native = surface === 'native';
  const react = !native && Boolean(dependencies.react || dependencies.next);
  const full = ['landing', 'website', 'app', 'native'].includes(surface) && ['build', 'redesign'].includes(task);
  const site = ['landing', 'website'].includes(surface);
  const flags = new Set(requestedFeatures);
  if (flags.has('static') && ['motion', 'scroll-story'].some(feature => flags.has(feature))) throw new Error('Static and animated requirements conflict; resolve the brief first.');
  const animate = !flags.has('static') && (flags.has('motion') || flags.has('scroll-story') || task === 'animation' || full);
  const selected = new Map(), candidates = new Map();
  const add = (id, phase, reason) => selected.set(id, { phase, reason });
  const consider = (id, reason) => candidates.set(id, { phase: 'components', reason });

  add('impeccable', 'understand-and-review', 'Load product context and apply the craft/review guidance appropriate to this task.');
  if (full) {
    add('design-taste-frontend', 'direction', 'Derive the concept, typography, and palette from this product.');
    add('hallmark', 'architecture', 'Challenge structural sameness and define a working signature component.');
    add('ui-ux-pro-max', 'design-system', 'Resolve targeted typography, color, density, and platform questions; do not run a second theme generator.');
    add('high-end-visual-design', 'craft', 'Apply optical/component detail within the chosen project-specific tokens.');
  }
  if (!native) {
    add('emil-design-eng', 'interaction-and-polish', 'Review component states, focus, interruptions, and fine interface behavior within scope.');
    add('mobile-native', 'responsive', 'Apply relevant mobile web ergonomics without assuming an installable app is required.');
    add('web-design-guidelines', 'review', 'Use the original adapter and current permitted interface guidance; report unavailable external rules.');
  }
  if (task === 'redesign') add('redesign-existing-projects', 'understand', 'Audit the existing surface and preserve working behavior before redesigning.');
  if (style) add({ minimalist: 'minimalist-ui', industrial: 'industrial-brutalist-ui', apple: 'apple-design' }[style], 'direction', 'Use this brief-supported style lens; it does not replace the product concept.');
  if (animate) {
    add(native ? 'animate-expo' : 'animate', 'motion-purpose', 'Define the purpose and sequence of animation before choosing effects.');
    if (!native) {
      add('design-motion-principles', 'motion-craft', 'Choose timing, easing, continuity, and interruption behavior.');
      add('review-animations', 'motion-review', 'Review the implemented motion, reduced-motion equivalent, and cleanup.');
      if (site || !react || dependencies.gsap) {
        for (const id of ['gsap-core', 'gsap-performance', 'gsap-timeline', 'gsap-utils']) add(id, 'motion-implementation', 'Apply the relevant GSAP API guidance to the planned choreography.');
        if (site || flags.has('scroll-story')) add('gsap-scrolltrigger', 'motion-implementation', 'Coordinate the planned scroll-linked sequence with the chosen scroll owner.');
        if (react) {
          add('gsap-react', 'motion-implementation', 'Scope GSAP to React lifecycle and clean up on unmount.');
          add('gsap-frameworks', 'motion-implementation', 'Respect framework rendering and client/server boundaries.');
        }
      }
      if (react) add(dependencies.motion && !dependencies['framer-motion'] ? 'motion-dev-animations' : 'framer-motion', 'interaction-implementation', 'Use the compatible React Motion package for purposeful state changes; avoid duplicate runtimes.');
    }
  }
  if (flags.has('scroll-story')) add('scroll-craft', 'narrative', 'Design an immersive scroll narrative with useful assets and a mobile/static equivalent.');
  if (flags.has('webgl')) add('threejs-webgl', 'rendering', 'Use actual 3D/shaders only for a justified mechanism with budget, disposal, and fallback.');
  if (flags.has('image-concept')) add(native ? 'imagegen-frontend-mobile' : 'imagegen-frontend-web', 'visual-concept', 'Generate a visual concept only when authorized and host image capability is available.');
  if (flags.has('image-to-code')) add('image-to-code', 'visual-implementation', 'Translate the authorized visual reference into an actual working interface.');
  if (flags.has('brand')) add('brandkit', 'brand', 'Support requested brand identity work, subject to available image tools.');
  if (flags.has('alternatives')) add('prototype', 'prototype', 'Build requested genuinely different interactive alternatives.');
  if (flags.has('stitch')) add('stitch-design-taste', 'handoff', 'Apply the requested Stitch/design-system handoff.');
  if (flags.has('experimental-layout')) add('gpt-taste', 'composition', 'Explore relevant compositional/motion ideas without inheriting forced AIDA or randomization.');
  if (flags.has('legacy-taste')) add('design-taste-frontend-v1', 'compatibility', 'Use v1 only for the explicit compatibility requirement.');
  if (flags.has('motion-terms')) add('animation-vocabulary', 'clarify-motion', 'Resolve an ambiguous animation description before implementing it.');
  if (flags.has('gsap-plugins')) add('gsap-plugins', 'motion-implementation', 'Check the specific GSAP plugin needed by the chosen mechanism.');
  if (flags.has('animation-audit')) {
    add('find-animation-opportunities', 'motion-audit', 'Locate useful missing motion and reject ornamental opportunities.');
    add('improve-animations', 'motion-audit', 'Audit existing motion and prioritize actual problems.');
    add('review-animations', 'motion-review', 'Review existing motion within the authorized scope.');
  }
  if (react) {
    consider('shadcn-ui', 'Assess controls/primitives against existing components, framework, and brand before copying source.');
    if ((site && full) || flags.has('source-components')) {
      consider('vengeance-ui', 'Assess individual mechanisms for the signature component; do not copy a page template.');
      consider('skiper-ui', 'Assess individual expressive components against purpose, source terms, and accessibility.');
    }
    if (animate) add('motion', 'interaction-implementation', 'Consult shared package/source-component integration rules; reuse the chosen Motion runtime.');
  }
  for (const id of include) add(id, 'explicit-selection', 'Explicit module selection; resolve any platform or scope incompatibility before use.');
  const modules = inventory.map(item => {
    const plan = selected.get(item.id) || candidates.get(item.id);
    return { id: item.id, guide: item.guide, kind: item.kind, status: selected.has(item.id) ? 'selected' : candidates.has(item.id) ? 'candidate' : 'not-needed', phase: plan?.phase || null, reason: plan?.reason || 'No matching need in this task profile; reassess if the brief or implementation reveals one.', evidence: 'not-yet-used' };
  });
  return { schemaVersion: 1, project: root, surface, task, stack: { react, native, declaredDependencies: Object.keys(dependencies).sort() }, motion: animate, modules, libraries: { policy: 'Plan only. Reuse compatible packages; install missing required dependencies only during authorized implementation.', gsap: modules.some(item => item.id === 'gsap-core' && item.status === 'selected'), lenis: animate && site && !native, reactMotion: animate && react, webgl: flags.has('webgl') }, next: 'Validate all decisions against the actual brief. Read selected guides phase by phase, resolve candidates, and record concrete application and observed checks separately.' };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const options = {}, allowed = ['--project', '--surface', '--task', '--features', '--style', '--include'];
    for (let i = 2; i < process.argv.length; i += 2) {
      const flag = process.argv[i], value = process.argv[i + 1];
      if (!allowed.includes(flag) || !value || value.startsWith('--') || options[flag.slice(2)] !== undefined) throw new Error('Use --project <app> --surface landing|website|app|component|native [--task build|redesign|polish|review|animation] [--features comma-list] [--style minimalist|industrial|apple] [--include module-ids].');
      options[flag.slice(2)] = ['--features', '--include'].includes(flag) ? value.split(',').filter(Boolean) : value;
    }
    console.log(JSON.stringify(selectModules(options), null, 2));
  } catch (error) { console.error('Colabio selection: ' + error.message); process.exitCode = 1; }
}
