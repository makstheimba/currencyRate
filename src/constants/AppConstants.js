import { PropTypes } from 'react';

export const SET_CURRENCY_CODES = 'SET_CURRENCY_CODES';
export const SET_CURRENCY_HISTORY = 'SET_CURRENCY_HISTORY';
export const SET_DATE = 'SET_DATE';
export const SET_CURRENCY = 'SET_CURRENCY';
export const FETCH_CURRENCY = 'FETCH_CURRENCY';
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_END = 'REQUEST_END';

export const russianCurrencyCode = 'ru';

export const currencyProps = PropTypes.shape({
  ID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  nominal: PropTypes.number.isRequired,
});
