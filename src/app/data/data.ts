import { TColor } from 'app/slices/game'
import { TReel } from 'app/slices/user'

export const reels: Array<TReel> = [
  ['🍒', '🍉', '🍊', '🍓', '🍇', '🥝'],
  ['🍊', '🍓', '🍇', '🥝', '🍒', '🍉'],
  ['🍇', '🥝', '🍒', '🍉', '🍊', '🍓'],
]
export const initialReels: Array<null> = reels.map(() => null)
export const colorOptions: Array<TColor> = [TColor.RED, TColor.BLACK]
