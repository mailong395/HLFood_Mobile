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
import { getAllFoodSuccess } from "../../redux/slice/foodSlice";

export default function Container({ route, navigation }) {
  const { numTable, idOrdered } = route.params;
  const { foodOrdered, setFoodOrdered, foodWaitContext } = useContext(FoodContext);
  const temp = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isShowDialog, setIsShowDialog] = useState(false);
  const selector = useSelector(state => state.food);
  const count = useRef(0);

  console.log('count', count);

  // Handler 
  const onChangeSearch = query => setSearchQuery(query);

  const handleMoveToListFoodOrder = () => {
    navigation.navigate('ListFoodOrder', { numTable: numTable, idOrdered: idOrdered, countFood: count.current });
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
      temp.current = index;
      return true;
    }
    return false;
  }

  const handleCloseDialog = () => {
    setIsShowDialog(false);
  }

  const handleAddFood = (data, index) => {
    const isAdd = handleShowDialog(data);
    if (!isAdd) {
      foodOrdered[index].quantity++;
      setFoodOrdered([...foodOrdered]);
      count.current++;
    }
  }

  const addFoodInDialog = () => {
    // const newData = addFood(foodOrdered, temp.current.food._id);
    foodOrdered[index].count++;
    setFoodOrdered([...foodOrdered]);
    count.current++;
    setIsShowDialog(false);
  }

  const handleRemoveFood = (data, index) => {
    if (data.quantity > 0) {
      foodOrdered[index].quantity--;
      foodOrdered[index].quantity === 0 && (foodOrdered[index].description = '');
      setFoodOrdered([...foodOrdered]);
      count.current--;
    }
  };

  const handleInputDescription = (id, value) => {
    const newData = foodOrdered.map((item) => {
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
      return item?.food?.name.toLowerCase().includes(searchQuery.toLowerCase());
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