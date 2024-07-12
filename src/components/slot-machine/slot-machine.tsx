import { ChangeEvent, useState } from 'react'
import { Button, Link, Stack, TextField } from '@mui/material'
import { useBoolean } from 'hooks/use-boolean'
import { DURATION, MIN_BET, WIN_COEFFICIENT } from 'utils/constants'
import { initialReels, reels } from 'app/data'
import { Balance } from 'components'
import { Reel } from './reel'
import { ReelsTitle } from './reels-title'
import { TCurrentReel } from './types'
import 'styles/slot-machine.css'
import { RootState } from 'app/slices'
import { createSelector } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from 'hooks/use-redux'
import { decreaseBalance, increaseBalance } from 'app/slices/user'

export const SlotMachine = () => {
  const dispatch = useAppDispatch()
  const [currentReels, setCurrentReels] =
    useState<Array<TCurrentReel>>(initialReels)
  let spinningReels = [...reels]
  const isAnimation = useBoolean(false)
  const isWinner = useBoolean(false)
  const [bet, setBet] = useState<string>('')
  const titleVisibility = isAnimation.isTrue || currentReels === initialReels
  const userSelector = (state: RootState) => state.User
  const stateUser = createSelector(userSelector, (state) => ({
    user: state.user,
  }))
  const { user } = useAppSelector(stateUser)

  const handleWinner = (newReels: Array<TCurrentReel>) => {
    const isEqual = new Set(newReels).size === 1

    if (isEqual) {
      isWinner.setTrue()

      dispatch(increaseBalance(Number(bet) * WIN_COEFFICIENT))
    } else {
      isWinner.setFalse()
    }
  }

  const handleChangeBet = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (Number(value) <= user.balance) {
      setBet(value)
    }
  }

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
      dispatch(decreaseBalance(Number(bet)))
    }

    setTimeout(() => {
      setCurrentReels(newReels)
      isAnimation.setFalse()
      handleWinner(newReels)
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
