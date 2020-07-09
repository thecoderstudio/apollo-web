const SHOW_ADD_AGENT_MODAL = 'SHOW_ADD_AGENT_MODAL';
const CLOSE_ADD_AGENT_MODAL = 'CLOSE_ADD_AGENT_MODAL';

function showAddAgentModal() {
  return {
    type: SHOW_ADD_AGENT_MODAL
  };
};

function closeAddAgentModal() {
  return {
    type: SHOW_ADD_AGENT_MODAL
  };
};

export { showAddAgentModal, SHOW_ADD_AGENT_MODAL, closeAddAgentModal, CLOSE_ADD_AGENT_MODAL};
