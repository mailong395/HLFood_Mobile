import { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CMS } from '../../config/config';
import { useSelector } from "react-redux";
import { FoodContext } from '../../context/FoodContext';
import { ActivityIndicator, Button, MD2Colors, Searchbar } from "react-native-paper";
import Header from "../../common/Header";
import List from "./List";
import Dialog from "../../component/DialogComp";
import { addFood } from "../../common/common";

export default function ListFood({ route, navigation }) {
  const { numTable, idOrdered } = route.params;
  const { foodOrdered, setFoodOrdered, foodWaitContext } = useContext(FoodContext);
  const temp = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShowDialog, setIsShowDialog] = useState(false);
  const selector = useSelector(state => state.food);
  const count = useRef(0);

  // Handler 
  const onChangeSearch = query => setSearchQuery(query);

  const handleMoveToListFoodOrder = () => {
    navigation.navigate('ListFoodOrder', { numTable: numTable, idOrdered: idOrdered });
  }

  const handleGoBack = () => {
    setFoodOrdered([]);
    navigation.goBack();
  }

  const handleShowDialog = (data) => {
    const index = foodWaitContext.findIndex(tempFood => {
      return tempFood.food._id === data.food._id;
    })
    if (index !== -1 && data.quantity === 0) {
      setIsShowDialog(true);
      temp.current = data;
      return true;
    }
    return false;
  }

  const handleCloseDialog = () => {
    setIsShowDialog(false);
  }

  const handleAddFood = (data) => {
    const isAdd = handleShowDialog(data);
    if (!isAdd) {
      const newData = addFood(foodOrdered, data.food._id);
      setFoodOrdered(newData);
      count.current++;
    }
  }

  const addFoodInDialog = () => {
    const newData = addFood(foodOrdered, temp.current.food._id);
    setFoodOrdered(newData);
    count.current++;
    setIsShowDialog(false);
  }

  const handleRemoveFood = (data) => {
    if (data.quantity > 0) {
      const newArray = foodOrdered.map((newFood, index) => {
        newFood.food._id === data.food._id && (indexRemove = index);
        return newFood.food._id === data.food._id && {
          ...newFood,
          description: newFood.quantity === 1 ? '' : newFood.quantity,
          quantity: newFood.quantity - 1
        }
      });
      setFoodOrdered(newArray);
      count.current--;
    }
  };

  const handleInputDescription = (id, value) => {
    const newData =foodOrdered.map((item) => {
      if (item.food._id === id) {
        return {
          ...item,
          description: value,
        }
      }
      return item
    })
    setFoodOrdered(newData);
  }

  // Fetch data
  useEffect(() => {
    const newData = selector?.data.map(tempFood => {
      return {
        food: tempFood,
        quantity: 0,
        description: '',
      }
    })
    const filter = newData.filter(item => {
      return item.food.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFoodOrdered([...filter]);
  }, [searchQuery])


  return (
    <View style={styles.container}>
      <Header
        isShowButtonGoBack={true}
        props={handleGoBack}
        title={"Danh sách món ăn - Bàn " + numTable}
        mode="small"
      />

      {selector?.isFetching ?
        <View style={styles.loading}>
          <ActivityIndicator
            size={"small"}
            animating={true}
            color={MD2Colors.red800}
          />
        </View>
        : <>
          <View style={styles.boxSearch}>
            <Searchbar
              placeholder={CMS.search}
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
          </View>

          <View style={styles.boxContain}>
            <List data={foodOrdered}
              propsAdd={handleAddFood}
              propsRemove={handleRemoveFood}
              onchangeText={handleInputDescription}
            />
          </View>

          {
            count.current > 0 &&
            <View style={styles.boxButtonBottom}>
              <Button icon="plus" mode="contained" onPress={handleMoveToListFoodOrder}>
                Thêm món
              </Button>
            </View>
          }
        </>
      }

      <Dialog
        title="Món Đã Tồn Tại"
        content="Bạn có đồng ý thêm không?"
        visibleDefault={isShowDialog}
        propsClose={handleCloseDialog}
        propsAddFood={addFoodInDialog}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignContent: 'center',
  },
  boxSearch: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  boxFilter: {
    paddingBottom: 8,
  },
  boxContain: {
    flex: 1,
  },
  boxButtonBottom: {
    padding: 16,
  }
});