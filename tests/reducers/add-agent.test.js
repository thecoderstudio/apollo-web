import addAgentReducer from '../../src/reducers/add-agent';
import { SHOW_ADD_AGENT_MODAL, CLOSE_ADD_AGENT_MODAL } from '../../src/actions/add-agent';

describe("auth reducer", () => {
  it("should return false as initial state", () => {
    expect(addAgentReducer(undefined, {})).toEqual(false);
  });

  it("should correctly handle show", () => {
    expect(addAgentReducer({}, { type: SHOW_ADD_AGENT_MODAL })).toEqual(true);
  });

  it("should correctly handle close", () => {
    expect(addAgentReducer({}, { type: CLOSE_ADD_AGENT_MODAL })).toEqual(false);
  });
});
