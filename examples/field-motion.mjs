import Lenis from './vendor/lenis.mjs';

export function setupMotion() {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) throw new Error('The local GSAP libraries did not load.');
  gsap.registerPlugin(ScrollTrigger);
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = document.getElementById('motion-toggle');
  const replay = document.getElementById('replay-motion');
  let userEnabled = true;
  let lenis;
  let ticker;
  let media;
  let intro;
  let sheetTween;
  let viewTween;
  let chartTweens = [];

  function teardown() {
    sheetTween?.kill();
    viewTween?.kill();
    chartTweens.forEach((tween) => tween.progress(1).kill());
    chartTweens = [];
    gsap.set('.sheet-content, .plan-scene svg, .photo-scene', { clearProps: 'opacity,transform' });
    media?.revert();
    media = undefined;
    if (ticker) gsap.ticker.remove(ticker);
    ticker = undefined;
    lenis?.destroy();
    lenis = undefined;
    gsap.ticker.lagSmoothing(500, 33);
  }

  function configure() {
    teardown();
    const active = userEnabled && !preference.matches;
    document.documentElement.dataset.motion = active ? 'on' : 'off';
    toggle.textContent = preference.matches ? 'Reduced motion' : active ? 'Motion on' : 'Motion off';
    toggle.setAttribute('aria-pressed', String(active));
    toggle.disabled = preference.matches;
    replay.disabled = !active;
    if (!active) return;
    // GSAP is the only frame driver; Lenis interpolates wheel scrolling, not touch gestures.
    lenis = new Lenis({ autoRaf: false, lerp: 0.085, smoothWheel: true, syncTouch: false, anchors: false, stopInertiaOnNavigate: true });
    lenis.on('scroll', ScrollTrigger.update);
    ticker = (seconds) => lenis.raf(seconds * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    media = gsap.matchMedia();
    media.add({ desktop: '(min-width: 851px)', small: '(max-width: 850px)' }, (context) => {
      // The entrance establishes reading order; controls are never gated behind it.
      intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.intro .eyebrow', { y: 10, opacity: 0, duration: 0.5 })
        .from('.title-line', { yPercent: 113, rotate: 2, duration: 0.95, stagger: 0.12 }, 0.07)
        .from('.intro-aside', { y: 18, opacity: 0, duration: 0.8 }, 0.3)
        .from('.study-toolbar, .inspection, .study-bottom', { y: 22, opacity: 0, duration: 0.85, stagger: 0.07 }, 0.4);
      gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true } });
      gsap.from('.bridge h2, .bridge > p', { y: 25, opacity: 0, duration: 0.8, stagger: 0.12, scrollTrigger: { trigger: '.bridge', start: 'top 88%', once: true } });
      gsap.from('.experiment', { y: 25, opacity: 0, duration: 0.9, scrollTrigger: { trigger: '.experiment', start: 'top 90%', once: true } });
      gsap.from('.review-list details', { y: 15, opacity: 0, duration: 0.65, stagger: 0.1, scrollTrigger: { trigger: '.review-list', start: 'top 91%', once: true } });
      if (context.conditions.desktop) {
        gsap.fromTo('.photo-scene img', { scale: 1.08, yPercent: -3 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: '.study', start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
      }
    });
    ScrollTrigger.refresh();
  }

  function scrollTo(target) {
    if (lenis) lenis.scrollTo(target, { offset: -24, duration: 0.9 });
    else target.scrollIntoView({ behavior: 'instant' });
  }
  function anchorClick(event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.classList.contains('skip')) return;
    const hash = link.getAttribute('href');
    const target = hash === '#' ? document.body : document.getElementById(hash.slice(1));
    if (!target) return;
    event.preventDefault();
    history.pushState(null, '', hash);
    scrollTo(target);
    // Keep anchor navigation useful for keyboard and assistive-technology users.
    const destination = target === document.body ? document.querySelector('header a') : target.querySelector('h1,h2') || target;
    if (!destination.hasAttribute('tabindex')) destination.setAttribute('tabindex', '-1');
    destination.focus({ preventScroll: true });
  }
  function settle(event) { if (event.target.closest('button,input,summary')) lenis?.scrollTo(window.scrollY, { immediate: true }); }
  document.addEventListener('click', anchorClick);
  document.addEventListener('pointerdown', settle, { capture: true });
  document.addEventListener('keydown', settle, { capture: true });
  document.addEventListener('lenschange', () => {
    if (!lenis) return;
    sheetTween?.kill();
    gsap.set('.sheet-content', { clearProps: 'opacity,transform' });
    sheetTween = gsap.from('.sheet-content', { y: 10, opacity: 0.25, duration: 0.4, ease: 'power2.out', clearProps: 'opacity,transform' });
  });
  document.addEventListener('viewchange', (event) => {
    if (!lenis) return;
    viewTween?.kill();
    const selector = event.detail.plan ? '.plan-scene svg' : '.photo-scene';
    gsap.set(selector, { clearProps: 'opacity,transform' });
    viewTween = gsap.from(selector, { opacity: 0, duration: 0.5, clearProps: 'opacity' });
    ScrollTrigger.refresh();
  });
  toggle.addEventListener('click', () => { userEnabled = !userEnabled; configure(); });
  replay.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'instant' }); lenis?.scrollTo(0, { immediate: true }); intro?.restart(); });
  preference.addEventListener('change', configure);
  window.addEventListener('pagehide', teardown);
  window.addEventListener('pageshow', (event) => { if (event.persisted) configure(); });
  document.querySelectorAll('details').forEach((details) => details.addEventListener('toggle', () => ScrollTrigger.refresh()));
  configure();
  return {
    scrollTo,
    animateChart(changes) {
      chartTweens.forEach((tween) => tween.kill());
      chartTweens = [];
      changes.forEach(({ element, attrs }) => {
        if (lenis) chartTweens.push(gsap.to(element, { attr: attrs, duration: 0.5, ease: 'power2.out', overwrite: true }));
        else Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value));
      });
    }
  };
}
