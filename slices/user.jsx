import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: []
  },
  reducers: {
    updateUser(state, action) {
      state.data = action.payload;
    }
  },
})

export const { updateUser } = userSlice.actions

export const fetchUserData = () => async(dispatch) => {
    const response = await axiosInstance.get('/users');
    dispatch(userSlice.actions.updateUser(response.data.data));
}

export const createUserData = (data) => async(dispatch) => {
  const response = await axiosInstance.post('/users',data);
  // dispatch(userSlice.actions.updateUser(response.data.data));
  if(response.data.status){
    dispatch(fetchUserData());
  }
}

export default userSlice.reducer