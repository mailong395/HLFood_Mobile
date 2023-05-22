import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from './Container'

const Profile = ({ navigation }) => {
  const handleOpenDrawer = () => {
    navigation.openDrawer();
  }

  return (
    <View style={styles.container}>
      <Container openDrawer={handleOpenDrawer} />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})