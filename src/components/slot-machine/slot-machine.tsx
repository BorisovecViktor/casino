import { ChangeEvent, useState } from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { Button, Stack } from '@mui/material'
import { RootState } from 'app/slices'
import { TCurrentReel } from 'app/slices/user/types'
import { useBoolean, useAppSelector } from 'hooks'
import {
  SLOT_MACHINE_DURATION,
  MIN_BET,
  DEFAULT_WIN_COEFFICIENT,
} from 'utils/constants'
import { initialReels, reels } from 'app/data'
import { Balance, BuyCoins, GameTitle } from 'components'
import { Reel } from './reel'
import { regex_numbers } from 'utils/regex'
import 'styles/slot-machine.css'
import { TextField } from 'components/shared'

type Props = {
  onBalance: (newValue: unknown) => void
  onBetHistory: (newValue: unknown) => void
}

export const SlotMachine = ({ onBalance, onBetHistory }: Props) => {
  const [currentReels, setCurrentReels] =
    useState<Array<TCurrentReel>>(initialReels)
  const isAnimation = useBoolean(false)
  const isWinner = useBoolean(false)
  const titleVisibility = useBoolean(false)
  // current bet amount
  const [bet, setBet] = useState<string>('')
  // reels for make spinning animation effect
  let spinningReels = [...reels]
  // get data from store
  const userSelector = (state: RootState) => state.User
  const stateUser = createSelector(userSelector, (state) => ({
    balance: state.balance,
    betHistory: state.betHistory,
  }))
  const { balance, betHistory } = useAppSelector(stateUser)
  const gameSelector = (state: RootState) => state.Game
  const stateGame = createSelector(gameSelector, (state) => ({
    gameType: state.gameType,
  }))
  const { gameType } = useAppSelector(stateGame)
  const decreaseBalance = balance - Number(bet)

  // define win or lose / set balance / set history
  const handleWinner = (newReels: Array<TCurrentReel>) => {
    const isEqual = new Set(newReels).size === 1
    const increasedBalance =
      decreaseBalance + Number(bet) * DEFAULT_WIN_COEFFICIENT

    if (isEqual) {
      isWinner.setTrue()

      onBalance(increasedBalance)
    } else {
      isWinner.setFalse()
    }

    titleVisibility.setTrue()

    onBetHistory([
      ...betHistory,
      {
        date: new Date().toString(),
        amount: bet,
        type: gameType,
        result: isEqual,
        balance: isEqual ? increasedBalance : decreaseBalance,
      },
    ])
  }

  const handleChangeBet = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (
      value === '' ||
      (Number(value) >= MIN_BET &&
        Number(value) <= balance &&
        regex_numbers.test(value))
    ) {
      setBet(value)
    }
  }

  // define new reels state / run animation / set balance
  const handleSpin = () => {
    titleVisibility.setFalse()
    const newReels = reels.map((reel, i) => {
      const randomIndex = Math.floor(Math.random() * reel.length)

      // set first line of spinning reels
      if (currentReels[i] !== null) {
        spinningReels[i][0] = String(currentReels[i])
      }

      // set last line of spinning reels
      spinningReels[i][reel.length - 1] = reel[randomIndex]

      return reel[randomIndex]
    })

    isAnimation.setTrue()
    setCurrentReels(initialReels)

    if (bet) {
      onBalance(decreaseBalance)
    }

    setTimeout(() => {
      setCurrentReels(newReels)
      handleWinner(newReels)
      isAnimation.setFalse()
    }, SLOT_MACHINE_DURATION)
  }

  return (
    <Stack alignItems="center" justifyContent="center" spacing={2}>
      <GameTitle
        isWinner={isWinner.isTrue}
        isVisible={titleVisibility.isTrue}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={0.5}
      >
        {currentReels.map((reel, index) => (
          <Reel
            key={index}
            id={index}
            reels={spinningReels}
            reel={reel}
            isAnimation={isAnimation.isTrue}
            duration={SLOT_MACHINE_DURATION}
          />
        ))}
      </Stack>
      <Balance />
      <Stack spacing={1}>
        <TextField
          id="bet-amount"
          label="Bet amount"
          value={bet}
          onChange={handleChangeBet}
          placeholder={`From 1 to ${balance}`}
          disabled={isAnimation.isTrue || balance === 0}
        />
        <Button
          variant="outlined"
          size="large"
          onClick={handleSpin}
          disabled={isAnimation.isTrue || balance === 0 || !bet}
        >
          Try your luck
        </Button>
      </Stack>
      {balance === 0 && !isAnimation.isTrue && <BuyCoins />}
    </Stack>
  )
}
