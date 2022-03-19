import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PURGE,
  REGISTER
} from 'redux-persist';
import counterSlice from '../features/counter/counterSlice';

const persistConfig = {
  key: 'deckData',
  storage,
};
const reducers = combineReducers({counter: counterSlice});

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: {
    counter: persistedReducer,
        },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: {
         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER],
          }})
});