import MapPension from './mapPension';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const CardPension = ({
  image,
  name,
  description,
  address,
  location,
  price,
  services,
  homeOwner,
  id,
}) => {
  const router = useRouter();
  const [showMap, setShowMap] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const getStudent = async () => {
      const res = await fetch(`/api/student/${session.user.id}`);
      const data = await res.json();
      const isFav = data.favoritePensions.some((pension) => pension.id === id);
      setIsFavorite(isFav);
    };

    if (session) {
      getStudent();
    }
  }, [session, id]);

  const saveAsFavorite = async () => {
    setIsFavorite(!isFavorite);
    await fetch('/api/pension/favorite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pensionId: id,
        userId: session.user.id,
      }),
    });
  };

  const deleteFavorite = async () => {
    setIsFavorite(!isFavorite);
    await fetch('/api/pension/favorite', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pensionId: id,
        userId: session.user.id,
      }),
    });
  };

  let contador;
  const calificar = (item) => {
    contador = item[5];
    for (let i = 0; i < 5; i++) {
      if (i < contador) {
        document.getElementById('item-' + (i + 1)).style.color = 'yellow';
      } else {
        document.getElementById(item.id).style.color = 'black';
      }
    }
  };

  return (
    <div className="d-flex container-view-pension flex-column">
      <div className="d-flex title">
        <div className="d-flex div-text">
          <h3>{name}</h3>
        </div>
        <div className="d-flex icons">
          <a className="icon-1">
            {isFavorite ? (
              <i
                className="bi bi-bookmark-heart-fill"
                onClick={deleteFavorite}
              ></i>
            ) : (
              <i className="bi bi-bookmark-heart" onClick={saveAsFavorite}></i>
            )}
          </a>
          <a
            className="icon-2"
            onClick={() => {
              router.push('/edit-pension');
            }}
          >
            <i class="bi bi-pencil-square"></i>
          </a>
          <a className="icon-3">
            <i class="bi bi-trash"></i>
          </a>
        </div>
      </div>
      <div className="d-flex content-view-pension">
        <div className="div-content">
          <picture className="photo">
            <img src={image} alt="" className="img-fluid" />
          </picture>
        </div>
        <div className="div-content">
          <span id="star-1" onClick={calificar(this)}>
            <i class="bi bi-star"></i>
          </span>
          <span id="star-2" onClick={calificar(this)}>
            <i class="bi bi-star"></i>
          </span>
          <span id="star-3" onClick={calificar(this)}>
            <i class="bi bi-star"></i>
          </span>
          <span id="star-4" onClick={calificar(this)}>
            <i class="bi bi-star"></i>
          </span>
          <span id="star-5" onClick={calificar(this)}>
            <i class="bi bi-star"></i>
          </span>
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
          <div className="d-flex radio">
            <input type="radio" />
          </div>
          <div className="d-flex coment">
            <label htmlFor="">Escribir comentario:</label>
            <textarea name="" id="" cols="30" rows="10"></textarea>
            <a href="#">
              <i title="Publicar reseña" class="bi bi-check-circle"></i>
            </a>
          </div>
        </div>
      </div>
      {showMap && (
        <div class="map">
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
