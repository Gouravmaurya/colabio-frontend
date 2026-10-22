import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCase, waterfallGeometry, caseNotes, defaultInputs } from './case-study.mjs';

test('waterfall reconciles exactly to the monthly remainder', () => {
  const model = buildCase(defaultInputs);
  assert.ok(Math.abs(model.effectiveRent - model.costs.reduce((sum, cost) => sum + cost.amount, 0) - model.cashFlow) < 1e-8);
  assert.ok(Math.abs(model.bars.at(-2).end - model.bars.at(-1).end) < 1e-8);
  assert.ok(model.cashFlow > 375 && model.cashFlow < 377);
});

test('sensitivity applies to rent and reserves, while a fixed buffer is additive', () => {
  const base = buildCase(defaultInputs);
  const rent = buildCase(defaultInputs, 'rent');
  const repairs = buildCase(defaultInputs, 'repairs');
  assert.equal(rent.effectiveRent, 3240);
  assert.ok(Math.abs(base.cashFlow - rent.cashFlow - 313.2) < 1e-8);
  assert.equal(repairs.cashFlow, base.cashFlow - 150);
  assert.equal(repairs.buffer, 150);
  assert.equal(defaultInputs.rent, 3600);
  assert.throws(() => buildCase(defaultInputs, 'unsupported'), RangeError);
});

test('negative remainder extends below zero and a cash purchase has a zero mortgage bar', () => {
  const loss = buildCase({ ...defaultInputs, rent: 1000 });
  const geometry = waterfallGeometry(loss);
  const resultBar = geometry.bars.at(-1);
  assert.equal(resultBar.kind, 'loss');
  assert.ok(Math.abs(resultBar.y - geometry.zeroY) < 1e-8);
  assert.ok(resultBar.height > 0);
  assert.ok(geometry.bars.every((bar) => bar.height >= 0 && Number.isFinite(bar.y)));
  const cash = buildCase({ ...defaultInputs, downPercent: 100 });
  assert.equal(waterfallGeometry(cash).bars[1].height, 0);
});

test('downloaded notes preserve the selected assumptions and open questions', () => {
  const notes = caseNotes(buildCase({ price: 600000, downPercent: 40, rent: 4100 }, 'rent'));
  for (const text of ['$600,000', '40%', '$4,100', '$3,690', 'rent 10% below input', 'OPEN QUESTIONS', 'Fictional property', 'not financial advice']) assert.ok(notes.includes(text), text);
});
