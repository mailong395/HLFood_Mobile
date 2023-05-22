import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
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
import EmployeeManager from './EmployeeManager/EmployeeManager';
import Cook from './Cook/index';
import AddEmp from './AddEmp/AddEmp';
import AssignEmp from './AssignEmp';
import AddFood from './FoodManager/AddFood';
import FoodManager from './FoodManager/FoodManager';
import DetailListFood from './DetailListFood';
import Notified from './Notified';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { logoutUser } from '../redux/api/authApi';
import Statistical from './Statistical/Statistical';
import StatisticalDetail from './Statistical/StatisticalDetail';
import { logoutSuccess } from '../redux/slice/authSlice';
import TableManager from './TableManager';
import AddTable from './AddTable';
import CustomerManager from './CustomerManager/CustomerManager';
import AddCus from './AddEmp/AddCus';
import Profile from './Profile';
import { Avatar } from 'react-native-paper';
import BookingTable from './BookingTable';
import AddBooking from './AddBooking';
import ListTable from './ListTable';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Waiter = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Table" component={Table} />
      <Stack.Screen name="TableMerge" component={TableMerge} />
      <Stack.Screen name="ListFood" component={ListFood} />
      <Stack.Screen name="DetailListFood" component={DetailListFood} />
      <Stack.Screen name="ListFoodOrder" component={ListFoodOrder} />
      <Stack.Screen name="ListFoodOrdered" component={ListFoodOrdered} />
      <Stack.Screen name="Notified" component={Notified} />
    </Stack.Navigator>
  );
};

const Chef = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cook" component={Cook} />
    </Stack.Navigator>
  );
};

const Employee = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EmployeeManager" component={EmployeeManager} />
      <Stack.Screen name="AddEmp" component={AddEmp} />
      <Stack.Screen name="AssignEmp" component={AssignEmp} />
    </Stack.Navigator>
  );
};

const Food = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FoodManager" component={FoodManager} />
      <Stack.Screen name="AddFood" component={AddFood} />
    </Stack.Navigator>
  );
};

const Statis = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Statistical" component={Statistical} />
      <Stack.Screen name="StatisticalDetail" component={StatisticalDetail} />
    </Stack.Navigator>
  );
};

const TableMenu = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TableManager" component={TableManager} />
      <Stack.Screen name="AddTable" component={AddTable} />
    </Stack.Navigator>
  );
};

const CustomerMenu = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomerManager" component={CustomerManager} />
      <Stack.Screen name="AddCustomer" component={AddCus} />
    </Stack.Navigator>
  );
};
const Booking = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BookingTable" component={BookingTable} />
      <Stack.Screen name="AddBooking" component={AddBooking} />
      <Stack.Screen name="ListTable" component={ListTable} />
    </Stack.Navigator>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = React.useState(true);
  const axiosJWT = createAxios(selector?.data, dispatch, logoutSuccess);
  const rules = selector?.data?.job_title;
  let name = '';

  const handleLogout = (props) => {
    if (selector?.data?.accessToken) {
      logoutUser(dispatch, selector?.data?.accessToken, axiosJWT);
    }
    props.navigation.closeDrawer();
  };

  const ScreenRules = () => {
    switch (rules) {
      case 0:
        name = selector?.data?.name + ' - ' + 'Quản lý';
        return <>
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="chef-hat" size={size} color={color} />
            ),
          }} name="Bếp" component={Chef} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="food-fork-drink" size={size} color={color} />
            ),
          }} name="Gọi món" component={Waiter} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="account-tie" size={size} color={color} />
            ),
          }} name="Nhân sự" component={Employee} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="menu" size={size} color={color} />
            ),
          }} name="Thực đơn" component={Food} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="chart-line" size={size} color={color} />
            ),
          }} name="Thống kê" component={Statis} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="table-chair" size={size} color={color} />
            ),
          }} name="Bàn" component={TableMenu} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }} name="Khách hàng" component={CustomerMenu} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="calendar" size={size} color={color} />
            ),
          }} name="Đặt bàn" component={Booking} />
        </>
      case 1:
        name = selector?.data?.name + ' - ' + 'Quản lý';
        return <>
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="chef-hat" size={size} color={color} />
            ),
          }} name="Bếp" component={Chef} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="food-fork-drink" size={size} color={color} />
            ),
          }} name="Gọi món" component={Waiter} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }} name="Nhân sự" component={Employee} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="menu" size={size} color={color} />
            ),
          }} name="Thực đơn" component={Food} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="chart-line" size={size} color={color} />
            ),
          }} name="Thống kê" component={Statis} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="table-chair" size={size} color={color} />
            ),
          }} name="Bàn" component={TableMenu} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="table-chair" size={size} color={color} />
            ),
          }} name="Khách hàng" component={CustomerMenu} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="calendar" size={size} color={color} />
            ),
          }} name="Đặt bàn" component={Booking} />
        </>
      case 2:
        name = selector?.data?.name + ' - ' + 'Thống kê';
        return <>
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="food-fork-drink" size={size} color={color} />
            ),
          }} name="Gọi món" component={Waiter} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="chart-line" size={size} color={color} />
            ),
          }} name="Thống kê" component={Statis} />
          <Drawer.Screen options={{
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="calendar" size={size} color={color} />
            ),
          }} name="Đặt bàn" component={Booking} />
        </>
      case 3:
        name = selector?.data?.name + ' - ' + 'Phục vụ';
        return <Drawer.Screen options={{
          drawerIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="food-fork-drink" size={size} color={color} />
          ),
        }} name="Gọi món" component={Waiter} />
      case 4:
        namePage = 'Bếp';
        name = selector?.data?.name + ' - ' + 'Đầu bếp';
        return <Drawer.Screen options={{
          drawerIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="chef-hat" size={size} color={color} />
          ),
        }} name="Bếp" component={Chef} />;
      default:
        return <Drawer.Screen options={{
          drawerIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="food-fork-drink" size={size} color={color} />
          ),
        }} name="Gọi món" component={Waiter} />
        break;
    }
  }

  // render
  const CustomDrawerContent = (props) => {
    // <MaterialCommunityIcons name={focused ? 'logout-variant' : 'logout'} size={size} color={color} />
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          icon={({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'logout-variant' : 'logout'} size={size} color={color} />
          )}
          label="Đăng xuất"
          onPress={() => handleLogout(props)}
        />
      </DrawerContentScrollView>
    );
  };

  const DrawerScreen = () => {
    let namePage = '';

    switch (rules) {
      case 0:
        namePage = 'Bếp'
        break;
      case 1:
        namePage = 'Bếp'
        break;
      case 2:
        namePage = 'Thống kê'
        break;
      case 3:
        namePage = 'Gọi món'
        break;
      case 4:
        namePage = 'Bếp'
        break;
      default:
        break;
    }

    return (
      <Drawer.Navigator
        initialRouteName={namePage}
        screenOptions={{ headerShown: false }}
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen options={{
          title: name,
          drawerIcon: () => (
            <Avatar.Text size={40} label={name[0]} />
          ),
        }} name={'profile'} component={Profile} />
        {ScreenRules()}

      </Drawer.Navigator>
    );
  };

  React.useEffect(() => {
    if (selector?.data) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [selector]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLogin ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <Stack.Screen name="DrawerScreen" component={DrawerScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Home;

const styles = StyleSheet.create({});
