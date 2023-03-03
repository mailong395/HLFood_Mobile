import { FlatList, StyleSheet, Text, View } from "react-native"
import ItemFood from "../component/ItemFood";
import { formatCurrency } from "react-native-format-currency";
import ButtonActiveTable from "../component/ButtonActiveTable";

const ListFoodOrder = ({ route, navigation }) => {
    const { orders } = route.params;
    console.log(orders);

    let temp = 0;
    orders.map((item) => {
        temp += item.count * item.item.price;
    })

    const renderListFood = ({ item }) => {

        const handlerAddFood = () => {

        }

        const handlerRemoveFood = () => {

        }

        return <ItemFood
            item={item.item}
            countDefault={item.count}
            handlerAddFood={handlerAddFood}
            handlerRemoveFood={handlerRemoveFood}
        />
    }

    return <View style={styles.container}>
        <View style={styles.listFood}>
            <FlatList
                data={orders}
                renderItem={renderListFood}
            />
        </View>
        <Text style={styles.total}>Tổng tiền: {
            formatCurrency({ amount: temp, code: "VND" })[0]
        }</Text>
        <View style={styles.listButton}>
            <View style={{ flex: 1 }}>
                <ButtonActiveTable label={"Hủy bỏ"} backgroundColor={"#E65800"} textColor={'white'} />
            </View>
            <View style={{ flex: 1 }}>
                <ButtonActiveTable label={"Chế biến"} backgroundColor={"#07D95B"} textColor={'white'} />
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    listFood: {
        flex: 1,
        backgroundColor: 'white',
    },
    total: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: "right",
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    listButton: {
        width: "100%",
        flexDirection: 'row',
        paddingBottom: 10,
    }
});

export default ListFoodOrder;