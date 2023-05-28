import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../../common/Header';
import Filter from './Filter';
import List from './List';
import { ActivityIndicator, Divider, MD2Colors } from 'react-native-paper';
import { createAxios } from '../../redux/createInstance';
import { loginSuccess } from '../../redux/slice/authSlice';
import { getAllTable } from '../../redux/api/tableApi';

const Container = () => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.table);
  const [loading, setLoading] = useState(false);
  const userSelector = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

  const handleGoBack = async () => {
    navigation.goBack();
    await getAllTable(dispatch, {}, userSelector?.data?.accessToken, axiosJWT);
  }

  useEffect(() => {
    setLoading(selector.isFetching);
  }, [selector]);
  

  return (
    <View style={styles.container}>
      <Header
        isShowButtonGoBack={true}
        props={handleGoBack}
        title={'Danh sách tất cả bàn'}
        mode="small"
      />
      <Filter />
      <Divider />
      <List />
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
})