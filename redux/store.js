import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tableReducer from './slice/tableSlice';
import foodReducer from './slice/foodSlice';
import tableOfEmpReducer from './slice/tableOfEmpSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    table: tableReducer,
    tableOfEmp: tableOfEmpReducer,
    food: foodReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persister = persistStore(store);
