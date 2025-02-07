'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from '../contexts/auth.context';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme/theme';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  // Previne hidratação incorreta
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          {children}
        </AuthProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}