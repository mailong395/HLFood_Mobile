import { createSlice } from '@reduxjs/toolkit';

const foodSlice = createSlice({
  name: 'food',
  initialState: {
    data: [],
    isFetching: false,
    success: false,
    error: false,
  },
  reducers: {
    getAllFoodStart: (state) => {
      state.isFetching = true;
    },
    getAllFoodSuccess: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.success = true;
    },
    getAllFoodFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addFoodStart: (state) => {
      state.isFetching = true;
    },
    addFoodSuccess: (state, action) => {
      state.isFetching = false;
      state.data = [...state.data, action.payload];
      state.success = true;
    },
    addFoodFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateFoodStart: (state) => {
      state.isFetching = true;
    },
    updateFoodSuccess: (state) => {
      state.isFetching = false;
      state.success = true;
    },
    updateFoodFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getAllFoodStart,
  getAllFoodSuccess,
  getAllFoodFailed,
  addFoodStart,
  addFoodSuccess,
  addFoodFailed,
  updateFoodFailed,
  updateFoodStart,
  updateFoodSuccess,
} = foodSlice.actions;

export default foodSlice.reducer;
