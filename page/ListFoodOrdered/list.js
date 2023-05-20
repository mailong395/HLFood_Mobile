import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { FoodContext } from '../../context/FoodContext';
import ItemFood from './Item';

const List = ({ data = {} }) => {

  // render
  const renderItem = ({ item, index }) => {
    const count = item?.quantity - item?.quantity_finished;

    return count > 0 &&
      <ItemFood
        itemOrderDetail={item}
        isEdit={false}
        index={index}
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
