export type TBetHistoryRow = {
  date: string
  amount: number
  type: TGameType
  result: boolean
  balance: number
}

export enum TGameType {
  SLOT_MACHINE = 'SLOT_MACHINE',
  ROULETTE = 'ROULETTE',
  BET_HISTORY = 'BET_HISTORY',
  CRYPTO_CURRENCY = 'CRYPTO_CURRENCY',
}

export enum TColor {
  RED = 'RED',
  BLACK = 'BLACK',
}
