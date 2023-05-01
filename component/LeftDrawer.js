import React from 'react';
import { Button, Text, StyleSheet, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/api/authApi';
import { BUTTON, TOAST } from '../config/lang_vn';
import { loginSuccess } from '../redux/slice/authSlice';
import { createAxios } from '../redux/createInstance';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const LeftDrawer = ({closeDrawer}) => {
  const userSelector = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  const [loading, setLoading] = React.useState(false);
  // const navigation = useNavigation();

  const logoutSuccess = () => {
    ToastAndroid.showWithGravity(TOAST.logout_success, ToastAndroid.SHORT, ToastAndroid.TOP);
  };

  const logoutFail = () => {
    ToastAndroid.showWithGravity(TOAST.logout_fail, ToastAndroid.SHORT, ToastAndroid.TOP);
  };


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
    <View style={[styles.container, styles.navigationContainer]}>
      <TouchableOpacity style={styles.buttons} onPress={() => handleNavigatePage('Table')}>
        <Text style={styles.text}>{BUTTON.OdrerFood}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={() => handleNavigatePage('EmployeeManager')}>
        <Text style={styles.text}>{BUTTON.Employee}</Text>
      </TouchableOpacity>
      <Button style={styles.buttons} title={BUTTON.Logout} onPress={handleCloseDrawer} />
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} color={MD2Colors.red800} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    padding: 16,
    height: '100%',
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
  },

  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 75,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#f4978e',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default LeftDrawer;
