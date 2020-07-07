import { TOGGLE_OPTIONS, toggleOptions } from '../../src/actions/navbar';

test("toggle options creates action", () => {
  const expectedAction = {
    type: TOGGLE_OPTIONS
  };
  expect(toggleOptions()).toEqual(expectedAction);
});