import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../common/Header';
import { CMS } from '../../config/config';
import { Divider, TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
import StatisticalTable from './StatisticalTable';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import moment from 'moment'; // add this
import { formatCurrency } from 'react-native-format-currency';

function StatisticalDetail({ navigation, route }) {
  const orderRedux = useSelector((state) => state?.order?.listAll);

  const { mode } = route?.params;

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [orders, setOrders] = useState([]);
  const [dataCsv, setDataCsv] = useState([]);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDataCsv(orders);
    setRenderOrder(currentDate, orders, mode);
    setDate(currentDate);
  };

  const getHeaderTitle = (mode) => {
    switch (mode) {
      case 'dayCustom':
        return CMS.dayStatistical;
      case 'dayNow':
        return CMS.nowStatistical;
      case 'month':
        return CMS.monthStatistical;
      case 'year':
        return CMS.yearStatistical;
      default:
        break;
    }
  };

  const formatDate = (date, mode) => {
    switch (mode) {
      case 'dayCustom':
        return moment(date).format('DD/MM/YYYY');
      case 'dayNow':
        return moment(date).format('DD/MM/YYYY');
      case 'month':
        return moment(date).format('MM/YYYY');
      case 'year':
        return moment(date).format('YYYY');
      default:
        break;
    }
  };

  const setRenderOrder = (date, orders, mode) => {
    switch (mode) {
      case 'month':
        setMonthRenderOrders(date, orders);
        break;
      case 'year':
        setYearRenderOrders(date, orders);
        break;
      default:
        setDayRenderOrders(date, orders);
        break;
    }
  };

  const setDayRenderOrders = (date, orders) => {
    const newDate = date;
    newDate.setHours(0, 0, 0, 0);

    const result = orders.reduce((result, order) => {
      const dateOrder = new Date(order.time_created);
      dateOrder.setHours(0, 0, 0, 0);
      if (newDate.getTime() === dateOrder.getTime()) {
        return [...result, order];
      }
      return result;
    }, []);

    setDataCsv(result);
  };

  const setMonthRenderOrders = (date, orders) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const result = orders.reduce((result, order) => {
      const dateOrder = new Date(order.time_created);
      const monthOrder = dateOrder.getMonth() + 1;
      const yearOrder = dateOrder.getFullYear();
      if (monthOrder === month && yearOrder === year) {
        return [...result, order];
      }
      return result;
    }, []);
    console.log(result);
    setDataCsv(result);
  };

  const setYearRenderOrders = (date, orders) => {
    const year = date.getFullYear();

    const result = orders.reduce((result, order) => {
      const dateOrder = new Date(order.time_created);
      const yearOrder = dateOrder.getFullYear();
      if (yearOrder === year) {
        return [...result, order];
      }
      return result;
    }, []);

    setDataCsv(result);
  };

  const getTotalPriceOrder = (orders) => {
    return orders.reduce((total, currentOrder) => currentOrder.total_order_price + total, 0);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setRenderOrder(date, orderRedux, mode);
  }, []);

  useEffect(() => {
    setOrders(orderRedux);
  }, [orderRedux]);

  return (
    <View style={styles.container}>
      <Header title={getHeaderTitle(mode)} mode="center-aligned" isShowButtonGoBack={true} props={handleGoBack} />

      <TextInput
        style={styles.filter}
        editable={false}
        value={formatDate(date, mode)}
        mode="outlined"
        right={
          mode !== 'dayNow' &&
          <TextInput.Icon icon='calendar' onPress={() => setShow(true)} />
        }
      />

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <StatisticalTable dataCsv={dataCsv} />
      
      <Divider />
      <View style={styles.total}>
        <Text>Tổng doanh thu:</Text>
        <Text> {formatCurrency({ amount: getTotalPriceOrder(dataCsv), code: 'VND' })[0]}</Text>
      </View>
    </View>
  );
}

export default StatisticalDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  filter: {
    marginVertical8m: 8,
    marginHorizontal: 16,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});
