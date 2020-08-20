import {
  SHOW_ADD_AGENT_MODAL,
  CLOSE_ADD_AGENT_MODAL,
  SELECT_OPERATING_SYSTEM,
  SELECT_ARCHITECTURE,
} from '../actions/add-agent';

const initialState = {
  modalVisible: false,
  selectedArchitecture: "amd64",
  selectedOperatingSystem: "linux"
};

export default function addAgentReducer(state = initialState, action) {
  switch (action.type) {
    case CLOSE_ADD_AGENT_MODAL:
      return {
        ...state,
        modalVisible: false
      };
    case SHOW_ADD_AGENT_MODAL:
      return {
        ...state,
        modalVisible: true
      };
    case SELECT_ARCHITECTURE:
      return {
        ...state,
        selectedArchitecture: action.selectedArchitecture
      }
    case SELECT_OPERATING_SYSTEM:
      return {
        ...state,
        selectedOperatingSystem: action.selectedOperatingSystem,
      }
    default: return state;
  }
}