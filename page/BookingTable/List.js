import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Item from './Item';

const List = () => {
  const selector = useSelector(state => state.booking);
  const [customers, setCustomers] = useState([]);

  const renderItem = ({index, item}) => {
    return <Item data={item} />
  }

  useEffect(() => {
    const newData = [];
    const newCustomers = selector?.data;
    console.log('selector?.data', selector?.data);
    if (newCustomers) {
      newCustomers.forEach(customer => {
        customer?.order.forEach(element => {
          const newCustomer = {
            name: customer?.name,
            phone_num: customer?.phone_num,
            order: element,
          }
          newData.push(newCustomer);
        })
      });
    }
    setCustomers(newData);
  }, [selector])

  return (
    <FlatList
      data={customers}
      renderItem={renderItem}
      numColumns={2}
    />
  )
}

export default List

const styles = StyleSheet.create({})