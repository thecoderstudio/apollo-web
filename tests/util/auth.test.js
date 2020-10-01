import { logout } from '../../src/actions/auth';
import { removeCurrentUser } from '../../src/actions/current-user';

test('logout', async () => {
  const spy = jest.fn();
  mockDispatchSpy = jest.fn();
  jest.mock('../../src/store', () => ({
    dispatch: spy,
  }));
  await waitForExpect(() => {
    expect(spy).toHaveBeenCalledWith(logout);
    expect(spy).toHaveBeenCalledWith(removeCurrentUser);
  });
});