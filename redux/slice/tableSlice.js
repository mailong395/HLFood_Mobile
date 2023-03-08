import { createSlice } from '@reduxjs/toolkit';

const tableSlice = createSlice({
    name: 'table',
    initialState: {
        data: [],
        isFetching: false,
        success: false,
        error: false,
    },
    reducers: {
        getAllTableStart: (state) => {
            state.isFetching = true;
        },
        getAllTableSuccess: (state, action) => {
            state.isFetching = false;
            state.data = action.payload;
            state.success = true;
        },
        getAllTableFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        updateTableStart: (state) => {
            state.isFetching = true;
        },
        updateTableSuccess: (state) => {
            state.isFetching = false;
            state.success = true;
        },
        updateTableFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
});

export const {
    getAllTableStart,
    getAllTableSuccess,
    getAllTableFailed,
    updateTableStart,
    updateTableSuccess,
    updateTableFailed,

} = tableSlice.actions;

export default tableSlice.reducer;
