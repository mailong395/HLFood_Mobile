import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '../../common/Header';
import { CMS } from '../../config/config';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import List from './List';
import { useContext } from 'react';
import { TableContext } from '../../context/TableContext';
import { ActivityIndicator, MD2Colors, TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const Container = () => {
  const navigation = useNavigation();
  const selector = useSelector(state => state.booking);
  const [date, setDate] = useState(new Date(Date.now()));
  const [isShowDate, setIsShowDate] = useState(false);
  const { tableSelected, setTableSelected } = useContext(TableContext);
  const [loading, setLoading] = useState(false);

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  }

  const handlePlus = () => {
    navigation.navigate('AddBooking', { isEdit: false, data: {} });
    setTableSelected([]);
  }

  const formateDate = (date) => {
    const d = new Date(date);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  }

  const handleOnDate = (event, selectedDate) => {
    setIsShowDate(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
  }

  useEffect(() => {
    setLoading(selector?.loading)
  }, [selector]);

  return (
    <View style={styles.container}>
      <Header
        isShowDrawer={true}
        title={CMS.booking}
        mode="center-aligned"
        openDrawer={handleOpenDrawer}
        isPlus
        handlePlus={handlePlus}
      />
      <TextInput
        label="Ngày"
        value={formateDate(date)}
        right={<TextInput.Icon icon="card-search-outline" onPress={() => setIsShowDate(true)} />}
        editable={false}
      />
      {isShowDate && <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={'date'}
        display="default"
        onChange={handleOnDate}
      />}
      <List query={date}/>
      {loading && <ActivityIndicator style={styles.loading} size={'small'} animating={true} color={MD2Colors.red800} />}
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
    left: '50%',
    right: '50%',
    top: '50%',
    bottom: '50%',
  }
})