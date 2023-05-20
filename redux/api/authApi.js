import axios from 'axios';
import { REACT_APP_HOST_API } from '@env';
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess } from '../slice/authSlice';
import { Toast } from '../../common/toast';
import { TOAST } from '../../config/lang_vn';

export const loginUser = async (dispatch, userName, password) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${REACT_APP_HOST_API}/auth/login`, {
      username: userName,
      password: password,
    });
    dispatch(loginSuccess(res?.data));
    Toast(TOAST.login_success);
    return res?.data;
  } catch (error) {
    dispatch(loginFailed());
    Toast(TOAST.login_fail);
  }
};

export const logoutUser = async (dispatch, accessToken, axiosJWT) => {
  try {
    dispatch(logoutStart());

    const res = await axiosJWT.post(`${REACT_APP_HOST_API}/auth/logout`, {
      headers: {
        'Content-Type': 'application/json',
        token: `Bearer ${accessToken}`,
      },
    });

    dispatch(logoutSuccess());
    Toast(TOAST.logout_success);
  } catch (error) {
    Toast(TOAST.logout_fail);
    dispatch(logoutFailed());
  }
};
