// frontend/app/page.tsx
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.main}>
        <h2 className={styles.title}>
          Bem-vindo ao Task Manager
        </h2>
        <p className={styles.description}>
          Gerencie suas tarefas de forma simples e eficiente
        </p>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Minhas Tarefas</h3>
            <p>Visualize e gerencie suas tarefas pendentes</p>
          </div>
          <div className={styles.card}>
            <h3>Nova Tarefa</h3>
            <p>Crie uma nova tarefa rapidamente</p>
          </div>
        </div>
      </section>
    </div>
  );
}