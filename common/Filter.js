import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { Chip } from 'react-native-paper';

const Filter = ({ data, props }) => {
  const [selected, setSelected] = React.useState(-1);


  const renderItem = ({ item }) => {
    const isSelected = item._id === selected;
    const mode = isSelected ? 'flat' : 'outlined';

    const handleChangeButton = () => {
      props(item._id);
      setSelected(item._id);
    }

    return (
      <Chip
        mode={mode}
        selected={isSelected}
        onPress={handleChangeButton}
        style={{ margin: 8 }}
      >
        {item.title}
      </Chip>
    );
  };


  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    />
  )
}

export default Filter

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8
  }
})
