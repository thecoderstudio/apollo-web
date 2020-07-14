import { LIST_AGENTS } from '../actions/agent';

export default function agentReducer(state = new Map(), action) {
  switch (action.type) {
    case LIST_AGENTS:
      return action.agents;
    default:
      return state;
  }
}
