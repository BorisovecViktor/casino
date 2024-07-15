import {
  Box,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps,
  Typography,
} from '@mui/material'
import { grey, red } from '@mui/material/colors'
import { TColor } from 'app/slices/game'
import { forwardRef } from 'react'
import { v4 as uuid } from 'uuid'

type Props = SelectProps & {
  options: Array<TColor>
}

export const Select = forwardRef<HTMLDivElement | null, Props>(
  ({ label, options, value, ...props }, ref) => {
    const id = uuid()

    return (
      <Box>
        {label && <InputLabel id={props.id ?? id}>{label}</InputLabel>}
        <MuiSelect
          labelId={props.id ?? id}
          ref={ref}
          value={value}
          displayEmpty
          renderValue={
            value !== ''
              ? undefined
              : () => (
                  <Typography component="span" color={grey[500]}>
                    Color
                  </Typography>
                )
          }
          sx={{
            width: '100px',
            '.MuiSelect-select.MuiSelect-outlined': { paddingY: '8px' },
          }}
          {...props}
        >
          <MenuItem value="" sx={{ height: '36px' }}></MenuItem>
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Box
                sx={{
                  width: '100%',
                  height: '24px',
                  backgroundColor: option === TColor.RED ? red[500] : grey[900],
                }}
              ></Box>
            </MenuItem>
          ))}
        </MuiSelect>
      </Box>
    )
  },
)
