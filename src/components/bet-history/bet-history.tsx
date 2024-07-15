import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { format } from 'date-fns'
import { grey } from '@mui/material/colors'
import { APP_LAYOUT } from 'utils/constants'
import { RootState } from 'app/slices'
import { createSelector } from '@reduxjs/toolkit'
import { useAppSelector } from 'hooks/use-redux'
import { v4 as uuid } from 'uuid'
import { TGameType } from 'app/slices/game'

export const BetHistory = () => {
  const userSelector = (state: RootState) => state.User
  const stateUser = createSelector(userSelector, (state) => ({
    user: state,
  }))
  const { user } = useAppSelector(stateUser)

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: `calc(100vh - ${APP_LAYOUT})` }}
    >
      <Table size="small" sx={{ minWidth: 650 }} aria-label="bet history table">
        <TableHead
          sx={{
            position: 'sticky',
            top: 0,
            backgroundColor: grey[400],
          }}
        >
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Game type</TableCell>
            <TableCell align="center">Result</TableCell>
            <TableCell align="center">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.betHistory.map(({ date, amount, type, result, balance }) => {
            const id = uuid()

            return (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  <Typography>{format(date, 'dd.MM.yyyy')}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{amount}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>
                    {type === TGameType.SLOT_MACHINE
                      ? 'Slot machine'
                      : 'Roulette'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography color={result ? 'success.main' : 'error'}>
                    {result ? 'Win' : 'Lose'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{balance}</Typography>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
