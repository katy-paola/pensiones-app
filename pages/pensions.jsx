import { useEffect, useState } from 'react';

const PensionsPage = () => {
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
    <>
      <h1>Lista de todas las pensiones</h1>
      <p>Aqui vas a encontrar todas las pensiones</p>

      <ul>
        {pensions.map((pension) => (
          <li key={pension.id}>
            <h2>{pension.name}</h2>
            <p>{pension.description}</p>
            <p>Precio: {pension.price}</p>
            <picture>
              <img src={pension.image[0]} alt="imagen" />
            </picture>
            <p>Reglas: {pension.rules}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PensionsPage;
