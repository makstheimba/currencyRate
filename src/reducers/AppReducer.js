import moment from 'moment';
import { find } from 'lodash';
import * as constants from 'constants/AppConstants';

export const initialState = {
  codes: [{
    $: {
      ID: constants.russianCurrencyCode,
    },
    Name: 'Российский рубль',
    Nominal: 1,
  }],
  history: [],
  mainCurrency: {
    ID: '',
    nominal: 1,
    value: 1,
    name: '',
  },
  secondaryCurrency: {
    ID: '',
    nominal: 1,
    value: 1,
    name: '',
  },
  isFetching: true,
  date: moment().format('DD.MM.YYYY'),
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SET_CURRENCY_CODES:
      return {
        ...state,
        codes: [...state.codes, ...action.currencyCodes],
      };
    case constants.SET_CURRENCY_HISTORY:
      return {
        ...state,
        history: action.currencyHistory,
      };
    case constants.SET_DATE:
      return {
        ...state,
        date: action.date,
      };
    case constants.REQUEST_START:
      return {
        ...state,
        isFetching: true,
      };
    case constants.REQUEST_END:
      return {
        ...state,
        isFetching: false,
      };
    case constants.SET_CURRENCY: {
      const currencyInfo = find(state.codes, { $: { ID: action.ID } });
      return {
        ...state,
        [action.isMain ? 'mainCurrency' : 'secondaryCurrency']: {
          name: currencyInfo.Name,
          nominal: parseInt(currencyInfo.Nominal, 10),
          value: action.value,
          ID: action.ID,
        },
      };
    };
    default:
      return state;
  }
}
