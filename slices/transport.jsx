import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios';
import { modelSlice } from './model';

export const transportSlice = createSlice({
  name: 'transport',
  initialState: {
    data: [],
    loading: false
  },
  reducers: {
    updateTransport(state, action) {
      state.data = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    }
  },
})

export const { updateTransport } = transportSlice.actions

export const fetchTransportData = (load=true) => async (dispatch) => {
  try {
    if(load){
      dispatch(transportSlice.actions.setLoading(true));
    }
    const response = await axiosInstance.get('/transports');
    dispatch(transportSlice.actions.updateTransport(response.data.data));
    dispatch(transportSlice.actions.setLoading(false));
    return true;
  } catch (err) {
    dispatch(transportSlice.actions.updateTransport([]));
    dispatch(transportSlice.actions.setLoading(false));
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export const createTransportData = (data) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/transports', data);
    if (response.data.status) {
      dispatch(fetchTransportData(false));
    }
    return true;
  } catch (err) {
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export const deleteTransportData = (id) => async (dispatch) => {
  const response = await axiosInstance.delete(`/transports/${id}`);
  if (response.data.status) {
    dispatch(fetchTransportData());
  }
}

export const updateTransportData = (id, data) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/transports/${id}`, data);
    if (response.data.status) {
      dispatch(fetchTransportData(false));
    }
    dispatch(transportSlice.actions.setLoading(false));
    return true;
  } catch (err) {
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export default transportSlice.reducer