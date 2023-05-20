import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import CookItem from '../../component/CookItem'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrderDetail } from '../../redux/api/orderDetailApi'
import { createAxios } from '../../redux/createInstance'
import { loginSuccess } from '../../redux/slice/authSlice'
import { updateTable } from "../../redux/api/tableApi";
import { TableContext } from '../../context/TableContext';
import { SocketContext } from '../../context/SocketIOContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { getAllOrderDetailSuccess } from '../../redux/slice/orderDetailSlice'
import { useState } from 'react'
import { addNotified } from '../../redux/api/notifiedApi'

const List = ({ data = [] }) => {
  const userSelector = useSelector(state => state.auth);
  const notifiedSelector = useSelector(state => state.notified);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  const { getData, setGetData } = React.useContext(TableContext);
  const { sendToCook, orderDetail } = useContext(SocketContext);
  const [listOrderDetail, setListOrderDetail] = useState(data);

  const renderItem = ({ item, index }) => {
    const isShow = item.quantity === item.quantity_finished;

    const handleDone = async (count) => {
      // update order details
      const newData = listOrderDetail.map((element, i) => {
        return i === index ?
          {
            ...element,
            quantity_finished: count,
            status: item.quantity === item.quantity_finished ? 1 : 0,
          } : element;
      })
      await updateOrderDetail(dispatch, newData, userSelector?.data?.accessToken, axiosJWT);

      // update table
      item?.order?.tables.forEach(async element => {
        await updateTable(dispatch, element._id, 3, userSelector?.data.accessToken, axiosJWT);
      });

      // add notified
      const body = {
        description: "Notified waiter",
        order_detail: item._id,
        employee: userSelector?.data?._id,
      };
      const res = await addNotified(dispatch, body, userSelector?.data?.accessToken, axiosJWT);
      console.log('res', res);

      setGetData(!getData);
      setListOrderDetail(newData);
      sendToCook({cook: newData});
    }

    return !isShow && <CookItem
      data={item}
      onPress={handleDone}
    />
  }

  useEffect(() => {
    setListOrderDetail(data);
  }, [data]);

  return (
    <View style={styles.container}>
      <FlatList
        data={listOrderDetail}
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