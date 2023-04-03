import { useContext, useEffect } from "react";
import { getListTableByIdEmp } from "../redux/api/tableApi";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListFood from './ListFood';
import DetailListFood from './DetailListFood';
import ListFoodOrder from './ListFoodOrder';
import Table from './Table'
import { useDispatch } from "react-redux";
import { TableContext } from "../context/TableContext";
import { getAllFood } from "../redux/api/foodApi";

const employee = {
  _id: '641f0f17fc13ae30f60014d3',
};

const Stack = createNativeStackNavigator();

const Home = () => {
  const { getData } = useContext(TableContext);
  const dispatch = useDispatch();

  useEffect(() => {
    getListTableByIdEmp(dispatch, employee._id);
    getAllFood(dispatch);
    console.log('get data');
  }, [getData]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Table" component={Table} />
        <Stack.Screen name="ListFood" component={ListFood} />
        <Stack.Screen name="DetailListFood" component={DetailListFood} />
        <Stack.Screen name="ListFoodOrder" component={ListFoodOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Home;