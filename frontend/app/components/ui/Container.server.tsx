import { Container as MuiContainer } from '@mui/material';
import type { ContainerProps } from '@mui/material';

export function Container(props: ContainerProps) {
  return (
    <MuiContainer
      maxWidth="lg"
      {...props}
      sx={{
        py: 4,
        ...props.sx
      }}
    />
  );
}