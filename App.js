import { Provider } from 'react-redux';
import Home from './page/Home';
import AppContext from './context/AppContext';
import { store } from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppContext>
        <Home />
      </AppContext>
    </Provider>
  );
}
