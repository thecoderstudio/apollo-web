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
      state['selectedArchitecture'] = action.selectedArchitecture
    case SELECT_OPERATING_SYSTEM:
      state['selectedOperatingSystem'] = action.selectedOperatingSystem
    return state;
  }
}