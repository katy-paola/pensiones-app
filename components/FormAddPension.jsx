import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState, useCallback, useEffect } from 'react';

const MapSelect = dynamic(() => import('./MapSelectMarker'), {
  ssr: false,
});

function DisplayPosition({ map, refPosition }) {
  const onMove = useCallback(() => {
    refPosition(
      `${map.getCenter().lat.toFixed(5)}, ${map.getCenter().lng.toFixed(5)}`
    );
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);
}

const FormAddPension = () => {
  const { data: session } = useSession();
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState('10.4002813, -75.5435449');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const dataObj = Object.fromEntries(data.entries());

    const res = await fetch('/api/pension/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...dataObj,
        userId: session.user.id,
        image: [dataObj.image],
        price: Number(dataObj.price),
      }),
    });

    if (res) {
      alert('Pensión creada con éxito');
      router.push('/home');
    }
  };

  return (
    <div className="d-flex container-add-pension">
      <div className="d-flex title">
        <h1>Agregar Pensión</h1>
      </div>
      <form onSubmit={handleSubmit} className="d-flex content-add-pension">
        <div className="d-flex content-1">
          <div className="d-flex input">
            <input type="text" placeholder="Título" name="name" />
          </div>
          <div className="d-flex input">
            <input type="text" placeholder="Descripción" name="description" />
          </div>
          <div className="d-flex input">
            <input type="number" placeholder="Precio" name="price" />
          </div>
          <div className="d-flex input">
            <input type="text" placeholder="Dirección" name="address" />
          </div>
          <div className="d-flex input">
            <input type="text" readOnly value={position} name="location" />
          </div>
        </div>
        <div className="d-flex content-2">
          <div className="d-flex data">
            <div className="d-flex input">
              <input
                type="text"
                name="services"
                placeholder="Servicios incluidos"
              />
            </div>
            <div className="d-flex input">
              <input
                type="url"
                name="image"
                placeholder="Foto principal (url)"
              />
            </div>
            <div className="d-flex input">
              <input type="text" name="amenities" placeholder="Comodidades" />
            </div>
            <div className="d-flex input">
              <input type="text" name="rules" placeholder="Reglas" />
            </div>
          </div>

          <div className="d-flex hp-vinculo">
            <div className="d-flex btn-add">
              <button type="submit" className="btn-sm">
                Agregar
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="d-flex map">
        {map ? <DisplayPosition map={map} refPosition={setPosition} /> : null}
        <MapSelect setMap={setMap} positionMarker={position} />
      </div>
    </div>
  );
};

export default FormAddPension;
