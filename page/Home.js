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
import Cook from './Cook';

const Stack = createNativeStackNavigator();

const Home = ({ openDrawer }) => {
  const userSelector = useSelector(state => state.auth);
  const [isLogin, setIsLogin] = useState(false);
  const [isCook, setIsCook] = useState(false);

  console.log('userSelector', userSelector);

  const handleOpenDrawer = () => {
    openDrawer();
  }

  const RenderTable = ({ navigation }) => {
    return <Table navigation={navigation} openDrawer={handleOpenDrawer} />
  }

  useEffect(() => {
    if (userSelector?.data?.job_title === 4) setIsCook(true)
    else setIsCook(false)

    if (userSelector?.success && !userSelector?.error && userSelector?.data) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
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
            isCook ? <Stack.Screen name="Cook" component={Cook} />
              : <>
                <Stack.Screen name="Table" component={RenderTable} />
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