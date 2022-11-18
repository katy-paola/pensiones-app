import { useAuthState } from '../../context/authContext';
import { ROL } from '../../model/rol.enum';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Login() {
  const { login } = useAuthState();

  const loginAsHomeowner = () => {
    login(ROL.HOMEOWNER);
  };

  return (
    <>
      <div className="grid-container-login">
        <Header></Header>
        {/* <Content></Content> */}
        <main className="content">
          <div className="d-flex login">
            <div className="d-flex welcome">
              <h1>Registrate como propietario</h1>
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
                  <input
                    type="password"
                    className="input"
                    placeholder="********"
                  />
                </div>
                <div className="d-flex sign--in">
                  <button
                    type="button"
                    onClick={loginAsHomeowner}
                    className="btn btn-sm"
                  >
                    Iniciar sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </>
    /* <div className="grid-container">
      <header></header>
      <main>
        <button onClick={() => login(ROL.STUDENT)}>
          Entrar como estudiante
        </button>
        <button onClick={() => login(ROL.HOMEOWNER)}>
          Entrar como Propietario
        </button>
      </main>
      <footer></footer>
    </div> */
  );
}
