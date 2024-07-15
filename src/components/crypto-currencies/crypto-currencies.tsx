import { useEffect, useMemo } from 'react'
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
import { grey } from '@mui/material/colors'
import { APP_LAYOUT } from 'utils/constants'
import { RootState } from 'app/slices'
import { createSelector } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from 'hooks/use-redux'
import { NoResults } from 'components/bet-history'
import { getCoins } from 'app/slices/coin'

export const CryptoCurrencies = () => {
  const dispatch = useAppDispatch()
  const coinSelector = (state: RootState) => state.Coin
  const stateCoin = createSelector(coinSelector, (state) => ({
    coins: state.coins,
    loading: state.loading,
  }))
  const { coins, loading } = useAppSelector(stateCoin)

  // In network getCoins request performance twice this happens because React.StrictMode activates additional checks and warnings for its descendants, or in other words renders twice. Strict mode checks are run in development mode only, they do not impact the production build
  useEffect(() => {
    dispatch(getCoins())
  }, [dispatch])

  const headCells = useMemo(
    () => [
      {
        id: 'name',
        label: 'Name',
      },
      {
        id: 'symbol',
        label: 'Symbol',
      },
      {
        id: 'price',
        label: 'Price USD',
      },
      {
        id: 'rank',
        label: 'Rank',
        align: 'center' as const,
      },
      {
        id: 'volume',
        label: 'Volume USD',
      },
    ],
    [],
  )

  return (
    <>
      {loading ? (
        'Loading...'
      ) : (
        <TableContainer
          component={Paper}
          sx={{ maxHeight: `calc(100vh - ${APP_LAYOUT})` }}
        >
          <Table
            size="small"
            sx={{ minWidth: 650 }}
            aria-label="bet history table"
          >
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
              {coins.length > 0 ? (
                coins.map(({ id, name, symbol, price, rank, volume }) => (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      <Typography>{name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{symbol}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{price.toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{rank}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{volume.toFixed(2)}</Typography>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <NoResults />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
