import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export const currencyMask = createNumberMask({
  prefix: '',
  suffix: '',
  allowDecimal: true,
});

export const onlyDigitsMask = createNumberMask({
  prefix: '',
  suffix: '',
  includeThousandsSeparator: false,
  thousandsSeparatorSymbol: '',
});
