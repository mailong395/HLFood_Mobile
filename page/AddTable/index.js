import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from './Container'

const AddTable = ({ route, navigation }) => {
  const { data } = route.params;

  return (
    <Container navigation={navigation} data={data} />
  )
}

export default AddTable

const styles = StyleSheet.create({

})