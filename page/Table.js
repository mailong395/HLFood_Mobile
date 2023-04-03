import { useContext, useEffect, useRef, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import TableComp from "../component/TableComp";
import { OPTION_TABLE, ACTIVE_TABLE, STATUS_TABLE, CMS } from '../config/config'
import Icon from 'react-native-vector-icons/Ionicons';
import BookedTable from "../component/BookedTable";
import { useDispatch, useSelector } from "react-redux";
import { TableContext } from "../context/TableContext";
import { ActivityIndicator, MD2Colors, Appbar, useTheme, Badge, Button, Chip } from 'react-native-paper';
import { FoodContext } from "../context/FoodContext";
import { getOrderById } from "../redux/api/orderApi";

const listBookedTable = [
  {
    _id: 0,
    table_num: 1,
    time: new Date(),
    name: 'Chị Hồng',
    phone: "0334172541",
  },
  {
    _id: 1,
    table_num: 4,
    time: new Date(),
    name: 'Chị Hồng',
    phone: "0334172541",
  },
  {
    _id: 2,
    table_num: 6,
    time: new Date(),
    name: 'Anh Hoàng',
    phone: "0948639037",
  },
];

const Table = ({ navigation }) => {
  const selector = useSelector(state => state.tableOfEmp);
  const theme = useTheme();
  const { setTable } = useContext(TableContext);
  const { setFoodWait } = useContext(FoodContext);
  const numTable = useRef();
  const dispatch = useDispatch();

  const [tables, setTables] = useState([]);
  const [selectedIdOptionFood, setSelectedIdOptionFood] = useState(-1);
  const [selectedIdTable, setSelectedIdTable] = useState(-1);
  const [modalVisible, setModalVisible] = useState(-1);
  const [isShowBooked, setIsShowBooked] = useState(false);
  const [unread, setUnread] = useState(3);
  const [orderId, setOrderId] = useState("");

  // Sort table from min to max
  tables?.sort((a, b) => a.table_num - b.table_num);

  // Render
  const renderKindOfTable = ({ item }) => {
    const mode = item._id === selectedIdOptionFood ? 'flat' : 'outlined';
    const selected = item._id === selectedIdOptionFood
    const handleChangeButton = () => {
      if (item._id === -1) {
        setTables([...selector?.data]);
      } else {
        const newData = [...selector?.data].filter(status => status?.status === item._id);
        setTables(newData);
      }
      setSelectedIdOptionFood(item._id);
    }

    return (
      <Chip
        mode={mode}
        selected={selected}
        onPress={() => handleChangeButton()}
        style={{ margin: 8 }}
      >
        {item.title}
      </Chip>
    );
  };

  const renderListTable = ({ item }) => {
    const borderWidth = item._id === selectedIdTable ? 4 : 0;

    const handleMoveToDesTable = () => {
      item.status > 1 ? setOrderId(item.order) : setOrderId("");
      setModalVisible(item.status);
      setSelectedIdTable(item._id);
      setTable(item);
      numTable.current = item.table_num;
    }

    let status = {};
    switch (item.status) {
      case 0:
        status = STATUS_TABLE.clean;
        break;
      case 1:
        status = STATUS_TABLE.booked;
        break;
      case 2:
        status = STATUS_TABLE.wait;
        break;
      case 3:
        status = STATUS_TABLE.ship;
        break;
      case 4:
        status = STATUS_TABLE.done;
        break;

      default:
        break;
    }

    return (
      <TableComp
        backgroundColor={status.backgroundColor}
        time={item.status !== 0 ? '0:30' : ''}
        color={status.color}
        nTable={item.table_num}
        status={status.title}
        onPress={handleMoveToDesTable}
        borderWidth={borderWidth}
      />
    );
  }

  const renderActiveTable = ({ item }) => {
    let isShow = false;

    switch (item.id) {
      case 0:
        isShow = true;
        break;
      case 1:
        isShow = true
        break;
      case 2:
        if (modalVisible > 1) {
          isShow = true
          break;
        }
        isShow = false
        break;
      case 3: {
        if (modalVisible > 2) {
          isShow = true
          break;
        }
        isShow = false
        break;
      }
      default:
        isShow = false;
    }

    const handleChangeButton = async () => {
      switch (item.id) {
        case 0:
          navigation.navigate('ListFood', { numTable: numTable.current, _idOrder: orderId });
          break;
        case 1:
          break;
        case 2:
          const listFoodWait = await getOrderById( dispatch, orderId);
          setFoodWait(listFoodWait);
          navigation.navigate('ListFoodOrder', { numTable: numTable.current, _idOrder: orderId });
          break;
        case 3:
          navigation.navigate('DetailListFood');
          break;
        default:
          break;
      }
      setModalVisible(-1);
      setSelectedIdTable(-1);
    }
    

    return isShow ?
      <Button
        icon={item.icon}
        mode="contained"
        onPress={() => handleChangeButton()}
        style={{ flex: 1, margin: 8 }}
      >
        {item.title}
      </Button> : <></>
  };

  const renderBookedInTable = ({ item }) => {
    return (
      <BookedTable item={item} />
    );
  }

  useEffect(() => {
    setTables([...selector?.data]);
    console.log('table fetch data');
  }, [selector])

  return (
    <View style={styles.container}>
      <Appbar.Header mode="center-aligned" style={{ backgroundColor: theme.colors.primaryContainer }}>
        <Appbar.Content title={CMS.logo} />
        <View>
          <Badge
            visible={unread && unread > 0}
            size={16}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            {unread}
          </Badge>
          <Appbar.Action icon="bell-outline" onPress={() => { }} />
        </View>
      </Appbar.Header>
      <View style={styles.optionButton}>
        <FlatList
          data={OPTION_TABLE}
          renderItem={renderKindOfTable}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.tableList}>
        {selector?.isFetching ?
          <View style={styles.boxLoading}>
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
          </View> :
          <FlatList
            data={tables}
            renderItem={renderListTable}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />}
      </View>
      <View style={[styles.listBooked, { flex: isShowBooked ? 1 : 0 }]}>
        <Pressable
          onPress={() => setIsShowBooked(!isShowBooked)}
          style={{
            flexDirection: 'row',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#d9d9d9",
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Danh Sách Bàn Đã Đặt</Text>
          <Icon name={isShowBooked ? 'chevron-down' : 'chevron-up'} size={24} />
        </Pressable>
        <View style={{
          display: isShowBooked ? "flex" : "none",
          backgroundColor: "#fafafa",
        }}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableTitle}>Số bàn</Text>
            <Text style={styles.tableTitle}>Thời gian</Text>
            <Text style={styles.tableTitle}>Tên KH</Text>
            <Text style={styles.tableTitle}>SĐT</Text>
          </View>
          <View>
            {/* renderBookedInTable */}
            <FlatList
              data={listBookedTable}
              renderItem={renderBookedInTable}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible > -1}
        onRequestClose={() => {
          setModalVisible(-1);
        }}>
        <Pressable
          style={styles.centeredView}
          onPress={() => { setModalVisible(-1); setSelectedIdTable(-1); }}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={{ alignItems: "center", paddingTop: 10, }}>
                <View style={{ height: 4, width: 40, backgroundColor: "#d9d9d9", borderRadius: 10, }}></View>
              </View>
              <View style={styles.modalHeader}>
                <Text style={styles.modalText}>Chức năng</Text>
                <Pressable
                  style={styles.buttonClose}
                  onPress={() => { setModalVisible(-1); setSelectedIdTable(-1); }}
                >
                  <Icon name="close" size={24} color={"#c4c4c4"} />
                </Pressable>
              </View>
              <View style={styles.modalBody}>
                <FlatList
                  data={ACTIVE_TABLE}
                  renderItem={renderActiveTable}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optionButton: {
    backgroundColor: "#fff",
    marginBottom: 2,
    paddingHorizontal: 8,
  },
  tableList: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  listBooked: {
    backgroundColor: "white",
  },

  // Style Modal
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d9d9d9",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
  },
  buttonClose: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingVertical: 10,
    width: 48,
  },
  modalBody: {
    padding: 10,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },

  // style Table
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: "#EE6F57",
  },
  tableTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#fafafa",
  },

  boxLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Table;