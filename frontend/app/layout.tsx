'use client';

import { Geist } from "next/font/google";
import { usePathname } from 'next/navigation';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from './contexts/theme.context';
import { AuthProvider } from './contexts/auth.context';
import CssBaseline from '@mui/material/CssBaseline';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { isAuthRoute } from './utils/auth';
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = isAuthRoute(pathname);

  return (
    <html lang="pt-BR">
      <body className={geist.className}>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <AuthProvider>
              <CssBaseline />
              {!isAuthPage && <Header />}
              <main>{children}</main>
              {!isAuthPage && <Footer />}
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}