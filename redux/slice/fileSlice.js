import { createSlice } from '@reduxjs/toolkit';

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    success: false,
    error: false,
    isFetching: false,
    url: {},
  },
  reducers: {
    uploadStart: (state) => {
      state.isFetching = true;
    },
    uploadSuccess: (state, action) => {
      state.isFetching = false;
      state.url = action.payload;
      state.success = true;
    },
    uploadFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { uploadFailed, uploadStart, uploadSuccess } = fileSlice.actions;

export default fileSlice.reducer;
