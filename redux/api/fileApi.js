import { uploadFailed, uploadStart, uploadSuccess } from '../slice/fileSlice';
import { REACT_APP_HOST_API_SERVER } from '@env';

export const uploadFile = async (accessToken, dispatch, axiosJWT, file) => {
  dispatch(uploadStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_HOST_API_SERVER}/api/files/upload`, file, {
      headers: {
        'content-type': 'multipart/form-data',
        token: `Bear ${accessToken}`,
      },
    });
    dispatch(uploadSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(uploadFailed());
  }
};
