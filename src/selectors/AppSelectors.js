import { sortedIndexBy } from 'lodash';
import moment from 'moment';

export const getMainCurrency = state => state.mainCurrency;
export const getDate = state => state.date;
export const getCurrencyHistory = state => state.history;
export const getCurrencyCodes = state => state.codes;

export const getWeeklyCurrencyRate = (history, date) => {
  const dateRecordIndex = Math.min(sortedIndexBy(history, { date }, entry => (
    moment(entry.date, 'DD.MM.YYYY').unix()
  )) + 1, history.length);
  const dateStartIndex = dateRecordIndex - 7 < 0 ? 0 : dateRecordIndex - 7;

  return history.slice(dateStartIndex, dateRecordIndex);
};
