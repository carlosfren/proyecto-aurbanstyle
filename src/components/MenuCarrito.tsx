import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { CANTIDAD_MAXIMA } from "../context/carritoReducer";
import { formatearPrecio } from "../utils/formato";

// Panel lateral (offcanvas de Bootstrap) controlado 100% con estado de React.
function MenuCarrito() {
  const { items, total, abierto, cerrar, quitar, cambiarCantidad, vaciar } = useCarrito();
  if (!abierto) return null;

  return (
    <>
      <div className="offcanvas-backdrop fade show" data-testid="fondo-carrito" onClick={cerrar}></div>
      <aside className="offcanvas offcanvas-end show" style={{ visibility: "visible" }} role="dialog" aria-modal="true" aria-label="Carrito de compras">
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title">Tu carrito</h5>
          <button type="button" className="btn-close" aria-label="Cerrar carrito" onClick={cerrar}></button>
        </div>
        <div className="offcanvas-body d-flex flex-column">
          {items.length === 0 ? (
            <p className="text-center text-body-secondary my-auto">Tu carrito está vacío.</p>
          ) : (
            <>
              <ul className="list-group list-group-flush flex-grow-1 overflow-auto">
                {items.map(({ producto, cantidad }) => (
                  <li key={producto.id} className="list-group-item px-0">
                    <div className="d-flex gap-3">
                      <img src={producto.urlImagen} alt={producto.altImagen} className="carrito-miniatura rounded" />
                      <div className="flex-grow-1">
                        <p className="mb-1 fw-semibold">{producto.nombre}</p>
                        <p className="mb-2 text-body-secondary">{formatearPrecio(producto.precio)}</p>
                        <div className="d-flex align-items-center gap-2">
                          <button className="btn btn-outline-secondary btn-sm" aria-label={`Quitar una unidad de ${producto.nombre}`} onClick={() => cambiarCantidad(producto.id, cantidad - 1)}>
                            −
                          </button>
                          <span aria-label={`Cantidad de ${producto.nombre}`} data-testid={`cantidad-${producto.id}`}>
                            {cantidad}
                          </span>
                          <button className="btn btn-outline-secondary btn-sm" aria-label={`Agregar una unidad de ${producto.nombre}`} disabled={cantidad >= CANTIDAD_MAXIMA} onClick={() => cambiarCantidad(producto.id, cantidad + 1)}>
                            +
                          </button>
                          <button className="btn btn-link text-danger btn-sm ms-auto" aria-label={`Eliminar ${producto.nombre}`} onClick={() => quitar(producto.id)}>
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-top pt-3 mt-3">
                <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                  <span>Total</span>
                  <span data-testid="total-carrito">{formatearPrecio(total)}</span>
                </div>
                <div className="d-grid gap-2">
                  <Link to="/checkout" className="btn btn-primary" onClick={cerrar}>
                    Ir a pagar
                  </Link>
                  <button className="btn btn-outline-secondary" onClick={vaciar}>
                    Vaciar carrito
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

export default MenuCarrito;
