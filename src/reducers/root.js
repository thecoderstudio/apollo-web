import { combineReducers } from 'redux';
import authReducer from './auth';
import themeReducer from './theme';
import navBarReducer from './navbar';

export default combineReducers({
  authenticated: authReducer,
  theme: themeReducer,
  collapsed: navBarReducer
});
