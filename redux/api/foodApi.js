import {
  getAllFoodStart,
  getAllFoodSuccess,
  getAllFoodFailed,
  addFoodStart,
  addFoodSuccess,
  addFoodFailed,
  updateFoodStart,
  updateFoodSuccess,
  updateFoodFailed,
} from '../slice/foodSlice';
import { REACT_APP_HOST_API_SERVER } from '@env';

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

export const addFood = async (dispatch, body, accessToken, axiosJWT) => {
  dispatch(addFoodStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_HOST_API_SERVER}/api/food`, body, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(addFoodSuccess(res.data));
  } catch (error) {
    dispatch(addFoodFailed());
  }
};

export const updateFood = async (dispatch, body, idFood, accessToken, axiosJWT) => {
  dispatch(updateFoodStart());
  try {
    const res = await axiosJWT.put(`${REACT_APP_HOST_API_SERVER}/api/food`, body, {
      headers: { token: `bear ${accessToken}` },
      params: { id: idFood },
    });
    dispatch(updateFoodSuccess());
  } catch (error) {
    dispatch(updateFoodFailed());
    console.log(error);
  }
};

export const deleteFood = async (dispatch, idFood, accessToken, axiosJWT) => {
  dispatch(updateFoodStart());
  try {
    const res = await axiosJWT.delete(`${REACT_APP_HOST_API_SERVER}/api/food`, {
      headers: { token: `bear ${accessToken}` },
      params: { id: idFood },
    });
    dispatch(updateFoodSuccess());
  } catch (error) {
    dispatch(updateFoodFailed());
    console.log(error);
  }
};
