import type { ReactNode } from "react";

interface Props {
  clase?: string;
  tipo?: "button" | "submit" | "reset";
  deshabilitado?: boolean;
  ariaLabel?: string;
  children: ReactNode;
  alHacerClic?: () => void; // opcional: un botón type="submit" no necesita handler
}

function Boton({
  clase = "btn btn-primary",
  tipo = "button",
  deshabilitado = false,
  ariaLabel,
  children,
  alHacerClic,
}: Props) {
  return (
    <button
      type={tipo}
      className={clase}
      disabled={deshabilitado}
      aria-label={ariaLabel}
      onClick={alHacerClic}
    >
      {children}
    </button>
  );
} //Aplicacion de children - componentes a definir

export default Boton;
