import { combineReducers } from 'redux';
import authReducer from './auth';
import themeReducer from './theme';
import AddAgentModalReducer from './addAgentModal';

export default combineReducers({
  authenticated: authReducer,
  theme: themeReducer,
  addAgentModalVisible: AddAgentModalReducer
});
