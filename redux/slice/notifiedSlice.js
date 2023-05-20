import { createSlice } from '@reduxjs/toolkit';

const notifiedSlice = createSlice({
  name: 'notified',
  initialState: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  reducers: {
    getAllNotifiedStart: (state) => {
      state.loading = true;
    },
    getAllNotifiedSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    },
    getAllNotifiedFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    updateNotifiedStart: (state) => {
      state.loading = true;
    },
    updateNotifiedSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    updateNotifiedFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  getAllNotifiedStart,
  getAllNotifiedSuccess,
  getAllNotifiedFailed,
  updateNotifiedStart,
  updateNotifiedSuccess,
  updateNotifiedFailed,
} = notifiedSlice.actions;

export default notifiedSlice.reducer;
