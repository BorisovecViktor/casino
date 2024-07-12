import { createAction } from '@reduxjs/toolkit'
import { SET_BALANCE, SET_BET_HISTORY } from './action-type'
import { TBetHistoryRow } from '../game'

export const setBalance = createAction<number>(SET_BALANCE)
export const setBetHistory =
  createAction<Array<TBetHistoryRow>>(SET_BET_HISTORY)
