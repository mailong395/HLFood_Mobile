import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getAllTableMerge } from '../../redux/api/tableApi';
import { useDispatch } from 'react-redux';
import Container from './Container';

const TableMerge = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { idOrder } = route?.params;

  React.useEffect(() => {
    const params = {
      status: 0
    }
    getAllTableMerge(dispatch, params);
  }, []);

  return (
    <Container navigation={navigation} idOrder={idOrder} />
  )
}

export default TableMerge

const styles = StyleSheet.create({})