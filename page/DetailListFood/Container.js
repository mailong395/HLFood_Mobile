import { StyleSheet, Text, View } from "react-native";
import { formatCurrency } from "react-native-format-currency";
import { Button } from "react-native-paper";
import { TABLE } from "../../config/lang_vn";
import List from "./List";
import { print } from "./Invoice";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { Divider } from 'react-native-paper';


const Container = ({ data, openModal }) => {
  const auth = useSelector(state => state.auth);
  const { readOnly } = useRoute().params;

  const d = new Date(data?.time_booking);
  const dateStr = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " +
    d.getHours() + ":" + d.getMinutes();

  const getListTable = () => {
    const array = data?.tables?.map(element => {
      return element?.table_num;
    })
    return array?.join();
  }

  const getTotal = () => {
    let total = 0;
    data?.order_details?.map((item) => {
      total += item?.total_detail_price;
    })
    return total;
  }

  const getVAT = () => {
    return data?.vat * getTotal();
  }

  const getTotalPrice = () => {
    return getTotal() + getVAT();
  }

  const getPriceReturn = () => {
    return (+data?.cus_give_price - +getTotalPrice());
  }

  return <View style={styles.container}>
    <View style={styles.info}>
      <Text style={styles.title}>Thông tin chung</Text>
      <View style={{ paddingHorizontal: 10, }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.supTitle}>{TABLE.id_order}</Text>
          <Text>:      </Text>
          <Text style={styles.content}>{data?.name_customer ? data?.name_customer : ''}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.supTitle}>{TABLE.Time}</Text>
          <Text>:      </Text>
          <Text style={styles.content}>{dateStr}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.supTitle}>{TABLE.Table}</Text>
          <Text>:      </Text>
          <Text style={styles.content}>{getListTable()}</Text>
        </View>
      </View>
    </View>
    <View style={[styles.info, { flex: 1, }]}>
      <Text style={styles.title}>Danh sách món ăn</Text>
      <List data={data?.order_details} />
    </View>
    <Text style={styles.textTotal}>Tổng tiền: {formatCurrency({ amount: getTotal(), code: "VND" })[0]}</Text>
    <Text style={styles.textTotal}>Thuế: {formatCurrency({ amount: getVAT(), code: "VND" })[0]}</Text>
    <Text style={styles.textTotal}>Thành tiền: {formatCurrency({ amount: getTotalPrice(), code: "VND" })[0]}</Text>
    {
      readOnly &&
      <>
        <Divider />
        <Text style={styles.textTotal}>Tiền Khách trả: {formatCurrency({ amount: +data.cus_give_price, code: "VND" })[0]}</Text>
        <Text style={styles.textTotal}>Tiền thối: {formatCurrency({ amount: getPriceReturn(), code: "VND" })[0]}</Text>
      </>
    }
    {
      auth?.data?.job_title !== 3 && !readOnly &&
      <View style={styles.listButton}>
        <Button style={{ flex: 1, marginRight: 8, }} mode="contained" onPress={() => openModal()}>Thanh toán</Button>
        <Button style={{ flex: 1, marginLeft: 8, }} mode="contained" onPress={() => print(true, data, auth)}>In hóa đơn tạm tính</Button>
      </View>
    }
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  info: {
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  supTitle: {
    flex: 1.5,
    paddingVertical: 2,
  },
  content: {
    flex: 2
  },
  textTotal: {
    textAlign: "right",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  listButton: {
    flexDirection: 'row',
  }
});

export default Container;