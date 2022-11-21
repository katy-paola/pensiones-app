import MapPension from './mapPension';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useAuthState } from '../context/authContext';
import { ROL } from '../model/rol.enum';
import ReactStars from 'react-rating-stars-component';

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
  reviews,
}) => {
  const router = useRouter();
  const [showMap, setShowMap] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: session } = useSession();
  const { rol } = useAuthState();

  const [newReview, setNewReview] = useState({
    title: '',
    description: '',
    rating: 0,
  });

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

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setNewReview({ ...newReview, rating: newRating });
  };

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

  const createReview = async () => {
    const res = await fetch('/api/review/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newReview,
        rating: newReview.rating.toString(),
        pensionId: id,
        authorId: session.user.id,
      }),
    });
    if (res.status === 200) {
      alert('Gracias por tu calificacion');
      setNewReview({
        title: '',
        description: '',
        rating: 0,
      });
    }
  };

  const getPromReview = () => {
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

  const deletePension = async () => {
    const res = await fetch(`/api/pension/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pensionId: id,
      }),
    });
    if (res.status === 200) {
      alert('Pension eliminada');
      router.push('/home');
    }
  };

  return (
    <div className="d-flex container-view-pension flex-column">
      <div className="d-flex title">
        <div className="d-flex div-text">
          <h3>{name}</h3>
        </div>
        <div className="d-flex icons">
          {rol === ROL.STUDENT && (
            <a className="icon-1">
              {isFavorite ? (
                <i
                  className="bi bi-bookmark-heart-fill"
                  onClick={deleteFavorite}
                ></i>
              ) : (
                <i
                  className="bi bi-bookmark-heart"
                  onClick={saveAsFavorite}
                ></i>
              )}
            </a>
          )}
          {rol === ROL.HOMEOWNER && (
            <>
              <a
                className="icon-2"
                onClick={() => {
                  router.push('/edit-pension');
                }}
              >
                <i class="bi bi-pencil-square"></i>
              </a>
              <a className="icon-3" onClick={deletePension}>
                <i class="bi bi-trash"></i>
              </a>
            </>
          )}
        </div>
      </div>
      <div className="d-flex content-view-pension">
        <div className="div-content">
          <picture className="photo">
            <img src={image} alt="" className="img-fluid" />
          </picture>
        </div>
        <div className="div-content">{getPromReview()}</div>
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

        <div className="div-reviews">
          <h3>Reviews</h3>
          {reviews?.map((review) => (
            <div key={review.id} className="review">
              <p className="title">{review.title}</p>
              <p className="description">{review.description}</p>
              <p className="rating">
                <ReactStars
                  count={5}
                  value={review.rating}
                  size={24}
                  activeColor="#ffd700"
                  edit={false}
                />
              </p>
            </div>
          ))}
        </div>

        {rol === ROL.STUDENT && (
          <div className="d-flex div-content rating">
            <p className="calificar">Calificar</p>
            <div>
              <input
                type="text"
                name="title"
                placeholder="Titulo"
                onChange={(e) =>
                  setNewReview({ ...newReview, title: e.target.value })
                }
                value={newReview.title}
              />
            </div>
            <div className="d-flex radio">
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={24}
                activeColor="#ffd700"
              />
            </div>
            <div className="d-flex coment">
              <label htmlFor="">Escribir comentario:</label>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                onChange={(e) =>
                  setNewReview({ ...newReview, description: e.target.value })
                }
                value={newReview.description}
              ></textarea>
              <a onClick={createReview}>
                <i title="Publicar reseña" class="bi bi-check-circle"></i>
              </a>
            </div>
          </div>
        )}
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
