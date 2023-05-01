import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    data: [],
    isFetching: false,
    success: false,
    error: false,
  },
  reducers: {
    getAllEmployeeStart: (state) => {
      state.isFetching = true;
    },
    getAllEmployeeSuccess: (state, action) => {
      state.isFetching = false;
      state.data = action.payload.sort((a, b) => a?.job_title - b?.job_title);
      state.success = true;
    },
    getAllEmployeeFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addEmployeeStart: (state) => {
      state.isFetching = true;
    },
    addEmployeeSuccess: (state, action) => {
      state.isFetching = false;
      state.data = [...state.data, action.payload];
      state.success = true;
    },
    addEmployeeFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateEmployeeStart: (state) => {
      state.isFetching = true;
    },
    updateEmployeeSuccess: (state) => {
      state.isFetching = false;
      state.success = true;
    },
    updateEmployeeFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getAllEmployeeStart,
  getAllEmployeeSuccess,
  getAllEmployeeFailed,
  updateEmployeeStart,
  updateEmployeeSuccess,
  updateEmployeeFailed,
  addEmployeeStart,
  addEmployeeSuccess,
  addEmployeeFailed,
} = employeeSlice.actions;

export default employeeSlice.reducer;
