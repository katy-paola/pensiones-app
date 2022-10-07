import styles from '../styles/Home.module.css';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <h3>Estoy cargando...</h3>;
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <div class="row align-items-center text-center div--principal">
          <div class="col-sm-6">
            <div class="card card--style">
              <div class="card-body">
                <h1 class="card-title mb-4">PensionesApp</h1>
                <p class="card-text mb-4">
                  ¿Eres estudiante foráneo y buscas alojamiento en la ciudad de
                  Cartagena? ¡Elige entre cientos de ofertas que tenemos para
                  ti!
                </p>
                <div className="d-flex justify-content-center gap-3 align-items-center mt-3 mb-3">
                  <a href="#" class="btn btn--color">
                    Iniciar sesión
                  </a>
                  <a href="#" class="btn btn--color">
                    Registrarme
                  </a>
                </div>
                <p className="card-text mt-5">
                  ¿Eres arrendatario y quieres publicar tu alojamiento?
                  <br />
                  <a href="#">Registrarme como arrendatario</a>
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="card card--style">
              <div class="card-body">
                <Image
                  className="width--img"
                  src="/img_home.jpg"
                  alt="..."
                  width={600}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>

        {/*<h3>Landing</h3>
        <Link href="/Login.jsx">
          <a>Iniciar sesión</a>
        </Link>
        <button onClick={() => signIn('google')}>
          Iniciar sesión con Google
        </button>
    im*/}
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
