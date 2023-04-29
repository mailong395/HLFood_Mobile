import { useContext, useEffect, useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, StyleSheet, Text, View } from "react-native";
import { OPTION_TABLE, CMS } from '../../config/config'
import { useDispatch, useSelector } from "react-redux";
import { TableContext } from "../../context/TableContext";
import { ActivityIndicator, Divider, MD2Colors } from 'react-native-paper';
import Header from "../../common/Header";
import Filter from "../../common/Filter";
import List from "./List";
import { getAllTable } from "../../redux/api/tableApi";
import ModalComp from "./ModalComp";
import { getAllFood } from "../../redux/api/foodApi";
import { FoodContext } from '../../context/FoodContext';
import { getOrderById } from "../../redux/api/orderApi";
import LeftDrawer from "../../component/LeftDrawer";
import { createAxios } from "../../redux/createInstance";
import { loginSuccess } from "../../redux/slice/authSlice";
import React from "react";

const Table = ({ navigation }) => {
  const drawer = useRef(null);
  const numTable = useRef();
  const userSelector = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  const { setTable, getData } = useContext(TableContext);
  const { setFoodWaitContext } = useContext(FoodContext);
  const [filterData, setFilterData] = useState(-1);
  const [modalVisible, setModalVisible] = useState(-1);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const isLoading = useRef(false);

  // Handle 
  const handleFilter = (idFilter = -1) => {
    setFilterData(idFilter);
  }

  const handleShowModal = (item = {}) => {
    
    item.status > 1 ? setOrderId(item.order) : setOrderId("");
    setModalVisible(item.status);
    setTable(item);
    numTable.current = item.table_num;
  }

  const handleCloseModal = () => {
    setModalVisible(-1);
  }

  const handleMovePage = async (id) => {
    switch (id) {
      case 0:
        setFoodWaitContext([]);
        getAllFood(dispatch, userSelector?.data.accessToken, axiosJWT);
        navigation.navigate('ListFood', { numTable: numTable.current, idOrdered: orderId });
        break;
      case 1:
        getOrderById(dispatch, orderId, userSelector?.data.accessToken, axiosJWT);
        navigation.navigate('TableMerge', { idOrder: orderId });
        break;
      case 2:
        getOrderById(dispatch, orderId, userSelector?.data.accessToken, axiosJWT);
        navigation.navigate('ListFoodOrdered', { numTable: numTable.current, idOrdered: orderId });
        break;
      case 3:
        navigation.navigate('DetailListFood');
        break;
      default:
        break;
    }
    handleCloseModal();
  }

  const handleOpenDrawer = () => {
    drawer.current.openDrawer();
  }
  const renderDrawer = () => {
    return <LeftDrawer />
  }

  // Fetch Data
  useEffect(() => {
    const param = {};
    if (userSelector?.data.job_title > 1) {
      param.employee = userSelector?.data._id;
    }
    getAllTable(dispatch, param, userSelector?.data.accessToken, axiosJWT);
  }, [getData]);

  

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={renderDrawer}
    >
      <View style={styles.container}>
        <Header isShowDrawer={true} title={CMS.logo} mode="center-aligned" openDrawer={handleOpenDrawer} />

        <View>
          <Filter data={OPTION_TABLE} props={handleFilter} />
        </View>
        <Divider />

        <View style={styles.tableList}>
          <List
            filterData={filterData}
            props={handleShowModal}
            isShowModal={modalVisible > -1}
          />
        </View>

        <ModalComp
          isShow={modalVisible > -1}
          modalVisible={modalVisible}
          handleCloseModal={handleCloseModal}
          navigation={navigation}
          props={handleMovePage}
        />

        {loading && <View style={styles.loading}>
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </View>}
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  tableList: {
    flex: 1,
  },
  listBooked: {
    backgroundColor: "white",
  },
  loading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Table;