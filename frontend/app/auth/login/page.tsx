'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/auth.context';
import Link from 'next/link';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { AuthService } from '@/app/services/auth.service';

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
      const response = await AuthService.login({ email, password });
      login(response.access_token, response.user);
      router.push('/dashboard');
    } catch (err) {
      setError('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      py: 4,
    }}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          p: isMobile ? 3 : 4,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            component="h1"
            variant={isMobile ? 'h5' : 'h4'}
            sx={{ mb: 2, fontWeight: 'bold' }}
          >
            Bem-vindo de volta
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
              sx={{ mb: 1 }}
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
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ 
                py: 1.5,
                mb: 2,
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
    </Container>
  );
}