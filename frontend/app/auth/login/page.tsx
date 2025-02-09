'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/auth.context';
import Link from 'next/link';
import {
  Box, TextField, Button, Typography, Alert, Paper,
  useTheme, useMediaQuery,
} from '@mui/material';
import { loginUser } from './actions';

export default function LoginPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginUser({ email, password });
      
      if (result.success && result.data) {
        login(result.data.access_token, result.data.user);
        router.push('/dashboard');
      } else {
        setError(result.error || 'Erro ao fazer login');
      }
    } catch (err) {
      setError('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        maxWidth: 'sm',
        mx: 'auto',
        p: isMobile ? 3 : 4,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Typography
          component="h1"
          variant={isMobile ? 'h5' : 'h4'}
          sx={{ fontWeight: 700 }}
        >
          Task Manager
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 2, textAlign: 'center' }}
        >
          Faça login para acessar sua conta
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              width: '100%',
              borderRadius: 1,
            }}
          >
            {error}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ 
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ 
              py: 1.5,
              mt: 1,
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
          
          <Link 
            href="/auth/register" 
            style={{ 
              textDecoration: 'none',
              width: '100%',
            }}
          >
            <Button 
              fullWidth 
              variant="outlined"
              size="large"
              sx={{ py: 1.5 }}
            >
              Criar uma conta
            </Button>
          </Link>
        </Box>
      </Box>
    </Paper>
  );
}