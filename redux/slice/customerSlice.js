import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    data: [],
    isFetching: false,
    success: false,
    error: false,
  },
  reducers: {
    getAllCustomerStart: (state) => {
      state.isFetching = true;
    },
    getAllCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.success = true;
    },
    getAllCustomerFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addCustomerStart: (state) => {
      state.isFetching = true;
    },
    addCustomerSuccess: (state, action) => {
      state.isFetching = false;
      state.data = [...state.data, action.payload];
      state.success = true;
    },
    addCustomerFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateCustomerStart: (state) => {
      state.isFetching = true;
    },
    updateCustomerSuccess: (state) => {
      state.isFetching = false;
      state.success = true;
    },
    updateCustomerFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getAllCustomerStart,
  getAllCustomerSuccess,
  getAllCustomerFailed,
  updateCustomerStart,
  updateCustomerSuccess,
  updateCustomerFailed,
  addCustomerStart,
  addCustomerSuccess,
  addCustomerFailed,
} = customerSlice.actions;

export default customerSlice.reducer;
