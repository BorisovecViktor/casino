import { createAppAsyncThunk } from '../app-async-thunk'
import { GET_COINS } from './action-type'
import { getCoins as getCoinsApi } from 'api/coins'
import { TCoin } from './type'

export const getCoins = createAppAsyncThunk<Array<TCoin>>(
  GET_COINS,
  async () => {
    try {
      const response = getCoinsApi()
      const data = await response
      return data.data.result as any as Array<TCoin>
    } catch (error) {
      throw error
    }
  },
)
