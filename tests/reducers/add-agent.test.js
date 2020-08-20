import addAgentReducer from '../../src/reducers/add-agent';
import {
  SHOW_ADD_AGENT_MODAL,
  CLOSE_ADD_AGENT_MODAL,
  SELECT_ARCHITECTURE,
  SELECT_OPERATING_SYSTEM
} from '../../src/actions/add-agent';

const initialState = {
  modalVisible: false,
  selectedArchitecture: "amd64",
  selectedOperatingSystem: "linux"
};

describe("auth reducer", () => {
  it("should return false as initial state", () => {
    expect(addAgentReducer(undefined, {})).toEqual(initialState);
  });

  it("should correctly handle show", () => {
    expect(addAgentReducer(initialState, { type: SHOW_ADD_AGENT_MODAL })).toEqual(
      {
        ...initialState,
        modalVisible: true
      }
    );
  });

  it("should correctly handle close", () => {
    expect(addAgentReducer(initialState, { type: CLOSE_ADD_AGENT_MODAL })).toEqual(
      {
        ...initialState,
        modalVisible: false
      }
    );
  });

  it("should correcty select architecture", () => {
    expect(addAgentReducer(initialState, {
      type: SELECT_ARCHITECTURE,
      selectedArchitecture: 'amd64'
    })).toEqual(
      {
        ...initialState,
        selectedArchitecture: 'amd64'
      }
    );
  });

  it("should correcty select os", () => {
    expect(addAgentReducer(initialState, {
      type: SELECT_OPERATING_SYSTEM,
      selectedOperatingSystem: 'linux'
    })).toEqual(
      {
        ...initialState,
        selectedOperatingSystem: 'linux'
      }
    );
  });
});
