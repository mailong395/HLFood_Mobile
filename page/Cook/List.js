import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import CookItem from '../../component/CookItem'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton, MD3Colors } from 'react-native-paper'
import { updateOrderDetail } from '../../redux/api/orderDetailApi'
import { createAxios } from '../../redux/createInstance'
import { loginSuccess } from '../../redux/slice/authSlice'

const List = ({ data = [] }) => {
  const userSelector = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

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
      await updateTable(dispatch, table._id, 3, userSelector?.data.accessToken, axiosJWT);
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
      await updateTable(dispatch, table._id, 3, userSelector?.data.accessToken, axiosJWT);
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
      await updateTable(dispatch, table._id, 3, userSelector?.data.accessToken, axiosJWT);
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