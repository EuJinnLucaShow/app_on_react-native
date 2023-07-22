import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    login: null,
  },
  reducers: {
    updateUserProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});
