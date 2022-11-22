import { useAuthState } from '../context/authContext';
import { ROL } from '../model/rol.enum';

const FormEditProfile = () => {
  const { user, setUser, rol } = useAuthState();

  const handelSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const dataObj = Object.fromEntries(data.entries());

    setUser({ ...user, ...dataObj });

    if (rol === ROL.HOMEOWNER) {
      setUser({ ...user, homeOwner: { ...user.homeOwner, ...dataObj } });
      await fetch('/api/home-owner/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...dataObj, userId: user.id }),
      });
    }

    const response = await fetch('/api/users/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...dataObj, userId: user.id }),
    });

    const result = await response.json();
    console.log(result);

    alert('Usuario actualizado');
  };

  if (user) {
    return (
      <>
        <div className="d-flex container-edit-profile">
          <div className="d-flex title">
            <h1>Editar perfil</h1>
          </div>
          <form onSubmit={handelSubmit} className="d-flex">
            <div className="d-flex content-form">
              <div className="d-flex data">
                <label htmlFor="">Nombre:</label>
                <input type="text" name="name" defaultValue={user.name} />
              </div>
              <div className="d-flex data">
                <label htmlFor="">Apellido:</label>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={user.lastName}
                />
              </div>
              <div className="d-flex data">
                <label htmlFor="">Url foto:</label>
                <input type="text" name="image" defaultValue={user.image} />
              </div>
              {rol === ROL.HOMEOWNER && (
                <>
                  <div className="d-flex data">
                    <label htmlFor="">Teléfono:</label>
                    <input
                      type="text"
                      name="phone"
                      defaultValue={user.homeOwner.phone}
                    />
                  </div>
                  <div className="d-flex data">
                    <label htmlFor="">Dirección:</label>
                    <input
                      type="text"
                      name="address"
                      defaultValue={user.homeOwner.address}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="d-flex save">
              <button type="submit" className="btn-sm">
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }

  return <div>loading...</div>;
};

export default FormEditProfile;
