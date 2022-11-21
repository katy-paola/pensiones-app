import { useAuthState } from '../context/authContext';
import { ROL } from '../model/rol.enum';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Header = () => {
  const router = useRouter();
  const { rol, logout } = useAuthState();
  const { status } = useSession();

  const isAuth = status === 'authenticated';
  const isStudent = rol === ROL.STUDENT;

  return (
    <>
      <header className="d-flex">
        <Link href="/">
          <a className="pensiones-app">
            <h1>
              <i className="bi bi-houses"></i>
              PensionesApp
            </h1>
          </a>
        </Link>
        <div className="d-flex nav-menu">
          {isAuth && (
            <div className="d-flex navbar">
              <div className="menu">
                {!isStudent && (
                  <div className="d-flex item">
                    <Link href="#">
                      <a>Agregar pensión</a>
                    </Link>
                  </div>
                )}
                <div className="d-flex item">
                  <Link href="/perfil">
                    <a>Mi perfil</a>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {(router.pathname === '/register' || isAuth) && (
            // Validar si muestra el botón de inicio de sesión o cerrar sesión
            <div className="d-flex div-btn-lg-sup">
              {isAuth ? (
                <>
                  <button
                    class="btn btn-primary"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                  >
                    <i class="bi bi-list"></i>
                  </button>

                  <div
                    class="offcanvas offcanvas-end"
                    tabindex="-1"
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                  >
                    <div class="offcanvas-header">
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    {!isStudent && (
                      <div class="offcanvas-body">
                        <button>Agregar pensión</button>
                      </div>
                    )}
                    <div class="offcanvas-body">
                      <button>Mi perfil</button>
                    </div>
                    <div class="offcanvas-body">
                      <button
                        onClick={() => {
                          router.push('/');
                          logout();
                        }}
                        className="btn-sm d-none d-md-block btn-lg-sup"
                      >
                        Cerrar sesión
                      </button>
                      <button
                        onClick={() => {
                          router.push('/');
                          logout();
                        }}
                        className="d-md-none div-icon-lg"
                      >
                        <i class="bi bi-box-arrow-right icon-lg"></i>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      router.push('/');
                      logout();
                    }}
                    className="btn-sm d-none d-md-block btn-lg-sup"
                  >
                    Cerrar sesión
                  </button>
                  <button
                    onClick={() => {
                      router.push('/');
                      logout();
                    }}
                    className="d-md-none div-icon-lg"
                  >
                    <i class="bi bi-box-arrow-right icon-lg"></i>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn-sm d-none d-md-block btn-lg-sup"
                    onClick={() => {
                      router.push('/login');
                    }}
                  >
                    Iniciar sesión
                  </button>
                  <button className="d-md-none div-icon-lg">
                    <i class="bi bi-box-arrow-in-right icon-lg"></i>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
