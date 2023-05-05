import { Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList } from 'react-native-gesture-handler';
import { ACTIVE_TABLE } from '../../config/config';
import { Button, Divider, HelperText, TextInput } from 'react-native-paper';
import { BUTTON, LABEL } from '../../config/lang_vn';
import { formatCurrency } from 'react-native-format-currency';
import { print } from './Invoice';
import { useDispatch, useSelector } from 'react-redux';
import { paymentOrder } from '../../redux/api/orderApi';
import { loginSuccess } from '../../redux/slice/authSlice';
import { createAxios } from '../../redux/createInstance';
import { TableContext } from '../../context/TableContext';

const ModalComp = ({ isShow, handleCloseModal, data, navigation }) => {
  const [isActive, setIsActive] = React.useState(false);
  const [money, setMoney] = React.useState("");
  const auth = useSelector(state => state.auth);
  const order = useSelector(state => state.order);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(auth?.data, dispatch, loginSuccess);
  const [loading, setLoading] = React.useState(false);
  const { getData, setGetData } = React.useContext(TableContext);

  // handle 
  const handleAssert = async () => {
    try {
      setIsActive(false);
      handleCloseModal();
      setMoney('');
      print(false, data, auth, money);
      const params = {
        id: data?._id
      }
      const body = {
        exchange_price: getMoneyReturn(),
        cus_give_price: getTotalPrice(),
      };
      await paymentOrder(dispatch, params, body, auth?.data.accessToken, axiosJWT);
      setGetData(!getData);
      navigation.popToTop();
    } catch (error) {
      console.log('error', error);
    }
  }

  const closeModal = () => {
    handleCloseModal();
    setIsActive(false);
    setMoney('');
  }

  const handlePayment = () => {
    print(false, data, auth, money);
  }

  const getVAT = () => {
    return data?.vat * data?.total_order_price;
  }

  const getTotalPrice = () => {
    return data?.total_order_price + getVAT();
  }

  const getMoneyReturn = () => {
    return +resetMoney() - +getTotalPrice();
  }

  const onChangeText = text => setMoney(text);
  const resetMoney = () => {return money.split(' ').join('')};

  const hasErrors = () => {
    if (!money) return false;
    const total = data?.total_order_price + data?.total_order_price * data?.vat;
    if (+resetMoney() >= total) return false;
    else return true;
  };

  const showMoney = () => {
    const str = String(resetMoney()).replace(/(.)(?=(\d{3})+$)/g,'$1 ');
    return str
  }

  React.useEffect(() => {
    setLoading(order?.isFetching);
  }, [order]);
  

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShow}
      onRequestClose={closeModal}
    >
      <Pressable
        style={styles.centeredView}
        onPress={closeModal}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalView}>
            <View style={{ alignItems: "center", paddingTop: 10, }}>
              <View style={{ height: 4, width: 40, backgroundColor: "#d9d9d9", borderRadius: 10, }}></View>
            </View>
            <View style={styles.modalHeader}>
              <Text style={styles.modalText}>Chức năng</Text>
              <Pressable
                style={styles.buttonClose}
                onPress={closeModal}
              >
                <Icon name="close" size={24} color={"#c4c4c4"} />
              </Pressable>
            </View>
            {isActive ?
              <View style={styles.modalBody}>
                <TextInput
                  mode='outlined'
                  label={LABEL.money_of_cus}
                  value={showMoney()}
                  keyboardType='number-pad'
                  onChangeText={onChangeText}
                  error={hasErrors()}
                  right={<TextInput.Affix text="VNĐ" />}
                  maxLength={13}
                />
                <HelperText type="error" visible={hasErrors()}>
                  Số tiền chưa đủ
                </HelperText>
                <Divider style={{marginBottom: 10,}} />
                <View style={styles.priceBox}>
                  <Text>Tổng tiền:</Text>
                  <Text>{formatCurrency({ amount: data?.total_order_price, code: "VND" })[0]}</Text>
                </View>
                <View style={styles.priceBox}>
                  <Text>VAT:</Text>
                  <Text>{formatCurrency({ amount: getVAT(), code: "VND" })[0]}</Text>
                </View>
                 <View style={styles.priceBox}>
                  <Text>Thành tiền:</Text>
                  <Text>{formatCurrency({ amount: getTotalPrice(), code: "VND" })[0]}</Text>
                </View>
                <Divider style={{marginVertical: 10,}} />
                <View style={styles.priceBox}>
                  <Text>Tiền khách trả:</Text>
                  <Text>{money && formatCurrency({ amount: resetMoney(), code: "VND" })[0]}</Text>
                </View>
                <View style={styles.priceBox}>
                  <Text>Tiền thối lại:</Text>
                  <Text>{money && !hasErrors() && formatCurrency({ amount: getMoneyReturn(), code: "VND" })[0]}</Text>
                </View>
                <Button
                  loading={loading}
                  style={{marginTop: 16,}}
                  disabled={money ? hasErrors() : true}
                  mode='contained-tonal'
                  onPress={handleAssert}
                >{BUTTON.Assert}</Button>
              </View>
              : <View style={styles.modalBody}>
                <Button mode='contained-tonal' style={{ marginBottom: 16, }} onPress={() => setIsActive(true)}>Thanh toán bằng tiền mặt</Button>
                <Button mode='contained-tonal' onPress={handlePayment}>Thanh toán bằng ví Momo</Button>
              </View>
            }
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  )
}

export default ModalComp

const styles = StyleSheet.create({
  // Style Modal
  centeredView: {
    flex: 1,
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#d9d9d9',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
  },
  buttonClose: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingVertical: 10,
    width: 48,
  },
  modalBody: {
    padding: 16,
  },
  modalText: {
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  priceBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})