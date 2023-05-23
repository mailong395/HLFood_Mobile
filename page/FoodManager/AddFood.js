import { ActivityIndicator, Button, MD2Colors, Text, TextInput } from 'react-native-paper';
import { Image, SafeAreaView, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import Header from '../../common/Header';
import React from 'react';
import { CMS } from '../../config/config';
import { BUTTON, LABEL } from '../../config/lang_vn';
import DropdownComponent from '../../component/DropdownComponent';
import { SelectCountry } from 'react-native-element-dropdown';
import { useTheme } from 'react-native-paper';
import { VALIDATE } from '../../config/validate';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, updateEmployee } from '../../redux/api/employeeApi';
import { loginSuccess } from '../../redux/slice/authSlice';
import { createAxios } from '../../redux/createInstance';
import { useEffect } from 'react';
import { getAllEmployeeSuccess } from '../../redux/slice/employeeSlice';
import * as ImagePicker from 'expo-image-picker';
import IconFeather from 'react-native-vector-icons/Feather';
import { addFood, updateFood } from '../../redux/api/foodApi';
import { uploadFile } from '../../redux/api/fileApi';
import { getAllFoodSuccess } from '../../redux/slice/foodSlice';

const DEFAULT_IMG = 'https://storage.googleapis.com/hlfood-image/empty.jpg';

