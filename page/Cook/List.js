import { StyleSheet, View } from 'react-native'
import React from 'react'
import CookItem from '../../component/CookItem'
import { useSelector } from 'react-redux'

const List = () => {
  const selector = useSelector(state => state.orderDetail);
  const [listOrderDetail, setListOrderDetail] = React.useState([]);

  console.log('listOrderDetail', listOrderDetail);

  React.useEffect(() => {
    setListOrderDetail(selector?.data);
  }, [selector])
  

  return (
    <View>
      <CookItem />
    </View>
  )
}

export default List

const styles = StyleSheet.create({});