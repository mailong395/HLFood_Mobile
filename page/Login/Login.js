import { Image, SafeAreaView, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import React from 'react';
import { ActivityIndicator, Button, MD2Colors, Text, TextInput } from 'react-native-paper';
import { BUTTON, HEADER_TITLE, LABEL, TOAST } from '../../config/lang_vn';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/api/authApi';

const Login = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isShow, setIsShow] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const loginSuccess = () => {
    ToastAndroid.showWithGravity(TOAST.login_success, ToastAndroid.SHORT, ToastAndroid.TOP);
  };

  const loginFail = () => {
    ToastAndroid.showWithGravity(TOAST.login_fail, ToastAndroid.SHORT, ToastAndroid.TOP);
  };

  const handleLogin = () => {
    loginUser(dispatch, userName, password);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.Logo}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://storage.googleapis.com/hlfood-image/Logo_vs2.png',
          }}
        />
      </View>

      <Text style={styles.title} variant="displaySmall">
        {HEADER_TITLE.Login}
      </Text>

      <ScrollView style={styles.section}>
        <TextInput
          value={userName}
          style={styles.textInput}
          mode="outlined"
          label={LABEL.user_name}
          onChangeText={(text) => setUserName(text)}
        />
        <TextInput
          value={password}
          style={styles.textInput}
          mode="outlined"
          label={LABEL.password}
          secureTextEntry={isShow}
          onChangeText={(text) => setPassword(text)}
          right={<TextInput.Icon icon="eye" onPress={() => setIsShow(!isShow)} />}
        />
        <Button loading={loading} style={styles.button} mode="contained" onPress={handleLogin}>
          {BUTTON.Login}
        </Button>
      </ScrollView>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f32349',
    padding: 16,
  },
  Logo: {
    width: '100%',
    height: 300,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 32,
  },
  section: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  textInput: {
    marginBottom: 16,
  },
  button: {
    marginTop: 32,
  },
});
