import { StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import List from './list';
import Header from '../../common/Header';
import { ActivityIndicator, Button, MD2Colors } from 'react-native-paper';
import { CMS } from '../../config/config';
import { getAllFood } from '../../redux/api/foodApi';
import { FoodContext } from '../../context/FoodContext';

const ListFoodOrdered = ({ route, navigation }) => {
  const { numTable, idOrdered } = route.params;
  const dispatch = useDispatch()
  const selector = useSelector(state => state.order);
  const [ordered, setOrdered] = React.useState([]);
  const { setFoodWaitContext } = useContext(FoodContext);;

  // Handle
  const handleGoBack = () => {
    navigation.goBack();
  }

  const handleGoToListFood = () => {
    getAllFood(dispatch);
    navigation.navigate('ListFood', { numTable: numTable, idOrdered: idOrdered });
  }

  // Fetch Data
  React.useEffect(() => {
    if (selector?.data) {
      setOrdered(selector?.data.order_details);
      setFoodWaitContext(selector?.data.order_details);
    }
  }, [selector]);

  return (
    <View style={styles.container}>
      <Header
        isShowButtonGoBack={true}
        props={handleGoBack}
        title={"Các món chờ lên - Bàn " + numTable}
        mode="small"
      />

      {selector?.isFetching ?
        <View style={styles.loading}>
          <ActivityIndicator size={"large"} animating={true} color={MD2Colors.red800} />
        </View>
        :
        <View style={styles.listFood}>
          <List data={ordered} />
        </View>
      }

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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listFood: {
    flex: 1,
    padding: 8,
  },
  buttonBottom: {
    padding: 16,
  },
})