import { useAuthState } from '../context/authContext';
import { ROL } from '../model/rol.enum';
// import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const FormRegister = () => {
  const { rol } = useAuthState();
  const router = useRouter();
  const isStudent = rol === ROL.STUDENT;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const dataObj = Object.fromEntries(data.entries());
    console.log(
      '🚀 ~ file: FormRegister.jsx ~ line 16 ~ handleSubmit ~ dataObj',
      dataObj
    );

    if (dataObj.password !== dataObj['confirm-password']) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const response = await fetch('/api/users/create', {
      method: 'POST',
      body: JSON.stringify({
        name: dataObj.name,
        password: dataObj.password,
        lastName: dataObj.lastName,
        email: dataObj.email,
        image: dataObj.image,
        rol,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (rol === ROL.HOMEOWNER && result) {
      await fetch('/api/home-owner/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...dataObj, userId: result.id }),
      });
    }

    if (rol === ROL.STUDENT && result) {
      await fetch('/api/student/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: result.id }),
      });
    }

    if (result) {
      alert('Usuario creado correctamente');
      router.push('/login');
    }
  };

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
        <form onSubmit={handleSubmit} className="d-flex form-register">
          <div className="d-flex datos">
            <div className="d-flex datos-1">
              <div className="d-flex input">
                <input type="text" placeholder="Nombre" name="name" />
              </div>
              <div className="d-flex input">
                <input type="text" placeholder="Apellido" name="lastName" />
              </div>
              <div className="d-flex input">
                {!isStudent ? (
                  <input type="email" placeholder="E-mail" name="email" />
                ) : (
                  <input
                    type="email"
                    placeholder="E-mail - @unicartagena.edu.co"
                    name="email"
                  />
                )}
              </div>
            </div>
            <div className="d-flex datos-2">
              <div className="d-flex input">
                <input
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                />
              </div>
              <div className="d-flex input">
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  name="confirm-password"
                />
              </div>
              <div className="d-flex input">
                <input type="url" placeholder="Url Foto perfil" name="image" />
              </div>

              {rol === ROL.HOMEOWNER && (
                <>
                  <div className="d-flex input">
                    <input type="text" placeholder="Direccion" name="address" />
                  </div>

                  <div className="d-flex input">
                    <input type="tel" placeholder="Telefono" name="phone" />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="d-flex sign--up">
            <button type="submit" className="btn btn-sm">
              Registrarme
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormRegister;
