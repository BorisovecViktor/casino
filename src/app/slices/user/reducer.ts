import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from './types'

export type IUserState = {
  user: IUser
}

export const initialState: IUserState = {
  user: {
    balance: 100,
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increaseBalance: (state, action: PayloadAction<number>) => {
      state.user.balance += action.payload
    },
    decreaseBalance: (state, action: PayloadAction<number>) => {
      state.user.balance -= action.payload
    },
  },
})

export default userSlice.reducer
