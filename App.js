import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import Home from './page/Home';
import ListFood from './page/ListFood';
import { store } from './redux/store'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'HLFood',
              headerStyle: {
                backgroundColor: '#CB3737',
              },
              headerTintColor: '#FAFAFA',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="ListFood"
            component={ListFood}
            options={{
              title: 'Danh Sách Món Ăn',
              headerStyle: {
                backgroundColor: '#CB3737',
              },
              headerTintColor: '#FAFAFA',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}