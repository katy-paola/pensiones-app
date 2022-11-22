import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuthState } from '../context/authContext';
import { ROL } from '../model/rol.enum';
import { useSession } from 'next-auth/react';
import ReactStars from 'react-rating-stars-component';

export const getMoneyFormat = (number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'COP',
  }).format(number);
};

const ContainerHome = () => {
  const [pensions, setPensions] = useState([]);
  const [filter, setFilter] = useState('');
  const { rol } = useAuthState();
  const [price, setPrice] = useState(1000000);

  const { data: session } = useSession();

  const isStudent = rol === ROL.STUDENT;

  useEffect(() => {
    const getPensions = async () => {
      const response = await fetch('/api/pension');
      const data = await response.json();

      setPensions(data);
    };
    getPensions();
  }, []);

  const getPromReview = (reviews) => {
    if (!reviews) return 'Sin calificaciones';
    if (reviews.length === 0) return 'No tiene calificaciones';

    const prom = reviews.reduce((acc, review) => {
      return acc + Number(review.rating);
    }, 0);

    return (
      <ReactStars
        count={5}
        value={prom / reviews.length}
        size={24}
        activeColor="#ffd700"
        edit={false}
      />
    );
  };

  const handleInput = (e) => {
    setPrice(e.target.value);
  };

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

        {isStudent && (
          <div className="d-flex flex-column div--search">
            <input
              type="search"
              placeholder="Filtrar por nombre, dirección o servicios"
              className="form-control"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />

            <div className="d-flex flex-row gap-2">
              <label htmlFor="price">
                Precio máximo: {getMoneyFormat(price)}
              </label>

              <input
                type="range"
                min={50000}
                max="1000000"
                onInput={handleInput}
              />
            </div>
          </div>
        )}
        {/* me falta agregarle la parte de filtrar búsqueda */}
        <div className="d-flex content-home">
          {isStudent ? (
            <>
              {pensions
                .filter(
                  (pension) =>
                    pension.address
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ||
                    pension.name.toLowerCase().includes(filter.toLowerCase()) ||
                    pension.services
                      .toLowerCase()
                      .includes(filter.toLowerCase())
                )
                .filter((pension) => pension.price <= price)
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
                      <div className="info-pension">
                        {getPromReview(pension.reviews)}
                      </div>
                      <div className="info-pension">
                        {getMoneyFormat(pension.price)}
                      </div>
                      <div className="info-pension">🛌 🍽</div>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <>
              {pensions

                .filter(
                  (pension) => pension.HomeOwner.userId === session?.user?.id
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
                      <div className="info-pension">
                        {getPromReview(pension.reviews)}
                      </div>
                      <div className="info-pension">
                        {getMoneyFormat(pension.price)}
                      </div>
                      <div className="info-pension">🛌 🍽</div>
                    </div>
                  </div>
                ))}
            </>
          )}
          <div className="d-flex icon-map">
            <Link href="view-map">
              <i className="bi bi-geo-alt-fill"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContainerHome;
