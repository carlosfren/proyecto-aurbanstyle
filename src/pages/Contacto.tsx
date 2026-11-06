import { useState } from "react";
import CampoFormulario from "../components/CampoFormulario";
import { useFormulario } from "../hooks/useFormulario";
import { validarCorreo, validarMensaje, validarNombre } from "../utils/validaciones";

function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const f = useFormulario(
    { nombre: "", correo: "", mensaje: "" },
    { nombre: validarNombre, correo: validarCorreo, mensaje: validarMensaje },
  );

  return (
    <div className="row justify-content-center my-4">
      <div className="col-12 col-md-8 col-lg-6">
        <h1 className="h2">Contacto</h1>
        {enviado && (
          <div className="alert alert-success" role="status">¡Mensaje enviado! Te responderemos pronto.</div>
        )}
        <form
          noValidate
          aria-label="Formulario de contacto"
          onSubmit={f.manejarEnvio(() => {
            setEnviado(true);
            f.reiniciar();
          })}
        >
          <CampoFormulario id="nombre" name="nombre" etiqueta="Nombre" valor={f.valores.nombre} error={f.errorVisible("nombre")} alCambiar={f.alCambiar} alSalir={f.alSalir} />
          <CampoFormulario id="correo" name="correo" etiqueta="Correo electrónico" tipo="email" valor={f.valores.correo} error={f.errorVisible("correo")} alCambiar={f.alCambiar} alSalir={f.alSalir} />
          <CampoFormulario id="mensaje" name="mensaje" etiqueta="Mensaje" tipo="textarea" valor={f.valores.mensaje} error={f.errorVisible("mensaje")} alCambiar={f.alCambiar} alSalir={f.alSalir} />
          <button type="submit" className="btn btn-primary">Enviar mensaje</button>
        </form>
      </div>
    </div>
  );
}

export default Contacto;
