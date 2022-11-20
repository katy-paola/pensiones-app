import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Link from 'next/link';

const MapPension = ({ pensions }) => {
  console.log(pensions);

  const getLatitudeAndLongitudeFromString = (string) => {
    const lat = string.split(',')[0];
    const lng = string.split(',')[1];
    return [lat, lng];
  };

  return (
    <MapContainer
      style={{ height: '100vh', width: '100%' }}
      center={[10.4002813, -75.5435449]}
      zoom={13}
      scrollWheelZoom={false}
      minZoom={12}
      dragging={true}
      maxBounds={[
        [10.267611, -75.578984],
        [10.537838, -75.390558],
      ]}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pensions.map((pension) => (
        <Marker
          key={pension.id}
          position={getLatitudeAndLongitudeFromString(pension.location)}
        >
          <Popup>
            {pension.name}
            <Link href={`/view-pension/${pension.id}`}>ver detalles</Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapPension;
