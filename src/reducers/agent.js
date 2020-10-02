import { Map as ImmutableMap } from 'immutable';
import { LIST_AGENTS, PUT_AGENT } from '../actions/agent';

export default function agentReducer(state = new ImmutableMap(), action) {
  if (!ImmutableMap.isMap(state)) {
    state = new ImmutableMap(state);
  }

  switch (action.type) {
    case LIST_AGENTS:
      return action.agents;
    case PUT_AGENT:
      return state.set(action.agent.id, action.agent);
    default:
      return state;
  }
}
