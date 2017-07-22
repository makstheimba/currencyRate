import add2 from 'AppSelectors';

describe('add2', () => {
  it('should add 2 to a number', () => {
    expect(add2(5)).toBe(7);
  });
});
