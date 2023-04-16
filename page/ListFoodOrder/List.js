import { FlatList } from 'react-native'
import React from 'react'
import ItemFood from '../../component/ItemFood';

const List = ({ data, addFood, removeFood }) => {
  const renderItem = ({ item }) => {

    return (
      <ItemFood
        isEdit={true}
        name={item.food.name}
        image={item.food.image}
        price={item.food.price}
        quantity={item.quantity}
        handleAddFood={() => addFood(item)}
        handleRemoveFood={() => removeFood(item)}
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
