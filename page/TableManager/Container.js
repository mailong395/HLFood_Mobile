import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../../common/Header';
import { BUTTON, HEADER_TITLE } from '../../config/lang_vn';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, Button, MD2Colors } from 'react-native-paper';
import { TableContext } from '../../context/TableContext';
import { mergeTable, setEmpTable } from '../../redux/api/tableApi';
import List from './List';
import Filter from './filter';
import { useContext } from 'react';
import { createAxios } from '../../redux/createInstance';
import { loginSuccess } from '../../redux/slice/authSlice';
import { getAllTableSuccess } from '../../redux/slice/tableSlice';
import { getAllEmployeeSuccess } from '../../redux/slice/employeeSlice';
import { CMS } from '../../config/config';

const Container = ({ navigation, emp }) => {
  const employees = useSelector((state) => state?.employee?.data);
  const tables = useSelector((state) => state.table?.data);
  const selectorOrder = useSelector((state) => state.order);
  const { table, tableMerge, setTableMerge, setGetData, getData } = useContext(TableContext);

  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [floors, setFloors] = React.useState([]);
  const [order, setOrder] = React.useState();
  const userSelector = useSelector((state) => state.auth);
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  const accessToken = userSelector?.data.accessToken;

  const handlePlus = () => {
    navigation.navigate('AddTable', {data: {is_edit: false}});
  }

  const update = (tablesSelected) => {
    const numTables = tablesSelected?.map((table) => table?.table_num);

    const dataApiSent = {
      tables: numTables.join(','),
      empId: emp._id,
    };

    addTableEmpLocal(tablesSelected);

    setEmpTable(dispatch, dataApiSent, accessToken, axiosJWT);
    setTableMerge([]);
    navigation.popToTop();
  };

  const addTableEmpLocal = (tableSelected) => {
    const newTables = tables?.map((table) => {
      let newTable = table;
      const isEqualNumTable = tableSelected.some((item) => item.table_num === table?.table_num);

      if (emp._id === table?.employee?._id) {
        newTable = {
          ...table,
          employee: undefined,
        };
      }

      if (isEqualNumTable) {
        return {
          ...newTable,
          employee: emp,
        };
      }
      return newTable;
    });

    const newEmployees = employees?.map((employee) => {
      if (employee._id === emp._id) {
        return {
          ...employee,
          tables: tableSelected,
        };
      }
      return employee;
    });

    dispatch(getAllTableSuccess(newTables));
    dispatch(getAllEmployeeSuccess(newEmployees));
  };

  const getListFloors = (dataFilter = 0) => {
    const newArray = [

    ];
    tables?.forEach((element) => {
      const index = newArray.findIndex((item) => item.key === element.floor);
      if (index === -1) {
        newArray.push({
          key: element.floor,
          label: 'Tầng ' + element.floor,
          tables: [element],
        });
      } else {
        newArray[index].tables.push(element);
      }
    });
    if (dataFilter > 0) {
      newArray.forEach((element) => {
        if (element.key !== dataFilter) {
          delete element.tables;
        }
      });
    }
    setFloors(newArray.sort((a, b) => a.key - b.key));
  };

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };

  React.useEffect(() => {
    setLoading(tables?.loading);
    getListFloors(1);
  }, [tables]);

  React.useEffect(() => {
    setLoading(selectorOrder?.isFetching);
    setOrder(selectorOrder?.data);
  }, [selectorOrder]);

  return loading ? (
    <View style={styles.containerLoading}>
      <ActivityIndicator animating={true} size="small" color={MD2Colors.red800} />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <Header
        isShowDrawer={true}
        title={CMS.table}
        mode="center-aligned"
        openDrawer={handleOpenDrawer}
        isPlus={true}
        handlePlus={handlePlus}
      />

      <Filter floors={floors} onPress={getListFloors} />

      <View style={{ flex: 1 }}>
        <List data={floors} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  ButtonBottom: {
    flexDirection: 'row',
    padding: 8,
  },
  button: {
    flex: 1,
    margin: 8,
  },
});
