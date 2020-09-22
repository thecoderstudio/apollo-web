import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import mapTransformer from './transformers/map';
import rootReducer from './reducers/root';

const persistConfig = {
  key: 'root',
  whitelist: ['auth', 'agent', 'currentUser'],
  transforms: [mapTransformer({ whitelist: 'agent' })],
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const persistor = persistStore(store);
