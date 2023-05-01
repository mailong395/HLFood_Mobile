import {
  getAllFoodStart,
  getAllFoodSuccess,
  getAllFoodFailed
} from "../slice/foodSlice";
import { REACT_APP_HOST_API_SERVER } from "@env"

export const getAllFood = async (dispatch, accessToken, axiosJWT) => {
  dispatch(getAllFoodStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_HOST_API_SERVER}/api/foods:active`, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(getAllFoodSuccess(res.data));
  } catch (error) {
    dispatch(getAllFoodFailed());
    console.log(error);
  }
};