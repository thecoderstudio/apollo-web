import { LIST_AGENTS } from '../actions/agent';

export default function agentReducer(state = [], action) {
  console.log(action.agents);
  switch (action.type) {
    case LIST_AGENTS:
      return action.agents
    default: return state;
  }
}
