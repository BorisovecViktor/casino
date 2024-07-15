import { Box, Stack, Tab } from '@mui/material'
import { TabList, TabContext, TabPanel } from '@mui/lab'
import { SlotMachine, BetHistory, Roulette } from 'components'
import { SyntheticEvent, useEffect } from 'react'
import { useLocalStorage } from 'hooks/use-local-storage'
import { GAME_TYPE } from 'utils/constants'
import { useAppDispatch } from 'hooks/use-redux'
import { setGameType as setGameTypeAction, TGameType } from 'app/slices/game'
import {
  setBalance as setBalanceAction,
  setBetHistory as setBetHistoryAction,
} from 'app/slices/user'
import { BALANCE, BET_HISTORY, TEST_BALANCE_AMOUNT } from 'utils/constants'
import 'styles/widget.css'

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
    if (value === TGameType.SLOT_MACHINE) {
      setGameType(TGameType.SLOT_MACHINE)
    } else if (value === TGameType.ROULETTE) {
      setGameType(TGameType.ROULETTE)
    } else {
      setGameType(TGameType.BET_HISTORY)
    }
  }

  return (
    <Stack sx={{ height: '100vh' }}>
      <TabContext value={gameType}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="tabs" centered>
            <Tab label="Slot machine" value={TGameType.SLOT_MACHINE} />
            <Tab label="Roulette" value={TGameType.ROULETTE} />
            <Tab label="Bet history" value={TGameType.BET_HISTORY} />
          </TabList>
        </Box>
        <TabPanel value={TGameType.SLOT_MACHINE} sx={{ flexGrow: 1 }}>
          <SlotMachine
            balance={balance}
            betHistory={betHistory}
            onBalance={setBalance}
            onBetHistory={setBetHistory}
          />
        </TabPanel>
        <TabPanel value={TGameType.ROULETTE} sx={{ flexGrow: 1 }}>
          <Roulette
            balance={balance}
            betHistory={betHistory}
            onBalance={setBalance}
            onBetHistory={setBetHistory}
          />
        </TabPanel>
        <TabPanel value={TGameType.BET_HISTORY}>
          <BetHistory />
        </TabPanel>
      </TabContext>
      <Box
        className="binance-widget-marquee"
        data-cmc-ids="1,1027,1839,5426,3408,52,74,5805,3890,7083,2,1958"
        data-theme="light"
        data-transparent="true"
      ></Box>
    </Stack>
  )
}

export default App
