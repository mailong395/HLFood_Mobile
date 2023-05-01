import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailListFood from './DetailListFood';
import Table from './Table/Table';
import ListFood from './ListFood/ListFood';
import ListFoodOrder from './ListFoodOrder/ListFoodOrder';
import ListFoodOrdered from './ListFoodOrdered/listFoodOrdered';
import TableMerge from './TableMerge/index';
import Login from './Login/Login';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Cook from './Cook';
import EmployeeManager from './EmployeeManager/EmployeeManager';
import AssignEmp from './AssignEmp';
import AddEmp from './AddEmp/AddEmp';

// const RenderDrawer = () => {
//   <Drawer.Navigator>
//     <Drawer.Screen name='' component={}/>
//   </Drawer.Navigator>
// }

const Home = ({ openDrawer }) => {
  const userSelector = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(false);
  const [isCook, setIsCook] = useState(false);

  //   if (userSelector?.success && !userSelector?.error && userSelector?.data) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, [userSelector])

  const handleOpenDrawer = () => {
    openDrawer();
  };

  //       );
  //     default:
  //       break;
  //   }
  // }


  // fetch data
  useEffect(() => {
    if (userSelector?.data?.job_title === 4) setIsCook(true);
    else setIsCook(false);

    if (userSelector?.success && !userSelector?.error && userSelector?.data) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [userSelector]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLogin ? (
          <>
            <Stack.Screen name="Login" component={Login} />
          </>
        ) : isCook ? (
          <Stack.Screen name="Cook" component={Cook} />
        ) : (
          <>
            <Stack.Screen name="Table" component={RenderTable} />
            <Stack.Screen name="TableMerge" component={TableMerge} />
            <Stack.Screen name="ListFood" component={ListFood} />
            <Stack.Screen name="DetailListFood" component={DetailListFood} />
            <Stack.Screen name="ListFoodOrder" component={ListFoodOrder} />
            <Stack.Screen name="ListFoodOrdered" component={ListFoodOrdered} />
            <Stack.Screen name="AssignEmp" component={AssignEmp} />
            <Stack.Screen name="AddEmp" component={AddEmp} />
            <Stack.Screen name="EmployeeManager" component={EmployeeManager} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>

    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     {
    //       !isLogin ? (
    //         <>
    //           <Stack.Screen name="Login" component={Login} />
    //         </>
    //       ) : (
    //         isCook ? <Stack.Screen name="Cook" component={RenderCook} />
    //           : <>
    //             <Stack.Screen name="Table" component={RenderTable} />
    //             <Stack.Screen name="TableMerge" component={TableMerge} />
    //             <Stack.Screen name="ListFood" component={ListFood} />
    //             <Stack.Screen name="DetailListFood" component={DetailListFood} />
    //             <Stack.Screen name="ListFoodOrder" component={ListFoodOrder} />
    //             <Stack.Screen name="ListFoodOrdered" component={ListFoodOrdered} />
    //           </>
    //       )
    //     }
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default Home;
