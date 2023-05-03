import { useContext, useEffect, useRef, useState } from 'react';
import { Button, DrawerLayoutAndroid, StyleSheet, Text, View } from 'react-native';
import { OPTION_TABLE, CMS } from '../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, Divider, MD2Colors, Searchbar } from 'react-native-paper';
import Header from '../../common/Header';
import List from './List';
import ModalComp from './ModalComp';
import { deleteFood, getAllFood } from '../../redux/api/foodApi';
import { createAxios } from '../../redux/createInstance';
import { loginSuccess } from '../../redux/slice/authSlice';
import React from 'react';
import DialogComp from '../../component/DialogComp';
import { getAllFoodSuccess } from '../../redux/slice/foodSlice';

function FoodManager({ navigation }) {
  const userSelector = useSelector((state) => state.auth);
  const foodsApiData = useSelector((state) => state?.food?.data);

  const accessToken = userSelector?.data?.accessToken;

  const drawer = useRef(null);

  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  const [filterData, setFilterData] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [isShowConfirmDelete, setIsShowConfirmDelete] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle
  const handleFilter = (idFilter = -1) => {
    setFilterData(idFilter);
  };

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };

  const handleShowModal = (item) => {
    // item.job_title > 1 ? setOrderId(item.order) : setOrderId('');
    setModalVisible(true);
    // setTable(item);
    setItemSelected(item);
    // numTable.current = item.job_title;
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleMovePage = async (id) => {
    switch (id) {
      case 0:
        navigation.navigate('AddFood', { food: itemSelected });
        break;
      case 1:
        setIsShowConfirmDelete(true);
        break;
      default:
        break;
    }
    handleCloseModal();
  };

  const handleConfirmDeleteEmp = (food) => {
    deleteFoodLocal(food);
    deleteFood(dispatch, food._id, accessToken, axiosJWT);
    setIsShowConfirmDelete(false);
  };

  const deleteFoodLocal = (food) => {
    const newFood = foodsApiData.filter((item) => item._id !== food._id);
    dispatch(getAllFoodSuccess(newFood));
  };

  const handlePlus = () => {
    navigation.navigate('AddFood', {});
  };

  useEffect(() => {
    setFoods(foodsApiData);
  }, [foodsApiData]);

  useEffect(() => {
    if (userSelector?.data) {
      getAllFood(dispatch, accessToken, axiosJWT);
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'gi');

      const searchResults = foodsApiData.filter((food) => {
        const newFood = { ...food, typeString: food.type === 0 ? 'Thức ăn' : 'Thức uống' };

        return Object.values(newFood).some((value) => regex.test(value.toString()));
      });
      if (searchResults.length > 0) {
        setFoods(
          searchResults.map((food) => {
            let newFood = food;
            delete newFood.typeString;
            return newFood;
          }),
        );
      }
    } else setFoods(foodsApiData);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Header
          isShowDrawer={true}
          title={CMS.logo}
          mode="center-aligned"
          openDrawer={handleOpenDrawer}
          isPlus={true}
          handlePlus={handlePlus}
        />

        <View style={styles.boxSearch}>
          <Searchbar placeholder={CMS.search} onChangeText={onChangeSearch} value={searchQuery} />
        </View>

        <View style={styles.tableList}>
          <List
            data={foods}
            filterData={filterData}
            props={handleShowModal}
            isShowModal={modalVisible}
            color={'#343434'}
          />
        </View>

        <ModalComp
          isShow={modalVisible}
          itemSelected={itemSelected}
          handleCloseModal={handleCloseModal}
          navigation={navigation}
          props={handleMovePage}
        />

        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
          </View>
        )}

        <DialogComp
          content="Bạn có chắc chắn xoá món ăn này không ?"
          visibleDefault={isShowConfirmDelete}
          propsAddFood={() => handleConfirmDeleteEmp(itemSelected)}
          propsClose={() => setIsShowConfirmDelete(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  boxSearch: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listFood: {
    flex: 1,
    padding: 8,
  },
  buttonBottom: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default FoodManager;
