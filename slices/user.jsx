import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios';

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

export const fetchUserData = () => async (dispatch) => {
  try {
    dispatch(userSlice.actions.setLoading(true));
    const response = await axiosInstance.get('/users');
    dispatch(userSlice.actions.updateUser(response.data.data));
    dispatch(userSlice.actions.setLoading(false));
    return true;
  } catch (err) {
    dispatch(userSlice.actions.updateUser([]));
    dispatch(userSlice.actions.setLoading(false));
    return false;
  }
}

export const createUserData = (data) => async (dispatch) => {
  const response = await axiosInstance.post('/users', data);
  if (response.data.status) {
    dispatch(fetchUserData());
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
    dispatch(userSlice.actions.setLoading(true));
    const response = await axiosInstance.put(`/users/${id}`, data);
    if (response.data.status) {
      dispatch(fetchUserData());
    }
    dispatch(userSlice.actions.setLoading(false));
    return true;
  } catch (err) {
    dispatch(userSlice.actions.updateUser([]));
    dispatch(userSlice.actions.setLoading(false));
    return false;
  }
}

export default userSlice.reducer