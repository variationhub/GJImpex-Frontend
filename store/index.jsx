import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../slices/login'
import userReducer from '../slices/user'
import productReducer from '../slices/product'
import taskReducer from '../slices/task'
import orderReducer from '../slices/order'
import modelReducer from '../slices/model'
import transportReducer from '../slices/transport'
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        login: loginReducer,
        product: productReducer,
        user: userReducer,
        order: orderReducer,
        model: modelReducer,
        transport: transportReducer,
        task: taskReducer
    }
});

export default store;
export const useAppDispatch = () => useDispatch();

