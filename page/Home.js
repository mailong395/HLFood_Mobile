import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailListFood from './DetailListFood';
import Table from "./Table/Table";
import ListFood from './ListFood/ListFood';
import ListFoodOrder from './ListFoodOrder/ListFoodOrder';
import ListFoodOrdered from './ListFoodOrdered/listFoodOrdered';
import TableMerge from './TableMerge/index'
import Login from './Login/Login';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

const Home = () => {
  const userSelector = useSelector(state => state.auth);
  const [isLogin, setIsLogin] = useState(false);

  console.log('isLogin', isLogin);
  console.log('userSelector', userSelector);

  useEffect(() => {
     setIsLogin(userSelector?.success && !userSelector?.error);
  }, [userSelector])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          !isLogin ? (
            <>
              <Stack.Screen name="Login" component={Login} />
            </>
          ) : (
            <>
              <Stack.Screen name="Table" component={Table} />
              <Stack.Screen name="TableMerge" component={TableMerge} />
              <Stack.Screen name="ListFood" component={ListFood} />
              <Stack.Screen name="DetailListFood" component={DetailListFood} />
              <Stack.Screen name="ListFoodOrder" component={ListFoodOrder} />
              <Stack.Screen name="ListFoodOrdered" component={ListFoodOrdered} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Home;