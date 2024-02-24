import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: false,
    data: {}
  },
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    },
    setData(state, action){
      state.data = action.payload;
    }

  },
})

export const { updateUser, setData } = loginSlice.actions
export default loginSlice.reducer