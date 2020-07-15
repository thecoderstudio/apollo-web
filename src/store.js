import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage';
import mapTransformer from './transformers/map';
import rootReducer from './reducers/root';

const persistConfig = {
  key: 'root',
  whitelist: ['auth', 'agent'],
  transforms: [mapTransformer({ whitelist: 'agent' })],
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
