import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, HelperText, Text, TextInput } from 'react-native-paper'
import { useState } from 'react';
import { BUTTON, LABEL, TOAST } from '../../config/lang_vn';
import { CHAIR, FLOOR } from '../../config/config';
import { SelectCountry } from 'react-native-element-dropdown';
import { addTable, updateTableDetail } from '../../redux/api/tableApi';
import { useDispatch, useSelector } from 'react-redux';
import { createAxios } from '../../redux/createInstance';
import { loginSuccess } from '../../redux/slice/authSlice';
import { useContext } from 'react';
import { TableContext } from '../../context/TableContext';
import { getAllTableMergeSuccess } from '../../redux/slice/tableMergeSlice';
import { getAllTableSuccess } from '../../redux/slice/tableSlice';
import { useEffect } from 'react';
import { Toast } from '../../common/toast';

const Form = ({ onPress, data }) => {
  console.log('data', data);

  const [body, setBody] = useState({
    numTables: '',
    floor: 1,
    chair: 2,
  });
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const userSelector = useSelector(state => state.auth);
  const tableSelector = useSelector((state) => state.table);
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);
  const [loading, setLoading] = useState(false);

  const handleInput = text => {
    const pattern = /^[0-9]{1,2}$/;
    if (!pattern.test(text)) {
      setError(true);
    } else {
      setError(false);
    }
    setBody({ ...body, numTables: +text });
  }

  const handleAddTable = async () => {
    if (data.is_edit) {
      const data = {
        floor: body.floor,
        chair: body.chair,
      }
      const newData = [...tableSelector?.data];
      newData.forEach(element => {
        if (element._id === body._id) {
          element.chair = body.chair
          element.floor = body.floor
        }
      });
      dispatch(getAllTableSuccess(newData));
      try {
        await updateTableDetail(body._id, data, userSelector?.data?.accessToken, axiosJWT);
        Toast(TOAST.update_success);
      } catch (error) {
        Toast(TOAST.update_failed);
      }
    } else {
      const pattern = /^[0-9]{1,2}$/;
      if (!pattern.test(body.numTables)) {
        setError(true);
      } else {
        const res = await addTable(dispatch, body, userSelector?.data?.accessToken, axiosJWT);
        const newData = [...tableSelector?.data];
        res?.forEach(element => {
          newData.push(element);
        });
        dispatch(getAllTableSuccess(newData));
      }
    }
    onPress();
  }

  useEffect(() => {
    if (data.is_edit) {
      setBody(data)
    }
  }, [data])
  

  return (
    <View style={styles.container}>

      {
        !data.is_edit &&
        <>
          <TextInput
            error={error}
            mode='outlined'
            keyboardType='number-pad'
            style={styles.fullWidth}
            label={LABEL.add_table}
            value={body.numTables}
            onChangeText={handleInput}
          />
          <HelperText style={styles.fullWidth} type="error" visible={error}>
            {
              body.numTables === '' ?
                TOAST.error_empty
                : TOAST.error_num_tables
            }
          </HelperText>
        </>
      }
      <Text
        variant='bodyLarge'
        style={styles.title}
      > {LABEL.num_floor} </Text>
      <SelectCountry
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        value={body.floor}
        data={FLOOR}
        valueField="key"
        labelField="value"
        onChange={event => {
          setBody({ ...body, floor: +event.value })
        }}
      />
      <Text
        variant='bodyLarge'
        style={styles.title}
      > {LABEL.num_chair} </Text>
      <SelectCountry
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        value={body.chair}
        data={CHAIR}
        valueField="key"
        labelField="value"
        onChange={event => {
          setBody({ ...body, chair: +event.value })
        }}
      />
      <Button style={styles.button} mode="contained" onPress={handleAddTable}>
        {BUTTON.add_table}
      </Button>
    </View>
  )
}

export default Form

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  fullWidth: {
    width: '100%',
  },
  button: {
    marginVertical: 16,
    paddingHorizontal: 32,
  },
  title: {
    width: '100%',
    marginBottom: 4,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingVertical: 4,
    paddingHorizontal: 16,
    width: '100%',
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
})