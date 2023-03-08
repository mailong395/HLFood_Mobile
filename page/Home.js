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
import ButtonBackScreen from "../component/ButtonBack";

const employee = {
    _id: '63fb7060fc13ae34f3000492',
};

const Stack = createNativeStackNavigator();

const Home = () => {
    const { getData } = useContext(TableContext);
    const dispatch = useDispatch();

    useEffect(() => {
        getListTableByIdEmp(dispatch, employee._id);
        console.log('get data');
    }, [getData]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Table"
                    component={Table}
                    options={{
                        title: 'HLFood',
                        headerStyle: {
                            backgroundColor: '#CB3737',
                        },
                        headerTintColor: '#FAFAFA',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="ListFood"
                    component={ListFood}
                    options={{
                        title: 'Danh Sách Món Ăn',
                        headerStyle: {
                            backgroundColor: '#CB3737',
                        },
                        headerTintColor: '#FAFAFA',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="DetailListFood"
                    component={DetailListFood}
                    options={{
                        title: 'Danh Sách Món Ăn',
                        headerStyle: {
                            backgroundColor: '#CB3737',
                        },
                        headerTintColor: '#FAFAFA',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
                <Stack.Screen
                    name="ListFoodOrder"
                    component={ListFoodOrder}
                    options={{
                        title: 'Món đã chọn',
                        headerStyle: {
                            backgroundColor: '#CB3737',
                        },
                        headerTintColor: '#FAFAFA',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Home;