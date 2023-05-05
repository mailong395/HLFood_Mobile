import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItemFoodOrdered from '../../component/ItemFoodOrdered';

const List = ({ data }) => {
  // render
  const renderItem = ({ item }) => {
    return <ItemFoodOrdered
      item={item?.food}
      count={item?.quantity}
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

const styles = StyleSheet.create({});