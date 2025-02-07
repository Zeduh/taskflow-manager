// app/components/HomeActions.client.tsx (Client Component)
'use client';

import { useRouter } from 'next/navigation';
import { Button, Box } from '@mui/material';

export function HomeActions() {
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
      <Button 
        variant="contained" 
        onClick={() => router.push('/auth/login')}
      >
        Entrar
      </Button>
      <Button 
        variant="outlined" 
        onClick={() => router.push('/auth/register')}
      >
        Criar Conta
      </Button>
    </Box>
  );
}