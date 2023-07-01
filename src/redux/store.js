import { combineReducers, configureStore } from "@reduxjs/toolkit"
import cartSlice from "./slices/cartSlice";
import favsSlice from './slices/favsSlice'
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/lib/persistStore';

const reducers = combineReducers({
    cart: cartSlice,
    favs: favsSlice,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart', 'favs'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store);