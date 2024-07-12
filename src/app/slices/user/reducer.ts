import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TBetHistoryRow } from '../game'

export type IUserState = {
  balance: number
  betHistory: Array<TBetHistoryRow>
}

export const initialState: IUserState = {
  balance: 0,
  betHistory: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload
    },
    setBetHistory: (state, action: PayloadAction<Array<TBetHistoryRow>>) => {
      state.betHistory = action.payload
    },
  },
})

export default userSlice.reducer
