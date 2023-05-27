import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { formatCurrency } from 'react-native-format-currency';
import { useState } from 'react';
import { useEffect } from 'react';

function StatisticalTable({ dataCsv }) {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState([]);

  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  };

  const formatDate = (date) => {
    return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/');
  };

  const handlePageChange = (page) => {
    setPage(page);
    setItemsPerPage(orders[page]);
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
            <DataTable.Title style={{ minWidth: 100 }}>Ngày lập hóa đơn</DataTable.Title>
            <DataTable.Title style={{ minWidth: 100 }} numeric>Tổng tiền</DataTable.Title>
          </DataTable.Header>
          {itemsPerPage?.map((order, index) => {
            return (
              <DataTable.Row key={index}>
                <DataTable.Cell style={{ minWidth: 50 }}>1</DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 200 }}>Nguyễn Công Phượng</DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 100 }}>
                  {formatDate(new Date(order.time_created))}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 100 }} numeric>
                  {formatCurrency({ amount: order.total_order_price, code: 'VND' })[0]}
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
        label={ "Trang   " + (orders.length === 0 ? 0 : page + 1) + " / " + orders.length + "   Tổng " + dataCsv.length}
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
