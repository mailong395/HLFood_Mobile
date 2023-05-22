import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tableReducer from './slice/tableSlice';
import foodReducer from './slice/foodSlice';
import orderReducer from './slice/orderSlice';
import tableOfEmpReducer from './slice/tableOfEmpSlice';
import tableMergeReducer from './slice/tableMergeSlice';
import authReducer from './slice/authSlice';
import orderDetail from './slice/orderDetailSlice';
import employeeReducer from './slice/employeeSlice';
import fileReducer from './slice/fileSlice';
import notifiedReducer from './slice/notifiedSlice';
import bookingReducer from './slice/bookingSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  table: tableReducer,
  tableMerge: tableMergeReducer,
  tableOfEmp: tableOfEmpReducer,
  food: foodReducer,
  order: orderReducer,
  auth: authReducer,
  orderDetail: orderDetail,
  employee: employeeReducer,
  file: fileReducer,
  notified: notifiedReducer,
  booking: bookingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export let persister = persistStore(store);
