import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';

const Item = ({ data }) => {
  const tables = data.order.tables.map(table => table.table_num).join();
  const d = new Date(data.order.time_booking);
  const time = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " +
    d.getHours() + ":" + d.getMinutes();

  return (
    <Card style={styles.container}>
      <Card.Title title={data.name} subtitle={'SĐT: ' + data.phone_num} />
      <Card.Title title={'Bàn: ' + tables} subtitle={time} />
    </Card>
  )
}

export default Item

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
})