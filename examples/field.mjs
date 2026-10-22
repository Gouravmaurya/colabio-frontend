import { buildCase, waterfallGeometry, caseNotes, defaultInputs } from './case-study.mjs';

const $ = (id) => document.getElementById(id);
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
let motion;
let selectedLens = 'asset';
const inputs = { ...defaultInputs };
const lenses = {
  asset: { index: '01', eyebrow: 'THE ASSET / A STARTING POINT', title: 'What you see. What you pay.', value: () => money.format(inputs.price), description: 'A fictional purchase price for this example. The photograph shows a home, not its condition, ownership history, or total cost.', facts: ['Fictional case', 'Illustrative photo', 'Unverified condition'], action: 'Put the price to work', target: '#numbers' },
  income: { index: '02', eyebrow: 'THE INCOME / AN ASSUMPTION', title: 'A rent figure needs a reason.', value: () => `${money.format(currentCase?.effectiveRent ?? inputs.rent)} / mo`, description: 'This is the monthly rent assumed in the experiment below. It is not a local rental estimate. Change it and see how much survives the costs.', facts: ['Sample rent', 'No live comparables', 'Costs still apply'], action: 'Test the rent assumption', target: '#numbers' },
  questions: { index: '03', eyebrow: 'DUE DILIGENCE / STILL OPEN', title: 'The things a photo cannot tell you.', value: () => '3 questions', description: 'Rental evidence, the complete cost picture, and the property’s underlying records still need a closer look. A model is not an inspection.', facts: ['Evidence needed', 'Costs to verify', 'Records to review'], action: 'Review the open questions', target: '#review' }
};

function updateLens(animate = true) {
  const lens = lenses[selectedLens];
  $('lens-index').textContent = lens.index;
  $('lens-eyebrow').textContent = lens.eyebrow;
  $('lens-title').textContent = lens.title;
  $('lens-value').textContent = lens.value();
  $('lens-description').textContent = lens.description;
  $('lens-facts').replaceChildren(...lens.facts.map((fact) => { const span = document.createElement('span'); span.textContent = fact; return span; }));
  $('lens-action').setAttribute('href', lens.target);
  $('lens-action').firstChild.textContent = `${lens.action} `;
  document.querySelectorAll('[data-lens]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.lens === selectedLens)));
  if (animate) document.dispatchEvent(new CustomEvent('lenschange'));
}

document.querySelectorAll('[data-lens]').forEach((button) => button.addEventListener('click', () => {
  selectedLens = button.dataset.lens;
  updateLens();
}));
document.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => {
  const plan = button.dataset.view === 'plan';
  $('photo-scene').hidden = plan;
  $('plan-scene').hidden = !plan;
  $('visual-title').classList.toggle('plan-title', plan);
  $('visual-title').querySelector('.eyebrow').textContent = plan ? 'CONCEPT DRAWING · NOT THE PHOTOGRAPHED HOME' : 'An illustrative property. A real way to think.';
  $('visual-title').querySelector('strong').textContent = plan ? 'An idea of the space.' : 'The garden home study.';
  document.querySelectorAll('[data-view]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  document.dispatchEvent(new CustomEvent('viewchange', { detail: { plan } }));
}));

const menu = document.querySelector('.menu-toggle');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); $('navigation').classList.remove('open'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); $('navigation').classList.toggle('open', open); });
$('navigation').querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
matchMedia('(min-width: 641px)').addEventListener('change', closeMenu);

let stress = 'base';
let currentCase;
const fields = { price: $('case-price'), downPercent: $('case-down'), rent: $('case-rent') };
const svgNS = 'http://www.w3.org/2000/svg';
function svgElement(tag, attrs, parent) {
  const node = document.createElementNS(svgNS, tag);
  for (const [name, value] of Object.entries(attrs)) node.setAttribute(name, value);
  parent.append(node);
  return node;
}
const chart = $('waterfall');
const axis = svgElement('line', { x1: 35, x2: 850, class: 'axis-line' }, chart);
const axisLabel = svgElement('text', { x: 17, class: 'axis-label', 'text-anchor': 'middle' }, chart);
axisLabel.textContent = '0';
const chartNodes = Array.from({ length: 6 }, () => {
  const group = svgElement('g', {}, chart);
  return {
    connector: svgElement('path', { class: 'connector' }, group),
    bar: svgElement('rect', { class: 'flow-bar' }, group),
    value: svgElement('text', { class: 'value-label', 'text-anchor': 'middle' }, group),
    label: svgElement('text', { y: 310, class: 'bar-label', 'text-anchor': 'middle' }, group)
  };
});
const mobileNodes = Array.from({ length: 6 }, () => {
  const row = document.createElement('div'); row.className = 'flow-row';
  const label = document.createElement('span');
  const track = document.createElement('span'); track.className = 'flow-track';
  const bar = document.createElement('span'); track.append(bar);
  const value = document.createElement('span'); value.className = 'flow-value';
  row.append(label, track, value); $('mobile-cost-flow').append(row);
  return { row, label, bar, value };
});
const mobileNote = document.createElement('p'); mobileNote.textContent = 'Bar lengths use a shared scale. Exact amounts are in the cost ledger.'; $('mobile-cost-flow').append(mobileNote);

