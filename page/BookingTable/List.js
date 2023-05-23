import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Item from './Item';

const List = ({ query }) => {
  const selector = useSelector(state => state.booking);
  const [customers, setCustomers] = useState([]);

  const renderItem = ({ index, item }) => {
    return <Item data={item} />
  }

  useEffect(() => {
    const newData = [];
    const newCustomers = [...selector?.data].filter(item => item.status < 2);
    if (newCustomers) {
      newCustomers.forEach(customer => {
        customer?.order.forEach(element => {
          const newCustomer = {
            _id: customer?._id,
            status: customer?.status,
            name: customer?.name,
            phone_num: customer?.phone_num,
            order: element,
          }
          const now = new Date(query);
          now.setHours(0, 0, 0, 0);
          const time_booking = new Date(element.time_booking);
          time_booking.setHours(0, 0, 0, 0);
          now.getTime() === time_booking.getTime() && newData.push(newCustomer);
        })
      });
    }
    setCustomers(newData);
  }, [selector, query])

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