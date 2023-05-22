import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Card, Text } from 'react-native-paper'
import { CMS } from '../../config/config';
import { useState } from 'react';
import { useEffect } from 'react';

const Item = ({ data, isSelect = false, onSelect }) => {
  const [select, setSelect] = useState(isSelect);

  const handleSelect = () => {
    onSelect();
    setSelect(!select);
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
        {/*   <Text variant="bodyMedium" style={{ color: color }}>{status}</Text> */}
      </Card.Content>
      {/* <Card.Actions>
          {
            isCheckBox &&
            <>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
              <IconButton
                icon="square-edit-outline"
                onPress={handleEdit}
              />
            </>
          }
        </Card.Actions>
        <Card.Content>
          <View style={[styles.headerCard, styles.boxFlex, { borderColor: color }]}>
            <Text variant="bodyMedium" style={{ color: color }}>tầng {nFloor}</Text>
            <Text variant="bodyMedium" style={{ color: color }}>{time}</Text>
          </View>
          <View style={styles.boxFlex}>
            <Text variant="titleLarge" style={{ color: color, marginTop: 8 }}>Bàn {nTable}</Text>
            <Text variant="bodyMedium" style={{ color: color }}>{nChair} {CMS.nChair}</Text>
          </View>
          <Text variant="bodyMedium" style={{ color: color }}>{status}</Text>
        </Card.Content> */}
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