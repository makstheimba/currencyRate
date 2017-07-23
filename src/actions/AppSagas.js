import axios from 'axios';
import moment from 'moment';
import { parseString } from 'xml2js';
import { normalizeCurrencyRecord } from 'selectors/AppHelpers';
import { getMainCurrency, getDate } from 'selectors/AppSelectors';
import { setCurrencyCodes, setCurrencyHistory } from 'actions/AppActions';
import { CHANGE_SHOW_PERIOD } from 'constants/AppConstants';
import { all, put, select, call, takeLatest, actionChannel } from 'redux-saga/effects';

const getParsedData = data => new Promise((resolve) => {
  parseString(data, { explicitArray: false }, (err, res) => { resolve(res); });
});

function* fetchCurrencyCatalog() {
/*
  const result = yield call(axios.get, 'https://crossorigin.me/https://www.cbr.ru/scripts/XML_val.asp?d=0');
  const getParsedData = () => new Promise((resolve) => {
    parseString(result.data, { explicitArray: false }, (err, res) => { resolve(res); });
  });
  const parsedData = yield getParsedData();

  yield put(setCurrencyCodes(parsedData.Valuta.Item));
*/

  yield put(setCurrencyCodes(JSON.parse(localStorage.getItem('refTable')).Valuta.Item));
}

function* fetchCurrencyHistory() {
/*  const currencyCode = yield select(getMainCurrency);
  const date = yield select(getDate);
  const url = 'https://crossorigin.me/https://www.cbr.ru/scripts/XML_dynamic.asp?' +
    `date_req1=${moment(date, 'DD/MM/YYYY').subtract(1, 'y').format('DD/MM/YYYY')}&` +
    `date_req2=${date}&` +
    `VAL_NM_RQ=${currencyCode}`
  ;
  const result = yield call(axios.get, url);
  const parsedData = yield getParsedData(result.data);
  const normalizedData = parsedData.ValCurs.Record
    .map(normalizeCurrencyRecord)
    .map((entry, index, array) => ({
      ...entry,
      diff: index === 0
        ? '0.0000'
        : parseFloat(array[index].value - array[index - 1].value).toFixed(4),
    }));

  yield put(setCurrencyCodes(normalizedData));*/

  yield put(setCurrencyHistory(JSON.parse(localStorage.getItem('usd'))));
}

/* function* watchCurrencyParams() {
  yield takeLatest(CHANGE_SHOW_PERIOD);
}*/

export default function* appSagas() {
  yield all([
    fetchCurrencyCatalog(),
    fetchCurrencyHistory(),
    // watchCurrencyParams(),
  ]);
}

// refTable localstorage
