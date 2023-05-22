import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from '../../common/Header';
import { CMS } from '../../config/config';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import List from './List';
import { useContext } from 'react';
import { TableContext } from '../../context/TableContext';

const Container = () => {
  const navigation = useNavigation();
  const { tableSelected, setTableSelected } = useContext(TableContext);

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  }

  const handlePlus = () => {
    navigation.navigate('AddBooking', {isEdit: false});
    setTableSelected([]);
  }

  return (
    <View style={styles.container}>
      <Header
        isShowDrawer={true}
        title={CMS.booking}
        mode="center-aligned"
        openDrawer={handleOpenDrawer}
        isPlus
        handlePlus={handlePlus}
      />
      <List />
    </View>
  )
}

export default Container

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})