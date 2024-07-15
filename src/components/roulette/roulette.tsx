import { ChangeEvent, useRef, useState } from 'react'
import { Button, SelectChangeEvent, Stack } from '@mui/material'
import { useBoolean } from 'hooks/use-boolean'
import {
  MIN_BET,
  MIN_BET_NUMBER,
  MAX_BET_NUMBER,
  ROULETTE_DURATION,
  DEFAULT_WIN_COEFFICIENT,
  ROULETTE_NUMBER_WIN_COEFFICIENT,
} from 'utils/constants'
import { RootState } from 'app/slices'
import { createSelector } from '@reduxjs/toolkit'
import { useAppSelector } from 'hooks/use-redux'
import { Balance, BuyCoins, GameTitle } from 'components'
import { Wheels } from './wheels'
import 'styles/roulette.css'
import { regex_numbers, regex_zero_thirty_six } from 'utils/regex'
import { TColor } from 'app/slices/game'
import { Select, TextField } from 'components/shared'
import { colorOptions } from 'app/data'
const rouletteWheelNumbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
]
const blackNumbers = [
  2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 29, 28, 31, 33, 35,
]
const redNumbers = [
  32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3,
]

type Props = {
  onBalance: (newValue: unknown) => void
  onBetHistory: (newValue: unknown) => void
}

export const Roulette = ({ onBalance, onBetHistory }: Props) => {
  const refBall = useRef<HTMLDivElement>(null)
  const isAnimationWheel = useBoolean(false)
  const [bet, setBet] = useState<string>('')
  const [betNumber, setBetNumber] = useState<string>('')
  const [betColor, setBetColor] = useState<string>('')
  const isWinner = useBoolean(false)
  const titleVisibility = useBoolean(false)
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
  // manage balance
  const decreaseBalance = balance - Number(bet)

  // define win or lose / set balance / set history
  const handleWinner = (newNumber: number) => {
    const isEqualBetColor = (betColor: string) => {
      if (newNumber === 0) {
        return false
      }

      if (betColor === TColor.BLACK) {
        return blackNumbers.includes(newNumber)
      }

      if (betColor === TColor.RED) {
        return redNumbers.includes(newNumber)
      }
    }
    const isEqualBetNumber = Number(betNumber) === newNumber
    const isWinBet =
      (betColor && isEqualBetColor(betColor)) || (betNumber && isEqualBetNumber)
    const coefficient = isEqualBetNumber
      ? ROULETTE_NUMBER_WIN_COEFFICIENT
      : DEFAULT_WIN_COEFFICIENT
    const newIncreasedBalance = decreaseBalance + Number(bet) * coefficient

    if (isWinBet) {
      isWinner.setTrue()

      onBalance(newIncreasedBalance)
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
        result: isWinBet,
        balance: isWinBet ? newIncreasedBalance : decreaseBalance,
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

  const handleChangeBetNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value === '' || regex_zero_thirty_six.test(value)) {
      setBetNumber(value)
    }
  }

  const handleChangeBetColor = (e: SelectChangeEvent<unknown>) => {
    const value = e.target.value

    setBetColor(value as TColor)
  }

  // define new roulette state / run animation / set balance and history
  const handleSpin = () => {
    const randomNumber = Math.floor(Math.random() * rouletteWheelNumbers.length)
    const index = rouletteWheelNumbers.indexOf(randomNumber)
    const angle = (360 / rouletteWheelNumbers.length) * index

    titleVisibility.setFalse()
    isAnimationWheel.setTrue()

    if (refBall.current) {
      refBall.current.style.transform = `rotate(${angle}deg)`
      refBall.current.style.transition = 'transform 5000ms'
    }

    if (bet) {
      onBalance(decreaseBalance)
    }

    setTimeout(() => {
      isAnimationWheel.setFalse()
      handleWinner(randomNumber)
    }, ROULETTE_DURATION)
  }

  return (
    <Stack alignItems="center" justifyContent="center" spacing={2}>
      <GameTitle
        isWinner={isWinner.isTrue}
        isVisible={titleVisibility.isTrue}
      />
      <Wheels
        nodeRefBall={refBall}
        isAnimationWheel={isAnimationWheel.isTrue}
        duration={ROULETTE_DURATION}
      />
      <Balance />
      <Stack spacing={1} width="380px">
        <Stack direction="row" spacing={1} sx={{ maxHeight: '63px' }}>
          <TextField
            id="bet-amount"
            label="Bet amount"
            value={bet}
            onChange={handleChangeBet}
            placeholder={`From 1 to ${balance}`}
            disabled={isAnimationWheel.isTrue || balance === 0}
          />
          <TextField
            id="bet-number"
            label="Bet number"
            value={betNumber}
            onChange={handleChangeBetNumber}
            placeholder={`From ${MIN_BET_NUMBER} to ${MAX_BET_NUMBER}`}
            disabled={isAnimationWheel.isTrue || balance === 0}
          />
          <Select
            id="bet-color"
            name="bet-color"
            label="Bet color"
            value={betColor}
            options={colorOptions}
            onChange={handleChangeBetColor}
            disabled={isAnimationWheel.isTrue || balance === 0}
          />
        </Stack>
        <Button
          variant="outlined"
          size="large"
          onClick={handleSpin}
          disabled={
            isAnimationWheel.isTrue ||
            balance === 0 ||
            !bet ||
            (betNumber === '' && betColor === '')
          }
        >
          Try your luck
        </Button>
      </Stack>
      {balance === 0 && !isAnimationWheel.isTrue && <BuyCoins />}
    </Stack>
  )
}
