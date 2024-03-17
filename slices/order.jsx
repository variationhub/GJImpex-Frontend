import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios';
import { modelSlice } from './model';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    data: [],
    loading: false
  },
  reducers: {
    updateOrder(state, action) {
      state.data = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    }
  },
})

export const { updateOrder } = orderSlice.actions

export const fetchOrderData = (load = true) => async (dispatch) => {
  try {
    if (load) {
      dispatch(orderSlice.actions.setLoading(true));
    }
    const response = await axiosInstance.get('/orders');
    dispatch(orderSlice.actions.updateOrder(response.data.data));
    dispatch(orderSlice.actions.setLoading(false));
    return true;
  } catch (err) {
    dispatch(orderSlice.actions.updateOrder([]));
    dispatch(orderSlice.actions.setLoading(false));
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export const createOrderData = (data) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/orders', data);
    if (response.data.status) {
      dispatch(fetchOrderData(false));
    }
    return true;
  } catch (err) {
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export const deleteOrderData = (id) => async (dispatch) => {
  const response = await axiosInstance.delete(`/orders/${id}`);
  if (response.data.status) {
    dispatch(fetchOrderData());
  }
}

export const updateOrderData = (id, data) => async (dispatch) => {
  console.log(id)
  try {
    const response = await axiosInstance.put(`/orders/${id}`, data);
    if (response.data.status) {
      dispatch(fetchOrderData(false));
    }
    return true;
  } catch (err) {
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false
  }
}

export const updateStatus = (id, value, data) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/orders/${id}/status?${value}=${data.isBilledChecked}&billNumber=${data.billNumber}`);
    if (response.data.status) {
      dispatch(fetchOrderData(false));
    }
    return true;
  } catch (err) {
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export default orderSlice.reducer