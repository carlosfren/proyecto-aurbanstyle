import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { PAGINAS } from "../data/Paginas";
import Boton from "./Boton";
import { useCarrito } from "../context/CarritoContext";

function BarraNavegacion() {
  // Estado local: ¿está desplegado el menú en pantallas pequeñas?
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { unidades, abrir } = useCarrito();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top" aria-label="Navegación principal">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" onClick={() => setMenuAbierto(false)}>
          🛍️ UrbanStyle
        </Link>

        <div className="d-flex align-items-center gap-2 order-lg-last">
          <Boton clase="btn btn-outline-light btn-sm position-relative" ariaLabel="Abrir carrito" alHacerClic={abrir}>
            🛒 Carrito
            <span className="badge rounded-pill bg-danger ms-1" data-testid="contador-carrito">
              {unidades}
            </span>
          </Boton>
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="menuPrincipal"
            aria-expanded={menuAbierto}
            aria-label="Mostrar u ocultar menú"
            onClick={() => setMenuAbierto((v) => !v)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className={`collapse navbar-collapse${menuAbierto ? " show" : ""}`} id="menuPrincipal">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {PAGINAS.map((pag) => (
              <li className="nav-item" key={pag.ruta}>
                <NavLink
                  to={pag.ruta}
                  end={pag.ruta === "/"}
                  className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                  onClick={() => setMenuAbierto(false)}
                >
                  {pag.nombre}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default BarraNavegacion;
