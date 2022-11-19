const FormAddPension = () => {
  return (
    <div className="d-flex container-add-pension">
      <div className="d-flex title">
        <h1>Agregar Pensión</h1>
      </div>
      <div className="d-flex content-add-pension">
        <div className="d-flex content-1">
          <div className="d-flex input">
            <input type="text" placeholder="Título" />
          </div>
          <div className="d-flex input">
            <input type="text" placeholder="Descripción" />
          </div>
          <div className="d-flex input">
            <input type="number" placeholder="Precio" />
          </div>
          <div className="d-flex input">
            <input type="text" placeholder="Dirección" />
          </div>
        </div>
        <div className="d-flex content-2">
          <div className="d-flex data">
            <div className="d-flex input">
              <input type="text" placeholder="Servicios incluidos" />
            </div>
            <div className="d-flex input">
              <input type="url" placeholder="Foto principal (url)" />
            </div>
          </div>
          <div className="d-flex hp-vinculo">
            <div className="d-flex location">
              <a href="#">Seleccionar ubicación</a>
            </div>
            <div className="d-flex btn-add">
              <button type="button" className="btn-sm">
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddPension;
