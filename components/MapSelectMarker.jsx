import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const MapSelectMarker = ({ setMap, positionMarker }) => {
  const getLatitudeAndLongitudeFromString = (string) => {
    const lat = string.split(',')[0];
    const lng = string.split(',')[1];
    return [lat, lng];
  };

  const displayMap = useMemo(
    () => (
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
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={getLatitudeAndLongitudeFromString(positionMarker)}
        ></Marker>
      </MapContainer>
    ),
    [positionMarker, setMap]
  );

  return <div style={{ height: '100vh', width: '100%' }}>{displayMap}</div>;
};

export default MapSelectMarker;
