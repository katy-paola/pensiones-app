import { useAuthState } from '../context/authContext';
import { ROL } from '../model/rol.enum';
import { useState, useEffect } from 'react';

const ContentProfile = () => {
  const { user, rol } = useAuthState();
  const [favoritePensions, setFavoritePensions] = useState([]);
  const [showPensions, setShowPensions] = useState(false);

  useEffect(() => {
    const getFavoritePensions = async () => {
      const response = await fetch(`/api/student/${user.id}`);
      const data = await response.json();
      setFavoritePensions(data.favoritePensions);
    };

    getFavoritePensions();
  }, [user.id]);

  const roleToString = (rol) => {
    switch (rol) {
      case ROL.HOMEOWNER:
        return 'Propietario';
      case ROL.STUDENT:
        return 'Estudiante';
      default:
        return 'Admin';
    }
  };

  return (
    <div className="d-flex container-profile">
      <div className="photo">
        <picture>
          <img src={user.image} alt="" className="img-fluid" />
        </picture>
      </div>
      <div className="d-flex content-profile">
        <div className="d-flex items item-1">
          <div className="name">
            <p>
              {user.name} {user.lastName}
            </p>
          </div>
          <div className="role">
            <p>{roleToString(user.rol)}</p>
          </div>
        </div>
        <div className="items">
          <p>{user.email}</p>
        </div>
        <div className="items">
          <p>⭐⭐⭐⭐⭐</p>
        </div>
        {rol === ROL.HOMEOWNER ? (
          <>
            <div className="items">
              <a href={`tel:${user?.homeOwner?.phone}`} className="phone">
                Contactar
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="items">
              <a onClick={() => setShowPensions(!showPensions)}>
                Ver mis pensiones guardadas
              </a>
            </div>
          </>
        )}
      </div>

      {showPensions && (
        <div className="d-flex container-pensions">
          {favoritePensions.length < 1 && <p>No tienes pensiones guardadas</p>}
          {favoritePensions.map((pension) => (
            <div key={pension.id} className="pension">
              <div className="photo">
                <picture>
                  <img src={pension.image} alt="" className="img-fluid" />
                </picture>
              </div>
              <div className="d-flex content-pension">{pension.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentProfile;
