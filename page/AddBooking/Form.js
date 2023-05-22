import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import { TableContext } from '../../context/TableContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../redux/createInstance';
import { loginSuccess } from '../../redux/slice/authSlice';
import { getAllCustomer, saveOrder } from '../../redux/api/bookingApi';
import { Toast } from '../../common/toast';

const Form = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.auth);
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date(Date.now()));
  const [time, setTime] = useState(new Date(Date.now()));
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const { getData, setGetData } = useContext(TableContext);
  const [isShowDate, setIsShowDate] = useState(false);
  const [isShowTime, setIsShowTime] = useState(false);
  const { tableSelected } = useContext(TableContext);
  const list_num = tableSelected?.map(element => { return element.table_num }).join();

  const handleScreenTables = () => {
    navigation.navigate('ListTable');
  }

  const handleOnDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setIsShowDate(false);
  }
  const handleOnTime = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setTime(currentDate);
    setIsShowTime(false);
  }

  const formateDate = (date) => {
    const d = new Date(date);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  }

  const isFullFill = () => {
    return name === '' || phone === '' || tableSelected.length === 0;
  }

  const handleAddOrder = async () => {
    try {
      const body = {
        employee: userSelector?.data?._id,
        customerName: name,
        customerPhone: phone,
        time_booking: date,
        bookingTable: list_num,
      }
      await saveOrder(dispatch, body, userSelector?.data?.accessToken, axiosJWT);
      await getAllCustomer(dispatch, userSelector?.data?.accessToken, axiosJWT);
      Toast("Thêm thành công");
      navigation.goBack();
    }
    catch (error) {
      Toast("Thêm thất bại");
    }
  }

  return (
    <View>
      <TextInput
        label="Tên khách hàng"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        label="Số điện thoại"
        keyboardType='number-pad'
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <TextInput
        label="Bàn"
        value={list_num}
        right={<TextInput.Icon icon="plus" onPress={handleScreenTables} />}
        disabled
      />
      <TextInput
        label="Ngày"
        value={formateDate(date)}
        right={<TextInput.Icon icon="plus" onPress={() => setIsShowDate(true)} />}
        disabled
      />
      {isShowDate && <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={'date'}
        display="default"
        onChange={handleOnDate}
      />}
      <TextInput
        label="Giờ"
        value={time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")}
        right={<TextInput.Icon icon="plus" onPress={() => setIsShowTime(true)} />}
        disabled
      />
      {
        isShowTime && <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode={'time'}
          display="default"
          onChange={handleOnTime}
        />
      }
      <Button
        mode='contained'
        style={styles.button}
        disabled={isFullFill()}
        onPress={handleAddOrder}
      >
        Thêm
      </Button>
    </View>
  )
}

export default Form

const styles = StyleSheet.create({
  button: {
    margin: 16,
  }
})