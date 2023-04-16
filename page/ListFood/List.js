import { FlatList, StyleSheet } from 'react-native'
import ItemFood from '../../component/ItemFood';

const List = ({ data, propsAdd, propsRemove }) => {
  
  const renderItem = ({ item }) => {
    
    const handleAddFood = () => {
      propsAdd(item);
    }

    const handleRemoveFood = () => {
      propsRemove(item);
    }

    return (
      <ItemFood
        isEdit={true}
        name={item.food.name}
        image={item.food.image}
        price={item.food.price}
        quantity={item.quantity}
        handleAddFood={handleAddFood}
        handleRemoveFood={handleRemoveFood}
      />
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
    />
  )
}

export default List;