import { SHOW_ADD_AGENT_MODAL, CLOSE_ADD_AGENT_MODAL } from '../actions/addAgentModal';

export default function addAgentModalReducer(state = true, action) {
  switch (action.type) {
    case CLOSE_ADD_AGENT_MODAL:
      return true;
    case SHOW_ADD_AGENT_MODAL:
      return true;
    default: return state;
  }
}