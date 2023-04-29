import { useContext, useEffect, useRef, useState } from 'react';
import { Button, DrawerLayoutAndroid, StyleSheet, Text, View } from 'react-native';
import { OPTION_TABLE, CMS } from '../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { TableContext } from '../../context/TableContext';
import { ActivityIndicator, Divider, MD2Colors } from 'react-native-paper';
import Header from '../../common/Header';
import Filter from '../../common/Filter';
import List from './List';
import { getAllTable } from '../../redux/api/tableApi';
import ModalComp from './ModalComp';
import { getAllFood } from '../../redux/api/foodApi';
import { FoodContext } from '../../context/FoodContext';
import { getOrderById } from '../../redux/api/orderApi';
import LeftDrawer from '../../component/LeftDrawer';
import { createAxios } from '../../redux/createInstance';
import { loginSuccess } from '../../redux/slice/authSlice';
import React from 'react';
import { deleteEmployee, getAllEmplyee } from '../../redux/api/employeeApi';
import DialogComp from '../../component/DialogComp';
import { getAllEmployeeSuccess } from '../../redux/slice/employeeSlice';

function EmployeeManager({ navigation }) {
  const userSelector = useSelector((state) => state.auth);
  const employeesApiData = useSelector((state) => state?.employee?.data);
  const accessToken = userSelector?.data?.accessToken;

  const drawer = useRef(null);
  const numTable = useRef();

  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  const { setFoodWaitContext } = useContext(FoodContext);
  const [filterData, setFilterData] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [emp, setEmp] = useState({});
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [empSelected, setEmpSelected] = useState({});
  const [isShowConfirmDelete, setIsShowConfirmDelete] = useState(false);

  // Handle
  const handleFilter = (idFilter = -1) => {
    setFilterData(idFilter);
  };

  const handleOpenDrawer = ({ navigation }) => {
    drawer.current.openDrawer();
  };
  const handleCloseDrawer = () => {
    drawer.current.closeDrawer();
  };

  const renderDrawer = () => {
    return <LeftDrawer closeDrawer={handleCloseDrawer} />;
  };

  const handleShowModal = (item) => {
    // item.job_title > 1 ? setOrderId(item.order) : setOrderId('');
    setModalVisible(true);
    // setTable(item);
    setEmpSelected(item);
    // numTable.current = item.job_title;
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleMovePage = async (id) => {
    switch (id) {
      case 0:
        navigation.navigate('AddEmp', { emp: empSelected });
        break;
      case 1:
        setIsShowConfirmDelete(true);
        break;
      case 2:
        navigation.navigate('AssignEmp', { emp: empSelected });
        break;
      default:
        break;
    }
    handleCloseModal();
  };

  const handleConfirmDeleteEmp = (emp) => {
    deleteEmpLocal(emp);
    deleteEmployee(dispatch, emp._id, accessToken, axiosJWT);
    setIsShowConfirmDelete(false);
  };

  const deleteEmpLocal = (emp) => {
    const newEmp = employees.filter((employee) => employee._id !== emp._id);
    dispatch(getAllEmployeeSuccess(newEmp));
  };

  const handlePlus = () => {
    navigation.navigate('AddEmp', {});
  };

  useEffect(() => {
    setEmployees(employeesApiData);
  }, [employeesApiData]);

  useEffect(() => {
    if (userSelector?.data) {
      getAllEmplyee(dispatch, accessToken, axiosJWT);
      getAllTable(dispatch, {}, accessToken, axiosJWT);
    }
  }, []);

  return (
    <DrawerLayoutAndroid ref={drawer} drawerWidth={300} drawerPosition={'left'} renderNavigationView={renderDrawer}>
      <View style={styles.container}>
        <Header
          isShowDrawer={true}
          title={CMS.logo}
          mode="center-aligned"
          openDrawer={handleOpenDrawer}
          isPlus={true}
          handlePlus={handlePlus}
        />

        <View style={styles.tableList}>
          <List
            data={employees}
            filterData={filterData}
            props={handleShowModal}
            isShowModal={modalVisible}
            color={'#343434'}
          />
        </View>

        <ModalComp
          isShow={modalVisible}
          empSelected={empSelected}
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
          content="Bạn có chắc chắn xoá nhân viên này không ?"
          visibleDefault={isShowConfirmDelete}
          propsAddFood={() => handleConfirmDeleteEmp(empSelected)}
          propsClose={() => setIsShowConfirmDelete(false)}
        />
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
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

export default EmployeeManager;
