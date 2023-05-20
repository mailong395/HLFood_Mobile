import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { formatCurrency } from "react-native-format-currency";
import { IconButton, TextInput, useTheme } from "react-native-paper";
import { Card, Text } from 'react-native-paper';
import { SelectCountry } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { CONTENT, LABEL, TOAST } from "../../config/lang_vn";
import { deleteOrderDetail, updateOrderDetail } from "../../redux/api/orderApi";
import { Toast } from "../../common/toast";
import { createAxios } from "../../redux/createInstance";
import { loginSuccess } from "../../redux/slice/authSlice";
import { getOrderByIdSuccess } from "../../redux/slice/orderSlice";

const ItemFood = ({
  isEdit = false,
  itemOrderDetail = {},
}) => {
  const [infoOD, setInfoOD] = useState(itemOrderDetail);
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  const selector = useSelector((state) => state?.order);
  const [note, setNote] = useState(false);
  const [edit, setEdit] = useState(isEdit);
  const theme = useTheme();
  const [quantity, setQuantity] = useState(0);
  const [country, setCountry] = useState('');
  const [textDescription, setDescription] = useState();
  const dataSelected = [];
  for (let index = 0; index < quantity; index++) {
    const value = index + 1;
    dataSelected.push({
      value: '' + value,
      label: '' + value,
    })
  }

  const handleDone = async () => {
    try {
      note && setNote(false);
      setEdit(!edit);
      const newOrder = selector?.data;
      const newListOrderDetail = [];
      console.log('orderChange', orderChange);
      newOrder.order_details.forEach(element => {
        const newOD = { ...element }
        if (element._id === itemOrderDetail._id) {
          newOD.quantity = +country + infoOD.quantity_finished;
          newOD.description = textDescription;
        }
        newListOrderDetail.push(newOD);
      });
      const orderChange = {
        ...newOrder,
        order_details: [...newListOrderDetail],
      };
      console.log('orderChange', orderChange);
      console.log('newListOrderDetail', newListOrderDetail);
      dispatch(getOrderByIdSuccess(orderChange));
      await updateOrderDetail(dispatch, newListOrderDetail, userSelector?.data?.accessToken, axiosJWT);
      Toast(TOAST.update_success);
    } catch (error) {
      Toast(TOAST.update_failed);
      console.log('error', error);
    }
  }

  const onRemove = () => {
    const newOrder = selector?.data;
    const newListOrderDetail = [];
    newOrder.order_details.forEach(element => {
      if (element._id !== itemOrderDetail._id) {
        newListOrderDetail.push(element);
      }
    });
    const orderChange = {
      ...newOrder,
      order_details: [...newListOrderDetail],
    };
    deleteOrderDetail(dispatch, infoOD._id, userSelector?.data.accessToken, axiosJWT);
    dispatch(getOrderByIdSuccess(orderChange));
  }

  useEffect(() => {
    if (itemOrderDetail) {
      const calculate = itemOrderDetail?.quantity - itemOrderDetail?.quantity_finished;
      setInfoOD(itemOrderDetail);
      setDescription(itemOrderDetail?.description);
      setCountry('' + calculate);
      setQuantity(calculate);
    }
  }, [itemOrderDetail])


  return (
    <Card mode="contained" style={styles.container}>
      <Card.Cover source={{ uri: infoOD?.food?.image }} />
      <Card.Content style={styles.content}>
        <Text variant="titleLarge">{infoOD?.food?.name}</Text>
        <Text variant="titleMedium">{formatCurrency({ amount: infoOD?.food?.price, code: "VND" })[0]}</Text>
        {!edit && <Text>{CONTENT.quantity} : <Text variant="titleMedium">{quantity}</Text></Text>}
        {infoOD?.description && !edit && <Text variant="titleMedium">{infoOD?.description}</Text>}
      </Card.Content>
      {
        note && <Card.Content>
          <TextInput
            label={LABEL.detailsFood}
            value={textDescription}
            mode="outlined"
            onChangeText={text => setDescription(text)}
          />
        </Card.Content>
      }

      {edit ?
        <Card.Actions>
          <>
            <SelectCountry
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              placeholderStyle={styles.placeholderStyle}
              value={country}
              data={dataSelected}
              valueField="value"
              labelField="label"
              onChange={e => {
                setCountry(e.value);
              }}
            />
            <IconButton
              icon="check-bold"
              onPress={handleDone}
            />
          </>
          {!note &&
            <IconButton
              mode="contained"
              icon="square-edit-outline"
              size={24}
              onPress={() => setNote(!note)}
            />}
        </Card.Actions>
        :
        <Card.Actions>
          <IconButton
            mode="contained"
            icon="pencil-outline"
            size={24}
            onPress={() => setEdit(true)}
          />
          <IconButton
            mode="contained"
            icon="delete-outline"
            size={24}
            iconColor={theme.colors.error}
            onPress={onRemove}
          />
        </Card.Actions>
      }
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  content: {
    marginVertical: 8,
  },
  image: {
    height: 46,
    width: 46,
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#343434",
  },
  textPrice: {
    fontSize: 14,
    fontWeight: '500',
    color: "#343434",
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 40,
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 4,
  },
  titleButton: {
    fontSize: 18,
    fontWeight: "500",
  },
  dropdown: {
    margin: 16,
    height: 40,
    width: 80,
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default ItemFood;