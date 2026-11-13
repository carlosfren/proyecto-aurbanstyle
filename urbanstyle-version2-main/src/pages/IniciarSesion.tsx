import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CampoFormulario from "../components/CampoFormulario";
import { useAuth } from "../context/AuthContext";
import { useFormulario } from "../hooks/useFormulario";
import { validarCorreo } from "../utils/validaciones";

const validarClaveIngreso = (valor: string) =>
  !valor.trim() ? "Ingresa tu contraseña." : "";

function IniciarSesion() {
  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = (location.state as { desde?: string } | null)?.desde || "/";

  const [errorAcceso, setErrorAcceso] = useState<string | null>(null);

  const f = useFormulario(
    { correo: "", clave: "" },
    {
      correo: validarCorreo,
      clave: validarClaveIngreso,
    },
  );

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card p-4 p-md-5 shadow-sm border-0">
            <h1 className="h3 fw-bold text-center mb-2">Iniciar sesión</h1>
            <p className="text-muted text-center small mb-4">
              Ingresa con tu cuenta de UrbanStyle para continuar.
            </p>

            {errorAcceso && (
              <div
                className="alert alert-danger text-center small mb-4"
                role="alert"
              >
                {errorAcceso}
              </div>
            )}

            <form
              noValidate
              aria-label="Formulario de inicio de sesión"
              onSubmit={f.manejarEnvio((v) => {
                setErrorAcceso(null);
                const resultado = iniciarSesion(v.correo, v.clave);
                if (!resultado.ok) {
                  setErrorAcceso(
                    resultado.error ?? "No se pudo iniciar sesión.",
                  );
                  return;
                }
                navigate(destino);
              })}
            >
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
                tipo={"password" as "text"}
                valor={f.valores.clave}
                error={f.errorVisible("clave")}
                alCambiar={f.alCambiar}
                alSalir={f.alSalir}
              />
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 mt-2 text-uppercase fw-bold"
              >
                Entrar
              </button>
            </form>

            <p className="text-center text-muted small mt-4 mb-0">
              ¿Aún no tienes cuenta?{" "}
              <Link
                to="/registrarse"
                state={{ desde: destino }}
                className="text-danger fw-semibold text-decoration-none"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IniciarSesion;
