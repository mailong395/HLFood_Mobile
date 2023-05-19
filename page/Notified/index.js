import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import Container from './Container';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';
import { createAxios } from '../../redux/createInstance';
import { loginSuccess } from '../../redux/slice/authSlice';
import { TableContext } from '../../context/TableContext';
import { getAllNotified } from '../../redux/api/notifiedApi';

const Notified = ({ navigation }) => {
  const dispatch = useDispatch();
  const { getData } = useContext(TableContext);
  const userSelector = useSelector(state => state.auth);
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        // employee: userSelector?.data?._id,
        employee: '641f0f17fc13ae30f60014d9',
        limit: 10,
      };
      await getAllNotified(dispatch, params, userSelector?.data?.accessToken, axiosJWT);
    }

    fetchData();
  }, [getData]);

  return (
    <View style={styles.container}>
      <Container navigation={navigation} />
    </View>
  )
}

export default Notified

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})