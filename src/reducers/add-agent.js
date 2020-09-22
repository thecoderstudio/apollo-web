import {
  SELECT_OPERATING_SYSTEM,
  SELECT_ARCHITECTURE,
} from '../actions/add-agent';

const initialState = {
  selectedArchitecture: "amd64",
  selectedOperatingSystem: "linux"
};

export default function addAgentReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_ARCHITECTURE:
      return {
        ...state,
        selectedArchitecture: action.selectedArchitecture
      }
    case SELECT_OPERATING_SYSTEM:
      return {
        ...state,
        selectedOperatingSystem: action.selectedOperatingSystem
      }
    default:
      return state;
  }
}