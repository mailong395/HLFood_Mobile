import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../redux/createInstance';
import Login from './Login/Login';
import Table from './Table/Table';
import TableMerge from './TableMerge/index';
import ListFood from './ListFood/ListFood';
import ListFoodOrder from './ListFoodOrder/ListFoodOrder';
import ListFoodOrdered from './ListFoodOrdered/listFoodOrdered';
import DetailListFood from './DetailListFood';
import EmployeeManager from './EmployeeManager/EmployeeManager';
import AssignEmp from './AssignEmp/index';
import Cook from './Cook/index'
// import AddEmployee from './AddEmployee/AddEmployee';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { logoutUser } from '../redux/api/authApi';
import { loginSuccess } from '../redux/slice/authSlice';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Waiter = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Table' component={Table} />
      <Stack.Screen name="TableMerge" component={TableMerge} />
      <Stack.Screen name="ListFood" component={ListFood} />
      <Stack.Screen name="DetailListFood" component={DetailListFood} />
      <Stack.Screen name="ListFoodOrder" component={ListFoodOrder} />
      <Stack.Screen name="ListFoodOrdered" component={ListFoodOrdered} />
    </Stack.Navigator>
  );
}

const Chef = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cook" component={Cook} />
    </Stack.Navigator>
  );
}

const Employee = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='EmployeeManager' component={EmployeeManager} />
      <Stack.Screen name='AssignEmp' component={AssignEmp} />
      {/* <Stack.Screen name='AddEmployee' component={AddEmployee} /> */}
    </Stack.Navigator>
  );
}

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);
  const axiosJWT = createAxios(selector?.data, dispatch, loginSuccess);

  console.log('selector', selector);

  const handleLogout = (props) => {
    logoutUser(dispatch, selector?.data?.accessToken, axiosJWT);
    props.navigation.closeDrawer();
  }

  // render
  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          icon={({ focused, color, size }) => <MaterialCommunityIcons name={focused ? "logout-variant" : "logout"} size={size} color={color} />}
          label="Đăng xuất"
          onPress={() => handleLogout(props)}
        />
      </DrawerContentScrollView>
    );
  }

  const DrawerScreen = () => {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name='Gọi món' component={Waiter} />
        <Drawer.Screen name='Bếp' component={Chef} />
        <Drawer.Screen name='Nhân sự' component={Employee} />
      </Drawer.Navigator>
    );
  }

  React.useEffect(() => {
    if (
      selector?.data
    ) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [selector])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLogin ?
          <Stack.Screen name='Login' component={Login} />
          : <Stack.Screen name='DrawerScreen' component={DrawerScreen} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Home

const styles = StyleSheet.create({})
