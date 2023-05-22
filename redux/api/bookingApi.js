import { REACT_APP_HOST_API } from '@env';
import {
  getAllCustomerFailed,
  getAllCustomerStart,
  getAllCustomerSuccess
} from "../slice/bookingSlice";
import { saveOrderFailed, saveOrderStart, saveOrderSuccess } from '../slice/orderSlice';

export const getAllCustomer = async (dispatch, accessToken, axiosJWT) => {
  dispatch(getAllCustomerStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_HOST_API}/api/customers`, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(getAllCustomerSuccess(res?.data));
  } catch (error) {
    dispatch(getAllCustomerFailed());
    console.log(error);
  }
};

export const saveOrder = async (dispatch, body, accessToken, axiosJWT) => {
  dispatch(saveOrderStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_HOST_API}/api/order`, body, {
        headers: { token: `bear ${accessToken}` },
      },
    );
    dispatch(saveOrderSuccess());
    return res?.data;
  } catch (error) {
    dispatch(saveOrderFailed());
    console.log(error);
    throw new Error('Save Failed!');
  }
};
