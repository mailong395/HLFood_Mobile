import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CMS } from '../../config/config';
import { useDispatch, useSelector } from "react-redux";
import { FoodContext } from '../../context/FoodContext';
import { Button, Searchbar } from "react-native-paper";
import Header from "../../common/Header";
import { getAllFood } from "../../redux/api/foodApi";
import List from "./List";

export default function ListFood({ route, navigation }) {
  const { numTable, idOrdered } = route.params;
  const dispatch = useDispatch();
  const { foodOrdered, setFoodOrdered } = useContext(FoodContext);

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  
  // Handler 
  const handleMoveToListFoodOrder = () => {
    navigation.navigate('ListFoodOrder', { numTable: numTable, idOrdered: idOrdered });
  }

  const handleGoBack = () => {
    setFoodOrdered([]);
    navigation.goBack();
  }

  // Fetch Data
  useEffect(() => {
    getAllFood(dispatch);
  }, []);


  return (
    <View style={styles.container}>
      <Header
        isShowButtonGoBack={true}
        props={handleGoBack}
        title={"Danh sách món ăn - Bàn " + numTable}
        mode="small"
      />

      <View style={styles.boxSearch}>
        <Searchbar
          placeholder={CMS.search}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>

      <View style={styles.boxContain}>
        <List dataSearch={searchQuery} />
      </View>

      {
        foodOrdered.length > 0 &&
        <View style={styles.boxButtonBottom}>
          <Button icon="plus" mode="contained" onPress={handleMoveToListFoodOrder}>
            Thêm món
          </Button>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  boxSearch: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  boxFilter: {
    paddingBottom: 8,
  },
  boxContain: {
    flex: 1,
  },
  boxButtonBottom: {
    padding: 16,
  }
});