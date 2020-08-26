import { combineReducers } from 'redux';
import authReducer from './auth';
import currentUserReducer from './current-user';
import notificationReducer from './notification';
import themeReducer from './theme';

export default combineReducers({
  authenticated: authReducer,
  currentUser: currentUserReducer,
  notifications: notificationReducer,
  theme: themeReducer
});
