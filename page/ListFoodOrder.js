import { FlatList, StyleSheet, Text, View } from "react-native"
import ItemFood from "../component/ItemFood";
import { formatCurrency } from "react-native-format-currency";
import ButtonActiveTable from "../component/ButtonActiveTable";
import { TableContext } from "../context/TableContext";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTable } from "../redux/api/tableApi";
import { FoodContext } from "../context/FoodContext";

const ListFoodOrder = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { table, getData, setGetData } = useContext(TableContext);
    const { foodOrdered, setFoodOrdered } = useContext(FoodContext);

    // calculate total
    let total = 0;
    foodOrdered.map((order) => {
        total = total + (order?.count * order?.item.price);
    });

    // Event
    const handlerCancel = () => {
        navigation.popToTop();
    }

    const handlerProcess = () => {
        updateTable(dispatch, table._id, 2);
        navigation.popToTop();
        setGetData(!getData);
    }

    // Render
    const renderListFood = ({ item }) => {

        const handlerAddFood = () => {
            const newData = foodOrdered.map((food) => {
                if (food.item._id === item.item._id) {
                    food.count++;

                }
                return food;
            });
            setFoodOrdered(newData);
        }

        const handlerRemoveFood = () => {
            const newData = foodOrdered.reduce((result, food) => {
                if (food.item._id === item.item._id) {
                    let tempFood = food;
                    if (tempFood.count > 1) {
                        tempFood.count--;
                        return [...result, tempFood]
                    } else {
                        return result;
                    }
                }
                return [...result, food];
            }, [])
            setFoodOrdered(newData);
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
                data={foodOrdered}
                renderItem={renderListFood}
            />
        </View>
        <Text style={styles.total}>Tổng tiền: {
            formatCurrency({ amount: total, code: "VND" })[0]
        }</Text>
        <View style={styles.listButton}>
            <View style={{ flex: 1 }}>
                <ButtonActiveTable
                    onPress={handlerCancel}
                    label={"Hủy bỏ"}
                    backgroundColor={"#E65800"}
                    textColor={'white'} />
            </View>
            <View style={{ flex: 1 }}>
                <ButtonActiveTable
                    onPress={handlerProcess}
                    label={"Chế biến"}
                    backgroundColor={"#07D95B"}
                    textColor={'white'} />
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