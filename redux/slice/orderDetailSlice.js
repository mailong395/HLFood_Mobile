const { createSlice } = require("@reduxjs/toolkit");

const orderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  reducers: {
    getAllOrderDetailStart: (state) => {
      state.loading = true;
    },
    getAllOrderDetailSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
      state.error = false;
    },
    getAllOrderDetailFailed: (state) => {
      state.loading = false;
      state.data = null;
      state.success = false;
      state.error = true;
    },
    updateOderDetailStart: (state) => {
      state.loading = true;
    },
    updateOderDetailSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
      state.error = false;
    },
    updateOderDetailFailed: (state, a) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    }
  }
});

export const {
  getAllOrderDetailStart,
  getAllOrderDetailSuccess,
  getAllOrderDetailFailed,
  updateOderDetailStart,
  updateOderDetailSuccess,
  updateOderDetailFailed,
} = orderDetailSlice.actions;

export default orderDetailSlice.reducer;