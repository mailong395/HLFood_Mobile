import { ToastAndroid } from "react-native";
import {
  getAllOrderDetailStart,
  getAllOrderDetailSuccess,
  getAllOrderDetailFailed,
  updateOderDetailStart,
  updateOderDetailSuccess,
  updateOderDetailFailed,
} from "../slice/orderDetailSlice";
import { REACT_APP_HOST_API_SERVER } from "@env"

export const getAllOrderDetail = async (dispatch, accessToken, axiosJWT) => {
  dispatch(getAllOrderDetailStart());
  try {
    const res = await axiosJWT.get(`${REACT_APP_HOST_API_SERVER}/api/order_details`, {
      headers: { token: `Bear ${accessToken}` },
    });
    console.log('res', res);
    dispatch(getAllOrderDetailSuccess(res?.data));
  } catch (error) {
    console.log('error', error);
    dispatch(getAllOrderDetailFailed());
  }
}
export const updateOrderDetail = async (dispatch, body, accessToken, axiosJWT) => {
  const updateSuccess = () => {
    ToastAndroid.showWithGravity(
      'Cập nhật thành công',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  const updateFail = () => {
    ToastAndroid.showWithGravity(
      'Cập nhật không thành công',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  dispatch(updateOderDetailStart());
  try {
    await axiosJWT.put(`${REACT_APP_HOST_API_SERVER}/api/booking/food`, body, {
      headers: { token: `Bear ${accessToken}` },
    });
    dispatch(updateOderDetailSuccess(body));
    updateSuccess();
  } catch (error) {
    dispatch(updateOderDetailFailed());
    updateFail();
    console.log('error', error);
  }
}