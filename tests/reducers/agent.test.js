import { Map as ImmutableMap } from 'immutable';
import agentReducer from '../../src/reducers/agent';
import { PUT_AGENT, LIST_AGENTS } from '../../src/actions/agent';
import Agent from '../../src/records/Agent';

describe("agent reducer", () => {
  it("should return empty agent list as initial state", () => {
    expect(agentReducer(undefined, {})).toEqual(new ImmutableMap());
  });

  it("should correctly handle agent listing", () => {
    const agents = ImmutableMap({ id: Agent({ id: "id" })});
    
    expect(agentReducer(undefined, {
      type: LIST_AGENTS,
      agents
    })).toEqual(agents );
  });

  it("should correctly handle agent PUT", () => {
    const initialState = ImmutableMap({ "test": { id: "test", name:'old' }}) ;
    const newAgent = Agent({ id: "test", name:'new' });

    expect(agentReducer(undefined, {
      type: PUT_AGENT,
      agent: newAgent
    })).toEqual(ImmutableMap({ "test": newAgent}));
  });
});
