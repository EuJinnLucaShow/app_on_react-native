import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth/authReducer';

const rootReducer = {
  [authSlice.name]: authSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