function AddFood({ navigation, route }) {
  const userSelector = useSelector((state) => state.auth);
  const foodsApiData = useSelector((state) => state?.food?.data);

  const { food } = route?.params;

  const [nameFood, setNameFood] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [errors, setErrors] = React.useState({
    name: '',
    price: '',
    typeFood: '',
  });
  const [isShow, setIsShow] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [country, setCountry] = React.useState();
  const [typeFood, setTypeFood] = React.useState(-1);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [urlImage, setUrlImage] = React.useState(DEFAULT_IMG);
  const [image, setImage] = React.useState({});

  const accessToken = userSelector?.data?.accessToken;
  const axiosJWT = createAxios(userSelector?.data, dispatch, loginSuccess);

  const typeFoods = [
    {
      key: 0,
      label: 'Thức ăn',
    },
    {
      key: 1,
      label: 'Đồ uống',
    },
  ];

  const handleOnChange = (value) => {
    setTypeFood(value.key);
    setCountry(value);
    setDefaultError({ typeFood: '' });
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

    if (nameFood.trim() === '') {
      setErrors((prev) => ({ ...prev, name: 'Tên nhân viên không được để trống' }));
      flag = true;
    }

    if (price.trim() === '') {
      setErrors((prev) => ({ ...prev, price: 'Giá tiền không được để trống' }));
      flag = true;
    }

    if (typeFood === -1) {
      setErrors((prev) => ({ ...prev, typeFood: 'Hãy chọn chọn loại món ăn' }));
      flag = true;
    }

    if (!flag) {
      setDefaultError({ name: '', price: '', typeFood: '' });
    }

    return flag;
  };

  const checkValidInput = () => {
    let flag = false;
    if (!validate(VALIDATE.NAME, nameFood.trim())) {
      setErrors((prev) => ({ ...prev, name: 'Tên món ăn không được chứa kí tự đặc biệt' }));
      flag = true;
    }

    if (!validate(VALIDATE.PRICE, price.trim())) {
      setErrors((prev) => ({ ...prev, price: 'Giá tiền sai cấu trúc' }));
      flag = true;
    }

    if (!flag) {
      setDefaultError({ name: '', price: '', typeFood: '' });
    }

    return flag;
  };

  const handleAddFood = () => {
    if (checkNullInput()) return;
    if (checkValidInput()) return;

    addFoodApi();
    handleGoBack();
  };

  const handleEditFood = () => {
    if (checkNullInput()) return;
    if (checkValidInput()) return;

    editFoodApi();
    handleGoBack();
  };

  const updateFoodLocal = (food) => {
    const deletedFoods = foodsApiData.filter((item) => item._id !== food._id);
    const newFoods = [...deletedFoods, food];
    dispatch(getAllFoodSuccess(newFoods));
  };

  const addFoodApi = async () => {
    let bodyApi = {
      name: nameFood.trim(),
      price: parseFloat(price.trim()),
      type: typeFood,
    };

    if (Object.keys(image).length === 0 && image.constructor === Object) {
      bodyApi.image = DEFAULT_IMG;
      addFood(dispatch, bodyApi, accessToken, axiosJWT);
    } else {
      const bodyFormData = new FormData();
      bodyFormData.append('file', image);
      const uploadImage = await uploadFile(accessToken, dispatch, axiosJWT, bodyFormData);

      window.setTimeout(async function () {
        bodyApi.image = uploadImage.url[0];
        setUrlImage(uploadImage.url[0]);
        addFood(dispatch, bodyApi, accessToken, axiosJWT);
      }, 1000);
    }
  };

  const editFoodApi = async () => {
    let bodyApi = {
      name: nameFood.trim(),
      price: parseFloat(price.trim()),
      type: typeFood,
    };

    if (food.image === urlImage) {
      updateFood(dispatch, bodyApi, food._id, accessToken, axiosJWT);
      updateFoodLocal({ ...food, ...bodyApi });
    } else {
      const bodyFormData = new FormData();
      bodyFormData.append('file', image);
      const uploadImage = await uploadFile(accessToken, dispatch, axiosJWT, bodyFormData);

      window.setTimeout(async function () {
        bodyApi.image = uploadImage.url[0];
        setUrlImage(uploadImage.url[0]);
        updateFood(dispatch, bodyApi, food._id, accessToken, axiosJWT);
        updateFoodLocal({ ...food, ...bodyApi });
      }, 1000);
    }
  };

  const setDefaultError = (error) => {
    setErrors((prev) => ({ ...prev, ...error }));
  };

  const setDefaultValue = () => {
    setNameFood('');
    setPrice('');
    setTypeFood(-1);
  };

  const configImageToFile = (files) => {
    let localUri = files.assets[0].uri;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    return { type: type, uri: localUri, name: filename };
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });


    if (!result.canceled) {
      const files = result;
      const file = configImageToFile(files);
      setUrlImage(file.uri);
      setImage(file);
    }
  };

  useEffect(() => {
    if (food) {
      setNameFood(food.name);
      setPrice(food.price.toString());
      setTypeFood(food.type);
      setCountry(food.type);
      setUrlImage(food.image);
    }
  }, [food]);

  return (
    <View style={styles.container}>
      <Header
        title={food ? CMS.editFood : CMS.addFood}
        mode="center-aligned"
        isShowButtonGoBack={true}
        props={handleGoBack}
      />

      <View style={{ padding: 20 }}>
        <View style={{ alignItems: 'center', paddingVertical: 30 }}>
          <View style={{ width: 320, height: 320 }}>
            <Image source={{ uri: urlImage }} style={{ flex: 1 }} resizeMode="contain" />
            <TouchableOpacity style={{ position: 'absolute', bottom: 0, right: 0 }} onPress={pickImage}>
              <IconFeather name="edit-3" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
        <TextInput
          value={nameFood}
          style={styles.textInput}
          mode="outlined"
          label={LABEL.name_food}
          onChangeText={(text) => {
            setNameFood(text);
            setDefaultError({ name: '' });
          }}
        />
        {errors.price && <Text style={{ color: 'red' }}>{errors.price}</Text>}
        <TextInput
          value={price}
          style={styles.textInput}
          mode="outlined"
          label={LABEL.price}
          onChangeText={(text) => {
            setPrice(text);
            setDefaultError({ price: '' });
          }}
        />
        {errors.typeFood && <Text style={{ color: 'red' }}>{errors.typeFood}</Text>}
        <View style={styles.dropdownCompnent}>
          <SelectCountry
            style={[styles.dropdown]}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            maxHeight={200}
            value={country}
            data={typeFoods}
            valueField="key"
            labelField="label"
            placeholder={'Chọn loại thức ăn'}
            searchPlaceholder="Search..."
            onChange={(e) => handleOnChange(e)}
          />
        </View>

        {food ? (
          <Button loading={loading} style={styles.button} mode="contained" onPress={handleEditFood}>
            {BUTTON.editFood}
          </Button>
        ) : (
          <Button loading={loading} style={styles.button} mode="contained" onPress={handleAddFood}>
            {BUTTON.addFood}
          </Button>
        )}
      </View>
    </View>
  );
}

export default AddFood;

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
