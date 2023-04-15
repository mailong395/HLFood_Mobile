import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    data: [],
    isFetching: false,
    success: false,
    error: false,
  },
  reducers: {
    saveOrderStart: (state) => {
      state.isFetching = true;
    },
    saveOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.success = true;
    },
    saveOrderFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getOrderByIdStart: (state) => {
      state.isFetching = true;
    },
    getOrderByIdSuccess: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.success = true;
    },
    getOrderByIdFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    saveOrderDetailsStart: (state) => {
      state.isFetching = true;
    },
    saveOrderDetailsSuccess: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.success = true;
    },
    saveOrderDetailsFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  }
});

export const {
  saveOrderStart,
  saveOrderSuccess,
  saveOrderFailed,
  getOrderByIdStart,
  getOrderByIdSuccess,
  getOrderByIdFailed,
  saveOrderDetailsStart,
  saveOrderDetailsSuccess,
  saveOrderDetailsFailed,
} = orderSlice.actions;

export default orderSlice.reducer;