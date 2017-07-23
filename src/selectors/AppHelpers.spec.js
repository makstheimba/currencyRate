import { normalizeCurrencyRecord } from 'selectors/AppHelpers';

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
});
