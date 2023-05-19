import { REACT_APP_HOST_API_SERVER } from '@env';
import { 
  getAllNotifiedFailed,
  getAllNotifiedStart,
  getAllNotifiedSuccess,
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
}

export const updateStatusNotified = async (dispatch, params, accessToken, axiosJWT) => {
  dispatch(updateNotifiedStart());
  try {
    await axiosJWT.post(`${REACT_APP_HOST_API_SERVER}/api/notifi:status`, {
      headers: { token: `bear ${accessToken}` },
      params: params,
    });
    dispatch(updateNotifiedSuccess());
  } catch (error) {
    dispatch(updateStatusNotified());
    console.log('error', error);
  }
}
