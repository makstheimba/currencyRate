import { normalizeCurrencyRecord, makeHistoryRequestUrl } from 'selectors/AppHelpers';
import moment from 'moment';

describe('App helpers', () => {
  describe('normalizeCurrencyRecord', () => {
    it('should parse numbers and lower case of tags', () => {
      const record = {
        $: {
          Date: '03.07.1994',
          Id: 'test',
        },
        Nominal: '1',
        Value: '123,5',
      };
      const normalizedRecord = {
        date: '03.07.1994',
        nominal: 1,
        value: 123.5,
      };

      expect(normalizeCurrencyRecord(record)).toEqual(normalizedRecord);
    });
  });
  describe('makeHistoryRequestUrl', () => {
    it('should make history request to cbr throw crossorigin me using moment dates and currency code', () => {
      const dateStart = moment('1994.03.07', 'YYYY.MM.DD');
      const dateEnd = moment('1994.05.10', 'YYYY.MM.DD');
      const currencyCode = '123';

      expect(makeHistoryRequestUrl(dateStart, dateEnd, currencyCode))
        .toBe('https://crossorigin.me/https://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=07/03/1994&date_req2=10/05/1994&VAL_NM_RQ=123');
    });
  });
});
