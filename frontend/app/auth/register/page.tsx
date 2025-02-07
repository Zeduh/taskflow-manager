import { Paper, Typography, Box } from '@mui/material';
import { RegisterForm } from './components/RegisterForm.client';
import { registerUser } from './actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registro - Task Manager',
  description: 'Crie sua conta no Task Manager'
};

export default function RegisterPage() {
  return (
    <Paper 
      elevation={3}
      sx={{
        width: '100%',
        maxWidth: 'sm',
        mx: 'auto',
        p: { xs: 3, md: 4 },
        borderRadius: 2,
      }}
    >
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          component="h1" 
          variant="h4" 
          sx={{ fontWeight: 700, mb: 2 }}
        >
          Criar Conta
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Preencha os dados abaixo para começar
        </Typography>
      </Box>
      
      <RegisterForm 
        onSubmit={registerUser}
      />
    </Paper>
  );
}