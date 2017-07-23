import { getWeeklyCurrencyRate } from 'selectors/AppSelectors';

describe('App selectors', () => {
  describe('getWeeklyCurrencyRate', () => {
    const history = [
      { date: '28.06.1994' },
      { date: '30.06.1994' },
      { date: '01.07.1994' },
      { date: '02.07.1994' },
      { date: '03.07.1994' },
      { date: '05.07.1994' },
      { date: '06.07.1994' },
      { date: '07.07.1994' },
      { date: '08.07.1994' },
      { date: '10.07.1994' },
    ];
    it('should return weekly currency rate prior to chosen date', () => {
      expect(getWeeklyCurrencyRate(history, '08.07.1994')).toEqual(history.slice(2, 9));
    });
    it('should return all available days if cannot retrieve records for the whole week', () => {
      expect(getWeeklyCurrencyRate(history, '03.07.1994')).toEqual(history.slice(0, 5));
    });
  });
});
