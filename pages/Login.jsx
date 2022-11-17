import { useAuthState } from '../context/authContext';
import { ROL } from '../model/rol.enum';

export default function Login() {
  const { login } = useAuthState();

  return (
    <div>
      <h1>Prueba de inicio de sesión</h1>

      <button onClick={() => login(ROL.STUDENT)}>Entrar como estudiante</button>
      <button onClick={() => login(ROL.HOMEOWNER)}>
        Entrar como Propietario
      </button>
    </div>
  );
}
