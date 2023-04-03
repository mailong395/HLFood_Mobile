import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { BackHandler, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import FlatListCustom from "../component/FlatListCustom";
import { CMS, OPTION_FOOD } from '../config/config';
import ItemFood from "../component/ItemFood";
import { useSelector } from "react-redux";
import { FoodContext } from '../context/FoodContext';
import { Appbar, Button, Chip, Dialog, Portal, Searchbar, useTheme } from "react-native-paper";

export default function ListFood({ route, navigation }) {
  const { numTable, _idOrder } = route.params;
  // Using Redux to get data
  const data = useSelector(state => state.food);
  const { foodOrdered, setFoodOrdered, foodWait } = useContext(FoodContext);

  // Use State to update UI
  const [selectedKOF, setSelectedKOF] = useState(-1);
  const [foods, setFoods] = useState(data?.data);
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);

  const theme = useTheme();
  const order = useRef([...foodOrdered]);
  const onChangeSearch = query => setSearchQuery(query);

  // Filter Data
  const filterData = useMemo(() => {
    return foods?.filter(item => {
      return item?.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
  })

  // Render
  const renderKindOfFood = ({ item }) => {
    const mode = item._id === selectedKOF ? 'flat' : 'outlined';
    const selected = item._id === selectedKOF;

    const handleChangeButton = () => {
      if (item._id === -1) {
        setFoods(data?.data);
      } else {
        const newData = data?.data.filter(type => type?.type === item._id);
        setFoods(newData);
      }
      setSelectedKOF(item._id);
    }

    return (
      <Chip
        mode={mode}
        selected={selected}
        onPress={() => handleChangeButton()}
        style={{ margin: 8 }}
      >
        {item.title}
      </Chip>
    );
  };

  const renderFoods = ({ item }) => {
    const food = order.current.find((order => order.food._id == item._id))
    const countDefault = food ? food.quantity : 0;
    
    const handlerAddFood = () => {
      // if (foodWait.length === 0) {
      addFood();
      // } else {
      //   const isShowDialog = foodWait?.order_details.find(order => order.food._id === item._id)
      //   const isAdd = order.current.find(order => order.food._id === item._id);
      //   console.log(isAdd);
      //   if (isShowDialog && isAdd === undefined) {
      //     showDialog();
      //   }
      // }
    }

    const addFood = () => {
      if (order.current.length === 0) {
        const newOrder = {
          food: item,
          quantity: 1
        }
        order.current.push(newOrder);
        setFoodOrdered(order.current)
      } else {
        const index = order.current.findIndex((order => order.food._id == item._id));
        if (index === -1) {
          const newOrder = {
            food: item,
            quantity: 1
          }
          order.current.push(newOrder);
        } else {
          order.current[index].quantity++;
        }
      }
    }

    const handlerRemoveFood = () => {
      const index = order.current.findIndex((order => order.food._id == item._id));
      if (index > -1) {
        order.current[index].quantity > 1 ? order.current[index].quantity-- : order.current.splice(index, 1);
      }
      order.current.length === 0 && setFoodOrdered([]);
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

  // Handler 
  const handleMoveToListFoodOrder = () => {
    setFoodOrdered(order.current);
    navigation.navigate('ListFoodOrder', { numTable: numTable, _idOrder: _idOrder });
  }

  const handleGoBack = () => {
    setFoodOrdered([]);
    navigation.goBack();
  }

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

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


  return (
    <View style={styles.container}>
      <Appbar.Header mode="small" style={{ backgroundColor: theme.colors.primaryContainer }}>
        <Appbar.BackAction onPress={() => handleGoBack()} />
        <Appbar.Content title={"Danh sách món ăn - Bàn " + numTable} />
      </Appbar.Header>

      <View style={styles.boxSearch}>
        <Searchbar
          placeholder={CMS.search}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <View style={styles.boxFilter}>
        <FlatListCustom
          DATA={OPTION_FOOD}
          renderItem={renderKindOfFood}
          horizontal={true}
        />
      </View>

      <View style={styles.boxContain}>
        {data?.isFetching ?
          <Text>Loading...</Text> :
          <FlatList
            data={filterData}
            renderItem={renderFoods}
            initialNumToRender={6}
            keyExtractor={item => item._id}
            extraData={selectedKOF}
          />}
      </View>
      {foodOrdered.length > 0 && <View style={styles.boxButtonBottom}>
        <Button icon="plus" mode="contained" onPress={() => handleMoveToListFoodOrder()}>
          Thêm món
        </Button>
      </View>}

      {/* <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Thông báo</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Món ăn này đã được chọn.</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button textColor="red" onPress={() => console.log('Cancel')}>Hủy bỏ</Button>
            <Button textColor="susses" onPress={() => console.log('Ok')}>Thêm mới</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  texting: {
    paddingVertical: 10,
    paddingHorizontal: 20,

  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',

    height: 48,
  },
  titleButton: {
    fontSize: 16,
    fontWeight: '500',
    color: "white",
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