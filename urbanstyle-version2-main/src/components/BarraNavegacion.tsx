import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Boton from "./Boton";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";

// Enlaces de la barra superior (mismo diseño y colores del proyecto UrbanStyle principal).
// El resto de las páginas (Blog, Contacto, Sobre nosotros) siguen disponibles en el pie de página.
const ENLACES = [
  { nombre: "Inicio", ruta: "/" },
  { nombre: "Catálogo", ruta: "/productos" },
  { nombre: "Iniciar sesión", ruta: "/iniciar-sesion" },
];

function BarraNavegacion() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { unidades, abrir } = useCarrito();
  const { usuario, cerrarSesion } = useAuth();

  // Con sesión iniciada se oculta "Iniciar sesión" y se muestra el usuario + "Salir".
  const enlaces = usuario
    ? ENLACES.filter((e) => e.ruta !== "/iniciar-sesion")
    : ENLACES;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top site-header"
      aria-label="Navegación principal"
    >
      <div className="container">
        <Link
          className="navbar-brand brand-logo"
          to="/"
          onClick={() => setMenuAbierto(false)}
        >
          URBANSTYLE
        </Link>

        <div className="d-flex align-items-center gap-2 order-lg-last">
          <Boton
            clase="btn btn-carrito position-relative"
            ariaLabel="Abrir carrito"
            alHacerClic={abrir}
          >
            🛒 Carrito
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill cart-count-badge"
              data-testid="contador-carrito"
            >
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

        <div
          className={`collapse navbar-collapse justify-content-end${menuAbierto ? " show" : ""}`}
          id="menuPrincipal"
        >
          <ul className="navbar-nav align-items-lg-center nav-menu mb-2 mb-lg-0">
            {enlaces.map((enlace) => (
              <li className="nav-item" key={enlace.ruta}>
                <NavLink
                  to={enlace.ruta}
                  end={enlace.ruta === "/"}
                  className={({ isActive }) =>
                    `nav-link${isActive ? " active" : ""}`
                  }
                  onClick={() => setMenuAbierto(false)}
                >
                  {enlace.nombre}
                </NavLink>
              </li>
            ))}
            {usuario ? (
              <>
                <li className="nav-item">
                  <span className="nav-link" data-testid="usuario-activo">
                    👤 {usuario.nombre.split(" ")[0]}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn-cta"
                    onClick={() => {
                      cerrarSesion();
                      setMenuAbierto(false);
                    }}
                  >
                    Salir
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link
                  to="/registrarse"
                  className="btn-cta"
                  onClick={() => setMenuAbierto(false)}
                >
                  Registrarse
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default BarraNavegacion;
