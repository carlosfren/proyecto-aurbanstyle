import { useState } from "react";
import { Link } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario";
import { useCarrito } from "../context/CarritoContext";
import { useFormulario } from "../hooks/useFormulario";
import { formatearPrecio } from "../utils/formato";
import { validarCorreo, validarDireccion, validarNombre, validarTelefono } from "../utils/validaciones";

function Checkout() {
  const { items, total, vaciar } = useCarrito();
  const [comprador, setComprador] = useState<string | null>(null);
  const f = useFormulario(
    { nombre: "", correo: "", telefono: "", direccion: "" },
    { nombre: validarNombre, correo: validarCorreo, telefono: validarTelefono, direccion: validarDireccion },
  );

  if (comprador) {
    return (
      <div className="alert alert-success my-5" role="status">
        <h2 className="h4">¡Gracias por tu compra, {comprador}!</h2>
        <p className="mb-3">Te enviamos el detalle del pedido a tu correo.</p>
        <Link to="/productos" className="btn btn-primary">Seguir comprando</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center my-5">
        <h2>Tu carrito está vacío</h2>
        <Link to="/productos" className="btn btn-primary mt-3">Ir al catálogo</Link>
      </div>
    );
  }

  const enviar = f.manejarEnvio((v) => {
    setComprador(v.nombre.trim());
    vaciar();
  });

  return (
    <div className="row g-4 my-3">
      <div className="col-12 col-lg-7">
        <h1 className="h3">Datos de envío</h1>
        <form onSubmit={enviar} noValidate aria-label="Formulario de compra">
          <CampoFormulario id="nombre" name="nombre" etiqueta="Nombre completo" valor={f.valores.nombre} error={f.errorVisible("nombre")} alCambiar={f.alCambiar} alSalir={f.alSalir} />
          <CampoFormulario id="correo" name="correo" etiqueta="Correo electrónico" tipo="email" valor={f.valores.correo} error={f.errorVisible("correo")} alCambiar={f.alCambiar} alSalir={f.alSalir} />
          <CampoFormulario id="telefono" name="telefono" etiqueta="Teléfono" tipo="tel" placeholder="+56 9 1234 5678" valor={f.valores.telefono} error={f.errorVisible("telefono")} alCambiar={f.alCambiar} alSalir={f.alSalir} />
          <CampoFormulario id="direccion" name="direccion" etiqueta="Dirección de despacho" valor={f.valores.direccion} error={f.errorVisible("direccion")} alCambiar={f.alCambiar} alSalir={f.alSalir} />
          <button type="submit" className="btn btn-primary w-100">Confirmar compra</button>
        </form>
      </div>
      <div className="col-12 col-lg-5">
        <h2 className="h4">Resumen</h2>
        <ul className="list-group mb-3">
          {items.map(({ producto, cantidad }) => (
            <li key={producto.id} className="list-group-item d-flex justify-content-between">
              <span>{producto.nombre} × {cantidad}</span>
              <span>{formatearPrecio(producto.precio * cantidad)}</span>
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between fw-bold">
            <span>Total</span>
            <span>{formatearPrecio(total)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Checkout;
