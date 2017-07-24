import moment from 'moment';
import { find } from 'lodash';
import * as actions from 'constants/AppConstants';

const initialState = {
  codes: [],
  history: [],
  mainCurrency: {},
  isFetching: true,
  date: moment().format('DD.MM.YYYY'),
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_CURRENCY_CODES:
      return {
        ...state,
        codes: action.currencyCodes,
      };
    case actions.SET_CURRENCY_HISTORY:
      return {
        ...state,
        history: action.currencyHistory,
      };
    case actions.SET_DATE:
      return {
        ...state,
        date: action.date,
      };
    case actions.REQUEST_START:
      return {
        ...state,
        isFetching: true,
      };
    case actions.REQUEST_END:
      return {
        ...state,
        isFetching: false,
      };
    case actions.SET_CURRENCY: {
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
