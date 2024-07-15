import { createSlice } from '@reduxjs/toolkit'
import { TCoin } from './type'
import { getCoins } from './thunk'

export type ICoinState = {
  coins: Array<TCoin>
  loading: boolean
  error: unknown
}

export const initialState: ICoinState = {
  coins: [],
  loading: false,
  error: undefined,
}

const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoins.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getCoins.fulfilled, (state, action) => {
      state.coins = action.payload
      state.loading = false
    })
    builder.addCase(getCoins.rejected, (state, action) => {
      state.loading = false
      state.error = action.error || null
    })
  },
})

export default coinSlice.reducer
