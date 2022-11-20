import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const MapPensions = dynamic(() => import('../components/mapPension'), {
  ssr: false,
});

const ViewMap = () => {
  const [pensions, setPensions] = useState([]);

  useEffect(() => {
    const getPensions = async () => {
      const response = await fetch('/api/pension');
      const data = await response.json();
      setPensions(data);
    };
    getPensions();
  }, []);

  return (
    <div className="view-map" style={{ height: '100vh', width: '100%' }}>
      <MapPensions pensions={pensions} />
    </div>
  );
};

export default ViewMap;
