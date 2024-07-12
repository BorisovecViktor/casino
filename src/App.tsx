import { Box, Tab } from '@mui/material'
import { TabList, TabContext, TabPanel } from '@mui/lab'
import { SlotMachine, BetHistory } from 'components'
import { SyntheticEvent, useState } from 'react'

function App() {
  const [tab, setTab] = useState('1')

  const handleChange = (_e: SyntheticEvent, value: string) => {
    setTab(value)
  }

  return (
    <TabContext value={tab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="tabs" centered>
          <Tab label="Slot machine" value="1" />
          <Tab label="Roulette" value="2" />
          <Tab label="Bet history" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <SlotMachine />
      </TabPanel>
      <TabPanel value="2">Roulette</TabPanel>
      <TabPanel value="3">
        <BetHistory />
      </TabPanel>
    </TabContext>
  )
}

export default App
