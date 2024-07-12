import { TBetHistoryRow } from 'components/bet-history/types'
import { TReel } from 'components/slot-machine/types'

export const reels: Array<TReel> = [
  ['🍒', '🍉', '🍊', '🍓', '🍇', '🥝'],
  ['🍒', '🍉', '🍊', '🍓', '🍇', '🥝'],
  ['🍒', '🍉', '🍊', '🍓', '🍇', '🥝'],
]

export const initialReels: Array<null> = reels.map(() => null)

export const rows: Array<TBetHistoryRow> = [
  {
    id: 0,
    date: new Date(),
    amount: 1,
    type: 'Roulette',
    result: false,
    balance: 0,
  },
  {
    id: 1,
    date: new Date(),
    amount: 2,
    type: 'Slot',
    result: true,
    balance: 4,
  },
  {
    id: 2,
    date: new Date(),
    amount: 22,
    type: 'Roulette',
    result: true,
    balance: 44,
  },
]
