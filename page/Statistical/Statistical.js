import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Header from '../../common/Header';
import { CMS } from '../../config/config';
import { Button } from 'react-native-paper';
import { BUTTON } from '../../config/lang_vn';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../redux/slice/authSlice';
import { getAllOrder } from '../../redux/api/orderApi';
import { createAxios } from '../../redux/createInstance';

function Statistical({ navigation }) {
  const userSelector = useSelector((state) => state.auth);
  const accessToken = userSelector?.data?.accessToken;
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    getAllOrder(dispatch, accessToken, axiosJWT);
  }, []);

  return (
    <View style={styles.container}>
      <Header isShowDrawer={true} title={CMS.logo} mode="center-aligned" openDrawer={handleOpenDrawer} />

      <View style={styles.section}>
        <Button
          loading={loading}
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('StatisticalDetail', { mode: 'dayCustom' })}
        >
          {BUTTON.statisticalCustomDay}
        </Button>
        <Button
          loading={loading}
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('StatisticalDetail', { mode: 'dayNow' })}
        >
          {BUTTON.statisticalDay}
        </Button>
        <Button
          loading={loading}
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('StatisticalDetail', { mode: 'month' })}
        >
          {BUTTON.statisticalMonth}
        </Button>
        <Button
          loading={loading}
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('StatisticalDetail', { mode: 'year' })}
        >
          {BUTTON.statisticalYear}
        </Button>
      </View>
    </View>
  );
}

export default Statistical;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  boxSearch: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listFood: {
    flex: 1,
    padding: 8,
  },
  buttonBottom: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dropdownCompnent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  button: {
    marginHorizontal: 8,
    padding: 15,
    marginTop: 15,
  },
});
