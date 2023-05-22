import { createSlice } from '@reduxjs/toolkit';

const bookingSlide = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    loading: false,
    success: false,
    error: false,

  },
  reducers: {
    getAllCustomerStart: (state) => {
      state.loading = true;
    },
    getAllCustomerSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
      state.error = false;
    },
    getAllCustomerFailed: (state) => {
      state.loading = false;
      state.data = null;
      state.success = false;
      state.error = true;
    },
  },
});

export const {
  getAllCustomerStart,
  getAllCustomerSuccess,
  getAllCustomerFailed,
} = bookingSlide.actions;

export default bookingSlide.reducer;