function updateChart(model, animate) {
  const geometry = waterfallGeometry(model);
  const changes = [{ element: axis, attrs: { y1: geometry.zeroY, y2: geometry.zeroY } }, { element: axisLabel, attrs: { y: geometry.zeroY + 3 } }];
  const mobileMax = Math.max(model.effectiveRent, ...model.bars.map((bar) => Math.abs(bar.amount)), 1);
  geometry.bars.forEach((bar, index) => {
    const nodes = chartNodes[index];
    const next = geometry.bars[index + 1];
    nodes.bar.setAttribute('class', `flow-bar ${bar.kind}`);
    nodes.bar.setAttribute('x', bar.x); nodes.bar.setAttribute('width', bar.width);
    nodes.value.setAttribute('x', bar.x + bar.width / 2);
    nodes.label.setAttribute('x', bar.x + bar.width / 2);
    nodes.label.textContent = bar.label;
    const formatted = bar.kind === 'cost' ? `−${money.format(bar.amount)}` : money.format(bar.amount);
    nodes.value.textContent = formatted;
    changes.push({ element: nodes.bar, attrs: { y: bar.y, height: bar.height } }, { element: nodes.value, attrs: { y: bar.labelY } }, { element: nodes.connector, attrs: { d: next ? `M${bar.x + bar.width} ${bar.endY}H${next.x}` : 'M0 0H0' } });
    const mobile = mobileNodes[index];
    mobile.label.textContent = bar.label;
    mobile.value.textContent = formatted;
    mobile.row.dataset.kind = bar.kind;
    mobile.bar.style.width = `${Math.abs(bar.amount) / mobileMax * 100}%`;
  });
  if (animate && motion) motion.animateChart(changes);
  else changes.forEach(({ element, attrs }) => Object.entries(attrs).forEach(([key, value]) => element.setAttribute(key, value)));
}

function updateCase(animate = true) {
  inputs.price = Number(fields.price.value);
  inputs.downPercent = Number(fields.downPercent.value);
  inputs.rent = Number(fields.rent.value);
  currentCase = buildCase(inputs, stress);
  $('price-display').value = money.format(inputs.price);
  $('down-display').value = `${inputs.downPercent}%`;
  $('rent-display').value = money.format(inputs.rent);
  $('case-result').value = `${currentCase.cashFlow >= 0 ? '+' : '−'}${money.format(Math.abs(currentCase.cashFlow))}`;
  $('result-block').dataset.negative = String(currentCase.cashFlow < 0);
  $('case-explanation').textContent = currentCase.cashFlow >= 0 ? `At these assumptions, rent leaves ${money.format(currentCase.cashFlow)} a month after the mortgage and costs shown.` : `At these assumptions, rent falls ${money.format(Math.abs(currentCase.cashFlow))} short of the mortgage and costs shown each month.`;
  $('case-note').textContent = stress === 'rent' ? `Rent sensitivity: 10% below the ${money.format(inputs.rent)} input. Effective rent is ${money.format(currentCase.effectiveRent)} per month.` : stress === 'repairs' ? 'Cost sensitivity: a further $150 per month is added to the vacancy and maintenance reserve.' : 'Base case: the inputs shown drive the chart. They are assumptions, not verified property facts.';
  const ledger = { rent: currentCase.effectiveRent, mortgage: currentCase.mortgage, tax: currentCase.propertyTax, insurance: currentCase.insurance, reserves: currentCase.reserves, buffer: currentCase.buffer, down: currentCase.downPayment };
  Object.entries(ledger).forEach(([key, value]) => { $(`ledger-${key}`).textContent = money.format(value); });
  Object.entries(fields).forEach(([key, field]) => {
    field.style.setProperty('--fill', `${(Number(field.value) - Number(field.min)) / (Number(field.max) - Number(field.min)) * 100}%`);
    field.setAttribute('aria-valuetext', key === 'downPercent' ? `${field.value} percent` : money.format(Number(field.value)));
  });
  document.querySelectorAll('[data-stress]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.stress === stress)));
  updateChart(currentCase, animate);
  updateLens(false);
}
$('case-form').addEventListener('input', () => updateCase());
$('case-form').addEventListener('submit', (event) => event.preventDefault());
document.querySelectorAll('[data-stress]').forEach((button) => button.addEventListener('click', () => { stress = button.dataset.stress; updateCase(); }));
$('reset-case').addEventListener('click', () => { Object.entries(fields).forEach(([key, field]) => { field.value = defaultInputs[key]; }); stress = 'base'; updateCase(); });
$('download-notes').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([caseNotes(currentCase)], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'haven-field-study-001.txt'; document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $('download-status').textContent = 'Case notes prepared for download. All figures are illustrative.';
});
updateCase(false);

// Core controls remain available even if an optional animation file fails to load.
import('./field-motion.mjs').then(async ({ setupMotion }) => {
  await document.fonts.ready;
  motion = setupMotion();
}).catch((error) => {
  console.warn('Motion unavailable; the field study remains usable.', error);
  $('motion-toggle').textContent = 'Motion unavailable';
  $('motion-toggle').disabled = true;
  $('motion-toggle').setAttribute('aria-pressed', 'false');
  $('replay-motion').disabled = true;
});
