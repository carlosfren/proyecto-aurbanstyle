function Nosotros() {
  return (
    <>
      <h1 className="h2 my-4">Sobre nosotros</h1>
      <div className="row g-4 align-items-center">
        <div className="col-12 col-md-6">
          <img src="/imagen/imagen4.pgn.webp" alt="Colección Valley Dream" className="img-fluid rounded shadow" />
        </div>
        <div className="col-12 col-md-6">
          <p>
            UrbanStyle nació en Concepción con una idea simple: ropa urbana de calidad, con diseño propio y a precios justos.
            Trabajamos con algodón full brillo y cortes oversize pensados para el día a día.
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Misión:</strong> vestir la calle con identidad propia.</li>
            <li className="list-group-item"><strong>Visión:</strong> ser la marca urbana de referencia en el sur de Chile.</li>
            <li className="list-group-item"><strong>Valores:</strong> calidad, autenticidad y cercanía.</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Nosotros;
