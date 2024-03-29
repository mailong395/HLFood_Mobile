import { Button, Text, TextInput } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Header from '../../common/Header';
import React, { useEffect } from 'react';
import { CMS } from '../../config/config';
import { BUTTON, LABEL } from '../../config/lang_vn';
import { SelectCountry } from 'react-native-element-dropdown';
import { useTheme } from 'react-native-paper';
import { VALIDATE } from '../../config/validate';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee } from '../../redux/api/employeeApi';
import { loginSuccess } from '../../redux/slice/authSlice';
import { createAxios } from '../../redux/createInstance';
import { getAllEmployeeSuccess } from '../../redux/slice/employeeSlice';

function AddCus({ navigation, route }) {
  const userSelector = useSelector((state) => state.auth);
  const employeesApiData = useSelector((state) => state?.employee?.data);

  const { emp } = route?.params;

  const [userName, setUserName] = React.useState('');
  const [nameEmp, setNameEmp] = React.useState('');
  const [numberEmp, setNumberEmp] = React.useState('');
  const [errors, setErrors] = React.useState({
    name: '',
    phoneNumber: '',
    userName: '',
    jobTitle: '',
  });
  const [isShow, setIsShow] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [country, setCountry] = React.useState();
  const [jobTitle, setJobTitle] = React.useState(-1);
  const theme = useTheme();
  const dispatch = useDispatch();

  const accessToken = userSelector?.data?.accessToken;
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

  const jobTitles = [
    {
      key: 0,
      label: 'Quản lý',
    },
    {
      key: 1,
      label: 'Thu ngân',
    },
    {
      key: 2,
      label: 'Phục vụ',
    },
    {
      key: 3,
      label: 'Đầu bếp',
    },
  ];

  const handleOnChange = (value) => {
    setJobTitle(value.key + 1);
    setCountry(value);
    setDefaultError({ jobTitle: '' });
  };
  const handleGoBack = () => {
    setDefaultValue();
    navigation.goBack();
  };

  const validate = (regex, value) => {
    return regex.test(value);
  };

  const checkNullInput = () => {
    let flag = false;
    if (nameEmp.trim() === '') {
      setErrors((prev) => ({ ...prev, name: 'Tên khách hàng không được để trống' }));
      flag = true;
    }

    if (numberEmp.trim() === '') {
      setErrors((prev) => ({ ...prev, phoneNumber: 'Số điện thoại không được để trống' }));
      flag = true;
    }

    if (userName.trim() === '') {
      setErrors((prev) => ({ ...prev, userName: 'Tên đăng nhập không được để trống' }));
      flag = true;
    }

    if (jobTitle === -1) {
      setErrors((prev) => ({ ...prev, jobTitle: 'Hãy chọn chọn chức vụ' }));
      flag = true;
    }

    if (!flag) {
      setDefaultError({ name: '', phoneNumber: '', userName: '', jobTitle: '' });
    }

    return flag;
  };

  const checkValidInput = () => {
    let flag = false;
    if (!validate(VALIDATE.NAME, nameEmp.trim())) {
      setErrors((prev) => ({ ...prev, name: 'Tên khách hàng không được chứa kí tự đặc biệt' }));
      flag = true;
    }

    if (!validate(VALIDATE.PHONE_NUMBER, numberEmp.trim())) {
      setErrors((prev) => ({ ...prev, phoneNumber: 'Số điện thoại sai cấu trúc' }));
      flag = true;
    }

    if (!validate(VALIDATE.USER_NAME, userName.trim())) {
      setErrors((prev) => ({
        ...prev,
        userName: 'Tên đăng nhập sai cấu trúc (Trên 5 kí tự, không có dấu và không có kí tự đặc biệt)',
      }));
      flag = true;
    }

    if (!flag) {
      setDefaultError({ name: '', phoneNumber: '', userName: '', jobTitle: '' });
    }

    return flag;
  };

  const checkSameUserName = (username) => {
    const isSame = employeesApiData.some((emp) => emp.username === username);

    if (isSame) {
      setDefaultError({ userName: 'Tên đăng nhập không được trùng' });
      return true;
    }
    return false;
  };

  const handleEditEmp = () => {
    if (checkNullInput()) return;
    if (checkValidInput()) return;
    if (checkSameUserName(userName.trim()) && userName !== emp.username) return;

    const bodyApi = {
      name: nameEmp,
      phone_num: numberEmp,
    };

    updateEmployee(dispatch, bodyApi, emp._id, accessToken, axiosJWT);
    updateEmpLocal({ ...emp, ...bodyApi });
    handleGoBack();
  };

  const updateEmpLocal = (employee) => {
    const deletedEmps = employeesApiData.filter((emp) => emp._id !== employee._id);
    const newEmps = [...deletedEmps, employee];
    dispatch(getAllEmployeeSuccess(newEmps));
  };

  const setDefaultError = (error) => {
    setErrors((prev) => ({ ...prev, ...error }));
  };

  const setDefaultValue = () => {
    setNameEmp('');
    setNumberEmp('');
    setJobTitle(-1);
  };

  useEffect(() => {
    if (emp) {
      setNameEmp(emp.name);
      setNumberEmp(emp.phone_num);
      setUserName(emp.username);
      setJobTitle(emp.job_title);
      setCountry(emp.job_title - 1);
    }
  }, [emp]);

  return (
    <View style={styles.container}>
      <Header title={CMS.editCus} mode="center-aligned" isShowButtonGoBack={true} props={handleGoBack} />

      <View style={{ padding: 20 }}>
        {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
        <TextInput
          value={nameEmp}
          style={styles.textInput}
          mode="outlined"
          label={LABEL.name_cus}
          onChangeText={(text) => {
            setNameEmp(text);
            setDefaultError({ name: '' });
          }}
        />
        {errors.phoneNumber && <Text style={{ color: 'red' }}>{errors.phoneNumber}</Text>}
        <TextInput
          value={numberEmp}
          style={styles.textInput}
          mode="outlined"
          label={LABEL.number_emp}
          onChangeText={(text) => {
            setNumberEmp(text);
            setDefaultError({ phoneNumber: '' });
          }}
        />

        <Button loading={loading} style={styles.button} mode="contained" onPress={handleEditEmp}>
          {BUTTON.editCus}
        </Button>
      </View>
    </View>
  );
}

export default AddCus;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  textInput: {
    marginBottom: 16,
  },
  button: {
    marginTop: 32,
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
});
