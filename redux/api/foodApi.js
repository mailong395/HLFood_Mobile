import axios from "axios";
import {
    getAllFoodStart,
    getAllFoodSuccess,
    getAllFoodFailed
} from "../slice/foodSlice";
import { REACT_APP_HOST_API_SERVER } from "@env"

export const getAllFood = async (dispatch) => {
    dispatch(getAllFoodStart());
    try {
        const res = await axios.get(`${REACT_APP_HOST_API_SERVER}/api/foods`);
        dispatch(getAllFoodSuccess(res.data));
    } catch (error) {
        dispatch(getAllFoodFailed());
        console.log(error);
    }
};