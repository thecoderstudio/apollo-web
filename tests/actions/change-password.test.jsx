import { PROMPED_PASSWORD_CHANGE, prompedPasswordChange } from '../../src/actions/change-password';

test("promped password change creates actions", () => {
  const expectedAction = {
    type: PROMPED_PASSWORD_CHANGE
  };
  expect(prompedPasswordChange()).toEqual(expectedAction);
});
