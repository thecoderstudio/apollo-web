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
        selectedOperatingSystem: state.selectedOperatingSystem,
        selectedArchitecture: action.selectedArchitecture
      };
    case SELECT_OPERATING_SYSTEM:
      return {
        selectedArchitecture: state.selectedArchitecture,
        selectedOperatingSystem: action.selectedOperatingSystem,
      };
    default: return state;
  }
}