import MobileChecker from '../../src/util/MobileChecker';

describe('mobile checker', () => {
  it('is a singleton', () => {
    const a = new MobileChecker();
    const b = new MobileChecker();
    expect(a).toStrictEqual(b);
  });

  it('correctly detects mobile', () => {
    const userAgent = jest.spyOn(window.navigator, 'userAgent', 'get') ;
    userAgent.mockReturnValue('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1');
    expect(new MobileChecker().checkIfMobile()).toBe(true);
  });

  it('correctly detects non-mobile', () => {
    const userAgent = jest.spyOn(window.navigator, 'userAgent', 'get');
    userAgent.mockReturnValue('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36');
    expect(new MobileChecker().checkIfMobile()).toBe(false);
  });
});
