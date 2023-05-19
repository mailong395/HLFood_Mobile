import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../common/Header';
import List from './List';
import { HEADER_TITLE } from '../../config/lang_vn';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import LoadingComp from '../../component/LoadingComp';

const Container = ({ navigation }) => {
  const selector = useSelector(state => state.notified);
  const [loading, setLoading] = useState(false);

  const renderItem = ({ item, index }) => {
    console.log('item', item, index);

    return <Element data={item} />
  }

  const handleGoBack = () => {
    navigation.goBack();
  }

  useEffect(() => {
    setLoading(selector?.loading);
  }, [selector]);


  return (
    <View style={styles.container}>
      <Header
        isShowButtonGoBack={true}
        props={handleGoBack}
        title={HEADER_TITLE.Notification}
        mode="small"
      />
      <List />

      {loading && <LoadingComp />}
    </View>
  )
}

export default Container

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})