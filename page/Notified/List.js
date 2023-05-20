import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Element from './Element';

const List = () => {
  const selector = useSelector(state => state.notified);
  const [listNotified, setListNotified] = useState([]);

  const renderItem = ({ item, index }) => {
    return <Element data={item} />
  }

  useEffect(() => {
    if (selector?.data) {
      setListNotified(selector?.data)
    }
  }, [selector]);

  return (
    <View style={styles.container}>
      <FlatList
        data={listNotified}
        renderItem={renderItem}
      />
    </View>
  )
}

export default List

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})