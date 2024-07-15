import { Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/slices'
import { useAppSelector } from 'hooks'

export const Balance = () => {
  const userSelector = (state: RootState) => state.User
  const stateUser = createSelector(userSelector, (state) => ({
    balance: state.balance,
  }))
  const { balance } = useAppSelector(stateUser)

  return (
    <Typography
      variant="h6"
      color={blue[700]}
    >{`Balance: ${balance} coins`}</Typography>
  )
}
