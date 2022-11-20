import { ROL } from '../model/rol.enum';
import { useAuthState } from '../context/authContext';
import { useRouter } from 'next/router';

const Main = () => {
  const { setRol } = useAuthState();
  const router = useRouter();

  return (
    <>
      <main>
        <div className="text">
          <h4>
            Somos tu puente para encontrar pensión en la ciudad de Cartagena
          </h4>
        </div>
        <div className="buttons">
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              router.push('/login');
            }}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => {
              setRol(ROL.STUDENT);
              router.push('/register');
            }}
          >
            Registrarme
          </button>
        </div>
        <div className="add--text">
          <p>
            ¿Eres propietario y quieres publicar tus pensiones?
            <br />
            <a
              className="rg-as-homeowner"
              onClick={() => {
                setRol(ROL.HOMEOWNER);
                router.push('/register');
              }}
            >
              Registrarme como propietario
            </a>
          </p>
        </div>
      </main>
    </>
  );
};

export default Main;
