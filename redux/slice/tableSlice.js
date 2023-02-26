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
    }
});

export const {
    getAllTableStart,
    getAllTableSuccess,
    getAllTableFailed
} = tableSlice.actions;

export default tableSlice.reducer;
