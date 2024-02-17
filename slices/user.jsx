import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios';
import { modelSlice } from './model';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
    loading: false
  },
  reducers: {
    updateUser(state, action) {
      state.data = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    }
  },
})

export const { updateUser } = userSlice.actions

export const fetchUserData = (load=true) => async (dispatch) => {
  try {
    if(load){
      dispatch(userSlice.actions.setLoading(true));
    }
    const response = await axiosInstance.get('/users');
    dispatch(userSlice.actions.updateUser(response.data.data));
    dispatch(userSlice.actions.setLoading(false));
    return true;
  } catch (err) {
    dispatch(userSlice.actions.updateUser([]));
    dispatch(userSlice.actions.setLoading(false));
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export const createUserData = (data) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/users', data);
    if (response.data.status) {
      dispatch(fetchUserData(false));
    }
    return true;
  } catch (err) {
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export const deleteUserData = (id) => async (dispatch) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  if (response.data.status) {
    dispatch(fetchUserData());
  }
}

export const updateUserData = (id, data) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/users/${id}`, data);
    if (response.data.status) {
      dispatch(fetchUserData(false));
    }
    dispatch(userSlice.actions.setLoading(false));
    return true;
  } catch (err) {
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export default userSlice.reducer