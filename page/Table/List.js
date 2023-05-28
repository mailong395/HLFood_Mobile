import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { STATUS_TABLE } from '../../config/config'
import TableComp from '../../component/TableComp';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const List = ({ props, isShowModal = false }) => {
  const selector = useSelector(state => state.table);
  const [selected, setSelected] = React.useState(-1);
  const [tables, setTables] = React.useState(selector?.data);
  const [loading, setLoading] = useState(false);
  const userSelector = useSelector(state => state.auth);

  // Render
  const renderItem = ({ item }) => {
    const borderWidth = isShowModal && selected === item._id ? 4 : 0;
    const status = getInfoTable(item.status);

    const handleMoveToDesTable = () => {
      props(item);
      setSelected(item._id);
    }

    return (
      <TableComp
        color={status.color}
        nTable={item.table_num}
        nFloor={item.floor}
        status={status.title}
        onPress={handleMoveToDesTable}
        borderWidth={borderWidth}
        backgroundColor={status.backgroundColor}
      />
    );
  }

  // Handle
  const getInfoTable = (status) => {
    switch (status) {
      case 0:
        return STATUS_TABLE.clean;
      case 1:
        return STATUS_TABLE.booked;
      case 2:
        return STATUS_TABLE.wait;
      case 3:
        return STATUS_TABLE.ship;
      case 4:
        return STATUS_TABLE.done;
      default:
        return STATUS_TABLE.clean;
    }
  }

  // Fetch data
  React.useEffect(() => {
    if (userSelector?.data?.job_title === 3) {
      const arrayData = [...selector?.data]
        .filter(element => element?.employee?._id === userSelector?.data?._id)
        .sort((a, b) => a.table_num - b.table_num)
      setTables(arrayData);
    } else {
      const newData = [...selector?.data].sort((a, b) => a.table_num - b.table_num);
      setTables(newData);
    }
    setLoading(selector.isFetching);
  }, [selector]);

  return (
    <View style={styles.container}>
      <FlatList
        data={tables}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />

      {loading &&
        <View style={styles.loading}>
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </View>}
    </View>
  )

}

export default List

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})