import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { FoodContext } from '../../context/FoodContext';
import ItemFood from '../../component/ItemFood';

const List = ({ data, onChangeText, propsRemove, onRemove }) => {

  // render
  const renderItem = ({ item }) => {
    const count = item?.quantity - item?.quantity_finished;

    // handle
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

    return count > 0 &&
      <ItemFood
        isEdit={false}
        isHiddenPlus={true}
        name={item?.food?.name}
        image={item?.food?.image}
        price={item?.food?.price}
        description={item.description}
        quantity={count}
        // handleAddFood={handleAddFood}
        // handleRemoveFood={handleRemoveFood}
        // onchangeText={handleInputDescription}
        // onRemove={handleOnRemove}
      />
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
    />
  )
}

export default List
