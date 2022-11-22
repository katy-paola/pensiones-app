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
            <div className="d-flex navbar d-none d-md-block">
              <div className="d-flex menu">
                {!isStudent && (
                  <div className="d-flex item">
                    <Link href="/add-pension">
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
                    className="btn btn-sm d-md-none btn-menu-responsive"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                  >
                    <i className="bi bi-list icon-menu-responsive"></i>
                  </button>

                  <div
                    className="offcanvas offcanvas-end d-flex menu-responsive"
                    tabIndex="-1"
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                  >
                    <div className="offcanvas-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div className="offcanvas-body flex-column d-flex justify-content-between">
                      <div className="d-flex flex-column gap-2">
                        {!isStudent && (
                          <button onClick={() => router.push('/add-pension')}>
                            Agregar pensión
                          </button>
                        )}
                        <button onClick={() => router.push('/perfil')}>
                          Mi perfil
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                        }}
                        className="btn-sm btn-lg-sup"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                    }}
                    className="btn-sm d-none d-md-block btn-lg-sup"
                  >
                    Cerrar sesión
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
                    <i className="bi bi-box-arrow-in-right icon-lg"></i>
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
