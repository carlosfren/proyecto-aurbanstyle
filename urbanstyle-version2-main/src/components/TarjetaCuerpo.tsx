import type { ReactNode } from "react";

interface Props {
  clase?: string;
  claseTitulo?: string;
  claseTexto?: string;
  clasePrecio?: string;
  titulo: string;
  texto: string;
  precio?: number | string;
  categoria?: string;
  children?: ReactNode;
}

function TarjetaCuerpo({
  clase = "card-body d-flex flex-column text-center p-3",
  claseTitulo = "card-title fw-bold text-uppercase fs-6 mb-2",
  claseTexto = "card-text text-muted small mb-3 flex-grow-1",
  clasePrecio = "fw-bold fs-5 text-dark mb-3",
  titulo,
  texto,
  precio,
  categoria,
  children,
}: Props) {
  return (
    <div className={clase}>
      {/* Insignia de categoría si viene presente */}
      {categoria && (
        <div className="mb-2">
          <span className="badge bg-primary text-white rounded-pill px-3 py-1 small text-uppercase">
            {categoria}
          </span>
        </div>
      )}

      {/* Título del producto */}
      <h5 className={claseTitulo}>{titulo}</h5>

      {/* Descripción corta */}
      <p className={claseTexto}>{texto}</p>

      {/* Formato de precio en CLP si existe */}
      {precio !== undefined && (
        <p className={clasePrecio}>
          {typeof precio === "number"
            ? `$${precio.toLocaleString("es-CL")} CLP`
            : precio}
        </p>
      )}

      {/* Botón u otros elementos hijos */}
      {children}
    </div>
  );
}

export default TarjetaCuerpo;
