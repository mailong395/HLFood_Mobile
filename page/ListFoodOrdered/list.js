import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ItemFood from '../../component/ItemFood';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { getOrderById } from '../../redux/api/orderApi';

const List = ({ idOrdered }) => {
  const selector = useSelector(state => state.order);
  const [ordered, setOrdered] = React.useState([]);
  const dispatch = useDispatch();

  // render
  const renderItem = ({ item }) => {

    const handleAddFood = () => {

    }

    const handleRemoveFood = () => {

    }

    return <ItemFood
      item={item.food}
      countDefault={item.quantity}
      handlerAddFood={handleAddFood}
      handlerRemoveFood={handleRemoveFood}
    />
  }

  // Fetch Data
  React.useEffect(() => {
    if (selector?.data) {
      setOrdered(selector?.data.order_details);
    }
  }, [selector]);


  return (
    selector?.isFetching ?
      <ActivityIndicator size={"large"} animating={true} color={MD2Colors.red800} />
      :<FlatList
        data={ordered}
        renderItem={renderItem}
      />
  )
}

export default List
