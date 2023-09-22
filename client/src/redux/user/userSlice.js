import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
    },
    signInFailure: (state) => {
      state.loading = false
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload
    },
  },
})

export const { signInStart, signInSuccess, signInFailure, updateUserSuccess } =
  userSlice.actions
export default userSlice.reducer
