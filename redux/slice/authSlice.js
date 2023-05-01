import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    loading: false,
    success: false,
    error: false,
  },
  reducers: {
    // login
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
      state.error = false;
    },
    loginFailed: (state) => {
      state.loading = false;
      state.data = null;
      state.success = false;
      state.error = true;
    },

    // logout
    logoutStart: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.data = null;
      state.success = true;
      state.error = false;
    },
    logoutFailed: (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;

export default authSlice.reducer;
