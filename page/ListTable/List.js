import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Item from './Item';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { TableContext } from '../../context/TableContext';

const List = () => {
  const selector = useSelector(state => state.table);
  const [listTable, setListTable] = useState([]);
  const { tableSelected, setTableSelected } = useContext(TableContext);
  
  const renderItem = ({ index, item }) => {
    const isSelect = tableSelected.findIndex(element => element._id === item._id) > -1;

    const handleSelect = () => {
      const newArray = [...tableSelected, {
        _id: item._id,
        table_num: item.table_num,
      }]
      setTableSelected(newArray);
    }
    
    return <Item data={item} isSelect={isSelect} onSelect={handleSelect} />
  }

  useEffect(() => {
    const newArray = [...selector?.data].sort((a, b) => a.table_num - b.table_num);
    setListTable(newArray);
  }, [selector])


  return (
    <FlatList
      data={listTable}
      renderItem={renderItem}
      numColumns={2}
    />
  )
}

export default List

const styles = StyleSheet.create({})