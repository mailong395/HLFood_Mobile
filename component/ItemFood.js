import { useContext, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { formatCurrency } from "react-native-format-currency";
import { FoodContext } from "../context/FoodContext";
import { IconButton } from "react-native-paper";

const ItemFood = ({ item, handlerAddFood, handlerRemoveFood, countDefault = 0 }) => {
  const { foodOrdered } = useContext(FoodContext);
  const [count, setCount] = useState(countDefault);
  console.log(countDefault, 'item food');

  const handlerAdd = () => {
    handlerAddFood();
    setCount(count + 1);
  }

  const handlerRemove = () => {
    if (count > 0) {
      handlerRemoveFood();
      setCount(count - 1);

    }
  }

  useEffect(() => {
    setCount(countDefault);
    console.log(countDefault, 'useEffect count item food order');
  }, [countDefault]);


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.image}>
          <Image style={{ flex: 1, resizeMode: "center", borderRadius: 6 }} source={{ uri: item?.image }} alt={"image food"} />
        </View>
        <View style={{ flex: 1, justifyContent: "space-between", padding: 8, }}>
          <Text style={styles.textTitle}>{item?.name}</Text>
          <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
            <Text style={styles.textPrice}>{formatCurrency({ amount: item?.price, code: "VND" })[0]}</Text>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              <IconButton
                icon="minus"
                size={24}
                onPress={() => handlerRemove()}
              />
              <Text style={{ fontSize: 16, margin: 10, }}>{count}</Text>
              <IconButton
                icon="plus"
                size={24}
                onPress={() => handlerAdd()}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  content: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 6,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  image: {
    height: 80,
    width: 80,

  },
  textTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#343434",
  },
  textPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: "#343434",
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 40,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 4,
  },
  titleButton: {
    fontSize: 18,
    fontWeight: "500",
  },
  textCount: {

  },
});

export default ItemFood;