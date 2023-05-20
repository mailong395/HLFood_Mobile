import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'

const LoadingComp = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator animating={true} color={MD2Colors.red800} />
    </View>
  )
}

export default LoadingComp;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})