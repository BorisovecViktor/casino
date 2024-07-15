import { Box, Stack, Tab } from '@mui/material'
import { TabList, TabContext, TabPanel } from '@mui/lab'
import { SlotMachine, BetHistory, Roulette, CryptoCurrencies } from 'components'
import { SyntheticEvent, useEffect, useMemo } from 'react'
import { useLocalStorage } from 'hooks/use-local-storage'
import { GAME_TYPE } from 'utils/constants'
import { useAppDispatch } from 'hooks/use-redux'
import { setGameType as setGameTypeAction, TGameType } from 'app/slices/game'
import {
  setBalance as setBalanceAction,
  setBetHistory as setBetHistoryAction,
} from 'app/slices/user'
import { BALANCE, BET_HISTORY, TEST_BALANCE_AMOUNT } from 'utils/constants'

function App() {
  const dispatch = useAppDispatch()
  const [balance, setBalance] = useLocalStorage(BALANCE, TEST_BALANCE_AMOUNT)
  const [betHistory, setBetHistory] = useLocalStorage(BET_HISTORY, [])
  const [gameType, setGameType] = useLocalStorage(
    GAME_TYPE,
    TGameType.SLOT_MACHINE,
  )

  // set balance to store from local storage
  useEffect(() => {
    dispatch(setBalanceAction(balance))
  }, [balance, dispatch])

  // set bet history to store from local storage
  useEffect(() => {
    dispatch(setBetHistoryAction(betHistory))
  }, [betHistory, dispatch])

  // set game type to store from local storage
  useEffect(() => {
    dispatch(setGameTypeAction(gameType))
  }, [gameType, dispatch])

  const handleChange = (_e: SyntheticEvent, value: TGameType) => {
    setGameType(value)
  }

  const tabs = useMemo(
    () => [
      {
        value: TGameType.SLOT_MACHINE,
        label: 'Slot machine',
      },
      {
        value: TGameType.ROULETTE,
        label: 'Roulette',
      },
      {
        value: TGameType.BET_HISTORY,
        label: 'Bet history',
      },
      {
        value: TGameType.CRYPTO_CURRENCY,
        label: 'Crypto currencies',
      },
    ],
    [],
  )

  return (
    <Stack sx={{ height: '100vh' }}>
      <TabContext value={gameType}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="tabs" centered>
            {tabs.map(({ value, label }) => (
              <Tab key={value} label={label} value={value} />
            ))}
          </TabList>
        </Box>
        <TabPanel value={TGameType.SLOT_MACHINE} sx={{ flexGrow: 1 }}>
          <SlotMachine onBalance={setBalance} onBetHistory={setBetHistory} />
        </TabPanel>
        <TabPanel value={TGameType.ROULETTE} sx={{ flexGrow: 1 }}>
          <Roulette onBalance={setBalance} onBetHistory={setBetHistory} />
        </TabPanel>
        <TabPanel value={TGameType.BET_HISTORY}>
          <BetHistory />
        </TabPanel>
        <TabPanel value={TGameType.CRYPTO_CURRENCY}>
          <CryptoCurrencies />
        </TabPanel>
      </TabContext>
    </Stack>
  )
}

export default App
