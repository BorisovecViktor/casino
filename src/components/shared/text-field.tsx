import { forwardRef } from 'react'
import {
  TextField as MuiTextField,
  InputLabel,
  Box,
  TextFieldProps,
} from '@mui/material'
import { v4 as uuid } from 'uuid'

export const TextField = forwardRef<HTMLDivElement | null, TextFieldProps>(
  ({ label, ...props }, ref) => {
    const id = uuid()

    return (
      <Box>
        {label && <InputLabel htmlFor={props.id ?? id}>{label}</InputLabel>}
        <MuiTextField id={props.id ?? id} ref={ref} {...props} />
      </Box>
    )
  },
)
