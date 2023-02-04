import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {  //State is the form in which we enter the initial state, and action is data (that we have provided in Login) 
      state.user = action.payload.others
      state.token = action.payload.token
    },
    register(state, action) {  //State is the form in which we enter the initial state, and action is data (that we have provided in Login) 
      state.user = action.payload.others
      state.token = action.payload.token
    }, 
    logout(state){
      state.user = null
      state.token = null
      localStorage.clear()
    }
  }
})

export const {login, register, logout} = authSlice.actions //! Reducer funtion
export default authSlice.reducer //! state