import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { STATUS_TABLE } from '../../config/config'
import TableComp from '../../component/TableComp';
import { useSelector } from 'react-redux';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const List = ({ props, isShowModal = false, filterData }) => {
  const selector = useSelector(state => state.table);
  const [selected, setSelected] = React.useState(-1);
  const [tables, setTables] = React.useState([]);

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
    const newData = [...selector?.data];
    newData?.sort((a, b) => a.table_num - b.table_num);
    setTables(newData);
  }, [selector])

  React.useEffect(() => {
    if (filterData === -1) {
      setTables([...selector?.data]);
    } else {
      const newData = [...selector?.data].filter(status => status?.status === filterData);
      setTables(newData);
    }
  }, [filterData])


  return selector?.isFetching ?
    <ActivityIndicator size={"large"} animating={true} color={MD2Colors.red800} />
    : <FlatList
      data={tables}
      renderItem={renderItem}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    />
}

export default List

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
})