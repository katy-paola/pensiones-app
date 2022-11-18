import { useAuthState } from '../../context/authContext';
import { ROL } from '../../model/rol.enum';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const NewUserPage = () => {
  const { rol } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (rol === ROL.STUDENT) {
      router.push('/');
    }
  }, [rol, router]);

  return (
    <div>
      <h1>New User</h1>

      {rol === ROL.ADMIN && <p>Admin</p>}
      {rol === ROL.HOMEOWNER && <FormHomeowner />}
      {rol === ROL.STUDENT && <p>Propietario</p>}
    </div>
  );
};

const FormHomeowner = () => {
  const { data: session } = useSession();

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const dataObj = Object.fromEntries(data.entries());

    const response = await fetch(
      'http://localhost:3000/api/home-owner/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...dataObj, userId: session.user.id }),
      }
    );

    const result = await response.json();
    console.log(result);
  };

  return (
    <div>
      <h1>Formulario Propietario</h1>

      <form className="d-flex flex-column" onSubmit={handlerSubmit}>
        <label htmlFor="phone">Telefono</label>
        <input type="text" name="phone" id="phone" />
        <label htmlFor="address">Direccion</label>
        <input type="text" name="address" id="address" />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default NewUserPage;
