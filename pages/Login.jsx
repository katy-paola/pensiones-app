import { useAuthState } from '../context/authContext';
import { ROL } from '../model/rol.enum';

export default function Login() {
  const { login } = useAuthState();

  return (
    <div className="grid-container">
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
    </div>
  );
}
