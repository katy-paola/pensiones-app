import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useState, useCallback, useEffect } from 'react';

const MapSelect = dynamic(() => import('../../components/MapSelectMarker'), {
  ssr: false,
});

function DisplayPosition({ map, refPosition }) {
  const [position, setPosition] = useState(() => map.getCenter());

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
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

const CreatePension = () => {
  const { data: session } = useSession();
  const [map, setMap] = useState(null);
  const [position, setPosition] = useState('10.4002813, -75.5435449');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const dataObj = Object.fromEntries(data.entries());
    console.log(
      '🚀 ~ file: create-pension.jsx ~ line 7 ~ handleSubmit ~ dataObj',
      dataObj
    );

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

    const json = await res.json();
    console.log(
      '🚀 ~ file: create-pension.jsx ~ line 26 ~ handleSubmit ~ json',
      json
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="description">Description</label>
      <input type="text" name="description" id="description" />
      <label htmlFor="image">Image</label>
      <input type="text" name="image" id="image" />
      <label htmlFor="price">Price</label>
      <input type="text" name="price" id="price" />
      <label htmlFor="location">Location</label>
      <input
        type="text"
        value={position}
        readOnly
        name="location"
        id="location"
      />
      <label htmlFor="address">Address</label>
      <input type="text" name="address" id="address" />
      <label htmlFor="amenities">Amenities</label>
      <input type="text" name="amenities" id="amenities" />
      <label htmlFor="services">Services</label>
      <input type="text" name="services" id="services" />
      <label htmlFor="rules">Rules</label>
      <input type="text" name="rules" id="rules" />

      {map ? <DisplayPosition map={map} refPosition={setPosition} /> : null}
      <MapSelect setMap={setMap} positionMarker={position} />

      <button type="submit">Create Pension</button>
    </form>
  );
};

export default CreatePension;
