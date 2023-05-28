import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DataTable, IconButton, MD3Colors } from 'react-native-paper';
import { formatCurrency } from 'react-native-format-currency';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../redux/createInstance';
import { loginSuccess } from '../../redux/slice/authSlice';
import { getOrderById } from '../../redux/api/orderApi';

function StatisticalTable({ dataCsv }) {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState([]);
  const userSelector = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  };

  const formatTime = (d) => {
    return d.getHours() + ":" + d.getMinutes();
  }

  const formatDate = (date) => {
    return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/');
  };

  const handlePageChange = (page) => {
    setPage(page);
    setItemsPerPage(orders[page]);
  }

  const handleMoveOrderDetail = async (orderId) => {
    await getOrderById(dispatch, orderId, userSelector?.data?.accessToken, axiosJWT);
    navigation.navigate('DetailListFood', { readOnly: true });
  }

  useEffect(() => {
    const newData = [];
    const chunkSize = 10;
    for (let i = 0; i < dataCsv.length; i += chunkSize) {
      const chunk = dataCsv.slice(i, i + chunkSize);
      newData.push(chunk);
    }
    setPage(0);
    setOrders(newData);
    setItemsPerPage(newData[0])
  }, [dataCsv])

  return (
    <DataTable style={styles.container}>
      <ScrollView horizontal>
        <View>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={{ minWidth: 50 }}>Bàn</DataTable.Title>
            <DataTable.Title style={{ minWidth: 200 }}>Khách hàng</DataTable.Title>
            <DataTable.Title style={{ minWidth: 100 }}>Giờ</DataTable.Title>
            <DataTable.Title style={{ minWidth: 100 }}>Ngày</DataTable.Title>
            <DataTable.Title style={{ minWidth: 100 }} numeric>Tổng tiền</DataTable.Title>
            <DataTable.Title style={{ minWidth: 100 }} numeric>Chi tiết</DataTable.Title>
          </DataTable.Header>
          {itemsPerPage?.map((order, index) => {
            const numTable = order?.tables.map(element => element.table_num).join();
            if (order?.customer) console.log('order?.customer', order?.customer);
            const customer = order?.customer ? order?.customer?.name : '-'
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell style={{ minWidth: 50 }}>{numTable}</DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 200 }}>{customer}</DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 100 }}>
                  {formatTime(new Date(order.time_created))}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 100 }}>
                  {formatDate(new Date(order.time_created))}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 100 }} numeric>
                  {formatCurrency({ amount: order.total_order_price, code: 'VND' })[0]}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 100 }} numeric>
                  <IconButton
                    icon="chevron-double-right"
                    iconColor={MD3Colors.primary50}
                    size={20}
                    onPress={() => handleMoveOrderDetail(order._id)}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
        </View>
      </ScrollView>
      <DataTable.Pagination
        page={page}
        numberOfPages={orders.length}
        onPageChange={handlePageChange}
        label={"Trang   " + (orders.length === 0 ? 0 : page + 1) + " / " + orders.length + "   Tổng " + dataCsv.length}
        optionsPerPage={orders}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
      />
    </DataTable>
  );
}

export default StatisticalTable;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  idCell: {
    flex: 2,
  },
});
