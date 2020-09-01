import addAgentReducer from '../../src/reducers/add-agent';
import {
  SELECT_ARCHITECTURE,
  SELECT_OPERATING_SYSTEM
} from '../../src/actions/add-agent';

const initialState = {
  selectedArchitecture: "amd64",
  selectedOperatingSystem: "linux"
};

describe("auth reducer", () => {
 it("should return false as initial state", () => {
    expect(addAgentReducer(undefined, {})).toEqual(initialState);
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
