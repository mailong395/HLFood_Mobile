import { StyleSheet, View } from "react-native"
// import ItemFood from "../../component/ItemFood";
import { formatCurrency } from "react-native-format-currency";
import { TableContext } from "../../context/TableContext";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/api/tableApi";
import { FoodContext } from "../../context/FoodContext";
import { Text, Button, Divider } from "react-native-paper";
import { CMS } from "../../config/config";
import { saveOrder, saveOrderDetails } from "../../redux/api/orderApi";
import Header from "../../common/Header";
import List from "./List";
import { priceTotal } from "../../common/common";

const employee = {
  _id: '63fb7060fc13ae34f3000492',
};

const ListFoodOrder = ({ route, navigation }) => {
  const { numTable, idOrdered } = route.params;
  const dispatch = useDispatch();

  const { table, getData, setGetData } = useContext(TableContext);
  const { foodOrdered, setFoodOrdered } = useContext(FoodContext);
  console.log('foodOrdered', foodOrdered);

  // Handle
  const handleAddFood = (value) => {
    const newData = foodOrdered.map(tempFood => {
      return tempFood.food._id === value.food._id ?
        {
          ...value,
          quantity: value.quantity + 1,
        }
        : tempFood;
    });
    setFoodOrdered(newData);
  }

  const handleRemoveFood = (value) => {
    const newData = [...foodOrdered];
    const index = newData.findIndex(order => order.food._id === value.food._id);

    newData[index].quantity--;
    if (newData[index].quantity === 0) {
      newData.splice(index, 1);
    }

    !newData.length ? setFoodOrdered([]) : setFoodOrdered(newData);
  }


  const handlerAddMoreFood = () => {
    navigation.navigate('ListFood', { numTable: numTable, idOrdered: idOrdered });
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

  const handleGoBack = () => {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Header
        isShowButtonGoBack={true}
        props={handleGoBack}
        title={"Các món đã chọn - Bàn " + numTable}
        mode="small"
      />

      <View style={styles.listFood}>
        <List
          data={foodOrdered}
          addFood={handleAddFood}
          removeFood={handleRemoveFood}
        />
        <Divider />
        <Text variant="titleLarge" style={styles.total}>Tổng tiền: {
          formatCurrency({ amount: priceTotal(foodOrdered), code: "VND" })[0]
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