import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getAllTableMerge } from '../../redux/api/tableApi';
import { useDispatch } from 'react-redux';
import Container from './Container';

const TableMerge = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { idOrder } = route?.params;
  const userSelector = useSelector(state => state.auth);

  React.useEffect(() => {
    const params = {
      status: 0
    }
    getAllTableMerge(dispatch, params, userSelector?.data.accessToken);
  }, []);

  return (
    <Container navigation={navigation} idOrder={idOrder} />
  )
}

export default TableMerge

const styles = StyleSheet.create({})