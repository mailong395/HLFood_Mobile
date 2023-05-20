import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../common/Header'
import { HEADER_TITLE } from '../../config/lang_vn'
import Form from './Form'

const Container = ({ navigation, data }) => {

  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Header
        isShowButtonGoBack={true}
        props={handleGoBack}
        title={HEADER_TITLE.add_table}
        mode="small"
      />
      <Form onPress={handleGoBack} data={data} />
    </View>
  )
}

export default Container

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})