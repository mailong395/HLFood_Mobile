import { StyleSheet, View } from 'react-native'
import React from 'react'
import Form from './Form';
import Header from '../../common/Header';
import { useNavigation, useRoute } from '@react-navigation/native';

const Container = () => {
  const navigation = useNavigation();
  const { isEdit } = useRoute().params;

  return (
    <View>
      <Header
        title={isEdit? "Sửa Bàn Đặt" : "Thêm Bàn Đặt"}
        mode="center-aligned"
        isShowButtonGoBack={true}
        props={() => navigation.goBack()}
      />
      <Form />
    </View>
  )
}

export default Container

const styles = StyleSheet.create({})