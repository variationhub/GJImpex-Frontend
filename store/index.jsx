import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../slices/login'
import userReducer from '../slices/user'
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        login: loginReducer,
        user: userReducer
    }
});

export default store;
export const useAppDispatch = () => useDispatch();

