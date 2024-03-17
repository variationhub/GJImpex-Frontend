import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios';
import { modelSlice } from './model';

export const partySlice = createSlice({
  name: 'party',
  initialState: {
    data: [],
    loading: false
  },
  reducers: {
    updateParty(state, action) {
      state.data = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    }
  },
})

export const { updateParty } = partySlice.actions

export const fetchPartyData = (load=true) => async (dispatch) => {
  try {
    if(load){
      dispatch(partySlice.actions.setLoading(true));
    }
    const response = await axiosInstance.get('/party');
    dispatch(partySlice.actions.updateParty(response.data.data));
    dispatch(partySlice.actions.setLoading(false));
    return true;
  } catch (err) {
    dispatch(partySlice.actions.updateParty([]));
    dispatch(partySlice.actions.setLoading(false));
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export const createPartyData = (data) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/party', data);
    if (response.data.status) {
      dispatch(fetchPartyData(false));
    }
    return true;
  } catch (err) {
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export const deletePartyData = (id) => async (dispatch) => {
  const response = await axiosInstance.delete(`/party/${id}`);
  if (response.data.status) {
    dispatch(fetchPartyData());
  }
}

export const updatePartyData = (id, data) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/party/${id}`, data);
    if (response.data.status) {
      dispatch(fetchPartyData(false));
    }
    dispatch(partySlice.actions.setLoading(false));
    return true;
  } catch (err) {
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export default partySlice.reducer