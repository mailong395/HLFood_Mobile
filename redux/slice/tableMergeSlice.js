const { createSlice } = require("@reduxjs/toolkit");

const tableMergeSlice = createSlice({
  name: 'tableMerge',
  initialState: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  reducers: {
    getAllTableMergeStart: (state) => {
      state.loading = true;
    },
    getAllTableMergeSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
    },
    getAllTableMergeFailed: (state) => {
      state.loading = false;
      state.error = true;
    }
  },
});

export const {
  getAllTableMergeStart,
  getAllTableMergeSuccess,
  getAllTableMergeFailed,
} = tableMergeSlice.actions;

export default tableMergeSlice.reducer;