import {
  SHOW_ADD_AGENT_MODAL,
  CLOSE_ADD_AGENT_MODAL,
  SELECT_OPERATING_SYSTEM,
  SELECT_ARCHITECTURE,
  showAddAgentModal,
  closeAddAgentModal,
  selectArchitecture,
  selectOperatingSystem,
} from '../../src/actions/add-agent';

test("show add agent modal creates show action", () => {
  const expectedAction = {
    type: SHOW_ADD_AGENT_MODAL
  };
  expect(showAddAgentModal()).toEqual(expectedAction);
});

test("close add agent modal creates close action", () => {
  const expectedAction = {
    type: CLOSE_ADD_AGENT_MODAL
  };
  expect(closeAddAgentModal()).toEqual(expectedAction);
});

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
