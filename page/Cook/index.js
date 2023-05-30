import { StyleSheet } from 'react-native'
import React from 'react'
import Container from './Container';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../redux/createInstance';
import { loginSuccess } from '../../redux/slice/authSlice';
import { getAllOrderDetail } from '../../redux/api/orderDetailApi';
import { TableContext } from '../../context/TableContext';

const Cook = ({ navigation }) => {
  const userSelector = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  const { getData } = React.useContext(TableContext);

  console.log('userSelector?.data?.accessToken', userSelector?.data?.accessToken)

  // handle
  const handleOpenDrawer = () => {
    navigation.openDrawer();
  }

  // fetch data
  React.useEffect(() => {
    const fetchData = async () => {
      await getAllOrderDetail(dispatch, userSelector?.data?.accessToken, axiosJWT);
    }
    fetchData();
  }, []);

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