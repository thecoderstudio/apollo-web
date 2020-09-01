import {
  SELECT_OPERATING_SYSTEM,
  SELECT_ARCHITECTURE,
  selectArchitecture,
  selectOperatingSystem,
} from '../../src/actions/add-agent';

test("select os creates select os action" , () => {
  const expectedAction = {
    type: SELECT_OPERATING_SYSTEM,
    selectedOperatingSystem: "linux"
  };
  expect(selectOperatingSystem('linux')).toEqual(expectedAction);
});

test("select arch creates select arch action", () => {
  const expectedAction = {
    type: SELECT_ARCHITECTURE,
    selectedArchitecture: 'amd64'
  };
  expect(selectArchitecture('amd64')).toEqual(expectedAction);
});
