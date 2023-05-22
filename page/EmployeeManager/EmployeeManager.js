import { useContext, useEffect, useRef, useState } from 'react';
import { Button, DrawerLayoutAndroid, StyleSheet, Text, View } from 'react-native';
import { OPTION_TABLE, CMS } from '../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { TableContext } from '../../context/TableContext';
import { ActivityIndicator, Divider, MD2Colors, Searchbar } from 'react-native-paper';
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

  const numTable = useRef();

  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  const [filterData, setFilterData] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [emp, setEmp] = useState({});
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [empSelected, setEmpSelected] = useState({});
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
    const newEmp = employeesApiData.filter((employee) => employee._id !== emp._id);
    dispatch(getAllEmployeeSuccess(newEmp));
  };

  const handlePlus = () => {
    navigation.navigate('AddEmp', {});
  };

  const addStringJobTitle = (position) => {
    switch (position) {
      case 0:
        return 'Quản lý';
      case 1:
        return 'Quản lý';
      case 2:
        return 'Thu Ngân';
      case 3:
        return 'Phục vụ';
      case 4:
        return 'Đầu bếp';
      default:
        break;
    }
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

  useEffect(() => {
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'gi');

      const searchResults = employeesApiData.filter((emp) => {
        const newEmp = { ...emp, typeString: addStringJobTitle(emp.job_title) };
        return Object.values(newEmp).some((value) => regex.test(value.toString()));
      });
      if (searchResults.length > 0) {
        setEmployees(
          searchResults.map((emp) => {
            let newEmp = emp;
            delete newEmp.typeString;
            return newEmp;
          }),
        );
      }
    } else setEmployees(employeesApiData);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Header
        isShowDrawer={true}
        title={CMS.emp}
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
  boxSearch: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tableList: {
    flex: 1,
  }
});

export default EmployeeManager;
