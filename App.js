import { Provider } from 'react-redux';
import Home from './page/Home';
import AppContext from './context/AppContext';
import { store } from './redux/store';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider
} from 'react-native-paper';
import { name as appName } from './app.json';
import { AppRegistry, DrawerLayoutAndroid } from 'react-native';
import LeftDrawer from './component/LeftDrawer';
import { useRef } from 'react';

export default function App() {
  const drawer = useRef(null);
  
  const renderDrawer = () => {
    return <LeftDrawer closeDrawer={handleCloseDrawer} />
  }

  const handleOpenDrawer = () => {
    drawer.current.openDrawer();
  }
  const handleCloseDrawer = () => {
    drawer.current.closeDrawer();
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <AppContext>
          <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition={'left'}
            renderNavigationView={renderDrawer}
          >
            <Home openDrawer={handleOpenDrawer} closeDrawer={handleCloseDrawer} />
          </DrawerLayoutAndroid>
        </AppContext>
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);