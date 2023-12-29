import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import User from '@/models/User'

const initialState: User = {
  id: 0,
  name: '',
  backgroundColor: '',
  textColor: '',
  token: '',
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setUser: (state, action: PayloadAction<User>) => {
        state.id = action.payload.id
        state.name = action.payload.name
        state.backgroundColor = action.payload.backgroundColor
        state.textColor = action.payload.textColor
        state.token = action.payload.token
      },
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer


