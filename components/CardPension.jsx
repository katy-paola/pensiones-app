import MapPension from './mapPension';
import { useState } from 'react';

const CardPension = ({
  image,
  name,
  description,
  address,
  location,
  price,
  services,
  homeOwner,
}) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="d-flex container-view-pension flex-column">
      <div className="d-flex title">
        <div className="d-flex div-text">
          <h3>{name}</h3>
        </div>
        <div className="d-flex icons">
          <div className="icon-1">
            <i class="bi bi-bookmark-heart"></i>
            {/* <i class="bi bi-bookmark-heart-fill"></i> */}
          </div>
          <div className="icon-2">
            <i class="bi bi-pencil-square"></i>
          </div>
          <div className="icon-3">
            <i class="bi bi-trash"></i>
          </div>
        </div>
      </div>
      <div className="d-flex content-view-pension">
        <div className="div-content">
          <picture className="photo">
            <img src={image} alt="" className="img-fluid" />
          </picture>
        </div>
        <div className="div-content">
          <p>⭐⭐⭐⭐⭐</p>
        </div>
        <div className="div-content">
          <p className="description">{description}</p>
        </div>
        <div className="div-content">
          <p className="price">${price}</p>
        </div>
        <div className="div-content">
          <p className="address">{address}</p>
        </div>
        <div className="div-content">
          <p className="services">{services}</p>
        </div>
        <div className="div-content">
          <a onClick={() => setShowMap(!showMap)} className="location">
            Ver ubicación
          </a>
        </div>
        <div className="div-content">
          <p className="homeowner">HomeOwner: {homeOwner?.user.name}</p>
        </div>
        <div className="div-content">
          <a href={`tel:${homeOwner?.phone}`} className="phone">
            Contactar
          </a>
        </div>
        <div className="d-flex div-content rating">
          <p className="calificar">Calificar</p>
          <input type="radio" className="radio" />
          <div>
            <label htmlFor="">Escribir comentario</label>
            <input type="text-area" />
            <i class="bi bi-check-circle"></i>
          </div>
        </div>
      </div>

      {showMap && (
        <div className="d-flex map" style={{ height: '100vh', width: '100%' }}>
          <MapPension
            pensions={[
              { id: 1, location: location ?? '10.401630,-75.470022', name },
            ]}
          />
        </div>
      )}
    </div>

    /* <div className="d-flex row-pension">
      <div className="d-flex div-pension">
        <picture className="img">
          <img src={image} alt="" className="img-hab img-fluid" />
        </picture>
      </div>
      <div className="d-flex div-pension div-text-pension">
        <p>{name}</p>
        <p>{address}</p>
      </div>
      <div className="d-flex div-pension div-info-pension">
        <div className="info-pension">⭐⭐⭐⭐⭐</div>
        <div className="info-pension">${price}</div>
        <div className="info-pension">🛌 🍽 🚗</div>
      </div>
    </div> */
  );
};

export default CardPension;
