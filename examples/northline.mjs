import Lenis from './vendor/lenis.mjs';
const building = document.getElementById('building');
const descriptions = {
  terrace: 'For a terraced home, trace moisture, ventilation, and heat loss together. A change to one layer can affect the next.',
  workshop: 'For an older workshop, understand structure, previous uses, and services before planning a new occupation.',
  community: 'For a community building, start with the people, patterns of use, access, and the fabric that supports them.'
};
const priorities = {
  comfort: { title: 'Read the fabric first.', steps: ['Map comfort and moisture concerns', 'Survey the existing fabric and services', 'Compare compatible improvements'] },
  reuse: { title: 'Find the capacity for change.', steps: ['Describe the intended new use', 'Check structure, access, and permissions', 'Test a feasible adaptation strategy'] },
  stages: { title: 'Make the first move count.', steps: ['Agree the longer-term ambition', 'Identify dependencies and urgent repairs', 'Sequence work to avoid undoing it later'] }
};
let outline;
function update(){
  const value = document.querySelector('input[name="priority"]:checked').value;
  outline = { building: building.options[building.selectedIndex].text, ...priorities[value], description: descriptions[building.value] };
  document.getElementById('scope-title').textContent = outline.title;
  document.getElementById('scope-description').textContent = outline.description;
  document.getElementById('scope-steps').replaceChildren(...outline.steps.map((text) => { const li = document.createElement('li'); li.textContent = text; return li; }));
  if(motionActive) window.gsap.fromTo('.scope-result h3, .scope-result>p, .scope-result li',{opacity:.65,y:5},{opacity:1,y:0,stagger:.035,duration:.25,overwrite:true});
}
building.addEventListener('change',update);
document.querySelectorAll('input[name="priority"]').forEach((input)=>input.addEventListener('change',update));
document.getElementById('download-scope').addEventListener('click',()=>{
  const text = `Northline / Illustrative scope outline\n\n${outline.building}\n${outline.title}\n${outline.description}\n\n${outline.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\nFictional practice demonstration. Not a survey, quotation, or technical assessment. No enquiry sent.\n`;
  const url = URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='northline-scope.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
const preference=matchMedia('(prefers-reduced-motion: reduce)'),toggle=document.getElementById('north-motion');
let enabled=true,motionActive=false,lenis,ticker,context;
function configure(){
  context?.revert();if(ticker)window.gsap?.ticker.remove(ticker);lenis?.destroy();ticker=undefined;lenis=undefined;
  motionActive=enabled&&!preference.matches&&Boolean(window.gsap&&window.ScrollTrigger);
  toggle.textContent=preference.matches?'Reduced motion':motionActive?'Motion on':'Motion off';toggle.setAttribute('aria-pressed',String(motionActive));
  document.documentElement.dataset.motion=motionActive?'on':'off';
  if(!motionActive)return;
  const {gsap,ScrollTrigger}=window;gsap.registerPlugin(ScrollTrigger);
  lenis=new Lenis({autoRaf:false,syncTouch:false,anchors:true});lenis.on('scroll',ScrollTrigger.update);ticker=(seconds)=>lenis?.raf(seconds*1000);gsap.ticker.add(ticker);
  context=gsap.context(()=>{
    gsap.from('.opening-copy',{opacity:.5,y:18,duration:.8,ease:'power3.out'});
    gsap.fromTo('.thermal-line',{opacity:.12},{opacity:.65,ease:'none',scrollTrigger:{trigger:'.drawing',start:'top 50%',end:'bottom 15%',scrub:true}});
    gsap.from('.method>div',{opacity:.5,y:24,duration:.7,scrollTrigger:{trigger:'.method',start:'top 80%'}});
  });
}
toggle.addEventListener('click',()=>{enabled=!enabled;configure();});preference.addEventListener('change',configure);
// Initialize content before any optional motion setup, so failed animation never hides the tool.
update();configure();
window.addEventListener('pagehide',()=>{context?.revert();if(ticker)window.gsap?.ticker.remove(ticker);lenis?.destroy();});
