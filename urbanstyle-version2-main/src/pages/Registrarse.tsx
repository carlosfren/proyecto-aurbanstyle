import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario";
import { useAuth } from "../context/AuthContext";
import { useFormulario } from "../hooks/useFormulario";
import { validarCorreo, validarNombre } from "../utils/validaciones";

const validarClave = (valor: string) => {
  if (!valor.trim()) return "Ingresa una contraseña.";
  if (valor.trim().length < 6) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }
  return "";
};

function Registrarse() {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = (location.state as { desde?: string } | null)?.desde || "/";

  const [errorRegistro, setErrorRegistro] = useState<string | null>(null);

  const f = useFormulario(
    { nombre: "", correo: "", clave: "" },
    {
      nombre: validarNombre,
      correo: validarCorreo,
      clave: validarClave,
    },
  );

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card p-4 p-md-5 shadow-sm border-0">
            <h1 className="h3 fw-bold text-center mb-2">Crear cuenta</h1>
            <p className="text-muted text-center small mb-4">
              Regístrate en UrbanStyle para gestionar tus pedidos y finalizar
              tus compras.
            </p>

            {errorRegistro && (
              <div
                className="alert alert-danger text-center small mb-4"
                role="alert"
              >
                {errorRegistro}
              </div>
            )}

            <form
              noValidate
              aria-label="Formulario de registro"
              onSubmit={f.manejarEnvio((v) => {
                setErrorRegistro(null);
                const resultado = registrar(v.nombre, v.correo, v.clave);
                if (!resultado.ok) {
                  setErrorRegistro(resultado.error ?? "No se pudo registrar.");
                  return;
                }
                navigate(destino);
              })}
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
                id="clave"
                name="clave"
                etiqueta="Contraseña"
                tipo={"password" as any}
                placeholder="Mínimo 6 caracteres"
                valor={f.valores.clave}
                error={f.errorVisible("clave")}
                alCambiar={f.alCambiar}
                alSalir={f.alSalir}
              />
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 mt-2 text-uppercase fw-bold"
              >
                Registrarse
              </button>
            </form>

            <p className="text-center text-muted small mt-4 mb-0">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/iniciar-sesion"
                state={{ desde: destino }}
                className="text-danger fw-semibold text-decoration-none"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registrarse;
