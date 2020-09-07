import { combineReducers } from 'redux';
import agentReducer from './agent';
import authReducer from './auth';
import currentUserReducer from './current-user';
import notificationReducer from './notification';
import themeReducer from './theme';
import changePasswordReducer from './change-password'

export default combineReducers({
  agent: agentReducer,
  authenticated: authReducer,
  currentUser: currentUserReducer,
  notifications: notificationReducer,
  theme: themeReducer,
  prompedPasswordChange: changePasswordReducer 
});
