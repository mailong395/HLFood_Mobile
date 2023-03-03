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
    }
});

export const {
    getAllFoodStart,
    getAllFoodSuccess,
    getAllFoodFailed
} = foodSlice.actions;

export default foodSlice.reducer;