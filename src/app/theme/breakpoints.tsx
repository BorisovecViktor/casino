import { createTheme } from '@mui/material/styles'

export const breakpointsTheme = createTheme({
  breakpoints: {
    keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    values: {
      xs: 0, // Mobile
      sm: 600, // Tablet
      md: 920, // Tablet landscape
      lg: 1280, // Small desktop
      xl: 1536, // Big desktop
    },
  },
})
