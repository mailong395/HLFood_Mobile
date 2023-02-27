import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import ButtonActiveTable from "../component/ButtonActiveTable";
import ButtonStatusTable from "../component/ButtonStatusTable";
import Table from "../component/Table";
import { OPTION_TABLE, ACTIVE_TABLE, STATUS_TABLE } from '../config/config'
import Icon from 'react-native-vector-icons/Ionicons';
import BookedTable from "../component/BookedTable";
import { Linking } from 'react-native'

const employee = {
    _id: 0,
};
const LIST_TABLE = [
    {
        _id: 0,
        table_num: 1,
        status: 0,
        employee: 0,
    },
    {
        _id: 1,
        table_num: 2,
        status: 0,
        employee: 0,
    },
    {
        _id: 2,
        table_num: 3,
        status: 1,
        employee: 0,
    },
    {
        _id: 3,
        table_num: 4,
        status: 0,
        employee: 0,
    },
    {
        _id: 4,
        table_num: 5,
        status: 0,
        employee: 0,
    },
    {
        _id: 5,
        table_num: 6,
        status: 0,
        employee: 0,
    },
];

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

const Home = ({ navigation }) => {
    const [selectedIdOptionFood, setSelectedIdOptionFood] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [isShowBooked, setIsShowBooked] = useState(false);

    const listTable = LIST_TABLE.filter(table => table.employee === employee._id);

    const renderKindOfTable = ({ item }) => {
        const backgroundColor = item.id === selectedIdOptionFood ? '#EE6F57' : '#dcdcdc';
        const color = item.id === selectedIdOptionFood ? '#fafafa' : '#343434';

        const handleChangeButton = () => {
            setSelectedIdOptionFood(item.id);
            navigation.navigate('Details')
            console.log("click button: " + item.title);
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
            setModalVisible(true);
            console.log("Click: Table " + item.table_num);
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
            <Table
                backgroundColor={status.backgroundColor}
                color={status.color}
                nTable={item.table_num}
                status={status.title}
                onPress={handleMoveToDesTable}
            />
        );
    }

    const renderActiveTable = ({ item }) => {
        const handleChangeButton = () => {
            switch (item.id) {
                case 0:
                    navigation.navigate('ListFood');
                    break;
                default:
                    break;
            }
            console.log("click button: " + item.title);
            setModalVisible(!modalVisible);
        }

        return (
            <ButtonActiveTable
                label={item.title}
                onPress={handleChangeButton}
                backgroundColor={item.color}
                textColor={"#fff"}
            />
        );
    };

    const renderBookedInTable = ({ item }) => {
        return (
            <BookedTable item={item} />
        );
    }

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
                <FlatList
                    data={listTable}
                    renderItem={renderListTable}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                />
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
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
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
                                onPress={() => setModalVisible(!modalVisible)}
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
};

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

export default Home;