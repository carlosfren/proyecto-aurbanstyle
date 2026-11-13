import { useState } from "react";
import { Link } from "react-router-dom";
import { ENTRADAS } from "../data/Blog";

function Blog() {
  const [abiertaId, setAbiertaId] = useState<number | null>(null);

  const alternarEntrada = (id: number) => {
    setAbiertaId((actual) => (actual === id ? null : id));
  };

  return (
    <>
      <h1 className="h2 my-4">Blog</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4 align-items-start">
        {ENTRADAS.map((e) => {
          const abierta = abiertaId === e.id;
          return (
            <div className="col" key={e.id}>
              <article className={`card ${abierta ? "garantia-activa" : ""}`}>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-dark text-uppercase">
                      {e.categoria}
                    </span>
                    <span className="text-muted small">{e.tiempoLectura}</span>
                  </div>

                  <h2 className="h5 card-title fw-bold text-dark">
                    {e.titulo}
                  </h2>
                  <p className="text-body-secondary small mb-2">{e.fecha}</p>
                  <p className="card-text text-muted">{e.resumen}</p>

                  {abierta && (
                    <div className="pt-3 mt-3 border-top">
                      {e.contenido.map((parrafo, indice) => (
                        <p key={indice} className="small text-dark mb-2">
                          {parrafo}
                        </p>
                      ))}
                      <Link
                        to="/productos"
                        className="btn btn-sm btn-outline-danger fw-semibold mt-2"
                      >
                        {e.textoCatalogo}
                      </Link>
                    </div>
                  )}

                  <div className="mt-3 pt-1">
                    <button
                      type="button"
                      className="btn btn-link p-0 text-danger fw-bold text-decoration-none small"
                      aria-expanded={abierta}
                      onClick={() => alternarEntrada(e.id)}
                    >
                      {abierta ? "Ocultar artículo ▴" : "Leer artículo ▾"}
                    </button>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Blog;
