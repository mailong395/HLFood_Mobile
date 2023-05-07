import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { formatCurrency } from 'react-native-format-currency';

function StatisticalTable({ dataCsv }) {
  const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  };

  const formatDate = (date) => {
    return [padTo2Digits(date.getDate()), padTo2Digits(date.getMonth() + 1), date.getFullYear()].join('/');
  };

  return (
    <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title style={styles.idCell}>Mã hóa đơn</DataTable.Title>
        <DataTable.Title numeric>Ngày lập hóa đơn</DataTable.Title>
        <DataTable.Title numeric>Tổng tiền</DataTable.Title>
      </DataTable.Header>
      <ScrollView>
        {dataCsv?.map((order, index) => {
          return (
            <DataTable.Row key={index}>
              <DataTable.Cell style={styles.idCell}>{order._id}</DataTable.Cell>
              <DataTable.Cell style={styles.dateCell} numeric>
                {formatDate(new Date(order.time_created))}
              </DataTable.Cell>
              <DataTable.Cell style={styles.moneyCell} numeric>
                {formatCurrency({ amount: order.total_order_price, code: 'VND' })[0]}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </ScrollView>
    </DataTable>
  );
}

export default StatisticalTable;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    height:600,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  idCell: {
    flex: 2,
  },
});
