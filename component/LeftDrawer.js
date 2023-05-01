import React from 'react';
import {
  Button,
  Text,
  StyleSheet,
  View,
  ToastAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/api/authApi';
import { BUTTON, TOAST } from '../config/lang_vn';
import { loginSuccess } from '../redux/slice/authSlice';
import { createAxios } from '../redux/createInstance';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Table from '../page/Table/Table';

// const Drawer = createDrawerNavigator();

const LeftDrawer = () => {
  
  // const userSelector = useSelector(state => state.auth);
  // const dispatch = useDispatch();
  // const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  // const [loading, setLoading] = React.useState(false);

  // const logoutSuccess = () => {
  //   ToastAndroid.showWithGravity(
  //     TOAST.logout_success,
  //     ToastAndroid.SHORT,
  //     ToastAndroid.TOP,
  //   );
  // };

  // const logoutFail = () => {
  //   ToastAndroid.showWithGravity(
  //     TOAST.logout_fail,
  //     ToastAndroid.SHORT,
  //     ToastAndroid.TOP,
  //   );
  // };

  // const handleCloseDrawer = () => {
  //   handleLogout();
  //   closeDrawer();
  //   setLoading(false)
  // }

  // const handleLogout = async () => {
  //   try {
  //     setLoading(true);
  //     await logoutUser(dispatch, userSelector?.data?.accessToken, axiosJWT);
  //     if (!loading) {
  //       logoutSuccess();
  //     }
  //   } catch (error) {
  //     logoutFail();
  //     setLoading(false);
  //   } 
  // }

  return (
    <View></View>
    // <Drawer.Navigator>
    //   <Drawer.Screen name='Table' component={Table} />
    // </Drawer.Navigator>
  );
};
{/* <View style={[styles.container, styles.navigationContainer]}>
  <Text style={styles.paragraph}>I'm in the Drawer!</Text>
  <Button
    title={BUTTON.Logout}
    onPress={handleCloseDrawer}
  />
  {loading  && <View style={styles.loading}>
    <ActivityIndicator animating={true} color={MD2Colors.red800} />
  </View>}
</View> */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
  loading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.8,
  }
});

export default LeftDrawer;