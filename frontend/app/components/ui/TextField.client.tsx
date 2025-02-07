'use client';

import { TextField as MuiTextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

export function TextField(props: TextFieldProps) {
  return (
    <MuiTextField
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        },
        ...props.sx
      }}
    />
  );
}