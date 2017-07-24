import axios from 'axios';
import {
  initializeApp, fetchCurrency, fetchMainCurrency, fetchSecondaryCurrency, getParsedData,
} from 'actions/AppSagas';
import { setCurrencyCodes, requestEnd } from 'actions/AppActions';
import { all, put, call } from 'redux-saga/effects';

describe('App sagas', () => {
  describe('fetchCurrency', () => {
    const shouldEndRequest = true;
    it('should yield fetchMainCurrency if isMain flag was set to true', () => {
      const action = { isMain: true };
      const gen = fetchCurrency(action);
      expect(gen.next().value).toEqual(call(fetchMainCurrency, action, shouldEndRequest));
    });
    it('should yield fetchSecondaryCurrency if isMain flag was set to false', () => {
      const action = { isMain: false };
      const gen = fetchCurrency(action);
      expect(gen.next().value).toEqual(call(fetchSecondaryCurrency, action, shouldEndRequest));
    });
  });

  describe('initializeApp', () => {
    const gen = initializeApp();
    const currencyCodes = [{ $: { ID: '12' } }, { $: { ID: '3' } }];

    it('should fetch currency codes xml', () => {
      expect(gen.next().value).toEqual(
        call(axios.get, 'https://crossorigin.me/https://www.cbr.ru/scripts/XML_val.asp?d=0'),
      );
    });
    it('should parse currency codes xml', () => {
      expect(gen.next({ data: ['test'] }).value).toEqual(
        call(getParsedData, ['test']),
      );
    });
    it('should set parsed currency codes', () => {
      expect(gen.next({ Valuta: { Item: [{ $: { ID: '12' } }, { $: { ID: '3' } }] } }).value).toEqual(
        put(setCurrencyCodes(currencyCodes)),
      );
    });
    it('should fetch main and secondary currency', () => {
      const shouldEndRequest = false;

      expect(gen.next().value).toEqual(all([
        call(fetchMainCurrency, { currencyCode: currencyCodes[1].$.ID }, shouldEndRequest),
        call(fetchSecondaryCurrency, { currencyCode: currencyCodes[0].$.ID }, shouldEndRequest),
      ]));
    });
    it('should end request', () => {
      expect(gen.next().value).toEqual(put(requestEnd()));
    });
  });
});
