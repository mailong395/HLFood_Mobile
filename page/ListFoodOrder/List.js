import { FlatList } from 'react-native'
import React from 'react'
import ItemFood from '../../component/ItemFood';

const List = ({ data, addFood, removeFood }) => {
  const renderItem = ({ item }) => {
    return (
      <ItemFood
        item={item.food}
        countDefault={item.quantity}
        handlerAddFood={() => addFood(item.food._id)}
        handlerRemoveFood={() => removeFood(item.food._id)}
      />
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
    />
  )
}

export default List
