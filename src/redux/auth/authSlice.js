import { createSlice } from '@reduxjs/toolkit';

const state = {
  name: null,
  email: null,
  avatar: null,
  userId: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: state,
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
    authLogOut: () => state,
  },
});

export const authReducer = authSlice.reducer;
export const { updateUserProfile, authStateChange, authLogOut } =
  authSlice.actions;
