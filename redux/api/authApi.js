import axiosJWT from 'axios-jwt';
import axios from 'axios';
import { REACT_APP_HOST_API_SERVER } from "@env"
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess } from '../slice/authSlice';

export const loginUser = async (dispatch, userName, password) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${REACT_APP_HOST_API_SERVER}/auth/login`, {
      'username': userName,
      'password': password
    });
    dispatch(loginSuccess(res?.data));
    return res?.data;
  } catch (error) {
    dispatch(loginFailed());
    console.log('error', error);
  }
};

export const logoutUser = async (dispatch, accessToken) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post(`${REACT_APP_HOST_API_SERVER}/auth/logout`, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailed());
    console.log('error', error);
  }
}