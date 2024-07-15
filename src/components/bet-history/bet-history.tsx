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
import { useMemo } from 'react'
import { NoResults } from './no-results'

export const BetHistory = () => {
  const userSelector = (state: RootState) => state.User
  const stateUser = createSelector(userSelector, (state) => ({
    betHistory: state.betHistory,
  }))
  const { betHistory } = useAppSelector(stateUser)

  const headCells = useMemo(
    () => [
      {
        id: 'date',
        label: 'Date',
      },
      {
        id: 'amount',
        label: 'Amount',
        align: 'center' as const,
      },
      {
        id: 'type',
        label: 'Game type',
        align: 'center' as const,
      },
      {
        id: 'result',
        label: 'Result',
        align: 'center' as const,
      },
      {
        id: 'balance',
        label: 'Balance',
        align: 'center' as const,
      },
    ],
    [],
  )

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
            {headCells.map(({ id, align, label }) => (
              <TableCell key={id} align={align}>
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {betHistory.length > 0 ? (
            betHistory.map(({ date, amount, type, result, balance }) => {
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
            })
          ) : (
            <NoResults />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
