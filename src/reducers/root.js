import { combineReducers } from 'redux';
import authReducer from './auth';
import themeReducer from './theme';
import AddAgentReducer from './add-agent';

export default combineReducers({
  authenticated: authReducer,
  theme: themeReducer,
  addAgentModalVisible: AddAgentReducer
});
