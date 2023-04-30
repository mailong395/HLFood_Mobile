import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../common/Header'
import { CMS } from '../../config/config'
import List from './List'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllOrderDetail } from '../../redux/api/orderDetailApi'
import { createAxios } from '../../redux/createInstance'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../../redux/slice/authSlice'

const Container = ({ openDrawer }) => {
  const loading = useSelector(state => state.orderDetail?.loading);

  const handleOpenDrawer = () => {
    openDrawer();
  }

  return (
    <View>
      <Header isShowDrawer={true} title={CMS.logo} mode="center-aligned" openDrawer={handleOpenDrawer} />
      {loading ? <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
      : <List />}
    </View>
  )
}

export default Container

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  }
});