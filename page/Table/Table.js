import { useContext, useEffect, useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, StyleSheet, Text, View } from "react-native";
import { OPTION_TABLE, CMS } from '../../config/config'
import { useDispatch, useSelector } from "react-redux";
import { TableContext } from "../../context/TableContext";
import { Divider } from 'react-native-paper';
import Header from "../../common/Header";
import Filter from "../../common/Filter";
import List from "./List";
import { getAllTable } from "../../redux/api/tableApi";
import ModalComp from "./ModalComp";
import { getAllFood } from "../../redux/api/foodApi";
import { FoodContext } from '../../context/FoodContext';
import { getOrderById } from "../../redux/api/orderApi";
import LeftDrawer from "../../component/LeftDrawer";

const Table = ({ navigation }) => {
  const drawer = useRef(null);
  const userSelector = useSelector(state => state.auth);
  const { setTable, getData } = useContext(TableContext);
  const { setFoodWaitContext } = useContext(FoodContext);
  const numTable = useRef();
  const dispatch = useDispatch();

  const [filterData, setFilterData] = useState(-1);
  const [modalVisible, setModalVisible] = useState(-1);
  const [orderId, setOrderId] = useState("");

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
        getAllFood(dispatch, userSelector?.data.accessToken);
        navigation.navigate('ListFood', { numTable: numTable.current, idOrdered: orderId });
        break;
      case 1:
        getOrderById(dispatch, orderId, userSelector?.data.accessToken);
        navigation.navigate('TableMerge', { idOrder: orderId });
        break;
      case 2:
        getOrderById(dispatch, orderId, userSelector?.data.accessToken);
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
  const handleCloseDrawer = () => {
    drawer.current.closeDrawer();
  }

  const renderDrawer = () => {
    return <LeftDrawer closeDrawer={handleCloseDrawer} />
  }

  // Fetch Data
  useEffect(() => {
    const param = {
      employee: '641f0f17fc13ae30f60014d3'
    }
    getAllTable(dispatch, param, userSelector?.data.accessToken);
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
});

export default Table;