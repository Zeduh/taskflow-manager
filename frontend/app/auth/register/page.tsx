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
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthService } from '@/app/services/auth.service';
import { registerSchema } from '@/app/validations/auth.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { calculatePasswordStrength, getPasswordStrengthColor, getPasswordStrengthText } from '@/app/utils/password';

export default function RegisterPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    setError('');
    setLoading(true);

    try {
      const response = await AuthService.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      
      login(response.access_token, response.user);
      router.push('/dashboard');
    } catch (err) {
      setError('Erro ao criar conta. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const strength = calculatePasswordStrength(event.target.value);
    setPasswordStrength(strength);
  };

  return (
    <Container maxWidth="sm" sx={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      py: 4,
    }}>
      <Paper elevation={3} sx={{
        width: '100%',
        p: isMobile ? 3 : 4,
        borderRadius: 2,
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}>
          <Typography
            component="h1"
            variant={isMobile ? 'h5' : 'h4'}
            sx={{ mb: 2, fontWeight: 'bold' }}
          >
            Criar Conta
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', borderRadius: 1 }}>
              {error}
            </Alert>
          )}

          <Box 
            component="form" 
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: '100%', gap: 2, display: 'flex', flexDirection: 'column' }}
          >
            <TextField
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              label="Nome completo"
              autoComplete="name"
            />
            
            <TextField
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              label="Email"
              type="email"
              autoComplete="email"
            />
            
            <TextField
              {...register('password', {
                onChange: handlePasswordChange
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Senha"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Confirmar senha"
            />

{passwordStrength > 0 && (
              <Box sx={{ width: '100%', mt: -1, mb: 1 }}>
                <Box sx={{ 
                  width: '100%', 
                  height: 4, 
                  bgcolor: 'grey.200',
                  borderRadius: 1,
                  overflow: 'hidden'
                }}>
                  <Box
                    sx={{
                      width: `${passwordStrength}%`,
                      height: '100%',
                      bgcolor: getPasswordStrengthColor(passwordStrength),
                      transition: 'width 0.3s ease-in-out, background-color 0.3s ease-in-out'
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: getPasswordStrengthColor(passwordStrength),
                    mt: 0.5,
                    display: 'block'
                  }}
                >
                  Força da senha: {getPasswordStrengthText(passwordStrength)}
                </Typography>
              </Box>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ py: 1.5, mb: 2 }}
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </Button>
            
            <Link href="/auth/login" style={{ textDecoration: 'none', width: '100%' }}>
              <Button fullWidth variant="outlined" size="large" sx={{ py: 1.5 }}>
                Já tenho uma conta
              </Button>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}