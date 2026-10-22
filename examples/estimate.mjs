export function estimate({ price, downPercent, rent, annualRate = 6.5 }) {
  if (![price, downPercent, rent, annualRate].every(Number.isFinite) || price <= 0 || rent < 0 || downPercent < 0 || downPercent > 100 || annualRate < 0) {
    throw new RangeError('Enter a positive price, nonnegative rent and interest rate, and a down payment from 0 to 100%.');
  }
  const downPayment = price * downPercent / 100;
  const loan = price - downPayment;
  const rate = annualRate / 1200;
  const mortgage = rate === 0 ? loan / 360 : loan * rate / (1 - (1 + rate) ** -360);
  const propertyTax = price * 0.012 / 12;
  const insurance = 125;
  const reserves = rent * 0.13;
  const operating = propertyTax + insurance + reserves;
  return { downPayment, mortgage, propertyTax, insurance, reserves, operating, cashFlow: rent - mortgage - operating };
}
