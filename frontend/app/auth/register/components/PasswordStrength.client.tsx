'use client';

import { Box, Typography } from '@mui/material';
import { usePasswordStrength } from '@/app/hooks/usePasswordStrength';

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { strength, color, text } = usePasswordStrength(password);

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          height: 4,
          width: '100%',
          bgcolor: 'grey.200',
          borderRadius: 1,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${strength}%`,
            bgcolor: color,
            transition: 'all 0.3s ease'
          }}
        />
      </Box>
      <Typography 
        variant="caption" 
        sx={{ 
          color: 'text.secondary',
          mt: 0.5,
          display: 'block'
        }}
      >
        Força da senha: {text}
      </Typography>
    </Box>
  );
}