export type TBetHistoryRow = {
  id: number
  date: Date
  amount: number
  type: 'Slot' | 'Roulette'
  result: boolean
  balance: number
}
