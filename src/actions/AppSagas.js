import axios from 'axios';
import moment from 'moment';
import { last } from 'lodash';
import { parseString } from 'xml2js';
import { all, put, call, takeLatest } from 'redux-saga/effects';
import { FETCH_MAIN_CURRENCY } from 'constants/AppConstants';
import { setCurrencyCodes, setCurrencyHistory, setDate, setMainCurrency } from 'actions/AppActions';
import { normalizeCurrencyRecord, makeHistoryRequestUrl } from 'selectors/AppHelpers';

const getParsedData = data => new Promise((resolve) => {
  parseString(data, { explicitArray: false }, (err, res) => { resolve(res); });
});


function* fetchMainCurrency({ currencyCode }) {
  yield put(setDate(moment().format('DD.MM.YYYY')));

  const url = makeHistoryRequestUrl(moment().subtract(1, 'y'), moment(), currencyCode);
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

  yield put(setMainCurrency({ ID: currencyCode, value: last(normalizedData).value }));
  yield put(setCurrencyHistory(normalizedData));

  // yield put(setCurrencyHistory(JSON.parse(localStorage.getItem('usd'))));
}

function* initializeApp() {
  const currencyCodesXML = yield call(axios.get, 'https://crossorigin.me/https://www.cbr.ru/scripts/XML_val.asp?d=0');
  const parsedCurrencyCodes = yield getParsedData(currencyCodesXML.data);
  const currencyCodes = parsedCurrencyCodes.Valuta.Item;

  yield put(setCurrencyCodes(currencyCodes));
  yield fetchMainCurrency({ currencyCode: currencyCodes[1].$.ID });

  // yield put(setCurrencyCodes(JSON.parse(localStorage.getItem('refTable')).Valuta.Item));
}

function* watchMainCurrencyFetch() {
  yield takeLatest(FETCH_MAIN_CURRENCY, fetchMainCurrency);
}

export default function* appSagas() {
  yield all([
    initializeApp(),
    watchMainCurrencyFetch(),
  ]);
}

// refTable localstorage
