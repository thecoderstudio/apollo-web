import { combineReducers } from 'redux';
import agentReducer from './agent';
import authReducer from './auth';
import currentUserReducer from './current-user';
import notificationReducer from './notification';
import themeReducer from './theme';
import AddAgentReducer from './add-agent';

export default combineReducers({
  agent: agentReducer,
  authenticated: authReducer,
  theme: themeReducer,
  addAgent: AddAgentReducer,
  currentUser: currentUserReducer,
  notifications: notificationReducer,
  theme: themeReducer
});
