import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../common/Header'
import { CMS } from '../../config/config'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import Form from './Form'

const Container = ({ openDrawer }) => {
  const handleOpenDrawer = () => {
    openDrawer();
  }
  return (
    <View style={styles.container}>
      <Header
        isShowDrawer={true}
        title={CMS.profile}
        mode="center-aligned"
        openDrawer={handleOpenDrawer}
      />
      <Form />
    </View>
  )
}

export default Container

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})