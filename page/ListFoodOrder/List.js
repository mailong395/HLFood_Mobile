import { FlatList } from 'react-native'
import React from 'react'
import ItemFood from '../../component/ItemFood';

const List = ({ data, addFood, removeFood, onchangeText }) => {
  const renderItem = ({ item }) => {

    const handleInputDescription = (value) => {
      onchangeText(item.food._id, value);
    }

    return (
      item.quantity > 0 &&
      <ItemFood
        isEdit={true}
        name={item.food.name}
        image={item.food.image}
        price={item.food.price}
        quantity={item.quantity}
        handleAddFood={() => addFood(item)}
        handleRemoveFood={() => removeFood(item)}
        onchangeText={handleInputDescription}
        description={item.description}
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
