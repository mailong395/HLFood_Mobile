import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import ItemFoodOrdered from "../component/ItemFoodOrdered";
import { formatCurrency } from "react-native-format-currency";
import ButtonActiveTable from "../component/ButtonActiveTable";


//https://bom.so/o6JGZU
const foodOrdered = [
    {
        item: {
            _id: 0,
            image: 'https://bom.so/o6JGZU',
            name: "Tên món 1",
            price: 100000,
        },
        count: 2,
    },
    {
        item: {
            _id: 1,
            image: 'https://bom.so/o6JGZU',
            name: "Tên món 2",
            price: 120000,
        },
        count: 2,
    },
    {
        item: {
            _id: 2,
            image: 'https://bom.so/o6JGZU',
            name: "Tên món 3",
            price: 50000,
        },
        count: 3,
    },
    {
        item: {
            _id: 3,
            image: 'https://bom.so/o6JGZU',
            name: "Tên món 4",
            price: 90000,
        },
        count: 1,
    },
];

const DetailListFood = ({ navigation }) => {

    // calculate total
    let total = 0;
    foodOrdered.map((order) => {
        total = total + (order?.count * order?.item.price);
    });

    // Render
    const renderListFood = ({ item }) => {
        return <ItemFoodOrdered
            item={item.item}
            count={item.count}
        />
    }

    return <View style={styles.container}>
        <View style={styles.info}>
            <Text style={styles.title}>Thông tin chung</Text>
            <View style={{ paddingHorizontal: 10, }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.supTitle}>Trạng thái</Text>
                    <Text>     :     </Text>
                    <Text style={styles.content}>1</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.supTitle}>Ngày</Text>
                    <Text>     :     </Text>
                    <Text style={styles.content}>1</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.supTitle}>Giờ</Text>
                    <Text>     :     </Text>
                    <Text style={styles.content}>1</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.supTitle}>Tên khách hàng</Text>
                    <Text>     :     </Text>
                    <Text style={styles.content}>1</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.supTitle}>Số điện thoại</Text>
                    <Text>     :     </Text>
                    <Text style={styles.content}>1</Text>
                </View>
            </View>
        </View>
        <View style={[styles.info, { flex: 1, }]}>
            <Text style={styles.title}>Danh sách món ăn</Text>
            <FlatList
                data={foodOrdered}
                renderItem={renderListFood}
            />
        </View>
        <Text style={styles.textTotal}>Tổng tiền: {formatCurrency({ amount: total, code: "VND" })[0]}</Text>
        <View style={styles.listButton}>
            <View style={{ flex: 1 }}>
                <ButtonActiveTable
                    onPress={() => navigation.popToTop()}
                    label={"Trở lại"}
                    backgroundColor={"#E65800"}
                    textColor={'white'} />
            </View>
            <View style={{ flex: 1 }}>
                <ButtonActiveTable
                    onPress={() => navigation.push('ListFood')}
                    label={"Thêm món"}
                    backgroundColor={"#E65800"}
                    textColor={'white'} />
            </View>
            <View style={{ flex: 1 }}>
                <ButtonActiveTable
                    label={"Ghép bàn"}
                    backgroundColor={"#E65800"}
                    textColor={'white'} />
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    info: {
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
        marginHorizontal: 10,
    },
    supTitle: {
        flex: 1.5,
        paddingVertical: 2,
    },
    content: {
        flex: 2
    },
    textTotal: {
        textAlign: "right",
        fontSize: 16,
        fontWeight: "500",
    },
    listButton: {
        flexDirection: 'row',
    }
});

export default DetailListFood;