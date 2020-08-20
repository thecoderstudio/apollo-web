const SHOW_ADD_AGENT_MODAL = 'SHOW_ADD_AGENT_MODAL';
const CLOSE_ADD_AGENT_MODAL = 'CLOSE_ADD_AGENT_MODAL';
const SELECT_OPERATING_SYSTEM = 'SELECT_OPERATING_SYSTEM';
const SELECT_ARCHITECTURE = 'SELECT_ARCHITECTURE';

function showAddAgentModal() {
  return {
    type: SHOW_ADD_AGENT_MODAL
  };
}

function closeAddAgentModal() {
  return {
    type: CLOSE_ADD_AGENT_MODAL
  };
}

function selectOperatingSystem(operatingSystem) {
  return {
    type: SELECT_OPERATING_SYSTEM,
    selectedOperatingSystem: operatingSystem
  };
}

function selectArchitecture(architecture) {
  return {
    type: SELECT_ARCHITECTURE,
    selectedArchitecture: architecture
  };
}

export {
  showAddAgentModal,
  SHOW_ADD_AGENT_MODAL,
  closeAddAgentModal,
  CLOSE_ADD_AGENT_MODAL,
  selectOperatingSystem,
  SELECT_OPERATING_SYSTEM,
  selectArchitecture,
  SELECT_ARCHITECTURE
};
