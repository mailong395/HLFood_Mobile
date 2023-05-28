import { StyleSheet } from 'react-native'
import React from 'react'
import { SelectCountry } from 'react-native-element-dropdown'
import { FLOOR_READ_ONLY } from '../../config/config'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAxios } from '../../redux/createInstance'
import { loginSuccess } from '../../redux/slice/authSlice'
import { getAllTable } from '../../redux/api/tableApi'

const Filter = () => {
  useSelector(state => state.table);
  const [selected, setSelected] = useState(1);
  const userSelector = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

  const handleChange = async (event) => {
    setSelected(event.key);
    await getAllTable(dispatch, { floor: event.key }, userSelector?.data?.accessToken, axiosJWT);
  }

  return <SelectCountry
    style={styles.dropdown}
    selectedTextStyle={styles.selectedTextStyle}
    placeholderStyle={styles.placeholderStyle}
    value={selected}
    data={FLOOR_READ_ONLY}
    valueField="key"
    labelField="value"
    onChange={handleChange}
  />
}

export default Filter

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
})