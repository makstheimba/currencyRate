import moment from 'moment';
import * as actions from 'constants/AppConstants';

const initialState = {
  codes: [],
  history: [],
  mainCurrency: 'R01235',
  date: moment().format('DD/MM/YYYY'),
};

export default function rootReducer(state = initialState, action) {
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
    default:
      return state;
  }
}
