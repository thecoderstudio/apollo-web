import { PROMPTED_PASSWORD_CHANGE, promptedPasswordChange } from '../../src/actions/change-password';

test("prompted password change creates actions", () => {
  const expectedAction = {
    type: PROMPTED_PASSWORD_CHANGE
  };
  expect(promptedPasswordChange()).toEqual(expectedAction);
});
