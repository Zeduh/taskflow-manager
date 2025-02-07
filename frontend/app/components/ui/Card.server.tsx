import { Card as MuiCard, type CardProps } from '@mui/material';

export function Card(props: CardProps) {
  return (
    <MuiCard
      {...props}
      sx={{
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        ...props.sx
      }}
    />
  );
}