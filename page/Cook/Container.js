import { StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '../../common/Header'
import { CMS } from '../../config/config'
import List from './List'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'

const Container = ({ openDrawer }) => {
  const selector = useSelector(state => state.orderDetail);
  const [loading, setLoading] = useState(false);
  const [listOrderDetail, setListOrderDetail] = useState([]);
  console.log('selector', selector);

  const handleOpenDrawer = () => {
    openDrawer();
  }

  useEffect(() => {
    if (selector?.data) {
      setLoading(selector?.loading);
      const newListData = selector?.data?.filter(item => item?.quantity_finished < item?.quantity)
      setListOrderDetail(newListData);
    }
  }, [selector])


  return (
    <View style={styles.container}>
      <Header isShowDrawer={true} title={CMS.cook} mode="center-aligned" openDrawer={handleOpenDrawer} />
      <List data={listOrderDetail} />
      {loading &&
        <View style={styles.loading}>
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </View>}
    </View>
  )
}

export default Container

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});