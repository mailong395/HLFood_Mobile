import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Badge, Card } from 'react-native-paper';
import { createAxios } from '../../redux/createInstance';
import { TableContext } from '../../context/TableContext';
import { loginSuccess } from '../../redux/slice/authSlice';
import { updateStatusNotified } from '../../redux/api/notifiedApi';
import { getAllNotifiedSuccess } from '../../redux/slice/notifiedSlice';

const Element = ({ data }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({});
  const { getData, setGetData } = useContext(TableContext);
  const userSelector = useSelector(state => state.auth);
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

  const getNumberTable = (tables) => {
    if (tables) {
      return tables.map(item => item.table_num).join();
    } else {
      return '0';
    }
  }

  const handleWatched = async () => {
    if (!value.is_read) {
      const params = {
        ids: value.uuid
      }
      await updateStatusNotified(dispatch, params, userSelector?.data?.accessToken, axiosJWT);
      setGetData(!getData);
    }
  }

  const LeftContent = props => <Avatar.Text {...props} label={value?.num_table} />

  useEffect(() => {
    if (data) {
      const newData = {
        uuid: data._id,
        name: data?.order_detail?.food?.name,
        quantity_finished: data?.order_detail?.quantity_finished,
        num_table: getNumberTable(data?.order_detail?.order?.tables),
        is_read: data?.is_read,
      }
      setValue(newData);
    }
  }, [data])

  return (
    <Card style={[styles.container, !value.is_read && styles.border]} onPress={handleWatched}>
      <Card.Title title={value?.name} subtitle={'Số lượng: ' + value?.quantity_finished} left={LeftContent} />
    </Card>
  )
}

export default Element

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  border: {
    borderWidth: 4,
    borderColor: 'green',
  }
})