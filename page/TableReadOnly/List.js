import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Item from './Item';

const List = () => {
  const selector = useSelector(state => state.table);
  const [tables, setTables] = useState([]);

  const renderItem = ({ index, item }) => {
    return <Item data={item} />
  }

  useEffect(() => {
    const newData = [...selector.data].sort((a, b) => a.table_num - b.table_num);
    setTables(newData);
  }, [selector]);

  return (
    <View style={styles.container}>
      <FlatList
        data={tables}
        renderItem={renderItem}
        initialNumToRender={10}
        numColumns={2}
      />
    </View>
  )
}

export default List

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
})