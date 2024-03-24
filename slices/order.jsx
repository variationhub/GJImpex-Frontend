import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios';
import { modelSlice } from './model';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    data: [],
    loading: false,
    pendingData: [],
    doneData: []
  },
  reducers: {
    updateOrder(state, action) {
      state.data = action.payload;
    },
    updatePending(state, action) {
      state.pendingData = action.payload;
    },
    updateDone(state, action) {
      state.doneData = action.payload;
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
    const response = await axiosInstance.get(`/orders`);
    const doneData = response.data.data.filter(item => item.status === 'DONE')
    const pendingData = response.data.data.filter(item => item.confirmOrder === false)
    const data = response.data.data.filter(item => item.confirmOrder === true && item.status !== 'DONE')
    dispatch(orderSlice.actions.updateOrder(data));
    dispatch(orderSlice.actions.updatePending(pendingData));
    dispatch(orderSlice.actions.updateDone(doneData));
    dispatch(orderSlice.actions.setLoading(false));
    return true;
  } catch (err) {
    dispatch(orderSlice.actions.updateOrder([]));
    dispatch(orderSlice.actions.setLoading(false));
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export const createOrderData = (data, pending = false) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/orders', data);
    if (response.data.status) {
      dispatch(fetchOrderData(false, pending));
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

export const updateOrderData = (id, data, pending = true) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/orders/${id}`, data);
    if (response.data.status) {
      dispatch(fetchOrderData(false, pending));
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