import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'
import { useSelector } from 'react-redux';
import ItemFood from '../../component/ItemFood';
import { FoodContext } from '../../context/FoodContext';

const List = ({ dataSearch = '' }) => {
  const { foodOrdered, setFoodOrdered } = useContext(FoodContext);
  const selector = useSelector(state => state.food);
  const [foods, setFoods] = React.useState([]);

  // Render
  const renderItem = ({ item }) => {
    const food = foodOrdered.find((order => order.food._id == item._id))
    const countDefault = food ? food.quantity : 0;

    const handlerAddFood = () => {
      const newArray = [...foodOrdered];

      if (!foodOrdered.length) {
        const newObject = {
          food: item,
          quantity: 1,
        };
        newArray.push(newObject)
        setFoodOrdered(newArray);
      } else {
        const index = newArray.findIndex((order => order.food._id == item._id));
        if (index === -1) {
          const newObject = {
            food: item,
            quantity: 1
          }
          newArray.push(newObject);
          setFoodOrdered(newArray);
        } else {
          newArray[index].quantity++;
          setFoodOrdered(newArray);
        }
      }
    }

    const handlerRemoveFood = () => {
      const newArray = [...foodOrdered];
      const index = newArray.findIndex((order => order.food._id == item._id));
      if (index > -1) {
        newArray[index].quantity > 1 ? newArray[index].quantity-- : newArray.splice(index, 1);
      }
      newArray.length && setFoodOrdered([]);
    }

    return (
      <ItemFood
        item={item}
        handlerAddFood={handlerAddFood}
        handlerRemoveFood={handlerRemoveFood}
        countDefault={countDefault}
      />
    );
  }


  // Handle
  


  // Fetch data
  React.useEffect(() => {
    if (selector?.success) {
      setFoods(selector?.data);
    }
  }, [selector])


  React.useEffect(() => {
    const newData = selector?.data?.filter(item => {
      return item?.name.toLowerCase().includes(dataSearch.toLowerCase());
    })
    setFoods(newData);
  }, [dataSearch])


  return (
    selector?.isFetching ?
      <ActivityIndicator size={"large"} animating={true} color={MD2Colors.red800} />
      : <FlatList
        data={foods}
        renderItem={renderItem}
        initialNumToRender={6}
        style={styles.container}
      />
  )
}

export default List

const styles = StyleSheet.create({
  container: {
    padding: 8,
  }
})