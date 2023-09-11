import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer, authSlice } from './authSlice';

const rootReducer = combineReducers({
  [authSlice.name]: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
