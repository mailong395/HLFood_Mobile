import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator, MD2Colors, Text } from 'react-native-paper';
import TableComp from '../../component/TableComp';
import { STATUS_TABLE } from '../../config/config';
import { useContext } from 'react';
import { TableContext } from '../../context/TableContext';

const List = ({ data = [], emp }) => {
  const { tableMerge, setTableMerge } = useContext(TableContext);

  const renderFloor = ({ item }) => {
    const renderItem = ({ item }) => {
      const index = tableMerge.findIndex((element) => item._id === element._id);
      const borderWidth = index === -1 ? 0 : 4;
      const status = item.employee ? STATUS_TABLE.wait : STATUS_TABLE.clean;

      const handleSelected = () => {
        if (item?.employee?._id === emp?._id || !item?.employee) {
          const newData = [...tableMerge, index === -1 && item];
          index !== -1 && newData.splice(index, 1);
          setTableMerge(newData.filter((element) => element !== false));
        }
      };

      return (
        <TableComp
          color={item.color}
          nTable={item.table_num}
          nFloor={item.floor}
          status={item.employee ? `Đã giao phó ${item?.employee?.name}` : 'Chưa giao phó'}
          onPress={handleSelected}
          borderWidth={borderWidth}
          backgroundColor={status.backgroundColor}
        />
      );
    };

    return (
      item.tables && (
        <View style={styles.section}>
          <Text variant="titleLarge">{item.label}</Text>
          <FlatList
            data={item.tables.sort((a, b) => a.table_num - b.table_num)}
            renderItem={renderItem}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderFloor} showsVerticalScrollIndicator={false} />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    paddingBottom: 16,
  },
});
