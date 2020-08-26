import { Map } from 'immutable';

export default function notificationReducer(state = Map({}), action) {
  switch (action.type) {
    case 'NOTIFY':
      return state.set(action.id, {
        message: action.message,
        severity: action.severity
      });
    case 'DISMISS':
      return state.delete(action.id);
    default:
      return state;
  }
}
