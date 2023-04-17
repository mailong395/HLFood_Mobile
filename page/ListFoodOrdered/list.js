import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import ItemFood from '../../component/ItemFood';
import { FoodContext } from '../../context/FoodContext';

const List = ({ data }) => {
  // render
  const renderItem = ({ item }) => {
    const handleAddFood = () => {

    }

    const handleRemoveFood = () => {

    }

    return (
      <ItemFood
        name={item.food.name}
        image={item.food.image}
        price={item.food.price}
        quantity={item.quantity}
        handleAddFood={handleAddFood}
        handleRemoveFood={handleRemoveFood}
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
