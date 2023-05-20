import { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CMS } from '../../config/config'
import { useDispatch, useSelector } from "react-redux";
import { TableContext } from "../../context/TableContext";
import { Divider } from 'react-native-paper';
import Header from "../../common/Header";
import List from "./List";
import { getAllTable, updateTable } from "../../redux/api/tableApi";
import ModalComp from "./ModalComp";
import { getAllFood } from "../../redux/api/foodApi";
import { FoodContext } from '../../context/FoodContext';
import { getOrderById } from "../../redux/api/orderApi";
import { createAxios } from "../../redux/createInstance";
import { loginSuccess } from "../../redux/slice/authSlice";
import React from "react";
import Filter from "./Filter";
import { getAllNotified } from "../../redux/api/notifiedApi";

const Table = ({ navigation }) => {
  const numTable = useRef();
  const userSelector = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  const { setTable, getData, setGetData } = useContext(TableContext);
  const { setFoodWaitContext } = useContext(FoodContext);
  const [modalVisible, setModalVisible] = useState(-1);
  const [orderId, setOrderId] = useState("");

  const handleShowModal = (item = {}) => {
    item.status > 1 ? setOrderId(item.order) : setOrderId("");
    setModalVisible(item.status);
    setTable(item);
    numTable.current = item.table_num;
  }

  const handleCloseModal = () => {
    setGetData(!getData);
    setModalVisible(-1);
  }

  const handleOpenNotified = async () => {
    navigation.navigate('Notified');
  }

  const handleMovePage = async (id) => {
    switch (id) {
      case 0:
        setFoodWaitContext([]);
        getAllFood(dispatch, userSelector?.data?.accessToken, axiosJWT);
        navigation.navigate('ListFood', { numTable: numTable.current, idOrdered: orderId });
        break;
      case 1:
        getOrderById(dispatch, orderId, userSelector?.data?.accessToken, axiosJWT);
        navigation.navigate('TableMerge', { idOrder: orderId });
        break;
      case 2:
        getOrderById(dispatch, orderId, userSelector?.data?.accessToken, axiosJWT);
        navigation.navigate('ListFoodOrdered', { numTable: numTable.current, idOrdered: orderId });
        break;
      case 3:
        getOrderById(dispatch, orderId, userSelector?.data?.accessToken, axiosJWT);
        navigation.navigate('DetailListFood');
        break;
      case 4:
        const res = await getOrderById(dispatch, orderId, userSelector?.data?.accessToken, axiosJWT);
        const isProcessing = res?.order_details?.filter(item => item?.quantity_finished < item?.quantity);
        if (isProcessing.length === 0) {
          res?.tables.forEach(async element => {
            await updateTable(dispatch, element._id, 4, userSelector?.data.accessToken, axiosJWT);
          });
        } else {
          res?.tables.forEach(async element => {
            await updateTable(dispatch, element._id, 2, userSelector?.data.accessToken, axiosJWT);
          });
        }
        setGetData(!getData);
        break;
      default:
        break;
    }
    handleCloseModal();
  }

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  }

  // Fetch Data
  const fetchData = async () => {
    const param = {};
    await getAllTable(dispatch, param, userSelector?.data?.accessToken, axiosJWT);
  }
  useEffect(() => {
    fetchData();
  }, [getData]);

  return (
    <View style={styles.container}>
      <Header
        isShowNotification
        isShowDrawer={true}
        title={CMS.logo}
        mode="center-aligned"
        openDrawer={handleOpenDrawer}
        openNotified={handleOpenNotified}
      />

      <Filter />

      <Divider />

      <List
        props={handleShowModal}
        isShowModal={modalVisible > -1}
      />

      <ModalComp
        isShow={modalVisible > -1}
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        navigation={navigation}
        props={handleMovePage}
      />
    </View>
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