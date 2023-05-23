import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Item = ({ data }) => {
  const navigation = useNavigation();
  const tables = data?.order?.tables?.map(table => table.table_num).join();
  const d = new Date(data.order.time_booking);
  const time = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " +
    d.getHours() + ":" + d.getMinutes();

  const handleMoveDetail = () => {
    navigation.navigate('AddBooking', { isEdit: true, data: data });
  }

  return (
    <Card style={[styles.container, data?.status === 1 && styles.background]}>
      <TouchableOpacity onPress={handleMoveDetail}>
        <Card.Title title={data.name} subtitle={'SĐT: ' + data.phone_num} />
        <Card.Title title={'Bàn: ' + tables} subtitle={time} />
      </TouchableOpacity>
    </Card>
  )
}

export default Item

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  background: {
    backgroundColor: '#F9E060',
  },
})