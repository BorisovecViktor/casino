import { Typography } from '@mui/material'

type Props = {
  isWinner: boolean
  isTitleHidden: boolean
}

export const ReelsTitle = ({ isWinner, isTitleHidden }: Props) => {
  return (
    <Typography
      variant="h5"
      color={isWinner ? 'success.main' : 'error'}
      sx={{ opacity: isTitleHidden ? 0 : 1 }}
    >{`You ${isWinner ? 'win 😊' : 'lose 😭'}`}</Typography>
  )
}
