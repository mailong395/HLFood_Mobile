import { io } from 'socket.io-client';
import { REACT_APP_HOST_API_SERVER as url } from "@env"
import { useSelector } from 'react-redux';
import React from 'react';

export default SocketIO = () => {
  const socket = React.useRef();
  const [sendData, setSendData] = React.useState([]);
  const userSelector = useSelector(state => state.auth);

  useEffect(() => {
    const handler = (chatMessage) => {
        //set data
    };
    if (userSelector?.data?.accessToken) {
      socket.current = io(url, {
          transports: ['websocket'],
          'Access-Control-Allow-Credentials': true,
      });
  
      socket.current.on('notification', handler);
      return () => socket.current.off('notification', handler);
    }
  }, [sendData]);
}