import axios from 'axios';
import { REACT_APP_HOST_API_SERVER } from "@env"
import { loginFailed, loginStart, loginSuccess } from '../slice/authSlice';

export const loginUser = async (dispatch, userName, password) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${REACT_APP_HOST_API_SERVER}/auth/login`, {
      'username': userName,
      'password': password
    });
    dispatch(loginSuccess(res?.data));
  } catch (error) {
    dispatch(loginFailed());
    console.log('error', error);
  }
};