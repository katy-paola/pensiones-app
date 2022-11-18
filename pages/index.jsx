import styles from '../styles/Home.module.css';
import { useSession, signOut } from 'next-auth/react';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Main from '../components/Main';
import Aside from '../components/Aside';
import Footer from '../components/Footer';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <>
        <Loading></Loading>
      </>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <div className="grid-container-landing">
          <Header></Header>
          <Main></Main>
          <Aside></Aside>
          <Footer></Footer>
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Header></Header>
      <p>Hola, estoy autenticado</p>
      <h1>
        <i className="bi bi-houses"></i>
        PensionesApp
      </h1>
      <button onClick={() => signOut()}>Cerrar sesión</button>
      <main>
        <h2>
          ¡Bienvenido {session.user.name}! {session.user.id}
        </h2>
      </main>
    </div>
  );
}
