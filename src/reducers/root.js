import { combineReducers } from 'redux';
import authReducer from './auth';
import currentUserReducer from './current-user';
import themeReducer from './theme';

export default combineReducers({
  authenticated: authReducer,
  currentUser: currentUserReducer,
  theme: themeReducer
});
