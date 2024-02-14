import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../slices/login'
import userReducer from '../slices/user'
import productReducer from '../slices/product'
import orderReducer from '../slices/order'
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        login: loginReducer,
        product: productReducer,
        user: userReducer,
        order: orderReducer
    }
});

export default store;
export const useAppDispatch = () => useDispatch();

