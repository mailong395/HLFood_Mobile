import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import ItemFood from '../../component/ItemFood';
import { FoodContext } from '../../context/FoodContext';

const List = ({ data, onChangeText, propsRemove, onRemove }) => {
  
  // render
  const renderItem = ({ item }) => {
    const handleAddFood = () => {}

    const handleRemoveFood = () => {
      propsRemove(item);
    }

    const handleInputDescription = (value) => {
      onChangeText(item.food._id, value);
    }

    const handleOnRemove = () => {
      onRemove(item)
    }

    return (
      <ItemFood
        isEdit={false}
        isHiddenPlus={true}
        name={item.food.name}
        image={item.food.image}
        price={item.food.price}
        quantity={item.quantity}
        handleAddFood={handleAddFood}
        handleRemoveFood={handleRemoveFood}
        onchangeText={handleInputDescription}
        description={item.description}
        onRemove={handleOnRemove}
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
