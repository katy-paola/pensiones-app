import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROL } from '../model/rol.enum';
import { useAuthState } from '../context/authContext';

const FormLogin = () => {
  const router = useRouter();
  const { setRol } = useAuthState();
  return (
    <>
      <div className="d-flex login">
        <div className="d-flex welcome">
          <h1>Bienvenido</h1>
        </div>
        <div className="d-flex form-login">
          <div className="d-flex principal">
            <div className="email">
              <label htmlFor="email" className="label">
                E-mail:
              </label>
              <input
                type="text"
                className="input"
                placeholder="email@example.com"
              />
            </div>
            <div className="password">
              <label htmlFor="password" className="label">
                Contraseña:
              </label>
              <input type="password" className="input" placeholder="********" />
            </div>
            <div className="d-flex sign--in">
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => {
                  router.push('/home');
                }}
              >
                Iniciar sesión
              </button>
            </div>
          </div>
          <div className="d-flex adicional">
            <div className="d-flex no--account">
              <p>¿No tienes una cuenta?</p>
              <Link href="/register">
                <a
                  onClick={() => {
                    setRol(ROL.STUDENT);
                  }}
                >
                  Regístrate
                </a>
              </Link>
            </div>
            <div className="d-flex as--homeowner">
              <Link href="/register">
                <a
                  onClick={() => {
                    setRol(ROL.HOMEOWNER);
                  }}
                >
                  Registrarme como propietario
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLogin;
