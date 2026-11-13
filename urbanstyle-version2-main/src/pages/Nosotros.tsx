function Nosotros() {
  return (
    <div className="container py-4">
      <h1 className="h2 fw-bold text-dark mb-4">Sobre nosotros</h1>
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div className="card p-3 shadow-sm border-0 text-center h-100 d-flex flex-column justify-content-center">
            <img
              src="/imagen/imagen4.pgn.webp"
              alt="Colección Valley Dream"
              className="img-fluid rounded mx-auto"
              style={{ maxHeight: "380px", objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card p-4 shadow-sm border-0 h-100 d-flex flex-column justify-content-center">
            <p className="text-muted mb-4 lead fs-6">
              UrbanStyle nació en Concepción con una idea simple: ropa urbana de
              calidad, con diseño propio y a precios justos. Trabajamos con
              algodón full brillo y cortes oversize pensados para el día a día.
            </p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item border-0 mb-2 p-3 bg-light rounded-3">
                <strong className="text-danger">Misión:</strong> vestir la calle
                con identidad propia.
              </li>
              <li className="list-group-item border-0 mb-2 p-3 bg-light rounded-3">
                <strong className="text-danger">Visión:</strong> ser la marca
                urbana de referencia en el sur de Chile.
              </li>
              <li className="list-group-item border-0 p-3 bg-light rounded-3">
                <strong className="text-danger">Valores:</strong> calidad,
                autenticidad y cercanía.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;
