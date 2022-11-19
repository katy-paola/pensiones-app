import { useAuthState } from '../context/authContext';
import { ROL } from '../model/rol.enum';
// import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const FormRegister = () => {
  const { rol } = useAuthState();
  const router = useRouter();
  const isStudent = rol === ROL.STUDENT;

  return (
    <>
      <div className="d-flex register">
        <div className="title">
          {!isStudent ? (
            <h1>Registrarme como propietario</h1>
          ) : (
            <h1>Registrarme</h1>
          )}
        </div>
        <div className="d-flex form-register">
          <div className="d-flex datos">
            <div className="d-flex datos-1">
              <div className="d-flex input">
                <input type="text" placeholder="Nombre" />
              </div>
              <div className="d-flex input">
                <input type="text" placeholder="Apellido" />
              </div>
              <div className="d-flex input">
                {!isStudent ? (
                  <input type="email" placeholder="E-mail" />
                ) : (
                  <input
                    type="email"
                    placeholder="E-mail - @unicartagena.edu.co"
                  />
                )}
              </div>
            </div>
            <div className="d-flex datos-2">
              <div className="d-flex input">
                <input type="password" placeholder="Contraseña" />
              </div>
              <div className="d-flex input">
                <input type="password" placeholder="Confirmar contraseña" />
              </div>
              <div className="d-flex input">
                <input type="tel" placeholder="Teléfono" />
              </div>
            </div>
          </div>
          <div className="d-flex sign--up">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => router.push('/home')}
            >
              Registrarme
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormRegister;
