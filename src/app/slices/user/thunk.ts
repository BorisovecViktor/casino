import { createAction } from '@reduxjs/toolkit'
import { INCREASE_BALANCE, DECREASE_BALANCE } from './action-type'

export const increaseBalance = createAction<number>(INCREASE_BALANCE)
export const decreaseBalance = createAction<number>(DECREASE_BALANCE)
