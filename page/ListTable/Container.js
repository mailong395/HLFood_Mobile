import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import List from './List'
import Header from '../../common/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAllTable } from '../../redux/api/tableApi';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../redux/createInstance';
import { loginSuccess } from '../../redux/slice/authSlice';
import { useEffect } from 'react';
import { useContext } from 'react';
import { TableContext } from '../../context/TableContext';
import { Button } from 'react-native-paper';

const Container = () => {
  const navigation = useNavigation();
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const accessToken = userSelector?.data?.accessToken;
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  const { tableSelected, setTableSelected } = useContext(TableContext);

  const handleGoBack = () => {
    navigation.goBack()
    setTableSelected([]);
  }

  const handleAccess = () => {
    navigation.goBack();
  }

  useEffect(() => {
    const fetchData = async () => {
      await getAllTable(dispatch, {}, accessToken, axiosJWT);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={"Thêm bàn"}
        mode="center-aligned"
        isShowButtonGoBack={true}
        props={handleGoBack}
      />
      <View style={styles.fullHeight}>
        <List />
      </View>
      {tableSelected.length > 0 && <Button mode='contained' style={styles.button} onPress={handleAccess}>Xác nhận</Button>}
    </View>
  )
}

export default Container

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullHeight: {
    flex: 1,
  },
  button: {
    margin: 16,
  }
})