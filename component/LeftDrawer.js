import React from 'react';
import {
  Button,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/api/authApi';
import { BUTTON } from '../config/lang_vn';
import { loginSuccess } from '../redux/slice/authSlice';
import { createAxios } from '../redux/createInstance';

const LeftDrawer = ({ closeDrawer }) => {
  const userSelector = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

  const handleCloseDrawer = () => {
    handleLogout();
    closeDrawer();
  }

  const handleLogout = () => {
    logoutUser(dispatch, userSelector?.data.accessToken, axiosJWT);
  }

  return (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title={BUTTON.Logout}
        onPress={handleCloseDrawer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default LeftDrawer;