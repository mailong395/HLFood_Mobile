import { useState, useRef, createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { REACT_APP_HOST_API_SERVER as url } from "@env"
import { createAxios } from "../redux/createInstance";
import { loginSuccess } from "../redux/slice/authSlice";
import { getAllOrderDetail } from "../redux/api/orderDetailApi";

const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const userSelector = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

  const [orderDetail, setOrderDetail] = useState([]);
  const socket = useRef();
  const [sendData, setSendData] = useState([]);

  const sendToCook = (data) => {
    socket.current.emit("notification", data)
  }

  const sendToWaiter = (data) => {
    socket.current.emit("notification", data)
  }

  useEffect(() => {
    const handler = (val) => {
      console.log('debug value socket', val)
      setSendData(val)
    };
    if (userSelector?.data?.accessToken) {
      console.log('run socket')
      socket.current = io(url, {
        transports: ['websocket'],
        'Access-Control-Allow-Credentials': true,
      });
      socket.current.on('sent-notification', handler);
      return () => socket.current.off('sent-notification', handler);
    }
  }, [sendData]);

  useEffect(() => {
    async function fetchData() {
      await getAllOrderDetail(dispatch, userSelector?.data?.accessToken, axiosJWT);
    }
    fetchData();
  }, [sendData.cook]);

  const value = {
    orderDetail,
    sendToCook,
    sendToWaiter,
  }

  return <SocketContext.Provider value={value}>
    {children}
  </SocketContext.Provider>
};

export { SocketContext, SocketContextProvider };
