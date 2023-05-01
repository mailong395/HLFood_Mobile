import React from 'react'
import { StyleSheet, TextInput } from 'react-native';
import { Avatar, Button, Card, IconButton, MD3Colors, Text } from 'react-native-paper';

const CookItem = ({
  name = '', description = '', quantity = 0, tables = [],
  quantityFinish = 0, onPlus, onMinus, onDone
}) => {
  const [count, setCount] = React.useState('');

  // handle
  const numTable = () => {
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

  const handleChangeText = (value) => {
    const number = +value;
    console.log('number', number);
    if (number > quantity) {
      setCount(quantity + '');
    } else if (number < 0) {
      setCount('0');
    } else if (number) {
      setCount(value);
    } else {
      setCount('0');
    }
  }

  // render
  const LeftContent = props => <Avatar.Text {...props} label={numTable()} />

  //fetch 
  React.useEffect(() => {
    setCount(quantityFinish + '');
  }, [quantityFinish])


  return (
    <Card style={styles.container}>
      <Card.Title title={name} subtitle={'Số lượng: ' + quantity} left={LeftContent} />
      {description &&
        (<Card.Content>
          <Text variant="bodyMedium"> {description} </Text>
        </Card.Content>)}
      <Card.Actions>
        <IconButton
          icon="minus"
          disabled={quantityFinish === 0}
          size={20}
          onPress={() => onMinus()}
        />
        {/* <TextInput
          textAlign='center'
          defaultValue={quantityFinish}
          keyboardType='numeric'
          onChangeText={handleChangeText}
          value={count}
        /> */}
        <Text>{quantityFinish}</Text>
        <IconButton
          icon="plus"
          size={20}
          onPress={() => onPlus()}
        />
        <IconButton
          icon="check-bold"
          size={20}
          onPress={() => onDone()}
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
  }
})