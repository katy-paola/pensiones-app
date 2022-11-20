import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      <Header></Header>
      <MapPensions pensions={pensions} />
      <Footer></Footer>
    </div>
  );
};

export default ViewMap;
