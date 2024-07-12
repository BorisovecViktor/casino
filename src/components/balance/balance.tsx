import { Typography } from '@mui/material'
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/slices'
import { useAppSelector } from 'hooks/use-redux'

export const Balance = () => {
  const userSelector = (state: RootState) => state.User
  const stateUser = createSelector(userSelector, (state) => ({
    user: state.user,
  }))
  const { user } = useAppSelector(stateUser)

  return <Typography>{`Balance: ${user.balance} coins`}</Typography>
}
