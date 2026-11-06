import type { ReactNode } from "react";
import TarjetaCuerpo from "./TarjetaCuerpo";

interface Props {
  urlImagen?: string;
  claseImagen?: string;
  altImagen?: string;
  titulo: string;
  texto: string;
  precio?: number | string;
  categoria?: string;
  clase?: string;
  children?: ReactNode;
}

// Sin ancho fijo: el ancho lo decide la grilla de Bootstrap (col-*) para que sea responsiva.
function Tarjeta({
  urlImagen,
  claseImagen = "card-img-top producto-img",
  altImagen = "",
  titulo,
  texto,
  precio,
  categoria,
  clase = "card card-producto h-100 shadow-sm border-0",
  children,
}: Props) {
  return (
    <div className={clase}>
      {urlImagen && (
        <img
          src={urlImagen}
          className={claseImagen}
          alt={altImagen || titulo}
          loading="lazy"
        />
      )}
      <TarjetaCuerpo
        titulo={titulo}
        texto={texto}
        precio={precio}
        categoria={categoria}
      >
        {children}
      </TarjetaCuerpo>
    </div>
  );
}

export default Tarjeta;
