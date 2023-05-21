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
    const status = STATUS_TABLE.wait;

    const handleMoveToDesTable = () => {
      props(item);
      setSelected(item._id);
    };

    return (
      <View style={styles.containerItem}>
        <Card
          style={{
            borderWidth: borderWidth,
            borderColor: theme.colors.primary,
            backgroundColor: status.backgroundColor,
            width: '100%',
          }}
          onPress={handleMoveToDesTable}
        >
          <Card.Content>
            <View style={[styles.headerCard, styles.boxFlex, { borderColor: status.color }]}>
              <Text variant="bodyMedium" style={{ color: status.color, fontWeight: 'bold' }}>
                {item.name}
              </Text>
            </View>
            <View style={[styles.headerCard, styles.boxFlex, { borderColor: status.color, marginTop: 5 }]}>
              <Text variant="bodyMedium" style={{ color: status.color, fontWeight: 'bold' }}>
                {item.phone_num}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
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
    // borderBottomWidth: 1,
    // paddingBottom: 8,
  },
});
