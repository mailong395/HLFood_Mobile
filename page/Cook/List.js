import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import CookItem from '../../component/CookItem'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrderDetail } from '../../redux/api/orderDetailApi'
import { createAxios } from '../../redux/createInstance'
import { loginSuccess } from '../../redux/slice/authSlice'
import { updateTable } from "../../redux/api/tableApi";
import { TableContext } from '../../context/TableContext';
import { io } from 'socket.io-client';
import { REACT_APP_HOST_API_SERVER as url } from "@env"

const List = ({ data = [] }) => {
  const userSelector = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  const { getData, setGetData } = React.useContext(TableContext);
  const socket = React.useRef();

  const renderItem = ({ item, index }) => {
    const isShow = item.quantity === item.quantity_finished;

    const handlePlus = async () => {
      const newData = data.map(element => {
        return {
          ...element,
          quantity_finished: element === item ? element.quantity_finished + 1 : element.quantity_finished,
        };
      })
      await updateOrderDetail(dispatch, newData, userSelector?.data?.accessToken, axiosJWT);
      item?.order?.tables.forEach( async element => {
        await updateTable(dispatch, element._id, 3, userSelector?.data.accessToken, axiosJWT);
      });
      setGetData(!getData);
    }

    const handleMinus = async () => {
      const newData = data.map(element => {
        return {
          ...element,
          quantity_finished:
            element === item ?
              element.quantity_finished - 1 : element.quantity_finished,
        };
      })
      await updateOrderDetail(dispatch, newData, userSelector?.data?.accessToken, axiosJWT);
      item?.order?.tables.forEach( async element => {
        await updateTable(dispatch, element._id, 3, userSelector?.data.accessToken, axiosJWT);
      });
      setGetData(!getData);
    }

    const handleDone = async () => {
      const newData = data.map((element, i) => {
        return i === index ? {
          ...element,
          quantity_finished: element.quantity,
        }
          : element;
      })
      await updateOrderDetail(dispatch, newData, userSelector?.data?.accessToken, axiosJWT);
      item?.order?.tables.forEach( async element => {
        await updateTable(dispatch, element._id, 3, userSelector?.data.accessToken, axiosJWT);
      });
      setGetData(!getData);
    }

    return !isShow && <CookItem
      name={item.food.name}
      description={item.description}
      quantity={item.quantity}
      tables={item.order.tables}
      quantityFinish={item.quantity_finished}
      onPlus={handlePlus}
      onMinus={handleMinus}
      onDone={handleDone}
    />
  }

  React.useEffect(() => {
    const handler = (value) => {
        console.log('value socket debug', value);
    };
    if (userSelector?.data?.accessToken) {
      console.log('run socket');
      socket.current = io(url, {
          transports: ['websocket'],
          'Access-Control-Allow-Credentials': true,
      });
  
      socket.current.on('send-notification', handler);
      return () => socket.current.off('send-notification', handler);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
      />
    </View>
  )
}

export default List

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});