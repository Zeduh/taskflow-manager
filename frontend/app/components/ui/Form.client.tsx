'use client';

import { Box, type BoxProps } from '@mui/material';

interface FormProps extends BoxProps {
  onSubmit?: (e: React.FormEvent) => void;
}

export function Form({ children, onSubmit, ...props }: FormProps) {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        ...props.sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
}