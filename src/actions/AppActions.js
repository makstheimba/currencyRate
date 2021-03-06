import * as actions from 'constants/AppConstants';

export const setCurrencyCodes = currencyCodes => ({
  type: actions.SET_CURRENCY_CODES,
  currencyCodes,
});

export const setCurrencyHistory = currencyHistory => ({
  type: actions.SET_CURRENCY_HISTORY,
  currencyHistory,
});

export const setCurrency = ({ ID, value, isMain }) => ({
  type: actions.SET_CURRENCY,
  ID,
  value,
  isMain,
});

export const fetchCurrency = (currencyCode, isMain) => ({
  type: actions.FETCH_CURRENCY,
  currencyCode,
  isMain,
});

export const setDate = date => ({
  type: actions.SET_DATE,
  date,
});

export const requestStart = () => ({
  type: actions.REQUEST_START,
});

export const requestEnd = () => ({
  type: actions.REQUEST_END,
});
