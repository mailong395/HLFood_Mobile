import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../common/Header'
import { BUTTON, HEADER_TITLE } from '../../config/lang_vn'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator, Button, MD2Colors } from 'react-native-paper'
import { TableContext } from "../../context/TableContext";
import { mergeTable } from "../../redux/api/tableApi";
import List from './List'
import Filter from './filter'
import { useContext } from 'react'
import { createAxios } from '../../redux/createInstance'
import { loginSuccess } from '../../redux/slice/authSlice'

const Container = ({ navigation, idOrder }) => {
  const selector = useSelector(state => state.tableMerge);
  const selectorOrder = useSelector(state => state.order);
  const { table, tableMerge, setTableMerge, setGetData, getData } = useContext(TableContext);
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [floors, setFloors] = React.useState([]);
  const [order, setOrder] = React.useState();
  const userSelector = useSelector(state => state.auth);
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

  const handleGoBack = () => {
    setTableMerge([]);
    navigation.goBack();
  }

  const handleMergeTable = () => {
    order.tables.forEach(element => tableMerge.push(element._id));
    update(tableMerge)
  }

  const handleMoveTable = () => {
    update(tableMerge)
  }

  const update = (data) => {
    const body = {
      table: data,
      order_id: order._id,
      status: table.status,
    };
    mergeTable(dispatch, body, userSelector?.data.accessToken, axiosJWT);
    setTableMerge([]);
    setGetData(!getData);
    navigation.popToTop();
  }

  const getListFloors = (dataFilter = 0) => {
    const newArray = [{
      key: 0,
      label: 'Tất cả',
    }];
    selector?.data.forEach(element => {
      const index = newArray.findIndex(item => item.key === element.floor);
      if (index === -1) {
        newArray.push({
          key: element.floor,
          label: 'Tầng ' + element.floor,
          tables: [element]
        });
      } else {
        newArray[index].tables.push(element);
      }
    });
    if (dataFilter > 0) {
      newArray.forEach(element => {
        if (element.key !== dataFilter) {
          delete element.tables
        }
      });
    }
    setFloors(newArray.sort((a, b) => a.key - b.key));
  }

  React.useEffect(() => {
    setLoading(selector?.loading);
    getListFloors();
  }, [selector]);

  React.useEffect(() => {
    setLoading(selectorOrder?.isFetching);
    setOrder(selectorOrder?.data);
  }, [selectorOrder]);

  return (
    loading ?
      <View style={styles.containerLoading}>
        <ActivityIndicator animating={true} size="small" color={MD2Colors.red800} />
      </View>
      :
      <SafeAreaView style={styles.container}>
        <Header
          isShowButtonGoBack={true}
          props={handleGoBack}
          title={HEADER_TITLE.MergeTable}
          mode="small"
        />

        <Filter floors={floors} onPress={getListFloors} />

        <View style={{ flex: 1 }}>
          <List data={floors} />
        </View>

        {tableMerge.length > 0 && <View style={styles.ButtonBottom}>
          <Button style={styles.button} mode="contained" onPress={handleMergeTable}>
            {BUTTON.MergeTable}
          </Button>
          <Button style={styles.button} mode="contained" onPress={handleMoveTable}>
            {BUTTON.MoveTable}
          </Button>
        </View>}
      </SafeAreaView>
  )
}

export default Container

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
  }
})
