import {
    SHOW_ADD_AGENT_MODAL,
    CLOSE_ADD_AGENT_MODAL,
    showAddAgentModal,
    closeAddAgentModal,
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
