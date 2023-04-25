import { StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import List from './list';
import Header from '../../common/Header';
import { ActivityIndicator, Button, MD2Colors } from 'react-native-paper';
import { CMS } from '../../config/config';
import { getAllFood } from '../../redux/api/foodApi';
import { FoodContext } from '../../context/FoodContext';
import { BUTTON } from '../../config/lang_vn';
import { deleteOrderDetail, updateOrderDetail } from '../../redux/api/orderApi';
import { getOrderByIdSuccess } from '../../redux/slice/orderSlice';

const ListFoodOrdered = ({ route, navigation }) => {
  const { numTable, idOrdered } = route.params;
  const dispatch = useDispatch()
  const selector = useSelector(state => state.order);
  const [ordered, setOrdered] = React.useState([]);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const { setFoodWaitContext } = useContext(FoodContext);

  // Handle
  const handleGoBack = () => {
    navigation.goBack();
  }

  const handleGoToListFood = () => {
    getAllFood(dispatch);
    navigation.navigate('ListFood', { numTable: numTable, idOrdered: idOrdered });
  }

  const handleRemoveFood = (data) => {
    const temp = {
      index: -1,
      id: '',
    };
    if (data.quantity > 0) {
      const newArray = ordered.map((newFood, index) => {
        if (newFood.quantity === 1) {
          temp.index = index;
          temp.id = newFood._id;
        }
        return newFood.food._id === data.food._id && {
          ...newFood,
          description: newFood.quantity === 1 ? '' : newFood.description,
          quantity: newFood.quantity - 1
        }
      });
      if (temp.index !== -1) {
        const newOrder = selector?.data;
        const array = [...newOrder.order_details];
        array.shift(temp.index, 1);
        const orderChange = {
          ...newOrder,
          order_details: [...array]
        }
        deleteOrderDetail(dispatch, temp.id);
        dispatch(getOrderByIdSuccess(orderChange));
      }
      setOrdered(newArray);
      setIsUpdate(temp.index === -1);
    }
  };

  const handleInputDescription = (id, value) => {
    const newData = ordered.map((item) => {
      if (item.food._id === id) {
        return {
          ...item,
          description: value,
        }
      }
      return item
    })
    setOrdered(newData);
    setIsUpdate(true);
  }

  const handleUpdateOrderDetail = async () => {
    await updateOrderDetail(dispatch, ordered);
    navigation.goBack();
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
          <List data={ordered} onChangeText={handleInputDescription} propsRemove={handleRemoveFood} />
        </View>
      }

      <View style={styles.buttonBottom}>
        <Button icon='plus' style={styles.button} mode="contained" onPress={handleGoToListFood}>
          {BUTTON.AddFood}
        </Button>
        {isUpdate && <Button icon='arrow-right-bold' style={styles.button} mode="contained"
          onPress={handleUpdateOrderDetail} contentStyle={{ flexDirection: 'row-reverse' }}>
          {BUTTON.MoveCook}
        </Button>}
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
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
})