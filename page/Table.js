import { useContext, useEffect, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import ButtonActiveTable from "../component/ButtonActiveTable";
import ButtonStatusTable from "../component/ButtonStatusTable";
import TableComp from "../component/TableComp";
import { OPTION_TABLE, ACTIVE_TABLE, STATUS_TABLE } from '../config/config'
import Icon from 'react-native-vector-icons/Ionicons';
import BookedTable from "../component/BookedTable";
import { useSelector } from "react-redux";
import { TableContext } from "../context/TableContext";

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
    const { table, setTable } = useContext(TableContext);
    const [tables, setTables] = useState([]);

    const [selectedIdOptionFood, setSelectedIdOptionFood] = useState(-1);
    const [modalVisible, setModalVisible] = useState(-1);
    const [isShowBooked, setIsShowBooked] = useState(false);

    // Sort table from min to max
    tables?.sort((a, b) => a.table_num - b.table_num);

    // Render
    const renderKindOfTable = ({ item }) => {
        const backgroundColor = item._id === selectedIdOptionFood ? '#EE6F57' : '#dcdcdc';
        const color = item._id === selectedIdOptionFood ? '#fafafa' : '#343434';

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
            <ButtonStatusTable
                label={item.title}
                onPress={handleChangeButton}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    };

    const renderListTable = ({ item }) => {
        const handleMoveToDesTable = () => {
            setModalVisible(item.status);
            setTable(item);
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
                color={status.color}
                nTable={item.table_num}
                status={status.title}
                onPress={handleMoveToDesTable}
            />
        );
    }

    const renderActiveTable = ({ item }) => {
        const isShow = item.id === 1 ? (modalVisible <= 1 ? false : true) : true;

        const handleChangeButton = () => {
            switch (item.id) {
                case 0:
                    navigation.navigate('ListFood');
                    break;
                case 1:
                    navigation.navigate('DetailListFood');
                    break;
                default:
                    break;
            }
            setModalVisible(-1);
        }

        return (
            <ButtonActiveTable
                label={item.title}
                onPress={handleChangeButton}
                backgroundColor={item.backgroundColor}
                isShow={isShow}
                textColor={item.color}
            />
        );
    };

    const renderBookedInTable = ({ item }) => {
        return (
            <BookedTable item={item} />
        );
    }

    useEffect(() => {
        setTables([...selector?.data]);
    }, [selector])


    return (
        <View style={styles.container}>
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
                    <Text>Loading...</Text> :
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
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignItems: "center", paddingTop: 10, }}>
                            <View style={{ height: 4, width: 40, backgroundColor: "#d9d9d9", borderRadius: 10, }}></View>
                        </View>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalText}>Chức năng</Text>
                            <Pressable
                                style={styles.buttonClose}
                                onPress={() => setModalVisible(-1)}
                            >
                                <Icon name="close" size={24} color={"#c4c4c4"} />
                            </Pressable>
                        </View>
                        <View style={styles.modalBody}>
                            <FlatList
                                data={ACTIVE_TABLE}
                                renderItem={renderActiveTable}
                                numColumns={1}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                </View>
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
        justifyContent: 'flex-end',
    },
    modalView: {
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
});

export default Table;