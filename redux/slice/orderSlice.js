import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    data: [],
    isFetching: false,
    success: false,
    error: false,
  },
  reducers: {
    getOrdersSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
      state.success = true;
    },
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
    updateOrderDetailStart: (state) => {
      state.isFetching = true;
    },
    updateOrderDetailSuccess: (state) => {
      state.isFetching = false;
      state.success = true;
    },
    updateOrderDetailFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteOrderDetailStart: (state) => {
      state.isFetching = true;
    },
    deleteOrderDetailSuccess: (state) => {
      state.isFetching = false;
      state.success = true;
    },
    deleteOrderDetailFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    paymentOrderStart: (state) => {
      state.isFetching = true;
    },
    paymentOrderSuccess: (state) => {
      state.data = [];
      state.isFetching = false;
      state.success = false;
      state.error = false;
    },
    paymentOrderFailed: (state) => {
      state.isFetching = false;
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
  updateOrderDetailStart,
  updateOrderDetailSuccess,
  updateOrderDetailFailed,
  deleteOrderDetailStart,
  deleteOrderDetailSuccess,
  deleteOrderDetailFailed,
  paymentOrderStart,
  paymentOrderSuccess,
  paymentOrderFailed,
} = orderSlice.actions;

export default orderSlice.reducer;
