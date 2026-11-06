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
        <h2 className="my-5">Producto no encontrado</h2>
        <Link className="btn btn-outline-secondary" to="/productos">Volver al catálogo</Link>
      </Contenedor>
    );
  }

  return (
    <Contenedor>
      <div className="my-4">
        <Link className="btn btn-outline-secondary" to="/productos">⬅️ Volver a la tienda</Link>
      </div>
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <img src={producto.urlImagen} alt={producto.altImagen} className="img-fluid rounded shadow" />
        </div>
        <div className="col-12 col-md-6">
          <p className="text-body-secondary mb-1">{producto.categoria} · Código {producto.id}</p>
          <h1 className="h2">{producto.nombre}</h1>
          <p>{producto.descripcion}</p>
          <p className="fs-3 fw-bold text-success">{formatearPrecio(producto.precio)}</p>
          <div className="mb-3" style={{ maxWidth: 160 }}>
            <label htmlFor="cantidad" className="form-label">Cantidad</label>
            <select id="cantidad" className="form-select" value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))}>
              {Array.from({ length: CANTIDAD_MAXIMA }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
          <Boton clase="btn btn-primary btn-lg" alHacerClic={() => agregar(producto, cantidad)}>
            Añadir al carrito
          </Boton>
        </div>
      </div>
    </Contenedor>
  );
}

export default ProductoDetalle;
