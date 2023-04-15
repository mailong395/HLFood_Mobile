import { Provider } from 'react-redux';
import Home from './page/Home';
import AppContext from './context/AppContext';
import { store } from './redux/store';
import {
   MD3LightTheme as DefaultTheme,
   Provider as PaperProvider
} from 'react-native-paper';
import { name as appName } from './app.json';
import { AppRegistry } from 'react-native';

export default function App() {
   return (
      <Provider store={store}>
         <PaperProvider>
            <AppContext>
               <Home />
            </AppContext>
         </PaperProvider>
      </Provider>
   );
}

AppRegistry.registerComponent(appName, () => App);