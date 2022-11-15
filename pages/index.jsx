import styles from '../styles/Home.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <h3>Estoy cargando...</h3>;
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <div className="grid-container">
          <header>header</header>
          <main>main</main>
          <aside>aside</aside>
          <footer>footer</footer>
        </div>
        {/* <div className="parent grid-container">
          <header>header</header>
          <div className="div2">
            <div className="row m-0 align-items-center">
              <div className="col m-0">
                <div className="d-flex flex-column div-main">
                  <article>
                    Ullamco sint elit laborum occaecat proident aliquip qui.
                    Adipisicing labore eu ipsum ex voluptate consectetur qui
                    ullamco eiusmod qui esse sint in.
                  </article>
                  <article>article 2</article>
                  <article>article 3</article>
                </div>
              </div>
              <div className="col m-0 div-img">
                <Image
                  className="image"
                  src={'/img_home.jpg'}
                  alt=""
                  width={600}
                  height={500}
                />
              </div>
            </div>
          </div>
          <div className="div3">footer</div>
          <button onClick={() => signIn('google')}>
            Iniciar sesión con Google
          </button>
        </div> */}
      </>
    );
  }

  return (
    <div className={styles.container}>
      <h1>
        <i class="bi bi-houses"></i>
        PensionesApp
      </h1>
      <button onClick={() => signOut()}>Cerrar sesión</button>
      <main>
        <h2>¡Bienvenido {session.user.name}!</h2>
      </main>
    </div>
  );
}
