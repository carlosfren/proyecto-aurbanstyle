import type { ChangeEvent, FocusEvent } from "react";

interface Props {
  id: string;
  name: string;
  etiqueta: string;
  valor: string;
  tipo?: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
  error?: string;
  alCambiar: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  alSalir: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function CampoFormulario({ id, name, etiqueta, valor, tipo = "text", placeholder, error = "", alCambiar, alSalir }: Props) {
  const clase = `form-control${error ? " is-invalid" : ""}`;
  const comunes = {
    id,
    name,
    value: valor,
    placeholder,
    className: clase,
    onChange: alCambiar,
    onBlur: alSalir,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {etiqueta}
      </label>
      {tipo === "textarea" ? <textarea rows={4} {...comunes} /> : <input type={tipo} {...comunes} />}
      {error && (
        <div id={`${id}-error`} className="invalid-feedback" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default CampoFormulario;
