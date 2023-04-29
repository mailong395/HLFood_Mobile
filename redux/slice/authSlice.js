import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    loading: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = false;
    },
    loginFailed: (state) => {
      state.loading = false;
      state.error = true;
      state.data = null;
      state.login = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
} = authSlice.actions;

export default authSlice.reducer;
