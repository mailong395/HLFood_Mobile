import { REACT_APP_HOST_API_SERVER } from '@env';
import {
  addNotifiedFailed,
  addNotifiedStart,
  addNotifiedSuccess,
  getAllNotifiedFailed,
  getAllNotifiedStart,
  getAllNotifiedSuccess,
  updateNotifiedFailed,
  updateNotifiedStart,
  updateNotifiedSuccess,
} from '../slice/notifiedSlice';

export const getAllNotified = async (dispatch, params, accessToken, axiosJWT) => {
  dispatch(getAllNotifiedStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_HOST_API_SERVER}/api/notifi/`, {
      headers: { token: `bear ${accessToken}` },
      params: params,
    });
    dispatch(getAllNotifiedSuccess(res?.data));
  } catch (error) {
    dispatch(getAllNotifiedFailed());
    console.log('error', error);
  }
};

export const updateStatusNotified = async (dispatch, body, accessToken, axiosJWT) => {
  dispatch(updateNotifiedStart());
  try {
    await axiosJWT.post(`${REACT_APP_HOST_API_SERVER}/api/notifi:status`, body, {
      headers: { token: `Bear ${accessToken}` },
    });
    dispatch(updateNotifiedSuccess());
  } catch (error) {
    dispatch(updateNotifiedFailed());
    console.log('error', error);
  }
};

export const addNotified = async (dispatch, body, accessToken, axiosJWT) => {
  dispatch(addNotifiedStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_HOST_API_SERVER}/api/notifi`, body, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(addNotifiedSuccess());
    return res?.data;
  } catch (error) {
    dispatch(addNotifiedFailed());
    console.log('error', error);
  }
};
