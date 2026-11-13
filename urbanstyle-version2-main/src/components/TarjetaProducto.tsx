import { Link } from "react-router-dom";
import Tarjeta from "./Tarjeta";
import Boton from "./Boton";
import type { Producto } from "../data/Producto";
import { formatearPrecio } from "../utils/formato";
import { useCarrito } from "../context/CarritoContext";

interface Props {
  producto: Producto;
}

function TarjetaProducto({ producto }: Props) {
  const { agregar } = useCarrito();
  return (
    <Tarjeta titulo={producto.nombre} texto={producto.descripcion} urlImagen={producto.urlImagen} altImagen={producto.altImagen} claseImagen="card-img-top producto-img">
      <p className="card-text fw-bold fs-5">{formatearPrecio(producto.precio)}</p>
      <div className="d-flex gap-2 flex-wrap">
        <Link to={`/producto/${producto.id}`} className="btn btn-outline-dark btn-sm">
          + Info
        </Link>
        <Boton clase="btn btn-primary btn-sm" ariaLabel={`Añadir ${producto.nombre} al carrito`} alHacerClic={() => agregar(producto)}>
          Añadir
        </Boton>
      </div>
    </Tarjeta>
  );
}

export default TarjetaProducto;
