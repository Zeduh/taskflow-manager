'use client';

import { useAuth } from '@/app/contexts/auth.context';
import Header from './Header.client';
import Footer from './Footer.server';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
}