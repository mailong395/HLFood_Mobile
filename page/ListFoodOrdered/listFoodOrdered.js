import { StyleSheet, View } from 'react-native'
import React from 'react'
import { getOrderById } from '../../redux/api/orderApi';
import { useDispatch } from 'react-redux';
import List from './list';
import Header from '../../common/Header';
import { Button } from 'react-native-paper';
import { CMS } from '../../config/config';

const ListFoodOrdered = ({ route, navigation }) => {
  const { numTable, idOrdered } = route.params;
  const dispatch = useDispatch();

  // Handle
  const handleGoBack = () => {
    navigation.goBack();
  }

  const handleGoToListFood = () => {
    navigation.navigate('ListFood', { numTable: numTable, idOrdered: idOrdered });
  }

  // Fetch Data
  const fetchData = async () => {
    getOrderById(dispatch, idOrdered);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        isShowButtonGoBack={true}
        props={handleGoBack}
        title={"Các món chờ lên - Bàn " + numTable}
        mode="small"
      />
      <View style={styles.listFood}>
        <List idOrdered={idOrdered} />
      </View>

      <View style={styles.buttonBottom}>
        <Button icon='plus' mode="contained" onPress={handleGoToListFood}>
          {CMS.add}
        </Button>
      </View>
    </View>
  )
}

export default ListFoodOrdered

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  listFood: {
    flex: 1,
    padding: 8,
  },
  buttonBottom: {
    padding: 16,
  },
})