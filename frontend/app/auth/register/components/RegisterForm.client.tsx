'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { 
  TextField, 
  Button, 
  Alert, 
  Box, 
  IconButton,
  InputAdornment,
  Snackbar
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { registerSchema } from '@/app/validations/auth.validation';
import { PasswordStrength } from './PasswordStrength.client';
import { RegisterFormData } from '../types';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false); // novo estado

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const password = watch('password');

  const handleFormSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await onSubmit(data);
      if (response.success) {
        setSuccess(true); // ativa o feedback de sucesso
        // Aguarda 2 segundos antes de redirecionar
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      } else {
        setError(response.error || 'Erro ao registrar usuário');
      }
    } catch (err) {
      setError('Erro ao registrar usuário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <TextField
        label="Nome do usuário"
        variant="outlined"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register('name')}
      />

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')}
      />

      <TextField
        label="Senha"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
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
          )
        }}
        {...register('password')}
      />

      <PasswordStrength password={password} />

      <TextField
        label="Confirmar senha"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        fullWidth
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Snackbar 
        open={success} 
        autoHideDuration={2000} 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Conta criada com sucesso! Redirecionando para o login...
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={2000}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      >
        <Alert severity="error" sx={{ borderRadius: 1 }}>
          {error}
        </Alert>
      </Snackbar>

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={loading}
        sx={{ mt: 1 }}
      >
        {loading ? 'Registrando...' : 'Criar conta'}
      </Button>

      <Link href="/auth/login" style={{ textDecoration: 'none' }}>
        <Button
          variant="outlined"
          size="large"
          fullWidth
          sx={{ mt: 1 }}
        >
          Já tenho uma conta
        </Button>
      </Link>
    </Box>
  );
}