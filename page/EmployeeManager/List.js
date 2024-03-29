import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { CMS, STATUS_TABLE } from '../../config/config';
import TableComp from '../../component/TableComp';
import { useSelector } from 'react-redux';
import { ActivityIndicator, Card, MD2Colors, useTheme } from 'react-native-paper';

const List = ({ props, isShowModal = false, filterData, data }) => {
  const selector = useSelector((state) => state.table);
  const [selected, setSelected] = React.useState(-1);
  const theme = useTheme();
  // Render
  const renderItem = ({ item }) => {
    const borderWidth = isShowModal && selected === item._id ? 4 : 0;
    const status = getInfoTable(item.job_title);

    // Handle
    const renderPosition = (position) => {
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

    const handleMoveToDesTable = () => {
      props(item);
      setSelected(item._id);
    };

    const getArrayNumTables = (tables) => {
      return tables?.map((table) => table?.table_num);
    };

    return (
      <View style={styles.containerItem}>
        <Card
          style={{
            borderWidth: borderWidth,
            borderColor: theme.colors.primary,
            backgroundColor: status.backgroundColor,
            width: '100%',
            height: 120,
          }}
          onPress={handleMoveToDesTable}
        >
          <Card.Content>
            <Text variant="bodyMedium" style={{ color: status.color, fontWeight: 'bold' }}>
              {item.name}
            </Text>
            <Text variant="bodyMedium" style={{ color: status.color, fontWeight: 'bold' }}>
              {item.phone_num}
            </Text>
            <Text variant="titleLarge" style={{ color: status.color, marginTop: 5 }}>
              Chức vụ:{' '}
              <Text variant="bodyMedium" style={{ color: status.color, fontWeight: 'bold' }}>
                {renderPosition(item.job_title)}
              </Text>
            </Text>
            {item.job_title === 3 && (
              <Text variant="titleLarge" style={{ color: status.color, marginTop: 5 }}>
                Bàn đang quản lý:
                <Text style={{ fontWeight: 'bold' }}>
                  {' '}
                  {getArrayNumTables(item?.tables).length === 0 ? 'Trống' : getArrayNumTables(item?.tables).join(',')}
                </Text>
              </Text>
            )}
          </Card.Content>
        </Card>
      </View>
    );
  };

  const getInfoTable = (status) => {
    switch (status) {
      case 0:
        return STATUS_TABLE.clean;
      case 1:
        return STATUS_TABLE.clean;
      case 2:
        return STATUS_TABLE.ship;
      case 3:
        return STATUS_TABLE.wait;
      case 4:
        return STATUS_TABLE.done;
      default:
        return STATUS_TABLE.clean;
    }
  };

  return selector?.isFetching ? (
    <ActivityIndicator size={'large'} animating={true} color={MD2Colors.red800} />
  ) : (
    <FlatList
      data={data}
      renderItem={renderItem}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      style={styles.container}
    />
  );
};

export default List;

const styles = StyleSheet.create({
  containerItem: {
    flex: 1,
    padding: 8,

  },
  container: {
    paddingHorizontal: 8,
  },
  boxFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerCard: {

  },
});
