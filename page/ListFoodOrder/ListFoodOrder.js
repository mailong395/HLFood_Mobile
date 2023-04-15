import { BackHandler, FlatList, StyleSheet, View } from "react-native"
// import ItemFood from "../../component/ItemFood";
import { formatCurrency } from "react-native-format-currency";
import { TableContext } from "../../context/TableContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTable } from "../../redux/api/tableApi";
import { FoodContext } from "../../context/FoodContext";
import { Text, Appbar, Button, MD2Colors, useTheme, Divider } from "react-native-paper";
import { CMS } from "../../config/config";
import { getOrderById, saveOrder, saveOrderDetails } from "../../redux/api/orderApi";
import Header from "../../common/Header";
import List from "./List";

const employee = {
  _id: '63fb7060fc13ae34f3000492',
};

const ListFoodOrder = ({ route, navigation }) => {
  const { numTable, idOrdered } = route.params;
  const dispatch = useDispatch();

  const { table, getData, setGetData } = useContext(TableContext);
  const { foodOrdered, setFoodOrdered } = useContext(FoodContext);

  const [total, setTotal] = useState(0);
  // const [listFood, setListFood] = useState([]);
  

  // Handle
  const handleAddFood = (id) => {
    const newData = foodOrdered.map(
      order => order.food._id === id ?
        { ...order, quantity: order.quantity + 1 }
        : order
    );
    setFoodOrdered(newData);
  }

  const handleRemoveFood = (id) => {
    const newData = [...foodOrdered];
    const index = newData.findIndex(order => order.food._id === id);

    newData[index].quantity--;
    if (newData[index].quantity === 0) {
      newData.splice(index, 1);
    }

    !newData.length ? setFoodOrdered([]) : setFoodOrdered(newData);
  }


  const handlerAddMoreFood = () => {
    navigation.navigate('ListFood', { numTable: numTable, _idOrder: _idOrder });
  }

  const handlerProcess = async () => {
    const dateNow = new Date();
    const listTable = [numTable];
    const orderDetails = [];
    const order = idOrdered ? idOrdered : await saveOrder(dispatch, employee._id, listTable.join(","), dateNow);

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

  const calculatorTotal = (list = []) => {
    const initTotal = 0;
    const total = list.reduce(
      (accumulator, currentValue) => accumulator + (currentValue.quantity * currentValue.food.price),
      initTotal,
    )
    setTotal(total);
  }

  const handleGoBack = () => {
    if (_idOrder !== "") {
      setFoodOrdered([]);
    }
    navigation.goBack();
  }

  // Fetch Data
  useEffect(() => {
    console.log('foodOrdered', foodOrdered);
    calculatorTotal(foodOrdered);
  }, [foodOrdered]);

  return (
    <View style={styles.container}>
      <Header
        isShowButtonGoBack={true}
        props={handleGoBack}
        title={"Các món đã chọn - Bàn " + numTable}
        mode="small"
      />

      <View style={styles.listFood}>
        <Text variant="bodyLarge">Danh sách món đang chế biến</Text>
        <List
          data={foodOrdered}
          addFood={handleAddFood}
          removeFood={handleRemoveFood}
        />
        <Divider />
        <Text variant="titleLarge" style={styles.total}>Tổng tiền: {
          formatCurrency({ amount: total, code: "VND" })[0]
        }</Text>
        <Divider />
      </View>

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