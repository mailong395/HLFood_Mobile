import axios from "axios";
import { REACT_APP_HOST_API_SERVER } from "@env"
import { getOrderByIdFailed, getOrderByIdStart, getOrderByIdSuccess, saveOrderDetailsFailed, saveOrderDetailsStart, saveOrderDetailsSuccess, saveOrderFailed, saveOrderStart, saveOrderSuccess } from "../slice/orderSlice";

export const saveOrder = async (dispatch, employeeId, bookingTable, time_booking) => {
  dispatch(saveOrderStart());
  try {
    const res = await axios.post(`${REACT_APP_HOST_API_SERVER}/api/order`, {
      employee: employeeId,
      bookingTable: bookingTable,
      time_booking: time_booking,
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
export const getOrderById = async (dispatch, idOrder) => {
  dispatch(getOrderByIdStart())
  try {
    const res = await axios.get(`${REACT_APP_HOST_API_SERVER}/api/order`, {
      params: {
        id: idOrder
      }
    })
    dispatch(getOrderByIdSuccess(res.data))
    return await res.data;
  } catch (error) {
    console.log(error)
    dispatch(getOrderByIdFailed())
  }
}

export const saveOrderDetails = (dispatch, orderDetails) => {
  dispatch(saveOrderDetailsStart());
  try {
    axios.post(`${REACT_APP_HOST_API_SERVER}/api/booking/food`, {
      orderDetails: orderDetails
    });
    dispatch(saveOrderDetailsSuccess());
  } catch (error) {
    dispatch(saveOrderDetailsFailed());
    console.log(error);
  }
}
