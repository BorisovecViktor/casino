import { ChangeEvent, useState } from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/slices'
import { TBetHistoryRow } from 'app/slices/game'
import { Button, Link, Stack, TextField } from '@mui/material'
import { useBoolean, useAppSelector } from 'hooks'
import { TCurrentReel } from '../../app/slices/user/types'
import { DURATION, MIN_BET, WIN_COEFFICIENT } from 'utils/constants'
import { initialReels, reels } from 'app/data'
import { Balance } from 'components'
import { Reel } from './reel'
import { ReelsTitle } from './reels-title'
import 'styles/slot-machine.css'

type Props = {
  balance: number
  betHistory: Array<TBetHistoryRow>
  onBalance: (newValue: unknown) => void
  onBetHistory: (newValue: unknown) => void
}

export const SlotMachine = ({
  balance,
  betHistory,
  onBalance,
  onBetHistory,
}: Props) => {
  const [currentReels, setCurrentReels] =
    useState<Array<TCurrentReel>>(initialReels)
  const isAnimation = useBoolean(false)
  const isWinner = useBoolean(false)
  // visibility of congratulation title
  const titleVisibility = isAnimation.isTrue || currentReels === initialReels
  // current bet amount
  const [bet, setBet] = useState<string>('')
  // reels for make spinning animation effect
  let spinningReels = [...reels]
  // get data from store
  const userSelector = (state: RootState) => state.User
  const stateUser = createSelector(userSelector, (state) => ({
    user: state,
  }))
  const { user } = useAppSelector(stateUser)
  const gameSelector = (state: RootState) => state.Game
  const stateGame = createSelector(gameSelector, (state) => ({
    game: state,
  }))
  const { game } = useAppSelector(stateGame)
  // manage balance
  const increaseBalance = balance + Number(bet) * WIN_COEFFICIENT
  const decreaseBalance = balance - Number(bet)

  // define win / lose
  const handleWinner = (newReels: Array<TCurrentReel>) => {
    const isEqual = new Set(newReels).size === 1

    if (isEqual) {
      isWinner.setTrue()

      onBalance(increaseBalance)
    } else {
      isWinner.setFalse()
    }

    onBetHistory([
      ...betHistory,
      {
        date: new Date().toString(),
        amount: bet,
        type: game.gameType,
        result: isEqual,
        balance: isEqual ? increaseBalance : decreaseBalance,
      },
    ])
  }

  const handleChangeBet = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (Number(value) <= user.balance) {
      setBet(value)
    }
  }

  // define new reels state / run animation / set balance and history
  const handleSpin = () => {
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
    handleWinner(newReels)

    setTimeout(() => {
      setCurrentReels(newReels)
      isAnimation.setFalse()
    }, DURATION)
  }

  return (
    <Stack alignItems="center" justifyContent="center" spacing={1}>
      <ReelsTitle isWinner={isWinner.isTrue} isTitleHidden={titleVisibility} />
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
            duration={DURATION}
          />
        ))}
      </Stack>
      <Balance />
      <Stack spacing={1}>
        <TextField
          type="number"
          size="small"
          value={bet}
          onChange={handleChangeBet}
          InputProps={{ inputProps: { min: MIN_BET, max: user.balance } }}
          fullWidth
          disabled={isAnimation.isTrue || user.balance === 0}
        />
        <Button
          variant="outlined"
          onClick={handleSpin}
          disabled={
            isAnimation.isTrue ||
            user.balance === 0 ||
            !bet ||
            Number(bet) === 0 ||
            Number(bet) > user.balance
          }
          size="large"
        >
          Try your luck
        </Button>
      </Stack>
      <Link
        href="/buy"
        sx={{ opacity: user.balance === 0 && !isAnimation.isTrue ? 1 : 0 }}
      >
        Buy coins
      </Link>
    </Stack>
  )
}
