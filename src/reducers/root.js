import { combineReducers } from 'redux';
import authReducer from './auth';
import themeReducer from './theme';

export default combineReducers({
  auth: authReducer,
  theme: themeReducer
});
