import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: false
  },
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    }
  },
})

export const { updateUser } = loginSlice.actions
export default loginSlice.reducer