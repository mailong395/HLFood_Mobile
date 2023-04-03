import { BackHandler, FlatList, StyleSheet, View } from "react-native"
import ItemFood from "../component/ItemFood";
import { formatCurrency } from "react-native-format-currency";
import { TableContext } from "../context/TableContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTable } from "../redux/api/tableApi";
import { FoodContext } from "../context/FoodContext";
import { Text, Appbar, Button, MD2Colors, useTheme, Divider } from "react-native-paper";
import { CMS } from "../config/config";
import { getOrderById, saveOrder, saveOrderDetails } from "../redux/api/orderApi";

const employee = {
  _id: '63fb7060fc13ae34f3000492',
};

const ListFoodOrder = ({ route, navigation }) => {
  const { numTable, _idOrder } = route.params;
  const theme = useTheme();
  const dispatch = useDispatch();

  const { table, getData, setGetData } = useContext(TableContext);
  const { foodOrdered, setFoodOrdered, foodWait } = useContext(FoodContext);

  const [total, setTotal] = useState(0);
  const [listFood, setListFood] = useState([]);
  const orders = useRef(listFood);

  // Handle
  const handlerAddMoreFood = () => {
    if (_idOrder === "") {
      setFoodOrdered([...orders.current]);
    }
    _idOrder === "" ? navigation.goBack() : navigation.navigate('ListFood', { numTable: numTable, _idOrder: _idOrder });
  }

  const handlerProcess = async () => {
    const dateNow = new Date();
    const listTable = [numTable];
    const orderDetails = [];
    const order = _idOrder !== "" ? _idOrder : await saveOrder(dispatch, employee._id, listTable.join(","), dateNow)

    foodOrdered.map(element => {
      const newData = {
        quantity: element.quantity,
        food: element.food._id,
        order: order,
      };
      orderDetails.push(newData);
    });
    saveOrderDetails(dispatch, orderDetails);
    updateTable(dispatch, table._id, 2);
    setGetData(!getData);
    setFoodOrdered([]);

    navigation.popToTop();
  }

  // Render
  const renderListFood = ({ item }) => {

    const handlerAddFood = () => {
      const newData = orders.current.map(order => {
        const newOrder = {
          ...order,
          quantity: order.quantity + 1
        }
        return newOrder;
      });
      orders.current = newData;
      calculatorTotal();
    }

    const handlerRemoveFood = () => {
      const index = orders.current.findIndex((order => order.food._id == item.food._id));
      if (index > -1) {
        orders.current[index].quantity > 1 ?
          orders.current[index].quantity--
          : (
            orders.current.splice(index, 1),
            setFoodOrdered([...orders.current])
          );
      }
      calculatorTotal();
    }

    return <ItemFood
      item={item.food}
      countDefault={item.quantity}
      handlerAddFood={handlerAddFood}
      handlerRemoveFood={handlerRemoveFood}
    />
  }

  const calculatorTotal = () => {
    const initTotal = 0;
    const total = orders.current.reduce(
      (accumulator, currentValue) => accumulator + (currentValue.quantity * currentValue.food.price),
      initTotal,
    )
    setTotal(total);
  }

  // fetch Data
  const fetchListFood = async () => {
    if (_idOrder === "") {
      orders.current = foodOrdered
      setListFood(foodOrdered)
      calculatorTotal()
    } else {
      orders.current = foodWait?.order_details
      setListFood(foodWait?.order_details)
      calculatorTotal()
    }
  }

  const handleGoBack = () => {
    if (_idOrder !== "") {
      setFoodOrdered([]);
    }
    navigation.goBack();
  }

  useEffect(() => {
    const backAction = () => {
      handleGoBack();
      return true;
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [])

  useEffect(() => {
    fetchListFood();
  }, [])

  return (
    <View style={styles.container}>
      <Appbar.Header mode="small" style={{ backgroundColor: theme.colors.primaryContainer }}>
        <Appbar.BackAction onPress={() => handleGoBack()} />
        <Appbar.Content title={"Các món đã chọn - Bàn " + numTable} />
      </Appbar.Header>
      {
        _idOrder !== "" && (
          <View style={styles.listFood}>
            <Text variant="bodyLarge">Danh sách món đang chế biến</Text>
            <FlatList
              data={orders.current}
              renderItem={renderListFood}
            />
            <Divider />
            <Text variant="titleLarge" style={styles.total}>Tổng tiền: {
              formatCurrency({ amount: total, code: "VND" })[0]
            }</Text>
            <Divider />
          </View>
        )
      }
      {
        foodOrdered.length > 0 && (
          <View style={styles.listFood}>
            <Text variant="bodyLarge">Danh sách món chưa chế biến</Text>
            <FlatList
              data={foodOrdered}
              renderItem={renderListFood}
            />
          </View>
        )
      }
      <View style={styles.listButton}>
        <Button style={styles.button} icon='plus' mode="contained" onPress={() => handlerAddMoreFood()}>
          {CMS.add}
        </Button>
        {
          foodOrdered.length > 0 &&
          <Button style={styles.button} mode="contained" onPress={() => handlerProcess()}>
            {CMS.cook}
          </Button>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  listFood: {
    flex: 1,
    padding: 8,
    backgroundColor: 'white',
  },
  timeBooking: {
    marginHorizontal: 8,
  },
  total: {
    marginVertical: 16,
    textAlign: 'right',
  },
  listButton: {
    width: "100%",
    flexDirection: 'row',
    paddingBottom: 10,
  },
  button: {
    flex: 1,
    margin: 8,
  }
});

export default ListFoodOrder;