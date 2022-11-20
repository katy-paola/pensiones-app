import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthState } from '../context/authContext';
import { ROL } from '../model/rol.enum';
// import { useSession } from 'next-auth/react';

const ContainerHome = () => {
  const [pensions, setPensions] = useState([]);
  const [filter, setFilter] = useState('');
  const { rol } = useAuthState();
  // const { data: session, status } = useSession();

  const isStudent = rol === ROL.STUDENT;

  useEffect(() => {
    const getPensions = async () => {
      const response = await fetch('/api/pension');
      const data = await response.json();
      setPensions(data);
    };
    getPensions();
  }, []);
  return (
    <>
      <div className="d-flex container-home">
        <div className="d-flex title">
          {isStudent ? (
            <h1>Explora pensiones disponibles</h1>
          ) : (
            <h1>Mis pensiones</h1>
          )}
        </div>

        <div className="d-flex search">
          <input
            type="search"
            placeholder="Buscar"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        {/* me falta agregarle la parte de filtrar búsqueda */}
        <div className="d-flex content-home">
          {isStudent ? (
            <>
              {pensions.map((pension) => (
                <div className="d-flex row-pension" key={pension.id}>
                  <div className="d-flex div-pension">
                    <picture className="img">
                      <img
                        src={pension.image[0]}
                        alt=""
                        className="img-hab img-fluid"
                      />
                    </picture>
                  </div>
                  <div className="d-flex div-pension div-text-pension">
                    <p>{pension.name}</p>
                    <p>{pension.address}</p>
                    <Link href={`/view-pension/${pension.id}`}>
                      <a>Ver detalles</a>
                    </Link>
                  </div>
                  <div className="d-flex div-pension div-info-pension">
                    <div className="info-pension">⭐⭐⭐⭐⭐</div>
                    <div className="info-pension">${pension.price}</div>
                    <div className="info-pension">🛌 🍽</div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {pensions
                .filter((pension) =>
                  pension.address.toLowerCase().includes(filter.toLowerCase())
                )
                .map((pension) => (
                  <div className="d-flex row-pension" key={pension.id}>
                    <div className="d-flex div-pension">
                      <picture className="img">
                        <img
                          src={pension.image[0]}
                          alt=""
                          className="img-hab img-fluid"
                        />
                      </picture>
                    </div>
                    <div className="d-flex div-pension div-text-pension">
                      <p>{pension.name}</p>
                      <p>{pension.address}</p>
                      <Link href={`/view-pension/${pension.id}`}>
                        <a>Ver detalles</a>
                      </Link>
                    </div>
                    <div className="d-flex div-pension div-info-pension">
                      <div className="info-pension">⭐⭐⭐⭐⭐</div>
                      <div className="info-pension">${pension.price}</div>
                      <div className="info-pension">🛌 🍽</div>
                    </div>
                  </div>
                ))}
            </>
          )}
          <div className="d-flex icon-map">
            <Link href="view-map">
              <i class="bi bi-geo-alt-fill"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContainerHome;
