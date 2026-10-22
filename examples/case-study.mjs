import { estimate } from './estimate.mjs';

export const defaultInputs = { price: 485000, downPercent: 30, rent: 3600 };
export const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export function buildCase(inputs, stress = 'base') {
  if (!['base', 'rent', 'repairs'].includes(stress)) throw new RangeError('Unknown sensitivity scenario.');
  const effectiveRent = inputs.rent * (stress === 'rent' ? 0.9 : 1);
  const buffer = stress === 'repairs' ? 150 : 0;
  const result = estimate({ ...inputs, rent: effectiveRent });
  const cashFlow = result.cashFlow - buffer;
  const costs = [
    { label: 'Mortgage', amount: result.mortgage },
    { label: 'Tax', amount: result.propertyTax },
    { label: 'Insurance', amount: result.insurance },
    { label: buffer ? 'Reserves + buffer' : 'Reserves', amount: result.reserves + buffer }
  ];
  const bars = [{ label: 'Rent', amount: effectiveRent, start: 0, end: effectiveRent, kind: 'income' }];
  let remaining = effectiveRent;
  for (const cost of costs) {
    bars.push({ ...cost, start: remaining, end: remaining - cost.amount, kind: 'cost' });
    remaining -= cost.amount;
  }
  bars.push({ label: cashFlow >= 0 ? 'Remainder' : 'Shortfall', amount: cashFlow, start: 0, end: cashFlow, kind: cashFlow >= 0 ? 'result' : 'loss' });
  return { ...result, inputs: { ...inputs }, stress, effectiveRent, buffer, cashFlow, costs, bars };
}

export function waterfallGeometry(model) {
  const max = Math.max(model.effectiveRent, ...model.bars.flatMap((bar) => [bar.start, bar.end]), 1) * 1.1;
  const min = Math.min(0, ...model.bars.flatMap((bar) => [bar.start, bar.end]));
  const lower = min < 0 ? min * 1.15 : 0;
  const y = (amount) => 35 + (max - amount) / (max - lower) * 235;
  return {
    zeroY: y(0),
    bars: model.bars.map((bar, index) => ({ ...bar, x: 55 + index * 137, width: 80, y: y(Math.max(bar.start, bar.end)), height: Math.abs(y(bar.start) - y(bar.end)), endY: y(bar.end), labelY: Math.max(16, y(Math.max(bar.start, bar.end)) - 12) }))
  };
}

export function caseNotes(model) {
  return [
    'HAVEN / FIELD STUDY 001',
    'Fictional property scenario. No live listing or verified market estimate.',
    '',
    `Purchase price: ${money.format(model.inputs.price)}`,
    `Down payment: ${model.inputs.downPercent}% (${money.format(model.downPayment)})`,
    `Rent input: ${money.format(model.inputs.rent)} / month`,
    `Sensitivity: ${model.stress === 'rent' ? 'rent 10% below input' : model.stress === 'repairs' ? 'extra $150 monthly cost' : 'base case'}`,
    `Effective rent: ${money.format(model.effectiveRent)} / month`,
    `Mortgage: ${money.format(model.mortgage)} / month (30 years, 6.5% fixed)`,
    `Property tax: ${money.format(model.propertyTax)} / month (1.2% of price per year)`,
    `Insurance: ${money.format(model.insurance)} / month`,
    `Vacancy and maintenance: ${money.format(model.reserves)} / month (13% of effective rent)`,
    `Additional monthly buffer: ${money.format(model.buffer)}`,
    `Monthly remainder or shortfall: ${money.format(model.cashFlow)}`,
    '',
    'OPEN QUESTIONS',
    '1. Is the rent supported by recent, comparable local evidence?',
    '2. What costs, capital work, or legal requirements are missing?',
    '3. Which title, permit, condition, insurance, and hazard facts need verification?',
    '',
    'LIMITATIONS',
    'Excludes closing costs, management, HOA fees, utilities, capital improvements, and income taxes.',
    'The photograph is illustrative and the concept plan is not to scale or a plan of the photographed home.',
    'Actual costs and returns vary. This is an exploratory demonstration, not financial advice.'
  ].join('\n');
}
