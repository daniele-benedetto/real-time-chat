import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  id: number,
  name: string,
  backgroundColor: string,
  textColor: string,
}

const initialState: UserState = {
  id: 0,
  name: '',
  backgroundColor: '',
  textColor: '',
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      setUser: (state, action: PayloadAction<UserState>) => {
        state.id = action.payload.id
        state.name = action.payload.name
        state.backgroundColor = action.payload.backgroundColor
        state.textColor = action.payload.textColor
      },
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer


