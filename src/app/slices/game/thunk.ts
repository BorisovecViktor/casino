import { createAction } from '@reduxjs/toolkit'
import { SET_GAME_TYPE } from './action-type'
import { TGameType } from './type'

export const setGameType = createAction<TGameType>(SET_GAME_TYPE)
