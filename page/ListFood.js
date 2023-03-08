import { useContext, useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import FlatListCustom from "../component/FlatListCustom";
import Textfield from "../component/Textfield";
import ButtonCustom from "../component/ButtonStatusTable";
import { OPTION_FOOD } from '../config/config';
import ItemFood from "../component/ItemFood";
import { useDispatch, useSelector } from "react-redux";
import { getAllFood } from "../redux/api/foodApi";
import { FoodContext } from '../context/FoodContext';

export default function ListFood({ navigation }) {
    // Using Redux to get data
    const dispatch = useDispatch();
    const data = useSelector(state => state.food);
    const { foodOrdered, setFoodOrdered } = useContext(FoodContext);

    // Use State to update UI
    const [search, onChangeSearch] = useState('');
    const [selectedKOF, setSelectedKOF] = useState(-1);
    const [foods, setFoods] = useState([]);
    const [isShowBtn, setIsShowBtn] = useState(false);

    console.log({ ordered: foodOrdered.length });

    if (foods.length === 0 && data?.success) {
        setFoods([...data?.data])
    }

    // Filter Data
    const filterData = useMemo(() => {
        return foods?.filter(item => {
            return item?.name.toLowerCase().includes(search.toLowerCase());
        })
    })

    // Render
    const renderKindOfFood = ({ item }) => {
        const backgroundColor = item._id === selectedKOF ? '#EE6F57' : '#d9d9d9';
        const color = item._id === selectedKOF ? 'white' : 'black';

        const handleChangeButton = () => {
            if (item._id === -1) {
                setFoods(data?.data);
            } else {
                const newData = data?.data.filter(type => type?.type === item._id);
                setFoods(newData);
            }
            setSelectedKOF(item._id);
        }

        return (
            <ButtonCustom
                label={item.title}
                onPress={handleChangeButton}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    };

    const renderFoods = ({ item }) => {
        const food = foodOrdered.find((order => order.item._id == item._id))
        const countDefault = food ? food.count : 0;
        const handlerAddFood = () => {
            if (foodOrdered.length === 0) {
                const newOrder = {
                    item: item,
                    count: 1
                }
                foodOrdered.push(newOrder);
                setIsShowBtn(true);
            } else {
                const index = foodOrdered.findIndex((order => order.item._id == item._id));
                if (index === -1) {
                    const newOrder = {
                        item: item,
                        count: 1
                    }
                    foodOrdered.push(newOrder);
                } else {
                    foodOrdered[index].count++;
                }
            }
        }

        const handlerRemoveFood = () => {
            const index = foodOrdered.findIndex((order => order.item._id == item._id));
            if (index > -1) {
                foodOrdered[index].count > 1 ? foodOrdered[index].count-- : foodOrdered.splice(index, 1);
            }
            foodOrdered.length === 0 && setIsShowBtn(false);
        }

        return (
            <ItemFood
                item={item}
                handlerAddFood={handlerAddFood}
                handlerRemoveFood={handlerRemoveFood}
                countDefault={countDefault}
            />
        );
    }

    // Handler 
    const handleMoveToFoodDetail = () => {
        setFoodOrdered(foodOrdered);
        navigation.navigate('ListFoodOrder');
    }

    useEffect(() => {
        if (foods?.success === false) {
            getAllFood(dispatch);
        }
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.texting}>
                <Textfield placeholder="Tìm kiếm" onChangeText={onChangeSearch} value={search} />
            </View>
            <FlatListCustom
                DATA={OPTION_FOOD}
                renderItem={renderKindOfFood}
                horizontal={true}
            />
            <View style={{ flex: 1 }}>
                {data?.isFetching ?
                    <Text>Loading...</Text> :
                    <FlatList
                        data={filterData}
                        renderItem={renderFoods}
                    />}
            </View>
            {isShowBtn && <Pressable
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: pressed ? "#d9d9d9" : "#379237" }
                ]}
                onPress={handleMoveToFoodDetail}
            >
                <Text style={styles.titleButton}>Thêm món</Text>
            </Pressable>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    texting: {
        paddingVertical: 10,
        paddingHorizontal: 20,

    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',

        height: 48,
    },
    titleButton: {
        fontSize: 16,
        fontWeight: '500',
        color: "white",
    }
});