import { useState } from "react";
import { Link } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario";
import { useAuth } from "../context/AuthContext";
import { useCarrito } from "../context/CarritoContext";
import { useFormulario } from "../hooks/useFormulario";
import { formatearPrecio } from "../utils/formato";
import {
  validarCorreo,
  validarDireccion,
  validarNombre,
  validarTelefono,
} from "../utils/validaciones";

function Checkout() {
  const { items, total, vaciar } = useCarrito();
  const { usuario } = useAuth();
  const [comprador, setComprador] = useState<string | null>(null);

  const f = useFormulario(
    {
      nombre: usuario?.nombre ?? "",
      correo: usuario?.correo ?? "",
      telefono: "",
      direccion: "",
    },
    {
      nombre: validarNombre,
      correo: validarCorreo,
      telefono: validarTelefono,
      direccion: validarDireccion,
    },
  );

  if (comprador) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 text-center">
            <div className="card p-5 shadow-sm border-0">
              <div className="mb-3 fs-1 text-success">✓</div>
              <h2 className="h3 fw-bold mb-3">
                ¡Gracias por tu compra, {comprador}!
              </h2>
              <p className="text-muted mb-4">
                Te hemos enviado el detalle completo de tu pedido al correo
                registrado.
              </p>
              <div>
                <Link
                  to="/productos"
                  className="btn btn-primary px-4 py-2 fw-bold"
                >
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="card p-5 shadow-sm border-0 col-12 col-md-8 mx-auto">
          <h2 className="h3 fw-bold mb-3">Tu carrito está vacío</h2>
          <p className="text-muted mb-4">
            Añade algunas prendas del catálogo para realizar tu pedido.
          </p>
          <div>
            <Link to="/productos" className="btn btn-primary px-4 py-2 fw-bold">
              Ir al catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 text-center">
            <div className="card p-4 p-md-5 shadow-sm border-0">
              <div className="mb-3">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ff2c3a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h1 className="h3 fw-bold mb-2">
                Inicia sesión para finalizar tu compra
              </h1>
              <p className="text-muted mb-4">
                Para confirmar tu pedido y coordinar el despacho, necesitas
                ingresar con tu cuenta o crear una en segundos.
              </p>
              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                <Link
                  to="/iniciar-sesion"
                  state={{ desde: "/checkout" }}
                  className="btn btn-primary px-4 py-2 fw-bold text-uppercase"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/registrarse"
                  state={{ desde: "/checkout" }}
                  className="btn btn-dark px-4 py-2 fw-bold text-uppercase"
                >
                  Registrarse
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const enviar = f.manejarEnvio((v) => {
    setComprador(v.nombre.trim());
    vaciar();
  });

  return (
    <div className="container py-4">
      <h1 className="h3 fw-bold text-dark mb-4">Finalizar Compra</h1>
      <div className="row g-4">
        {/* Formulario de envío */}
        <div className="col-12 col-lg-7">
          <div className="card p-4 shadow-sm border-0">
            <h2 className="h4 fw-bold mb-3 border-bottom pb-2">
              Datos de envío
            </h2>
            <form
              onSubmit={enviar}
              noValidate
              aria-label="Formulario de compra"
            >
              <CampoFormulario
                id="nombre"
                name="nombre"
                etiqueta="Nombre completo"
                valor={f.valores.nombre}
                error={f.errorVisible("nombre")}
                alCambiar={f.alCambiar}
                alSalir={f.alSalir}
              />
              <CampoFormulario
                id="correo"
                name="correo"
                etiqueta="Correo electrónico"
                tipo="email"
                valor={f.valores.correo}
                error={f.errorVisible("correo")}
                alCambiar={f.alCambiar}
                alSalir={f.alSalir}
              />
              <CampoFormulario
                id="telefono"
                name="telefono"
                etiqueta="Teléfono"
                tipo="tel"
                placeholder="+56 9 1234 5678"
                valor={f.valores.telefono}
                error={f.errorVisible("telefono")}
                alCambiar={f.alCambiar}
                alSalir={f.alSalir}
              />
              <CampoFormulario
                id="direccion"
                name="direccion"
                etiqueta="Dirección de despacho"
                valor={f.valores.direccion}
                error={f.errorVisible("direccion")}
                alCambiar={f.alCambiar}
                alSalir={f.alSalir}
              />
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 mt-3 text-uppercase fw-bold"
              >
                Confirmar compra
              </button>
            </form>
          </div>
        </div>

        {/* Resumen del carrito */}
        <div className="col-12 col-lg-5">
          <div className="card p-4 shadow-sm border-0">
            <h2 className="h4 fw-bold mb-3 border-bottom pb-2">Resumen</h2>
            <ul className="list-group list-group-flush mb-3">
              {items.map(({ producto, cantidad }) => (
                <li
                  key={producto.id}
                  className="list-group-item d-flex justify-content-between align-items-center px-0 bg-transparent py-2"
                >
                  <span className="small">
                    {producto.nombre}{" "}
                    <strong className="text-muted">× {cantidad}</strong>
                  </span>
                  <span className="fw-semibold small">
                    {formatearPrecio(producto.precio * cantidad)}
                  </span>
                </li>
              ))}
            </ul>
            <hr className="my-2" />
            <div className="d-flex justify-content-between align-items-center fw-bold fs-5 my-2">
              <span>Total</span>
              <span className="text-danger">{formatearPrecio(total)}</span>
            </div>
            <div className="p-3 bg-light rounded text-muted small mt-3">
              🔒 Transacción encriptada y despacho a todo Chile.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
