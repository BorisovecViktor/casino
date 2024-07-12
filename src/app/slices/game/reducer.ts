import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TGameType } from './type'

export type IGameState = {
  gameType: TGameType
}

export const initialState: IGameState = {
  gameType: TGameType.SLOT_MACHINE,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameType: (state, action: PayloadAction<TGameType>) => {
      state.gameType = action.payload
    },
  },
})

export default gameSlice.reducer
