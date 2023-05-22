import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Divider, HelperText, Text, TextInput, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { SelectCountry } from 'react-native-element-dropdown';

const Form = () => {
  const authSelector = useSelector((state) => state.auth);
  const [isChange, setIsChange] = useState(false);
  const [body, setBody] = useState({
    name: undefined,
    phone_num: undefined,
    username: undefined,
    oldPassword: undefined,
    newPassword: undefined,
  });

  const jobTitle = () => {
    switch (authSelector?.data?.job_title) {
      case 0:
        return 'Quản lý'
      case 1:
        return 'Quản lý'
      case 2:
        return 'Thu ngân'
      case 3:
        return 'Phục vụ'
      case 4:
        return 'Đầu bếp'
      default:
        break;
    }
  }

  const hasNameErrors = () => {
    return body.name === '';
  }
  const hasPhoneErrors = () => {
    return body.phone_num === '';
  }
  const hasUserNameErrors = () => {
    return body.username === '';
  }
  const hasOldPassErrors = () => {
    return body.oldPassword === '';
  }
  const hasNewPassErrors = () => {
    return body.newPassword === '';
  }

  useEffect(() => {
    const newData = {
      ...body,
      name: authSelector?.data?.name,
      phone_num: authSelector?.data?.phone_num,
      username: authSelector?.data?.username,
    }
    setBody(newData);
  }, [authSelector])

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant='titleLarge'>Chức vụ: {jobTitle()} </Text>
      <TextInput
        style={styles.textInput}
        mode='outlined'
        value={body.name}
        label={'Họ và tên'}
        onChange={text => setBody({ ...body, name: text })}
      />
      <TextInput
        style={styles.textInput}
        mode='outlined'
        value={body.phone_num}
        label={'Số điện thoại'}
        onChange={text => setBody({ ...body, num_phone: text })}
      />
      <TextInput
        style={styles.textInput}
        mode='outlined'
        value={body.username}
        label={'Tài khoản'}
        onChange={text => setBody({ ...body, username: text })}
        disabled
      />
      {
        isChange &&
        <>
          <TextInput
            style={styles.textInput}
            mode='outlined'
            value={body.oldPassword}
            label={'Mật khẩu củ'}
            onChange={text => setBody({ ...body, oldPassword: text })}
            error={hasOldPassErrors()}
          />
          <HelperText type="error" visible={hasOldPassErrors()}>
            Mật khẩu không được để trống
          </HelperText>
          <TextInput
            style={styles.textInput}
            mode='outlined'
            value={body.newPassword}
            label={'Mật khẩu mới'}
            onChange={text => setBody({ ...body, oldPassword: text })}
            error={hasNewPassErrors()}
          />
          <HelperText type="error" visible={hasNewPassErrors()}>
            Mật khẩu mới không được để trống
          </HelperText>
        </>
      }
      <Button onPress={() => setIsChange(!isChange)}>
        {!isChange ? 'Đổi mật khẩu' : 'Hủy bỏ'}
      </Button>

      <Button style={styles.access} mode='contained' onPress={() => console.log('Xác nhận')}>Xác nhận</Button>
    </View>
  )
}

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  textInput: {
    width: '100%',
    marginBottom: 16,
  },
  dropdownCompnent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  dropdown: {
    flex: 1,
    borderRadius: 22,
    paddingHorizontal: 8,
    paddingLeft: 16,
    margin: 8,
    maxWidth: 500,
    borderColor: 'black',
    borderWidth: 1,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  title: {
    marginBottom: 16,
  },
  access: {
    marginVertical: 16,
  },
})