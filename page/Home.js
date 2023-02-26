import { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import ButtonActiveTable from "../component/ButtonActiveTable";
import ButtonStatusTable from "../component/ButtonStatusTable";
import Table from "../component/Table";
import { OPTION_TABLE, ACTIVE_TABLE, STATUS_TABLE } from '../config/config'
import Icon from 'react-native-vector-icons/Ionicons';
import { API_Tables } from "../config/api";
import { useDispatch, useSelector } from "react-redux";
import { getAllTable } from "../redux/api/tableApi";



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
        id: 0,
        number: 1,
        time: new Date().getTime(),
        name: 'Chị Hồng',
        phone: "0334172541",
    },
    {
        id: 1,
        number: 4,
        time: new Date().getTime(),
        name: 'Chị Hồng',
        phone: "0334172541",
    },
    {
        id: 2,
        number: 6,
        time: new Date().getTime(),
        name: 'Chị Hồng',
        phone: "0334172541",
    },
];

const Home = ({ navigation }) => {

    // const table = useSelector((state) => state.);

    const [isLoading, setLoading] = useState(true);
    const [dataTabale, setDataTable] = useState([]);
    const [selectedIdOptionFood, setSelectedIdOptionFood] = useState(0);
    const [selectedIdActiveTable, setSelectedIdActiveTable] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [isShowBooked, setIsShowBooked] = useState(false);

    const dispatch = useDispatch();
    console.log(API_Tables);
    const getMovies = async () => {
        try {
            const response = await fetch(API_Tables);
            const data = await response.json();
            setDataTable(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getAllTable(dispatch);
    }, []);

    const listTable = LIST_TABLE.filter(table => table.employee === employee._id);



    const renderKindOfTable = ({ item }) => {
        const backgroundColor = item.id === selectedIdOptionFood ? '#EE6F57' : '#dcdcdc';
        const color = item.id === selectedIdOptionFood ? '#fafafa' : '#343434';

        const handleChangeButton = () => {
            setSelectedIdOptionFood(item.id);

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
            console.log("Click: Table " + item.number);
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
        const backgroundColor = item.id === selectedIdActiveTable ? '#EE6F57' : '#dcdcdc';
        const color = item.id === selectedIdActiveTable ? '#fafafa' : '#343434';

        const handleChangeButton = () => {
            setSelectedIdActiveTable(item.id);

            console.log("click button: " + item.title);
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
                <Pressable onPress={() => setIsShowBooked(!isShowBooked)}>
                    <View style={{
                        flexDirection: 'row',
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "#d9d9d9",
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: 16, fontWeight: "600" }}>Danh Sách Bàn Đã Đặt</Text>
                        <Icon name={isShowBooked ? 'chevron-down' : 'chevron-up'} size={24} />
                    </View>
                    <View
                        style={{
                            display: isShowBooked ? "flex" : "none",
                            height: 100,
                            borderWidth: 1,
                            backgroundColor: "black",
                        }}>
                    </View>
                </Pressable>
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
});

export default Home;