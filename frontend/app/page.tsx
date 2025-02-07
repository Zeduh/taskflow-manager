// app/page.tsx (Server Component - Home Page)
import { redirect } from 'next/navigation';
import { Button } from '@mui/material';
import styles from './page.module.css';
import { HomeActions } from './components/HomeActions.client';

export default function Home() {
  // Server-side auth check
  const isAuthenticated = false; // Implementar verificação do token
  
  if (isAuthenticated) {
    redirect('/dashboard');
  }

  return (
    <div className={styles.container}>
      <section className={styles.main}>
        <h2 className={styles.title}>
          Bem-vindo ao Task Manager
        </h2>
        <p className={styles.description}>
          Gerencie suas tarefas de forma simples e eficiente
        </p>
        <HomeActions />
      </section>
    </div>
  );
}