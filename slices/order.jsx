import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    data: []
  },
  reducers: {
    updateOrder(state, action) {
      state.data = action.payload;
    }
  },
})

export const { updateOrder } = orderSlice.actions

export const fetchOrderData = () => async(dispatch) => {
    const response = await axiosInstance.get('/orders');
    dispatch(orderSlice.actions.updateOrder(response.data.data));
}

export const createOrderData = (data) => async(dispatch) => {
  console.log(data);
  const response = await axiosInstance.post('/orders',data);
  console.log(response);
  if(response.data.status){
    dispatch(fetchOrderData());
  }
}

export const deleteOrderData = (id) => async(dispatch) => {
  const response = await axiosInstance.delete(`/orders/${id}`);
  if(response.data.status){
    dispatch(fetchOrderData());
  }
}

export const updateOrderData = (id, data) => async(dispatch) => {
  const response = await axiosInstance.put(`/orders/${id}`, data);
  if(response.data.status){
    dispatch(fetchOrderData());
  }
}

export const updateStatus = (id, value, data) => async(dispatch) => {
  const response = await axiosInstance.put(`/orders/${id}/status?${value}=${data}`);
  if(response.data.status){
    dispatch(fetchOrderData());
  }
}

export default orderSlice.reducer