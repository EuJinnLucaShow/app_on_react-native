import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  email: null,
  avatar: null,
  userId: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      name: payload.name,
      email: payload.email,
      userId: payload.userId,
      avatar: payload.avatar,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authLogOut: () => initialState,
  },
});

export const authReducer = authSlice.reducer;
export const { updateUserProfile, authStateChange, authLogOut } =
  authSlice.actions;
