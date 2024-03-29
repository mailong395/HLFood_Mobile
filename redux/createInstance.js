import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { REACT_APP_HOST_API as url } from '@env';

const refreshToken = async (refreshToken) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.post(`${url}/auth/refresh`, refreshToken, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken({ refreshToken: user?.refreshToken });
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers['token'] = 'Bearer ' + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    },
  );
  return newInstance;
};
