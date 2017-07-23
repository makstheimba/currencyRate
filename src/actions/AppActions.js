import * as actions from 'constants/AppConstants';

export const setCurrencyCodes = currencyCodes => ({
  type: actions.SET_CURRENCY_CODES,
  currencyCodes,
});

export const setCurrencyHistory = currencyHistory => ({
  type: actions.SET_CURRENCY_HISTORY,
  currencyHistory,
});

export const setDate = date => ({
  type: actions.SET_DATE,
  date,
});
