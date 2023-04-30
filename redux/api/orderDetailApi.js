import { getAllOrderDetailFailed, getAllOrderDetailSuccess } from "../slice/orderDetailSlice";
import { REACT_APP_HOST_API_SERVER } from "@env"

export const getAllOrderDetail = async (dispatch, accessToken, axiosJWT) => {
  dispatch(getAllOrderDetailFailed());
  try {
    const res = await axiosJWT.post(`${REACT_APP_HOST_API_SERVER}/api/order_details`, {
      headers: { token: `Bear ${accessToken}` },
    });
    dispatch(getAllOrderDetailSuccess(res?.data));
  } catch (error) {
    dispatch(getAllOrderDetailFailed());
    console.log('error', error);
  }
}