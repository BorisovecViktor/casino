import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

// User
import userReducer from './user/reducer'

const appReducer = combineReducers({
  User: userReducer,
})

const rootReducer = (state: any, action: any) => appReducer(state, action)

export const store = configureStore({ reducer: rootReducer, devTools: true })
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default rootReducer
