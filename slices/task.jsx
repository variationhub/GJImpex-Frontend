import { createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios';
import { modelSlice } from './model';

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    data: [],
    loading: false
  },
  reducers: {
    updateTask(state, action) {
      state.data = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    }
  },
})

export const { updateTask } = taskSlice.actions

export const fetchTaskData = (load=true) => async (dispatch) => {
  try {
    if(load){
      dispatch(taskSlice.actions.setLoading(true));
    }
    const response = await axiosInstance.get('/tasks');
    dispatch(taskSlice.actions.updateTask(response.data.data));
    dispatch(taskSlice.actions.setLoading(false));
    return true;
  } catch (err) {
    dispatch(taskSlice.actions.updateTask([]));
    dispatch(taskSlice.actions.setLoading(false));
    return false;
  }
}

export const createTaskData = (data) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/tasks', data);
    if (response.data.status) {
      dispatch(fetchTaskData(false));
    }
    return true;
  } catch (err) {
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export const deleteTaskData = (id) => async (dispatch) => {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  if (response.data.status) {
    dispatch(fetchTaskData());
  }
}

export const updateTaskData = (id, data) => async (dispatch) => {
  try {
    const response = await axiosInstance.put(`/tasks/${id}`, data);
    if (response.data.status) {
      dispatch(fetchTaskData(false));
    }
    return true;
  } catch (err) {
    dispatch(modelSlice.actions.setModel({ visible: true, message: err.response.data.message || "Something went wrong..!" }));
    return false;
  }
}

export default taskSlice.reducer