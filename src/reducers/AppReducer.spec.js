import { noop } from 'lodash';
import * as actions from 'actions/AppActions';
import reducer, { initialState } from 'reducers/AppReducer';
import { russianCurrencyCode } from 'constants/AppConstants';

describe('App reducer', () => {
  it('should have initial state', () => {
    expect(reducer(noop(), {})).toEqual(initialState);
  });
  describe('setCurrencyCodes', () => {
    it('should extend app currency codes', () => {
      const newCodes = [4, 2, 0];
      expect(reducer(initialState, actions.setCurrencyCodes(newCodes)))
        .toEqual({
          ...initialState,
          codes: [...initialState.codes, ...newCodes],
        });
    });
  });
  describe('setCurrencyHistory', () => {
    it('should set main currency history', () => {
      const currencyHistory = [4, 2, 0];
      expect(reducer(initialState, actions.setCurrencyHistory(currencyHistory)))
        .toEqual({
          ...initialState,
          history: currencyHistory,
        });
    });
  });
  describe('setDate', () => {
    it('should set app date', () => {
      const date = '123';
      expect(reducer(initialState, actions.setDate(date)))
        .toEqual({
          ...initialState,
          date,
        });
    });
  });
  describe('requestStart', () => {
    it('should set app fetching state to true', () => {
      expect(reducer(initialState, actions.requestStart()))
        .toEqual({
          ...initialState,
          isFetching: true,
        });
    });
  });
  describe('requestEnd', () => {
    it('should set app fetching state to false', () => {
      expect(reducer(initialState, actions.requestEnd()))
        .toEqual({
          ...initialState,
          isFetching: false,
        });
    });
  });
  describe('setCurrency', () => {
    it('should find currency in codes and set it\'s info and value to mainCurrency if isMain flag was provided', () => {
      expect(reducer(
        initialState,
        actions.setCurrency({ ID: russianCurrencyCode, value: 10, isMain: true }),
      )).toEqual({
        ...initialState,
        mainCurrency: {
          ID: russianCurrencyCode,
          name: 'Российский рубль',
          nominal: 1,
          value: 10,
        },
      });
    });
  });
});
