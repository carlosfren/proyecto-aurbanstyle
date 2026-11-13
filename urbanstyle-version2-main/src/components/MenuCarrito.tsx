import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";
import { CANTIDAD_MAXIMA } from "../context/carritoReducer";
import { formatearPrecio } from "../utils/formato";

// Panel lateral controlado con estado de React.
function MenuCarrito() {
  const { items, total, abierto, cerrar, quitar, cambiarCantidad, vaciar } =
    useCarrito();
  const { usuario } = useAuth();

  if (!abierto) return null;

  return (
    <>
      <div
        className="offcanvas-backdrop fade show"
        data-testid="fondo-carrito"
        onClick={cerrar}
      ></div>
      <aside
        className="offcanvas offcanvas-end show border-start shadow-lg"
        style={{ visibility: "visible" }}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        <div className="offcanvas-header border-bottom py-3">
          <h5 className="offcanvas-title fw-bold">Tu carrito</h5>
          <button
            type="button"
            className="btn-close"
            aria-label="Cerrar carrito"
            onClick={cerrar}
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column">
          {items.length === 0 ? (
            <p className="text-center text-muted my-auto">
              Tu carrito está vacío.
            </p>
          ) : (
            <>
              <ul className="list-group list-group-flush flex-grow-1 overflow-auto">
                {items.map(({ producto, cantidad }) => (
                  <li key={producto.id} className="list-group-item px-0 py-3">
                    <div className="d-flex gap-3 align-items-center">
                      <img
                        src={producto.urlImagen}
                        alt={producto.altImagen}
                        className="carrito-miniatura border rounded"
                      />
                      <div className="flex-grow-1">
                        <p className="mb-0 fw-bold small">{producto.nombre}</p>
                        <p className="mb-2 text-danger fw-semibold small">
                          {formatearPrecio(producto.precio)}
                        </p>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-outline-secondary btn-sm px-2 py-0 fw-bold"
                            aria-label={`Quitar una unidad de ${producto.nombre}`}
                            onClick={() =>
                              cambiarCantidad(producto.id, cantidad - 1)
                            }
                          >
                            −
                          </button>
                          <span
                            className="px-2 fw-semibold small"
                            aria-label={`Cantidad de ${producto.nombre}`}
                            data-testid={`cantidad-${producto.id}`}
                          >
                            {cantidad}
                          </span>
                          <button
                            className="btn btn-outline-secondary btn-sm px-2 py-0 fw-bold"
                            aria-label={`Agregar una unidad de ${producto.nombre}`}
                            disabled={cantidad >= CANTIDAD_MAXIMA}
                            onClick={() =>
                              cambiarCantidad(producto.id, cantidad + 1)
                            }
                          >
                            +
                          </button>
                          <button
                            className="btn btn-link text-muted btn-sm ms-auto text-decoration-none small"
                            aria-label={`Eliminar ${producto.nombre}`}
                            onClick={() => quitar(producto.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-top pt-3 mt-auto">
                <div className="d-flex justify-content-between align-items-center fs-5 fw-bold mb-2">
                  <span>Total</span>
                  <span className="text-danger" data-testid="total-carrito">
                    {formatearPrecio(total)}
                  </span>
                </div>

                {!usuario && (
                  <p className="text-muted small mb-2">
                    Necesitarás iniciar sesión o registrarte antes de confirmar
                    el pago.
                  </p>
                )}

                <div className="d-grid gap-2">
                  <Link
                    to="/checkout"
                    className="btn btn-primary py-2 text-uppercase fw-bold"
                    onClick={cerrar}
                  >
                    Ir a pagar
                  </Link>
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={vaciar}
                  >
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
