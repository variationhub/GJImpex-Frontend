import { createSlice } from '@reduxjs/toolkit'

export const modelSlice = createSlice({
  name: 'model',
  initialState: {
    visible: false,
    message: ""
  },
  reducers: {
    setModel(state, action) {
      state.visible = action.payload.visible;
      state.message = action.payload.message;
    }
  },
})

export const { setModel } = modelSlice.actions

export default modelSlice.reducer