import { createSlice } from '@reduxjs/toolkit';

const tableOfEmpSlice = createSlice({
    name: 'tableOfEmp',
    initialState: {
        data: [],
        isFetching: false,
        success: false,
        error: false,
    },
    reducers: {
        getAllTableOfEmpStart: (state) => {
            state.isFetching = true;
        },
        getAllTableOfEmpSuccess: (state, action) => {
            state.isFetching = false;
            state.data = action.payload;
            state.success = true;
        },
        getAllTableOfEmpFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {
    getAllTableOfEmpStart,
    getAllTableOfEmpSuccess,
    getAllTableOfEmpFailed
} = tableOfEmpSlice.actions;

export default tableOfEmpSlice.reducer;