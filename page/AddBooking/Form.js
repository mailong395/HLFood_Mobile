import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import { TableContext } from '../../context/TableContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../redux/createInstance';
import { loginSuccess } from '../../redux/slice/authSlice';
import { getAllCustomer, saveOrder, startBooking } from '../../redux/api/bookingApi';
import { Toast } from '../../common/toast';
import { getAllTable, updateOrderInTable, updateTable } from '../../redux/api/tableApi';
import { saveOrderDetails } from '../../redux/api/orderApi';
import { getAllCustomerStart } from '../../redux/slice/bookingSlice';
import { SocketContext } from '../../context/SocketIOContext';
import DialogComp from '../../component/DialogComp';

const Form = () => {
  const dispatch = useDispatch();
  const { isEdit, data } = useRoute().params;
  const userSelector = useSelector((state) => state.auth);
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date(Date.now()));
  const [time, setTime] = useState(new Date(Date.now()));
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [isShowDate, setIsShowDate] = useState(false);
  const [isShowTime, setIsShowTime] = useState(false);
  const { tableSelected, setTableSelected } = useContext(TableContext);
  const list_num = tableSelected?.map(element => { return element.table_num }).join();
  const { sendSocketData } = useContext(SocketContext);
  const selector = useSelector(state => state.booking);
  const [isShowDialog, setIsShowDialog] = useState(false);

  const handleScreenTables = () => {
    setTableSelected([]);
    navigation.navigate('ListTable');
  }

  const handleOnDate = (event, selectedDate) => {
    setIsShowDate(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);
  }
  const handleOnTime = (event, selectedDate) => {
    setIsShowTime(false);
    const currentDate = selectedDate || time;
    setDate(currentDate);
  }

  const formateDate = (date) => {
    const d = new Date(date);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  }
  const formatTime = (time) => {
    const d = new Date(time);
    return time = d.getHours() + ":" + d.getMinutes();
  }

  const isFullFill = () => {
    return name === '' || phone === '' || tableSelected.length === 0;
  }

  const handleAddOrder = async () => {
    try {
      const isEqual = selector?.data.some(element => element.phone_num === phone);
      if (isEqual) {
        setIsShowDialog(true);
      } else {
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
    }
    catch (error) {
      Toast("Thêm thất bại");
    }
  }
  const handleStart = async () => {
    const rs = [...tableSelected].some(table => table.status > 0);
    if (rs) {
      Toast('Bàn chưa sẳn sàng');
    } else {
      const bodyUpdate = {
        table: tableSelected?.map(element => { return element._id }),
        status: 2,
        order_id: data.order._id,
        customer: data._id,
      }
      await startBooking(bodyUpdate, userSelector?.data?.accessToken, axiosJWT);
      await navigation.popToTop();
      await getAllCustomer(dispatch, userSelector?.data?.accessToken, axiosJWT);
      sendSocketData({ chefToWaiter: bodyUpdate });
      Toast('Cập nhật thành công');
    }
  }

  const handleAccessAdd = async () => {
    setIsShowDialog(false);
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

  const handleClose = () => {
    setIsShowDialog(false);
  }

  useEffect(() => {
    if (isEdit) {
      setName(data.name);
      setPhone(data.phone_num);
      setTableSelected(data?.order?.tables);
      setDate(new Date(data?.order?.time_booking))
      setTime(new Date(data?.order?.time_booking))
    }
  }, [data])


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
        editable={false}
      />
      <TextInput
        label="Ngày"
        value={formateDate(date)}
        right={<TextInput.Icon icon="plus" onPress={() => setIsShowDate(true)} />}
        editable={false}
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
        editable={false}
        value={formatTime(date)}
        right={<TextInput.Icon icon="plus" onPress={() => setIsShowTime(true)} />}
      />
      {
        isShowTime && <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          display="default"
          onChange={handleOnTime}
        />
      }
      {!isEdit ?
        <Button
          mode='contained'
          style={styles.button}
          disabled={isFullFill()}
          onPress={handleAddOrder}
        >
          Thêm
        </Button>
        :
        <Button
          mode='contained'
          style={styles.button}
          disabled={isFullFill()}
          onPress={handleStart}
        >
          Bắt đầu
        </Button>
      }
      <DialogComp
        content={'Xác nhận thêm đặt bàn'}
        visibleDefault={isShowDialog}
        propsAddFood={handleAccessAdd}
        propsClose={handleClose}
      />
    </View>
  )
}

export default Form

const styles = StyleSheet.create({
  button: {
    margin: 16,
  }
})