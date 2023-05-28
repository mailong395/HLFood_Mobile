import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Card, Text } from 'react-native-paper'
import { CMS, STATUS_TABLE_READ_ONLY } from '../../config/config'

const Item = ({ data }) => {
  const getStatus = () => {
    return STATUS_TABLE_READ_ONLY.find(element => element._id === data.status);
  }

  const getNameCustomer = () => {
    if (data.employee) {
      return data.employee.name;
    }
    return 'Trống';
  }

  return (
    <Card style={[styles.container, {backgroundColor: getStatus().backgroundColor}]}>
      <Card.Title title={'NV: ' + getNameCustomer()} titleStyle={{ color: getStatus().color }} />
      <Card.Content>
        <View style={[styles.headerCard, styles.boxFlex]}>
          <Text variant="bodyMedium" style={{ color: getStatus().color }}>tầng {data.floor}</Text>
        </View>
        <View style={styles.boxFlex}>
          <Text variant="titleLarge" style={{ color: getStatus().color , marginTop: 8 }}>Bàn {data.table_num}</Text>
          <Text variant="bodyMedium" style={{ color: getStatus().color }}>{data.chair} {CMS.nChair}</Text>
        </View>
        <Text variant="bodyMedium" style={{ color: getStatus().color }}>{ getStatus().title }</Text>
      </Card.Content>
    </Card>
  )
}

export default Item

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  boxFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
  },
})