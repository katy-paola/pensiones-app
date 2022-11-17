import styles from '../styles/Home.module.css';
import { useSession, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <h3>Estoy cargando...</h3>;
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <div className="grid-container">
          <header>
            <h1>
              <i class="bi bi-houses"></i>
              PensionesApp
            </h1>
          </header>
          <main>
            <div className="text">
              <h4>
                Somos tu puente para encontrar pensión en la ciudad de Cartagena
              </h4>
            </div>
            <div className="buttons">
              <button type="button" className="btn btn-sm">
                Iniciar sesión
              </button>
              <button type="button" className="btn btn-sm">
                Registrarme
              </button>
            </div>
            <div className="add--text">
              <p>
                ¿Eres propietario y quieres publicar tus pensiones?
                <br />
                <a href="#">Registrarme como propietario</a>
              </p>
            </div>
          </main>
          <aside>
            <picture>
              <img src="/img_home.jpg" className="img-fluid" alt="" />
            </picture>
          </aside>
          <footer>
            <p>
              Made with <i class="bi bi-heart-fill"></i> by Katy
            </p>
          </footer>
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
