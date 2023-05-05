import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from './Container'
import { useSelector } from 'react-redux';
import Header from '../../common/Header';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import ModalComp from './ModalComp';

const DetailListFood = ({ navigation }) => {
  const selector = useSelector(state => state.order);
  const [loading, setLoading] = React.useState(false);
  const [order, setOrder] = React.useState({});
  const [isActive, setIsActive] = React.useState(false);

  // Handle
  const handleGoBack = () => {
    navigation.goBack();
  }

  const handleCloseModal = () => {
    setIsActive(false)
  }

  const handleOpenModal = () => {
    setIsActive(true);
  }

  React.useEffect(() => {
    setLoading(selector?.isFetching);
    setOrder(selector?.data);
  }, [selector]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        isShowButtonGoBack={true}
        props={handleGoBack}
        title={"Hóa đơn"}
        mode="small"
      />

      <Container data={order} openModal={handleOpenModal} />

      {loading &&
        <View style={styles.loading}>
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </View>}

      <ModalComp navigation={navigation} data={order} isShow={isActive} handleCloseModal={handleCloseModal} />
    </SafeAreaView>
  )
}

export default DetailListFood

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
})