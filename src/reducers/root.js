import { combineReducers } from 'redux';
import agentReducer from './agent';
import authReducer from './auth';
import themeReducer from './theme';

export default combineReducers({
  agent: agentReducer,
  authenticated: authReducer,
  theme: themeReducer
});
