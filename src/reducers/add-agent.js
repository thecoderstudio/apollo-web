import { SHOW_ADD_AGENT_MODAL, CLOSE_ADD_AGENT_MODAL } from '../actions/add-agent';

export default function addAgentReducer(state = true, action) {
  switch (action.type) {
    case CLOSE_ADD_AGENT_MODAL:
      return false;
    case SHOW_ADD_AGENT_MODAL:
      return true;
    default: return state;
  }
}