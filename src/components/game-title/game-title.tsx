import { Typography } from '@mui/material'

type Props = {
  isWinner: boolean
  isVisible: boolean
}

export const GameTitle = ({ isWinner, isVisible }: Props) => (
  <Typography
    variant="h5"
    color={isWinner ? 'success.main' : 'error'}
    sx={{ opacity: isVisible ? 1 : 0, cursor: 'default' }}
  >{`You ${isWinner ? 'win 😊' : 'lose 😭'}`}</Typography>
)
