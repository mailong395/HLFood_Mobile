import { StyleSheet } from 'react-native'
import React from 'react'
import Container from './Container';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../redux/createInstance';
import { loginSuccess } from '../../redux/slice/authSlice';
import { getAllOrderDetail } from '../../redux/api/orderDetailApi';

const Cook = ({ openDrawer }) => {
  const userSelector = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

  // handle
  const handleOpenDrawer = () => {
    openDrawer();
  }

  // fetch data
  React.useEffect(() => {
    getAllOrderDetail(dispatch, userSelector?.data?.accessToken, axiosJWT);
  }, [])

  return (
    <Container openDrawer={handleOpenDrawer} />
  )
}

export default Cook

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})