import axios from 'axios';
import moment from 'moment';
import { last } from 'lodash';
import { parseString } from 'xml2js';
import { FETCH_CURRENCY } from 'constants/AppConstants';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import { normalizeCurrencyRecord, makeHistoryRequestUrl } from 'selectors/AppHelpers';
import {
    setDate,
    requestEnd,
    setCurrency,
    requestStart,
    setCurrencyCodes,
    setCurrencyHistory,
} from 'actions/AppActions';

export const getParsedData = data => new Promise((resolve) => {
  parseString(data, { explicitArray: false }, (err, res) => { resolve(res); });
});

export function* fetchMainCurrency({ currencyCode }, shouldEndRequest) {
  yield put(requestStart());
  yield put(setDate(moment().format('DD.MM.YYYY')));

  try {
    const url = makeHistoryRequestUrl(moment().subtract(1, 'y'), moment(), currencyCode);
    const result = yield call(axios.get, url);
    const parsedData = yield call(getParsedData, result.data);
    if (!parsedData.ValCurs.Record) {
      alert('Отсутствуют данные для выбранной валюты');
    } else {
      const normalizedData = parsedData.ValCurs.Record
        .map(normalizeCurrencyRecord)
        .map((entry, index, array) => ({
          ...entry,
          diff: index === 0
            ? '0.0000'
            : parseFloat(array[index].value - array[index - 1].value).toFixed(4),
        }));

      yield put(setCurrency({ ID: currencyCode, value: last(normalizedData).value, isMain: true }));
      yield put(setCurrencyHistory(normalizedData));
    }
  } catch (err) {
    console.log(err);
    alert('Something went wrong');
  }
  if (shouldEndRequest) {
    yield put(requestEnd());
  }
}

export function* fetchSecondaryCurrency({ currencyCode }, shouldEndRequest) {
  yield put(requestStart());
  try {
    const url = makeHistoryRequestUrl(moment().subtract(1, 'w'), moment(), currencyCode);
    const result = yield call(axios.get, url);
    const parsedData = yield call(getParsedData, result.data);

    if (!parsedData.ValCurs.Record) {
      alert('Отсутствуют данные для выбранной валюты');
    } else {
      yield put(setCurrency({
        isMain: false,
        ID: currencyCode,
        value: last(parsedData.ValCurs.Record.map(normalizeCurrencyRecord)).value,
      }));
    }
  } catch (err) {
    console.log(err);
    alert('Something went wrong');
  }
  if (shouldEndRequest) {
    yield put(requestEnd());
  }
}

export function* initializeApp() {
  try {
    const currencyCodesXML = yield call(axios.get, 'https://cbr-gate.herokuapp.com/XML_val.asp?d=0');
    const parsedCurrencyCodes = yield call(getParsedData, currencyCodesXML.data);
    const currencyCodes = parsedCurrencyCodes.Valuta.Item;
    const shouldEndRequest = false;

    yield put(setCurrencyCodes(currencyCodes));
    yield all([
      call(fetchMainCurrency, { currencyCode: currencyCodes[1].$.ID }, shouldEndRequest),
      call(fetchSecondaryCurrency, { currencyCode: currencyCodes[0].$.ID }, shouldEndRequest),
    ]);
    yield put(requestEnd());
  } catch (err) {
    console.log(err);
    alert('Something went wrong');
  }
}

export function* fetchCurrency(action) {
  const shouldEndRequest = true;
  yield action.isMain
    ? call(fetchMainCurrency, action, shouldEndRequest)
    : call(fetchSecondaryCurrency, action, shouldEndRequest);
}

export function* watchCurrencyFetch() {
  yield takeLatest(FETCH_CURRENCY, fetchCurrency);
}

export default function* appSagas() {
  yield all([
    initializeApp(),
    watchCurrencyFetch(),
  ]);
}
