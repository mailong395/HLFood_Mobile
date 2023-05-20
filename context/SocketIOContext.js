import { useState, useRef, createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { REACT_APP_HOST_API_SERVER as url } from '@env';
import { createAxios } from '../redux/createInstance';
import { loginSuccess } from '../redux/slice/authSlice';
import { getAllOrderDetail } from '../redux/api/orderDetailApi';
import { getAllTable } from '../redux/api/tableApi';

const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const userSelector = useSelector((state) => state.auth);

  const accessToken = userSelector?.data?.accessToken;
  const idEmployee = userSelector?.data?._id;

  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

  const [orderDetail, setOrderDetail] = useState([]);
  const socket = useRef();
  const [sendData, setSendData] = useState([]);
  const [listOrderDetail, setListOrderDetail] = useState([]);

  const sendSocketData = (data) => {
    socket.current.emit('notification', data);
  };

  useEffect(() => {
    const handler = (val) => {
      setSendData(val);
      if (val?.chefToChef !== undefined) {
        setListOrderDetail(val.chefToChef);
      }
      if (val?.waiterToChef !== undefined) {
        getAllOrderDetail(dispatch, accessToken, axiosJWT);
      }
      if (val?.chefToWaiter !== undefined) {
        getAllTable(dispatch, {}, accessToken, axiosJWT);
      }

      if (val?.updateOrderDetail !== undefined) {
        getAllOrderDetail(dispatch, accessToken, axiosJWT);
      }
    };
    if (userSelector?.data?.accessToken) {
      socket.current = io(url, {
        transports: ['websocket'],
        'Access-Control-Allow-Credentials': true,
      });
      socket.current.on('sent-notification', handler);
      return () => socket.current.off('sent-notification', handler);
    }
  }, [sendData]);

  const value = {
    orderDetail,
    listOrderDetail,
    sendSocketData,
    setListOrderDetail,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketContextProvider };
