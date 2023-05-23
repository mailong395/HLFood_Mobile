import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Card, Text } from 'react-native-paper'
import { CMS } from '../../config/config';
import { useState } from 'react';
import { useEffect } from 'react';

const Item = ({ data, isSelect = false, onSelect }) => {
  const [select, setSelect] = useState(isSelect);

  const handleSelect = () => {
    setSelect(!select);
    onSelect(data);
  }

  useEffect(() => {
    setSelect(isSelect);
  }, [isSelect])
  

  return (
    <Card style={[styles.container, select && styles.select]} onPress={handleSelect}>
      <Card.Content>
        <View style={[styles.headerCard, styles.boxFlex]}>
          <Text variant="bodyMedium">tầng {data?.floor}</Text>
        </View>
        <View style={styles.boxFlex}>
          <Text variant="titleLarge">Bàn {data?.table_num}</Text>
          <Text variant="bodyMedium">{data?.chair} {CMS.nChair}</Text>
        </View>
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
  select: {
    borderWidth: 4,
    borderColor: 'green'
  },
})