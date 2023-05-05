import { REACT_APP_HOST_API_SERVER } from "@env"
import {
  deleteOrderDetailFailed,
  deleteOrderDetailStart,
  deleteOrderDetailSuccess,
  getOrderByIdFailed,
  getOrderByIdStart,
  getOrderByIdSuccess,
  saveOrderDetailsFailed,
  saveOrderDetailsStart,
  saveOrderDetailsSuccess,
  saveOrderFailed,
  saveOrderStart,
  saveOrderSuccess,
  updateOrderDetailFailed,
  updateOrderDetailStart,
  updateOrderDetailSuccess,
  paymentOrderStart,
  paymentOrderSuccess,
  paymentOrderFailed,
} from "../slice/orderSlice";
import { Toast } from "../../common/toast";
import { TOAST } from "../../config/lang_vn";

export const saveOrder = async (dispatch, employeeId, bookingTable, time_booking, accessToken, axiosJWT) => {
  dispatch(saveOrderStart());
  try {
    const res = await axiosJWT.post(`${REACT_APP_HOST_API_SERVER}/api/order`,
      {
        employee: employeeId,
        bookingTable: bookingTable,
        time_booking: time_booking,
      }, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(saveOrderSuccess());
    return await res.data.orderId;
  } catch (error) {
    dispatch(saveOrderFailed());
    console.log(error);
  }
};



/**
 * Api get Order
 * @param {useDispatch} dispatch in react-redux 
 * @param {String} IdOrder Id of Order 
 * @returns Object Order
 */
export const getOrderById = async (dispatch, idOrder, accessToken, axiosJWT) => {
  dispatch(getOrderByIdStart())
  try {
    const res = await axiosJWT.get(`${REACT_APP_HOST_API_SERVER}/api/order`, {
      headers: { token: `bear ${accessToken}` },
      params: { id: idOrder },
    })
    dispatch(getOrderByIdSuccess(res?.data));
    return await res?.data;
  } catch (error) {
    console.log(error)
    dispatch(getOrderByIdFailed())
  }
}

export const saveOrderDetails = (dispatch, orderDetails, accessToken, axiosJWT) => {
  dispatch(saveOrderDetailsStart());
  try {
    axiosJWT.post(`${REACT_APP_HOST_API_SERVER}/api/booking/food`, {
      orderDetails: orderDetails
    }, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(saveOrderDetailsSuccess());
  } catch (error) {
    dispatch(saveOrderDetailsFailed());
    console.log(error);
  }
}

export const updateOrderDetail = async (dispatch, orderDetails, accessToken, axiosJWT) => {
  dispatch(updateOrderDetailStart());
  try {
    await axiosJWT.put(`${REACT_APP_HOST_API_SERVER}/api/booking/food`, orderDetails, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(updateOrderDetailSuccess());
  } catch (error) {
    dispatch(updateOrderDetailFailed());
    console.log(error);
  }
}

export const deleteOrderDetail = async (dispatch, idOrderDetail, accessToken, axiosJWT) => {
  dispatch(deleteOrderDetailStart());
  try {
    await axiosJWT.delete(`${REACT_APP_HOST_API_SERVER}/api/booking/food/` + idOrderDetail, {
      headers: { token: `bear ${accessToken}` },
    });
    dispatch(deleteOrderDetailSuccess());
  } catch (error) {
    dispatch(deleteOrderDetailFailed());
    console.log(error);
  }
}

export const paymentOrder = async (dispatch, params, body, accessToken, axiosJWT) => {
  dispatch(paymentOrderStart());
  try {
    await axiosJWT.post(`${REACT_APP_HOST_API_SERVER}/api/order:pay/`, body, {
      headers: { token: `bear ${accessToken}` },
      params: params,
    });
    dispatch(paymentOrderSuccess());
    Toast(TOAST.payment_success);
  } catch (error) {
    dispatch(paymentOrderFailed());
    Toast(TOAST.payment_failed);
    throw new Error('Parameter is not a number!');
  }
}
