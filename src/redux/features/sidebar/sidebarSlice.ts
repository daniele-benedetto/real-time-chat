import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SidebarState {
  value: boolean
}

const initialState: SidebarState = {
  value: false,
}

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
      setSidebar: (state, action: PayloadAction<boolean>) => {
        state.value = action.payload
      },
    },
})

export const { setSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer