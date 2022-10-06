import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <h3>Estoy cargando...</h3>;
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <h3>Debes iniciar sesión</h3>
        <button onClick={() => signIn('google')}>Iniciar sesión</button>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <h1>PensionesApp 🏘</h1>
      <button onClick={() => signOut()}>Cerrar sesión</button>
      <main>
        <h2>¡Bienvenido {session.user.name}!</h2>
      </main>
    </div>
  );
}
