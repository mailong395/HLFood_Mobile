import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getAllTableMerge } from '../../redux/api/tableApi';
import { useDispatch, useSelector } from 'react-redux';
import Container from './Container';
import { loginSuccess } from '../../redux/slice/authSlice';
import { createAxios } from '../../redux/createInstance';

const TableMerge = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { idOrder } = route?.params;
  const userSelector = useSelector(state => state.auth);
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

  React.useEffect(() => {
    const params = {
      status: 0
    }
    getAllTableMerge(dispatch, params, userSelector?.data.accessToken, axiosJWT);
  }, []);

  return (
    <Container navigation={navigation} idOrder={idOrder} />
  )
}

export default TableMerge

const styles = StyleSheet.create({})