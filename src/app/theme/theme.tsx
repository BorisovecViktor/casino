import { createTheme } from '@mui/material/styles'
import { breakpointsTheme } from './breakpoints'
import { palette } from './palette'
import { typography } from './typography'
import { grey } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: palette.background,
    },
  },
  shape: {
    borderRadius: 6,
  },
  breakpoints: breakpointsTheme.breakpoints,
  typography,
  components: {
    MuiTextField: {
      defaultProps: {
        autoComplete: 'nope',
        fullWidth: true,
        size: 'small',
      },
      styleOverrides: {
        root: {
          '& fieldset': {
            border: `1px solid ${grey[300]}`,
          },
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              border: `1px solid ${grey[300]}`,
            },
            '&.Mui-focused fieldset': {
              border: `1px solid ${grey[300]}`,
            },
            '&.Mui-disabled fieldset': {
              border: `1px solid ${grey[300]}`,
            },
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td, &:last-child th': { border: 0 },
          '&:nth-of-type(even)': {
            backgroundColor: grey[50],
          },
        },
      },
    },
  },
})

export { theme }
