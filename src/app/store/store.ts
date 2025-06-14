import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import both reducers
import satelliteSelectionReducer from './satelliteSelectionSlice';
import satelliteDataReducer from './satelliteDataSlice'; // <-- IMPORT THE NEW ONE

const persistConfig = {
  key: 'root',
  storage,
  // Add BOTH slices to the whitelist to persist them
  whitelist: ['satelliteSelection', 'satelliteData'],
};

const rootReducer = combineReducers({
  // Include both reducers in the store
  satelliteSelection: satelliteSelectionReducer,
  satelliteData: satelliteDataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;