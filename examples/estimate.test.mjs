import test from 'node:test';
import assert from 'node:assert/strict';
import { estimate } from './estimate.mjs';

test('mortgage amortization matches a known 30-year, 6% loan', () => {
  const result = estimate({ price: 100000, downPercent: 0, rent: 2000, annualRate: 6 });
  assert.ok(Math.abs(result.mortgage - 599.550525) < 0.001);
  assert.equal(result.propertyTax, 100);
  assert.equal(result.reserves, 260);
  assert.ok(Math.abs(result.cashFlow - 915.449475) < 0.001);
});

test('cash purchase has no mortgage, higher rent changes reserves and cash flow', () => {
  const base = estimate({ price: 485000, downPercent: 100, rent: 3600 });
  assert.equal(base.mortgage, 0);
  assert.equal(base.downPayment, 485000);
  const higher = estimate({ price: 485000, downPercent: 100, rent: 4600 });
  assert.ok(Math.abs(higher.cashFlow - base.cashFlow - 870) < 0.001);
});

test('zero interest and invalid inputs have explicit behavior', () => {
  assert.equal(estimate({ price: 360000, downPercent: 0, rent: 0, annualRate: 0 }).mortgage, 1000);
  for (const price of [0, -1, NaN, Infinity]) assert.throws(() => estimate({ price, downPercent: 30, rent: 3600 }), RangeError);
  assert.throws(() => estimate({ price: 485000, downPercent: 101, rent: 3600 }), RangeError);
  assert.throws(() => estimate({ price: 485000, downPercent: 30, rent: -1 }), RangeError);
});
