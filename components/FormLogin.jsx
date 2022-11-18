import Link from 'next/link';
const FormLogin = () => {
  return (
    <>
      <div className="d-flex login">
        <div className="d-flex welcome">
          <h1>Bienvenido</h1>
        </div>
        <div className="d-flex form">
          <div className="d-flex principal">
            <div className="email">
              <label htmlFor="email" className="label">
                E-mail:
              </label>
              <input
                type="text"
                className="input"
                placeholder="example@unicartagena.edu.co"
              />
            </div>
            <div className="password">
              <label htmlFor="password" className="label">
                Contraseña:
              </label>
              <input type="password" className="input" placeholder="********" />
            </div>
            <div className="d-flex sign--in">
              <button type="button" className="btn btn-sm">
                Iniciar sesión
              </button>
            </div>
          </div>
          <div className="d-flex adicional">
            <div className="d-flex no--account">
              <p>¿No tienes una cuenta?</p>
              <Link href="#">
                <a>Regístrate</a>
              </Link>
            </div>
            <div className="d-flex as--homeowner">
              <Link href="#">
                <a>Registrarme como propietario</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLogin;
