import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { Avatar, Card, IconButton, Text } from 'react-native-paper';
import { LABEL } from '../config/lang_vn';
import { SelectCountry } from 'react-native-element-dropdown';
import { useRef } from 'react';
import { useEffect } from 'react';

const CookItem = ({ data, onPress }) => {
  const count = useRef(0);
  const [country, setCountry] = useState('' + count.current);
  const dataSelected = [];
  for (let index = 0; index < count.current; index++) {
    const value = index + 1;
    dataSelected.push({
      value: '' + value,
      label: '' + value,
    })
  }

  // handle
  const numTable = () => {
    const tables = data.order.tables;
    if (tables) {
      let str = tables[0]?.table_num + "";
      tables.forEach((index) => {
        index > 0 && (str += ", " + tables[index].table_num);
      })
      return str;
    } else {
      return '0';
    }
  }
  const handleDone = () => {
    onPress(data.quantity_finished + +country);
  }

  // render
  const LeftContent = props => <Avatar.Text {...props} label={numTable()} />

  useEffect(() => {
    count.current = data?.quantity - data?.quantity_finished;
    setCountry('' + count.current);
  }, [data])

  return (
    <Card style={styles.container}>
      <Card.Title title={data.food.name} subtitle={'Số lượng: ' + count.current} left={LeftContent} />
      {
        data.description &&
        <Card.Content>
          <Text variant="bodyMedium"> {data.description} </Text>
        </Card.Content>
      }
      <Card.Actions>
        <Text variant='bodyMedium'>{LABEL.quantity_finished}</Text>
        <SelectCountry
          style={styles.dropdown}
          selectedTextStyle={styles.selectedTextStyle}
          placeholderStyle={styles.placeholderStyle}
          value={country}
          data={dataSelected}
          valueField="value"
          labelField="label"
          onChange={e => {
            setCountry(e.value);
          }}
        />
        <IconButton
          icon="check-bold"
          onPress={handleDone}
        />
      </Card.Actions>
    </Card>
  )
}

export default CookItem

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    width: 58,
    paddingVertical: 4,
  },
  dropdown: {
    margin: 16,
    height: 40,
    width: 80,
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
})