import axios from 'axios';
import { REACT_APP_HOST_API_SERVER } from "@env"
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess
} from '../slice/authSlice';
import { Toast } from '../../common/toast';
import { TOAST } from '../../config/lang_vn';

export const loginUser = async (dispatch, userName, password) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${REACT_APP_HOST_API_SERVER}/auth/login`, {
      'username': userName,
      'password': password
    });
    dispatch(loginSuccess(res?.data));
    Toast(TOAST.login_success);
    return res?.data;
  } catch (error) {
    dispatch(loginFailed());
    Toast(TOAST.login_fail);
    console.log('error', error);
  }
};

export const logoutUser = (dispatch, accessToken, axiosJWT) => {
  dispatch(logoutStart());
  try {
    axiosJWT.post(`${REACT_APP_HOST_API_SERVER}/auth/logout`, {
      headers: { token: `bear ${accessToken}` },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });
    dispatch(logoutSuccess());
    Toast(TOAST.logout_success)
  } catch (error) {
    dispatch(logoutFailed());
    Toast(TOAST.logout_fail);
    console.log('error', error);
  }
}