import { TOGGLE_OPTIONS } from '../actions/navbar';

export default function navBarReducer(state = true, action) {
  switch (action.type) {
    case TOGGLE_OPTIONS:
      return action.collapsed;
    default: return state;
  }
}