import { PROMPED_PASSWORD_CHANGE } from '../../src/actions/change-password';
import changePasswordReducer from '../../src/reducers/change-password';

describe("change password reducer", () => {
  it("should return false as initial state", () => {
    expect(changePasswordReducer(undefined, {})).toEqual(false);
  });

  it("should correctly handle prompted passcode", () => {
    expect(changePasswordReducer({}, { type: PROMPED_PASSWORD_CHANGE})).toEqual(true);
  })
})
