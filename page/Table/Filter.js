import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { OPTION_TABLE } from '../../config/config'
import { Chip } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { createAxios } from '../../redux/createInstance'
import { loginSuccess } from '../../redux/slice/authSlice'
import { getAllTable } from '../../redux/api/tableApi'

const Filter = () => {
  const userSelector = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  const [selected, setSelected] = React.useState(-1);

  const renderItem = ({ item }) => {
    const isSelected = item._id === selected;
    const mode = isSelected ? 'flat' : 'outlined';

    const handleActive = async () => {
      setSelected(item._id);
      const param = {};
      if (userSelector?.data?.job_title === 3) {
        param.employee = userSelector?.data._id;
      }
      if (item._id > -1) {
        param.status = item._id;
      }
      await getAllTable(dispatch, param, userSelector?.data?.accessToken, axiosJWT);
    }

    return (
      <Chip
        mode={mode}
        selected={isSelected}
        onPress={handleActive}
        style={{ margin: 8 }}
      >
        {item.title}
      </Chip>
    )
  }

  return (
    <View>
      <FlatList
        data={OPTION_TABLE}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default Filter

const styles = StyleSheet.create({})