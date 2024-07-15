import { TableCell, TableRow, Typography } from '@mui/material'

export const NoResults = () => {
  return (
    <TableRow>
      <TableCell colSpan={5} align="center">
        <Typography>No results</Typography>
      </TableCell>
    </TableRow>
  )
}
