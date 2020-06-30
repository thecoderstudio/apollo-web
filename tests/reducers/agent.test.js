import agentReducer from '../../src/reducers/agent';
import { LIST_AGENTS } from '../../src/actions/agent';

describe("agent reducer", () => {
  it("should return empty agent list as initial state", () => {
    expect(agentReducer({ agents: [] }, {})).toEqual({ agents: [] });
  });

  it("should correctly handle agent listing", () => {
    let agents = [{ id: "id" }];
    expect(agentReducer({}, {
      type: LIST_AGENTS,
      agents
    })).toEqual({ agents: agents });
  });
})