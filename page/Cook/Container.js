import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../common/Header'
import { CMS } from '../../config/config'
import List from './List'

const Container = ({ openDrawer }) => {

  const handleOpenDrawer = () => {
    openDrawer();
  }

  return (
    <View>
      <Header isShowDrawer={true} title={CMS.logo} mode="center-aligned" openDrawer={handleOpenDrawer} />
      <List />
    </View>
  )
}

export default Container

const styles = StyleSheet.create({})