import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  loading: false,
  errorVal: '',
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
    signOut: (state) => {
      state.currentUser = null
    },
    error: (state, action) => {
      state.errorVal = action.payload
    },
  },
})

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserSuccess,
  signOut,
  errorVal,
} = userSlice.actions
export default userSlice.reducer
