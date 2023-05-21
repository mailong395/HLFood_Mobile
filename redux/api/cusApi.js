import {
  getAllCustomerFailed,
  getAllCustomerStart,
  getAllCustomerSuccess,
  updateCustomerFailed,
  updateCustomerStart,
  updateCustomerSuccess,
} from '../slice/customerSlice';

import { REACT_APP_HOST_API } from '@env';

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

export const updateCustomer = async (dispatch, body, idCustomer, accessToken, axiosJWT) => {
  dispatch(updateCustomerStart());
  try {
    const res = await axiosJWT.put(`${REACT_APP_HOST_API}/api/customer`, body, {
      headers: { token: `bear ${accessToken}` },
      params: { id: idCustomer },
    });
    dispatch(updateCustomerSuccess());
  } catch (error) {
    dispatch(updateCustomerFailed());
    console.log(error);
  }
};

export const deleteCustomer = async (dispatch, idCus, accessToken, axiosJWT) => {
  dispatch(updateCustomerStart());
  try {
    const res = await axiosJWT.delete(`${REACT_APP_HOST_API}/api/customer`, {
      headers: { token: `bear ${accessToken}` },
      params: { id: idCus },
    });
    dispatch(updateCustomerSuccess());
  } catch (error) {
    dispatch(updateCustomerFailed());
    console.log(error);
  }
};
