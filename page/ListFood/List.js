import { FlatList, StyleSheet } from 'react-native'
import ItemFood from '../../component/ItemFood';

const List = ({ data, propsAdd, propsRemove, onchangeText }) => {

  const renderItem = ({ item, index }) => {

    const handleAddFood = () => {
      propsAdd(item, index);
    }

    const handleRemoveFood = () => {
      propsRemove(item, index);
    }

    const handleInputDescription = (value) => {
      onchangeText(item.food._id, value);
    }

    return (
      <ItemFood
        isEdit={true}
        name={item?.food?.name}
        image={item?.food?.image}
        price={item?.food?.price}
        quantity={item?.quantity}
        handleAddFood={handleAddFood}
        handleRemoveFood={handleRemoveFood}
        onchangeText={handleInputDescription}
        description={item?.description}
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