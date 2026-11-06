import { useState } from "react";
import CampoFormulario from "../components/CampoFormulario";
import { useFormulario } from "../hooks/useFormulario";
import { validarCorreo, validarNombre } from "../utils/validaciones";

function Suscripcion() {
  const [suscrito, setSuscrito] = useState<string | null>(null);
  const f = useFormulario({ nombre: "", correo: "" }, { nombre: validarNombre, correo: validarCorreo });

  return (
    <div className="row justify-content-center my-4">
      <div className="col-12 col-md-8 col-lg-6">
        <h1 className="h2">Suscríbete</h1>
        <p>Recibe lanzamientos y descuentos exclusivos de UrbanStyle.</p>
        {suscrito && (
          <div className="alert alert-success" role="status">¡Listo, {suscrito}! Ya estás suscrito.</div>
        )}
        <form
          noValidate
          aria-label="Formulario de suscripción"
          onSubmit={f.manejarEnvio((v) => {
            setSuscrito(v.nombre.trim());
            f.reiniciar();
          })}
        >
          <CampoFormulario id="nombre" name="nombre" etiqueta="Nombre" valor={f.valores.nombre} error={f.errorVisible("nombre")} alCambiar={f.alCambiar} alSalir={f.alSalir} />
          <CampoFormulario id="correo" name="correo" etiqueta="Correo electrónico" tipo="email" valor={f.valores.correo} error={f.errorVisible("correo")} alCambiar={f.alCambiar} alSalir={f.alSalir} />
          <button type="submit" className="btn btn-danger">Suscribirme</button>
        </form>
      </div>
    </div>
  );
}

export default Suscripcion;
