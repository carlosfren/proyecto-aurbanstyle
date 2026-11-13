import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Contenedor from "../components/Contenedor";
import Boton from "../components/Boton";
import { PRODUCTOS } from "../data/Producto";
import { CANTIDAD_MAXIMA } from "../context/carritoReducer";
import { useCarrito } from "../context/CarritoContext";
import { formatearPrecio } from "../utils/formato";

function ProductoDetalle() {
  const { id } = useParams<{ id: string }>();
  const { agregar } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const producto = PRODUCTOS.find((p) => p.id === id);

  if (!producto) {
    return (
      <Contenedor clase="container text-center my-5">
        <div className="card p-5 shadow-sm border-0 col-12 col-md-6 mx-auto">
          <h2 className="h4 fw-bold mb-3">Producto no encontrado</h2>
          <p className="text-muted mb-4">
            El artículo que buscas no existe o fue descontinuado.
          </p>
          <div>
            <Link className="btn btn-primary fw-bold px-4 py-2" to="/productos">
              Volver al catálogo
            </Link>
          </div>
        </div>
      </Contenedor>
    );
  }

  return (
    <Contenedor>
      <div className="my-4">
        <Link
          className="btn btn-dark fw-semibold px-3 py-2 shadow-sm d-inline-flex align-items-center gap-2 btn-volver"
          to="/productos"
        >
          <span>←</span> Volver a la tienda
        </Link>
      </div>

      {/* Contenedor principal en tarjeta blanca */}
      <div className="card p-4 p-md-5 shadow-sm border-0">
        <div className="row g-4 align-items-center">
          <div className="col-12 col-md-6 text-center">
            <img
              src={producto.urlImagen}
              alt={producto.altImagen}
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>

          <div className="col-12 col-md-6">
            <span className="badge bg-light text-dark border mb-2 px-2 py-1 small">
              {producto.categoria} · Código {producto.id}
            </span>
            <h1 className="h2 fw-bold text-dark mb-2">{producto.nombre}</h1>
            <p className="text-muted mb-4">{producto.descripcion}</p>

            {/* Precio en rojo corporativo sobre fondo blanco */}
            <div className="fs-2 fw-bold text-danger mb-4">
              {formatearPrecio(producto.precio)}
            </div>

            <div className="mb-4" style={{ maxWidth: 160 }}>
              <label
                htmlFor="cantidad"
                className="form-label small fw-medium text-muted"
              >
                Cantidad
              </label>
              <select
                id="cantidad"
                className="form-select"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
              >
                {Array.from({ length: CANTIDAD_MAXIMA }, (_, i) => i + 1).map(
                  (n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ),
                )}
              </select>
            </div>

            <Boton
              clase="btn btn-primary btn-lg w-100 py-2 text-uppercase fw-bold"
              alHacerClic={() => agregar(producto, cantidad)}
            >
              Añadir al carrito
            </Boton>
          </div>
        </div>
      </div>
    </Contenedor>
  );
}

export default ProductoDetalle;
